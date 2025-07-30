document.addEventListener('DOMContentLoaded', function() {
    
    const SELECTORS = {
        header: 'header',
        sidebar: '.sidebar-v2',
        sidebarContent: '.sidebar-content',
        headerToggle: '.header-toggle',
        filterCheckboxes: '.sidebar-content input[type="checkbox"]',
        liveFeedCard: '.live-feed-card',
        contentComponents: [
            '#full-screen-infrastructure-form',
            '#full-screen-monitoring',
            '#full-screen-issue-report-form',
            '#full-screen-alerts-interface',
            '#info-drawer',
            '#full-screen-locations-list',
            '.infrastructure-locations',
            '#list-all-infrastructure',
            '#sites-modal',  // Added sites modal to managed components
            '.search-bar-container'  // Added search bar container to managed components
        ],
        componentTriggers: {
            '#addEquipmentBtn': '#full-screen-infrastructure-form',
            '#systemMonitoringBtn': '#full-screen-monitoring',
            '#issueReportBtn': '#full-screen-issue-report-form',
            '#viewAllAlertsBtn': '#full-screen-alerts-interface'
        },
        infoDrawer: '#info-drawer',
        infoDrawerSections: {
            maintenanceHistory: '#maintenance-history-section',
            networkInfo: '#network-info-section',
            inspectionSection: '#inspection-section'
        }
    };
    
    let currentOpenComponent = null;
    let currentOpenDrawerSection = null;
    
    function init() {
        setupTriggerListeners();
        setupComponentCloseButtons();
        setupFilterCheckboxes();
        setupLiveFeedCard();
        setupInfoDrawerAccordion();
        setupInfrastructureCardsIntegration(); // New setup for infrastructure cards
        observeHeaderAndSidebar();
        setupWindowResizeHandler();
    }
    
    // New function to integrate infrastructure cards modal with panel manager
    function setupInfrastructureCardsIntegration() {
        // Listen for infrastructure card clicks to manage the sites modal
        document.addEventListener('click', function(e) {
            const infrastructureCard = e.target.closest('.infra-card');
            if (infrastructureCard) {
                // Close any existing components before opening sites modal
                if (currentOpenComponent && currentOpenComponent !== '#sites-modal') {
                    closeComponent(currentOpenComponent);
                }
                
                // Set up observer to detect when sites modal is created and opened
                setTimeout(() => {
                    const sitesModal = document.querySelector('#sites-modal');
                    if (sitesModal && sitesModal.style.display === 'block') {
                        currentOpenComponent = '#sites-modal';
                        positionComponent(sitesModal);
                        setupSitesModalCloseListener();
                    }
                }, 100);
            }
        });
        
        // Set up observer for sites modal creation
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.id === 'sites-modal') {
                        setupSitesModalCloseListener();
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true });
    }
    
    function setupSitesModalCloseListener() {
        const sitesModal = document.querySelector('#sites-modal');
        if (!sitesModal) return;
        
        const closeBtn = sitesModal.querySelector('#sites-modal-close');
        if (closeBtn) {
            // Remove existing listener to prevent duplicates
            closeBtn.removeEventListener('click', handleSitesModalClose);
            closeBtn.addEventListener('click', handleSitesModalClose);
        }
    }
    
    function handleSitesModalClose() {
        closeComponent('#sites-modal');
    }
    
    function setupTriggerListeners() {
        Object.entries(SELECTORS.componentTriggers).forEach(([triggerSelector, componentSelector]) => {
            const trigger = document.querySelector(triggerSelector);
            
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    openComponent(componentSelector);
                });
            }
        });
        
        document.addEventListener('click', function(e) {
            const mapMarker = e.target.closest('.leaflet-marker-icon');
            if (mapMarker) {
                setTimeout(() => {
                    const drawer = document.querySelector('#info-drawer');
                    if (drawer && drawer.classList.contains('open')) {
                        // Close sites modal if open when opening info drawer
                        if (currentOpenComponent === '#sites-modal') {
                            closeComponent('#sites-modal');
                        }
                        
                        currentOpenComponent = '#info-drawer';
                        
                        const liveFeedCard = document.querySelector(SELECTORS.liveFeedCard);
                        if (liveFeedCard && liveFeedCard.style.display === 'block') {
                            addSecondaryComponentListener(liveFeedCard);
                        }
                    }
                }, 100);
            }
        });
    }
    
    function setupComponentCloseButtons() {
        SELECTORS.contentComponents.forEach(selector => {
            const components = document.querySelectorAll(selector);
            
            components.forEach(component => {
                if (!component) return;
                
                const closeButtons = component.querySelectorAll('.close-btn, .close-panel, [id$="-close"], [id$="close-btn"], .card-close-btn');
                
                closeButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        closeComponent(selector);
                    });
                });
            });
        });
    }
    
    function setupFilterCheckboxes() {
        const checkboxes = document.querySelectorAll(SELECTORS.filterCheckboxes);
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (currentOpenComponent && 
                    currentOpenComponent !== '.sidebar-content' && 
                    !currentOpenComponent.includes('sidebar')) {
                    closeComponent(currentOpenComponent);
                }
                
                closeLiveFeedCard();
                closeInfrastructureLocations();
                
                if (typeof window.applyCebuFilter === 'function') {
                    window.applyCebuFilter();
                }
            });
        });
        
        const sidebarContent = document.querySelector(SELECTORS.sidebarContent);
        if (sidebarContent) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) {
                                const newCheckboxes = node.querySelectorAll('input[type="checkbox"]');
                                
                                newCheckboxes.forEach(checkbox => {
                                    checkbox.addEventListener('change', function() {
                                        if (currentOpenComponent && 
                                            currentOpenComponent !== '.sidebar-content' && 
                                            !currentOpenComponent.includes('sidebar')) {
                                            closeComponent(currentOpenComponent);
                                        }
                                        
                                        closeLiveFeedCard();
                                        closeInfrastructureLocations();
                                        
                                        if (typeof window.applyCebuFilter === 'function') {
                                            window.applyCebuFilter();
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            });
            
            observer.observe(sidebarContent, { childList: true, subtree: true });
        }
    }
    
    function setupLiveFeedCard() {
        const liveFeedCard = document.querySelector(SELECTORS.liveFeedCard);
        if (!liveFeedCard) return;
        
        const closeBtn = liveFeedCard.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeLiveFeedCard();
            });
        }
        
        const viewBtn = liveFeedCard.querySelector('#live-feed-view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                if (currentOpenComponent) {
                    closeComponent(currentOpenComponent);
                }
                closeLiveFeedCard();
            });
        }
    }
    
    function setupInfoDrawerAccordion() {
        // Add mutation observer for the info drawer to detect when it's opened
        const infoDrawer = document.querySelector(SELECTORS.infoDrawer);
        if (!infoDrawer) return;
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class' && infoDrawer.classList.contains('open')) {
                    setupInfoDrawerButtons();
                }
                
                if (mutation.type === 'childList') {
                    setupInfoDrawerButtons();
                }
            });
        });
        
        observer.observe(infoDrawer, { 
            attributes: true, 
            attributeFilter: ['class'],
            childList: true,
            subtree: true
        });
    }
    
    function setupInfoDrawerButtons() {
        // Setup accordion behavior for info drawer sections
        const maintenanceHistoryBtn = document.querySelector('#maintenance-history-btn');
        const networkInfoBtn = document.querySelector('#network-info-btn');
        const scheduleInspectionBtn = document.querySelector('#schedule-inspection-btn');
        
        if (maintenanceHistoryBtn) {
            maintenanceHistoryBtn.addEventListener('click', function() {
                toggleDrawerSection('#maintenance-history-section');
            });
        }
        
        if (networkInfoBtn) {
            networkInfoBtn.addEventListener('click', function() {
                toggleDrawerSection('#network-info-section');
            });
        }
        
        if (scheduleInspectionBtn) {
            scheduleInspectionBtn.addEventListener('click', function() {
                toggleDrawerSection('#inspection-section');
            });
        }
        
        // Handle action buttons in expanded view
        const viewDetailsBtn = document.querySelector('#view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                expandInfoDrawer();
            });
        }
        
        const viewLessBtn = document.querySelector('#view-less');
        if (viewLessBtn) {
            viewLessBtn.addEventListener('click', function() {
                collapseInfoDrawer();
            });
        }
        
        // Handle download report button
        const downloadReportBtn = document.querySelector('#download-report');
        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', function() {
                if (typeof generateSiteReport === 'function') {
                    // This function should be defined in filter-sidebar.js
                    const siteId = infoDrawer.getAttribute('data-tower-id');
                    if (siteId) {
                        const site = findSiteById(siteId);
                        const category = findCategoryBySite(site);
                        if (site && category) {
                            generateSiteReport(site, category);
                        }
                    }
                }
            });
        }
        
        // Setup form action buttons
        const scheduleBtn = document.querySelector('#schedule-btn');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', function() {
                alert("Inspection scheduled successfully!");
                toggleDrawerSection('#inspection-section', true); // Force close
            });
        }
        
        const cancelInspectionBtn = document.querySelector('#cancel-inspection-btn');
        if (cancelInspectionBtn) {
            cancelInspectionBtn.addEventListener('click', function() {
                toggleDrawerSection('#inspection-section', true); // Force close
            });
        }
    }
    
    function toggleDrawerSection(sectionSelector, forceClose = false) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;
        
        // Close all other sections
        Object.values(SELECTORS.infoDrawerSections).forEach(selector => {
            const otherSection = document.querySelector(selector);
            if (otherSection && otherSection !== section) {
                otherSection.style.display = 'none';
            }
        });
        
        if (forceClose || section.style.display === 'block') {
            section.style.display = 'none';
            currentOpenDrawerSection = null;
        } else {
            section.style.display = 'block';
            currentOpenDrawerSection = sectionSelector;
        }
    }
    
    function expandInfoDrawer() {
        const infoDrawer = document.querySelector(SELECTORS.infoDrawer);
        if (!infoDrawer) return;
        
        infoDrawer.classList.add('expanded');
        
        // Close any open sections to reset the view
        Object.values(SELECTORS.infoDrawerSections).forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.style.display = 'none';
            }
        });
        currentOpenDrawerSection = null;
    }
    
    function collapseInfoDrawer() {
        const infoDrawer = document.querySelector(SELECTORS.infoDrawer);
        if (!infoDrawer) return;
        
        infoDrawer.classList.remove('expanded');
        
        // Close any open sections
        Object.values(SELECTORS.infoDrawerSections).forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.style.display = 'none';
            }
        });
        currentOpenDrawerSection = null;
    }
    
    function findSiteById(siteId) {
        if (!window.mapMarkers) return null;
        
        for (const category of window.mapMarkers) {
            for (const site of category.sites) {
                if (site.id === siteId) {
                    return site;
                }
            }
        }
        return null;
    }
    
    function findCategoryBySite(site) {
        if (!site || !window.mapMarkers) return null;
        
        for (const category of window.mapMarkers) {
            if (category.sites.includes(site)) {
                return category;
            }
        }
        return null;
    }
    
    function openComponent(selector) {
        if (currentOpenComponent && currentOpenComponent !== selector) {
            closeComponent(currentOpenComponent);
        }
        
        if (selector !== SELECTORS.liveFeedCard) {
            closeLiveFeedCard();
        }
        
        if (!selector.includes('infrastructure-locations') && 
            !selector.includes('list-all-infrastructure') &&
            selector !== '#sites-modal') {
            closeInfrastructureLocations();
        }
        
        const component = document.querySelector(selector);
        if (!component) {
            console.error('Component not found:', selector);
            return;
        }
        
        positionComponent(component);
        
        if (selector === '#info-drawer') {
            component.classList.add('open');
        } else if (selector.includes('infrastructure-locations') || 
                  selector.includes('list-all-infrastructure')) {
            component.style.display = 'block';
            component.classList.add('visible');
        } else if (selector === '#sites-modal') {
            component.style.display = 'block';
            // Sites modal positioning is handled by positionComponent
        } else {
            component.style.display = 'block';
        }
        
        currentOpenComponent = selector;
        
        triggerComponentInit(selector);
    }
    
    function closeComponent(selector) {
        const component = document.querySelector(selector);
        if (!component) return;
        
        if (selector === '#info-drawer') {
            component.classList.remove('open');
            component.classList.remove('expanded');
            closeLiveFeedCard();
            
            // Close all drawer sections
            Object.values(SELECTORS.infoDrawerSections).forEach(sectionSelector => {
                const section = document.querySelector(sectionSelector);
                if (section) {
                    section.style.display = 'none';
                }
            });
            currentOpenDrawerSection = null;
        } else if (selector.includes('infrastructure-locations') || 
                  selector.includes('list-all-infrastructure')) {
            component.style.display = 'none';
            component.classList.remove('visible');
        } else if (selector === '#sites-modal') {
            component.style.display = 'none';
        } else {
            component.style.display = 'none';
        }
        
        if (currentOpenComponent === selector) {
            currentOpenComponent = null;
        }
    }
    
    function closeLiveFeedCard() {
        const liveFeedCard = document.querySelector(SELECTORS.liveFeedCard);
        if (!liveFeedCard) return;
        
        liveFeedCard.style.display = 'none';
        
        const videoElement = document.getElementById('live-feed-video-player');
        if (videoElement) {
            videoElement.pause();
            if (videoElement.src) {
                videoElement.src = '';
            }
        }
        
        if (window.liveFeedHlsPlayer) {
            try {
                window.liveFeedHlsPlayer.destroy();
                window.liveFeedHlsPlayer = null;
            } catch (e) {
                console.warn('Error destroying HLS player:', e);
            }
        }
        
        if (typeof window.liveFeedCardVisible !== 'undefined') {
            window.liveFeedCardVisible = false;
        }
        
        if (typeof window.hideLiveFeedCard === 'function') {
            window.hideLiveFeedCard();
        }
    }
    
    function closeInfrastructureLocations() {
        const locationsList = document.querySelectorAll('.infrastructure-locations, #full-screen-locations-list, #list-all-infrastructure');
        
        locationsList.forEach(list => {
            if (list) {
                list.style.display = 'none';
                list.classList.remove('visible');
                
                if (currentOpenComponent && 
                    (currentOpenComponent.includes('infrastructure-locations') || 
                     currentOpenComponent.includes('list-all-infrastructure') ||
                     currentOpenComponent === '#full-screen-locations-list')) {
                    currentOpenComponent = null;
                }
            }
        });
    }
    
    function addSecondaryComponentListener(component) {
        if (!component) return;
        
        const closeButtons = component.querySelectorAll('.close-btn');
        
        closeButtons.forEach(btn => {
            btn.removeEventListener('click', closeLiveFeedCard);
            btn.addEventListener('click', closeLiveFeedCard);
        });
    }
    
