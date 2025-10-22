// script/db.js
// ============================================================================
// IndexedDB Manager for BCDA Mapping Application
// ============================================================================

(function () {
    'use strict';

    const DB_NAME = 'BCDAMappingDB';
    const DB_VERSION = 1;
    const STORES = {
        CATEGORIES: 'categories',
        SUBCATEGORIES: 'subcategories',
        SITES: 'sites',
        POLYGONS: 'polygons',
        SEARCH_DATA: 'searchData',
        APPS: 'apps',
        ALERTS: 'alerts',
        EVENTS: 'events',
        NOTIFICATIONS: 'notifications',
        METADATA: 'metadata',
    };

    let db = null;
    let isInitialized = false;

    // ============================================================================
    // DATABASE INITIALIZATION
    // ============================================================================

    function initDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                console.error('IndexedDB is not supported in this browser');
                reject(new Error('IndexedDB not supported'));
                return;
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                db = request.result;
                isInitialized = true;
                console.log('IndexedDB initialized successfully');
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const database = event.target.result;
                console.log('Creating/upgrading database schema...');

                // Create object stores if they don't exist
                if (!database.objectStoreNames.contains(STORES.CATEGORIES)) {
                    const categoriesStore = database.createObjectStore(
                        STORES.CATEGORIES,
                        { keyPath: 'id' }
                    );
                    categoriesStore.createIndex('name', 'name', { unique: false });
                }

                if (!database.objectStoreNames.contains(STORES.SUBCATEGORIES)) {
                    const subcategoriesStore = database.createObjectStore(
                        STORES.SUBCATEGORIES,
                        { keyPath: 'id' }
                    );
                    subcategoriesStore.createIndex('categoryId', 'categoryId', {
                        unique: false,
                    });
                    subcategoriesStore.createIndex('title', 'title', { unique: false });
                }

                if (!database.objectStoreNames.contains(STORES.SITES)) {
                    const sitesStore = database.createObjectStore(STORES.SITES, {
                        keyPath: 'id',
                    });
                    sitesStore.createIndex('category', 'category', { unique: false });
                    sitesStore.createIndex('subcategory', 'subcategory', {
                        unique: false,
                    });
                    sitesStore.createIndex('status', 'status', { unique: false });
                    sitesStore.createIndex('name', 'name', { unique: false });
                }

                if (!database.objectStoreNames.contains(STORES.POLYGONS)) {
                    const polygonsStore = database.createObjectStore(STORES.POLYGONS, {
                        keyPath: 'id',
                        autoIncrement: true,
                    });
                    polygonsStore.createIndex('site', 'site', { unique: true });
                    polygonsStore.createIndex('category', 'category', { unique: false });
                }

                if (!database.objectStoreNames.contains(STORES.SEARCH_DATA)) {
                    database.createObjectStore(STORES.SEARCH_DATA, { keyPath: 'id' });
                }

                if (!database.objectStoreNames.contains(STORES.APPS)) {
                    database.createObjectStore(STORES.APPS, { keyPath: 'id' });
                }

                if (!database.objectStoreNames.contains(STORES.ALERTS)) {
                    database.createObjectStore(STORES.ALERTS, { keyPath: 'id' });
                }

                if (!database.objectStoreNames.contains(STORES.EVENTS)) {
                    database.createObjectStore(STORES.EVENTS, { keyPath: 'id' });
                }

                if (!database.objectStoreNames.contains(STORES.NOTIFICATIONS)) {
                    database.createObjectStore(STORES.NOTIFICATIONS, { keyPath: 'id' });
                }

                if (!database.objectStoreNames.contains(STORES.METADATA)) {
                    database.createObjectStore(STORES.METADATA, { keyPath: 'key' });
                }

                console.log('Database schema created successfully');
            };
        });
    }

    // ============================================================================
    // GENERIC CRUD OPERATIONS
    // ============================================================================

    function addData(storeName, data) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function putData(storeName, data) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function getData(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function getAllData(storeName) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function deleteData(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    function clearStore(storeName) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // BULK OPERATIONS
    // ============================================================================

    function bulkPutData(storeName, dataArray) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            let count = 0;

            transaction.oncomplete = () => {
                console.log(`Successfully saved ${count} items to ${storeName}`);
                resolve(count);
            };

            transaction.onerror = () => {
                console.error(
                    `Bulk insert failed for ${storeName}:`,
                    transaction.error
                );
                reject(transaction.error);
            };

            Array.isArray(dataArray) ?? dataArray.forEach((item) => {
                const request = store.put(item);
                request.onsuccess = () => count++;
            });
        });
    }

    // ============================================================================
    // SPECIFIC DATA OPERATIONS
    // ============================================================================

    function saveCategories(categories) {
        return bulkPutData(STORES.CATEGORIES, categories);
    }

    function saveSubcategories(subcategories) {
        return bulkPutData(STORES.SUBCATEGORIES, subcategories);
    }

    function saveSites(sites) {
        return bulkPutData(STORES.SITES, sites);
    }

    function savePolygons(polygons) {
        return bulkPutData(STORES.POLYGONS, polygons);
    }

    function saveSearchData(searchData) {
        return bulkPutData(STORES.SEARCH_DATA, searchData);
    }

    function saveApps(apps) {
        return bulkPutData(STORES.APPS, apps);
    }

    function saveAlerts(alerts) {
        return bulkPutData(STORES.ALERTS, alerts);
    }

    function saveEvents(events) {
        return bulkPutData(STORES.EVENTS, events);
    }

    function saveNotifications(notifications) {
        return bulkPutData(STORES.NOTIFICATIONS, notifications);
    }

    // ============================================================================
    // LOAD ALL DATA FROM INDEXEDDB
    // ============================================================================

    async function loadAllData() {
        try {
            console.log('Loading all data from IndexedDB...');

            const [
                categories,
                subcategories,
                sites,
                polygons,
                searchData,
                apps,
                alerts,
                events,
                notifications,
            ] = await Promise.all([
                getAllData(STORES.CATEGORIES),
                getAllData(STORES.SUBCATEGORIES),
                getAllData(STORES.SITES),
                getAllData(STORES.POLYGONS),
                getAllData(STORES.SEARCH_DATA),
                getAllData(STORES.APPS),
                getAllData(STORES.ALERTS),
                getAllData(STORES.EVENTS),
                getAllData(STORES.NOTIFICATIONS),
            ]);

            return {
                categories,
                subcategories,
                sites,
                polygons,
                searchData,
                apps,
                alerts,
                events,
                notifications,
            };
        } catch (error) {
            console.error('Error loading data from IndexedDB:', error);
            throw error;
        }
    }

    // ============================================================================
    // SAVE ALL STATIC DATA FROM data.js
    // ============================================================================

    async function saveAllStaticData(staticData) {
        try {
            console.log('Saving all static data to IndexedDB...');

            const results = await Promise.all([
                staticData.categories
                    ? saveCategories(staticData.categories)
                    : Promise.resolve(0),
                staticData.subcategories
                    ? saveSubcategories(staticData.subcategories)
                    : Promise.resolve(0),
                staticData.sites ? saveSites(staticData.sites) : Promise.resolve(0),
                staticData.polygons
                    ? savePolygons(staticData.polygons)
                    : Promise.resolve(0),
                staticData.searchData
                    ? saveSearchData(staticData.searchData)
                    : Promise.resolve(0),
                staticData.apps ? saveApps(staticData.apps) : Promise.resolve(0),
                staticData.alertsData
                    ? saveAlerts(staticData.alertsData)
                    : Promise.resolve(0),
                staticData.eventsData
                    ? saveEvents(staticData.eventsData)
                    : Promise.resolve(0),
                staticData.notificationsData
                    ? saveNotifications(staticData.notificationsData)
                    : Promise.resolve(0),
            ]);

            // Save metadata about last update
            await putData(STORES.METADATA, {
                key: 'lastUpdate',
                timestamp: new Date().toISOString(),
                counts: {
                    categories: results[0],
                    subcategories: results[1],
                    sites: results[2],
                    polygons: results[3],
                    searchData: results[4],
                    apps: results[5],
                    alerts: results[6],
                    events: results[7],
                    notifications: results[8],
                },
            });

            console.log('All static data saved successfully');
            return results;
        } catch (error) {
            console.error('Error saving static data:', error);
            throw error;
        }
    }

    // ============================================================================
    // CHECK IF DATA EXISTS
    // ============================================================================

    async function hasData() {
        try {
            const metadata = await getData(STORES.METADATA, 'lastUpdate');
            if (!metadata) return false;

            const sitesCount = await getAllData(STORES.SITES);
            return sitesCount && sitesCount.length > 0;
        } catch (error) {
            console.error('Error checking for data:', error);
            return false;
        }
    }

    // ============================================================================
    // QUERY HELPERS
    // ============================================================================

    function getDataByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function getSitesByCategory(categoryId) {
        return getDataByIndex(STORES.SITES, 'category', categoryId);
    }

    function getSitesBySubcategory(subcategoryId) {
        return getDataByIndex(STORES.SITES, 'subcategory', subcategoryId);
    }

    function getSitesByStatus(status) {
        return getDataByIndex(STORES.SITES, 'status', status);
    }

    function getSubcategoriesByCategory(categoryId) {
        return getDataByIndex(STORES.SUBCATEGORIES, 'categoryId', categoryId);
    }

    function getPolygonBySite(siteId) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction([STORES.POLYGONS], 'readonly');
            const store = transaction.objectStore(STORES.POLYGONS);
            const index = store.index('site');
            const request = index.get(siteId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // DATABASE UTILITIES
    // ============================================================================

    function clearAllData() {
        return Promise.all([
            clearStore(STORES.CATEGORIES),
            clearStore(STORES.SUBCATEGORIES),
            clearStore(STORES.SITES),
            clearStore(STORES.POLYGONS),
            clearStore(STORES.SEARCH_DATA),
            clearStore(STORES.APPS),
            clearStore(STORES.ALERTS),
            clearStore(STORES.EVENTS),
            clearStore(STORES.NOTIFICATIONS),
            clearStore(STORES.METADATA),
        ]);
    }

    function deleteDatabase() {
        return new Promise((resolve, reject) => {
            if (db) {
                db.close();
                db = null;
                isInitialized = false;
            }

            const request = indexedDB.deleteDatabase(DB_NAME);

            request.onsuccess = () => {
                console.log('Database deleted successfully');
                resolve();
            };

            request.onerror = () => {
                console.error('Error deleting database:', request.error);
                reject(request.error);
            };
        });
    }

    async function getMetadata() {
        return getData(STORES.METADATA, 'lastUpdate');
    }

    // ============================================================================
    // WINDOW EXPORTS
    // ============================================================================

    window.BCDADatabase = {
        // Initialization
        initDB,
        isInitialized: () => isInitialized,

        // Generic operations
        addData,
        putData,
        getData,
        getAllData,
        deleteData,
        clearStore,
        bulkPutData,

        // Specific save operations
        saveCategories,
        saveSubcategories,
        saveSites,
        savePolygons,
        saveSearchData,
        saveApps,
        saveAlerts,
        saveEvents,
        saveNotifications,

        // Load operations
        loadAllData,
        saveAllStaticData,
        hasData,

        // Query operations
        getDataByIndex,
        getSitesByCategory,
        getSitesBySubcategory,
        getSitesByStatus,
        getSubcategoriesByCategory,
        getPolygonBySite,

        // Utilities
        clearAllData,
        deleteDatabase,
        getMetadata,

        // Constants
        STORES,
    };

    console.log('BCDADatabase module loaded');
})();