// In panel-manager.js, find the positionComponent function and update it:

function positionComponent(component) {
    if (!component) return;
    
    const header = document.querySelector(SELECTORS.header);
    const sidebar = document.querySelector(SELECTORS.sidebar);
    const sidebarContent = document.querySelector(`${SELECTORS.sidebarContent}.visible`);
    
    let topPosition = '284px';
    let leftPosition = '360px';
    let rightPosition = '0';
    let bottomPosition = '0';
    
    // Check screen width for responsive behavior
    const screenWidth = window.innerWidth;
    
    if (window.matchMedia('(max-width: 768px)').matches) {
        // Mobile view - take full screen
        topPosition = '0';
        leftPosition = '0';
        rightPosition = '0';
        bottomPosition = '0';
    } else if (window.matchMedia('(max-width: 1024px) and (min-width: 769px)').matches) {
        // Tablet view (769px to 1024px) - NEW POSITIONING LOGIC
        if (header && header.classList.contains('collapsed')) {
            topPosition = '0';
        } else {
            topPosition = '244px'; // Changed from 284px to 244px for tablet
        }
        
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '330px'; // Changed from 360px to 330px for tablet
            } else {
                leftPosition = '60px';
            }
        }
    } else {
        // Desktop view (above 1024px) - existing logic
        if (header && header.classList.contains('collapsed')) {
            topPosition = '0';
        }
        
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '360px';
            } else {
                leftPosition = '60px';
            }
        }
    }
    
    // Skip positioning for info drawer and live feed card (they have their own positioning)
    if (component.id === 'info-drawer' || 
        component.classList.contains('live-feed-card')) {
        return;
    }
    
    // Handle sites modal positioning - it should follow the same pattern as other managed components
    if (component.id === 'sites-modal') {
        component.style.top = topPosition;
        component.style.left = leftPosition;
        component.style.right = rightPosition;
        component.style.bottom = bottomPosition;
        component.style.position = 'fixed';
        component.style.zIndex = '6';
        return;
    }
    
    if (component.classList.contains('infrastructure-locations') || 
        component.id === 'full-screen-locations-list' || 
        component.id === 'list-all-infrastructure') {
        component.style.top = topPosition;
        component.style.left = leftPosition;
        component.style.right = rightPosition;
        component.style.bottom = bottomPosition;
        return;
    }
    
    if (component.hasAttribute('data-skip-positioning')) {
        return;
    }
    
    component.style.top = topPosition;
    component.style.left = leftPosition;
    component.style.right = rightPosition;
    component.style.bottom = bottomPosition;
}
    
    function triggerComponentInit(selector) {
        switch(selector) {
            case '#full-screen-monitoring':
                if (window.initCharts) {
                    window.initCharts();
                }
                break;
                
            case '#full-screen-alerts-interface':
                if (window.loadAlertData) {
                    window.loadAlertData();
                }
                break;
                
            case '#sites-modal':
                // Ensure sites modal is properly set up when opened through panel manager
                setupSitesModalCloseListener();
                break;
        }
    }
    
    function observeHeaderAndSidebar() {
        const header = document.querySelector(SELECTORS.header);
        if (header) {
            const headerObserver = new MutationObserver(handleStateChange);
            headerObserver.observe(header, { attributes: true, attributeFilter: ['class'] });
        }
        
        const sidebar = document.querySelector(SELECTORS.sidebar);
        if (sidebar) {
            const sidebarObserver = new MutationObserver(handleStateChange);
            sidebarObserver.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
            
            document.querySelectorAll(SELECTORS.sidebarContent).forEach(content => {
                const contentObserver = new MutationObserver(handleStateChange);
                contentObserver.observe(content, { attributes: true, attributeFilter: ['class'] });
            });
        }
    }
    
    function handleStateChange() {
        if (currentOpenComponent) {
            const component = document.querySelector(currentOpenComponent);
            if (component) {
                positionComponent(component);
            }
        }
        
        const locationsList = document.querySelectorAll('.infrastructure-locations, #full-screen-locations-list, #list-all-infrastructure');
        locationsList.forEach(list => {
            if (list && (list.style.display === 'block' || list.classList.contains('visible'))) {
                positionComponent(list);
            }
        });
        
        // Also handle sites modal repositioning
        const sitesModal = document.querySelector('#sites-modal');
        if (sitesModal && sitesModal.style.display === 'block') {
            positionComponent(sitesModal);
        }
    }
    
    function setupWindowResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(function() {
                if (currentOpenComponent) {
                    const component = document.querySelector(currentOpenComponent);
                    if (component) {
                        positionComponent(component);
                    }
                }
                
                const locationsList = document.querySelectorAll('.infrastructure-locations, #full-screen-locations-list, #list-all-infrastructure');
                locationsList.forEach(list => {
                    if (list && (list.style.display === 'block' || list.classList.contains('visible'))) {
                        positionComponent(list);
                    }
                });
                
                // Handle sites modal resize
                const sitesModal = document.querySelector('#sites-modal');
                if (sitesModal && sitesModal.style.display === 'block') {
                    positionComponent(sitesModal);
                }
            }, 250);
        });
    }
    
    window.interfaceCoordinator = {
        openComponent: openComponent,
        
        closeComponent: closeComponent,
        
        closeLiveFeedCard: closeLiveFeedCard,
        
        closeInfrastructureLocations: closeInfrastructureLocations,
        
        closeAllComponents: function() {
            if (currentOpenComponent) {
                closeComponent(currentOpenComponent);
            }
            
            closeLiveFeedCard();
            closeInfrastructureLocations();
        },
        
        getCurrentComponent: function() {
            return currentOpenComponent;
        },
        
        registerComponentTrigger: function(triggerSelector, componentSelector) {
            SELECTORS.componentTriggers[triggerSelector] = componentSelector;
            
            const trigger = document.querySelector(triggerSelector);
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    openComponent(componentSelector);
                });
            }
        },
        
        toggleDrawerSection: toggleDrawerSection,
        
        expandInfoDrawer: expandInfoDrawer,
        
        collapseInfoDrawer: collapseInfoDrawer,
        
        // New method to handle sites modal specifically
        openSitesModal: function() {
            openComponent('#sites-modal');
        },
        
        closeSitesModal: function() {
            closeComponent('#sites-modal');
        }
    };
    
    document.addEventListener('showLiveFeedCard', function(e) {
        const liveFeedCard = document.querySelector(SELECTORS.liveFeedCard);
        if (liveFeedCard) {
            liveFeedCard.style.display = 'block';
            if (typeof window.liveFeedCardVisible !== 'undefined') {
                window.liveFeedCardVisible = true;
            }
        }
    });
    
    init();
});