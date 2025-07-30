document.addEventListener('DOMContentLoaded', function() {
    // Get alert interface elements
    const viewAllAlertsBtn = document.getElementById('viewAllAlertsBtn');
    const alertsInterface = document.getElementById('full-screen-alerts-interface');
    const closeAlertsBtn = document.getElementById('close-alerts-btn');
    const alertsTableBody = document.getElementById('alerts-table-body');
    const tabs = document.querySelectorAll('.tab');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    

    
    // Pagination state
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;
    let filteredAlerts = [];
    
    
    // Handle button click to show alerts interface
    if (viewAllAlertsBtn) {
        viewAllAlertsBtn.addEventListener('click', function() {
            // Show the interface when button is clicked
            showAlertsInterface();
        });
    } else {
        // Log error if button not found, but don't automatically show interface
        console.log('View All Alerts button not found');
    }
    
    // Handle close button
    if (closeAlertsBtn) {
        closeAlertsBtn.addEventListener('click', function() {
            alertsInterface.style.display = 'none';
        });
    }
    
    // Handle tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter alerts based on tab
            const tabCategory = this.getAttribute('data-tab');
            filterAlertsByTab(tabCategory);
        });
    });
    
    // Handle filter button click
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    // Handle pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayAlertsForCurrentPage();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayAlertsForCurrentPage();
            }
        });
    }
    
    // Show alerts interface and load data
    function showAlertsInterface() {
        // Make sure the interface is visible regardless of previous state
        if (alertsInterface) {
            // Position the interface based on header state
            positionAlertsInterface();
            
            // Show the interface
            alertsInterface.style.display = 'block';
            
            // Load alert data
            loadAlertData();
            
            // Set up observers to reposition interface when relevant elements change
            setupObservers();
        } else {
            console.error('Alerts interface element not found');
        }
    }
    
    // Set up mutation observers for header and sidebar changes
    function setupObservers() {
        // Monitor header changes (collapsed/expanded)
        const header = document.querySelector('header');
        if (header) {
            const headerObserver = new MutationObserver(function(mutations) {
                positionAlertsInterface();
            });
            
            headerObserver.observe(header, { 
                attributes: true, 
                attributeFilter: ['class']
            });
        }
        
        // Monitor sidebar changes (collapsed/expanded)
        const sidebar = document.querySelector('.sidebar-v2');
        if (sidebar) {
            const sidebarObserver = new MutationObserver(function(mutations) {
                positionAlertsInterface();
            });
            
            sidebarObserver.observe(sidebar, { 
                attributes: true,
                attributeFilter: ['class']
            });
        }
        
        // Monitor sidebar content panel open/close
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            const sidebarContentObserver = new MutationObserver(function(mutations) {
                positionAlertsInterface();
            });
            
            sidebarContentObserver.observe(sidebarContent, { 
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
function positionAlertsInterface() {
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content.visible');
    
    // Default positioning
    let topPosition = '283px'; // Current default
    let leftPosition = '330px'; // Current default
    let rightPosition = '0';
    let bottomPosition = '0';
    
    // Check if we're in mobile view
    if (window.matchMedia('(max-width: 768px)').matches) {
        // Mobile view - take full screen
        topPosition = '0';
        leftPosition = '0';
        rightPosition = '0';
        bottomPosition = '0';
    } else if (window.matchMedia('(max-width: 1024px) and (min-width: 769px)').matches) {
        // ADD THIS NEW TABLET SECTION
        if (header) {
            if (header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '244px'; // Changed from 283px to 244px
            }
        }
        
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '330px'; // Keep as 330px (already correct)
            } else {
                leftPosition = '60px';
            }
        }
    } else {
        // Desktop view - adjust based on header and sidebar state
        
        // Check header state
        if (header) {
            if (header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '283px'; // Keep original for desktop
            }
        }
        
        // Check sidebar state
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '360px'; // Keep original for desktop
            } else {
                leftPosition = '60px';
            }
        }
    }
    
    // Apply the calculated positions
    if (alertsInterface) {
        alertsInterface.style.top = topPosition;
        alertsInterface.style.left = leftPosition;
        alertsInterface.style.right = rightPosition;
        alertsInterface.style.bottom = bottomPosition;
    }
}
    // Load alert data
    function loadAlertData() { 
        // This would typically be fetched from an API
        // For this example, we'll use mock data
        const alerts = getMockAlertData();
        
        // Store all alerts
        filteredAlerts = [...alerts];
        
        // Update summary cards
        updateSummaryCards(alerts);
        
        // Display alerts on the page
        displayAlerts(alerts);
    }
    
    // Update summary cards with alert counts
    function updateSummaryCards(alerts) {
        const totalAlertsEl = document.getElementById('total-alerts');
        const criticalAlertsEl = document.getElementById('critical-alerts');
        const warningAlertsEl = document.getElementById('warning-alerts');
        const activeAlertsEl = document.getElementById('normal-alerts');
        
        if (totalAlertsEl) totalAlertsEl.textContent = alerts.length;
        
        const criticalCount = alerts.filter(a => a.status === 'critical').length;
        const warningCount = alerts.filter(a => a.status === 'warning').length;
        const activeCount = alerts.filter(a => a.status === 'normal' || a.status === 'active').length;
        
        if (criticalAlertsEl) criticalAlertsEl.textContent = criticalCount;
        if (warningAlertsEl) warningAlertsEl.textContent = warningCount;
        if (activeAlertsEl) activeAlertsEl.textContent = activeCount;
    }
    
    // Display alerts in the table
    function displayAlerts(alerts) {
        // Reset pagination
        currentPage = 1;
        totalPages = Math.ceil(alerts.length / itemsPerPage);
        
        // Store filtered alerts
        filteredAlerts = alerts;
        
        // Display alerts for current page
        displayAlertsForCurrentPage();
        
        // Update pagination info
        updatePaginationInfo();
    }
    
    // Display alerts for current page
    function displayAlertsForCurrentPage() {
        if (!alertsTableBody) {
            console.error('Alerts table body element not found');
            return;
        }
        
        // Clear the table body
        alertsTableBody.innerHTML = '';
        
        // Calculate start and end index for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredAlerts.length);
        
        // Get alerts for current page
        const currentAlerts = filteredAlerts.slice(startIndex, endIndex);
        
        // If no alerts match the filters
        if (currentAlerts.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="8" style="text-align: center; padding: 30px;">
                    No alerts match your current filters.
                </td>
            `;
            alertsTableBody.appendChild(emptyRow);
        } else {
            // Add alert rows to the table
            currentAlerts.forEach(alert => {
                const row = document.createElement('tr');
                
                // Determine priority class
                let priorityClass = 'priority-medium';
                if (alert.priority === 'high') {
                    priorityClass = 'priority-high';
                } else if (alert.priority === 'low') {
                    priorityClass = 'priority-low';
                }
                
                // Determine status badge class
                let statusClass = '';
                let statusColor = '';
                let statusText = '';
                
                // Updated status classes to match the provided color scheme
                switch(alert.status) {
                    case 'active':
                    case 'normal': // Map 'normal' to 'active'
                        statusClass = 'badge-active';
                        statusColor = '#4CAF50'; // Active - Green
                        statusText = 'Active';
                        break;
                    case 'warning':
                        statusClass = 'badge-warning';
                        statusColor = '#8C6D0F'; // Warning - Dark yellow
                        statusText = 'Warning';
                        break;
                    case 'critical':
                        statusClass = 'badge-critical';
                        statusColor = '#8D2C24'; // Critical - Dark red
                        statusText = 'Critical';
                        break;
                    case 'maintenance':
                        statusClass = 'badge-maintenance';
                        statusColor = '#EAD353'; // Maintenance - Yellow
                        statusText = 'Maintenance';
                        break;
                    case 'inactive':
                    case 'resolved': // Map 'resolved' to 'inactive'
                        statusClass = 'badge-inactive';
                        statusColor = '#3C3C46'; // Inactive - Dark gray
                        statusText = 'Inactive';
                        break;
                    default:
                        statusClass = 'badge-active';
                        statusColor = '#4CAF50'; // Default to Active/Green
                        statusText = 'Active';
                }
                
                // Create the row HTML
                row.innerHTML = `
                    <td><span class="priority-indicator ${priorityClass}"></span></td>
                    <td>${alert.id}</td>
                    <td>${alert.description}</td>
                    <td>${alert.location}</td>
                    <td>${alert.category}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>${alert.time}</td>
                    <td class="actions">
                        <button class="action-button">View</button>
                        ${alert.status !== 'resolved' && alert.status !== 'inactive' ? '<button class="action-button">Assign</button>' : ''}
                        <button class="action-button">Report</button>
                    </td>
                `;
                
                alertsTableBody.appendChild(row);
            });
        }
        
        // Update pagination controls
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }
    
    // Update pagination info
    function updatePaginationInfo() {
        const pageStart = document.getElementById('page-start');
        const pageEnd = document.getElementById('page-end');
        const totalRecords = document.getElementById('total-records');
        
        if (pageStart && pageEnd && totalRecords) {
            const start = filteredAlerts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
            const end = Math.min(start + itemsPerPage - 1, filteredAlerts.length);
            
            pageStart.textContent = start;
            pageEnd.textContent = end;
            totalRecords.textContent = filteredAlerts.length;
        }
    }
    
    // Filter alerts based on tab
    function filterAlertsByTab(tabCategory) {    
        // Get all alerts
        const alerts = getMockAlertData();
        
        // If "all" tab is selected, show all alerts
        if (tabCategory === 'all') {
            displayAlerts(alerts);
            return;
        }
        
        // Filter alerts based on tab category
        const filtered = alerts.filter(alert => {
            return alert.category.toLowerCase().includes(tabCategory);
        });
        
        // Display filtered alerts
        displayAlerts(filtered);
    }
    
    // Apply filters from the form
    function applyFilters() {
        // Get filter values
        const priorityFilter = document.getElementById('priority-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;
        const locationFilter = document.getElementById('location-filter')?.value || 'all';
        const dateFromFilter = document.getElementById('date-from').value;
        const dateToFilter = document.getElementById('date-to').value;
        
        // Get all alerts
        const alerts = getMockAlertData();
        
        // Filter alerts based on selected criteria
        const filtered = alerts.filter(alert => {
            // Priority filter
            if (priorityFilter !== 'all' && alert.priority !== priorityFilter) {
                return false;
            }
            
            // Category filter
            if (categoryFilter !== 'all' && !alert.category.toLowerCase().includes(categoryFilter)) {
                return false;
            }
            
            // Location filter
            if (locationFilter !== 'all' && !alert.location.toLowerCase().includes(locationFilter)) {
                return false;
            }
            
            // Date filter - simplified for mock data
            // In a real app, you'd parse the date strings and compare actual dates
            
            return true;
        });
        
        // Display filtered alerts
        displayAlerts(filtered);
    }
    
    // Helper function to capitalize first letter
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Mock alert data function
    function getMockAlertData() {
        return [
            {
                id: 'ALT-2545',
                description: 'Flooding Risk - Water Level Rising',
                location: 'Guadalupe River Basin',
                category: 'Environmental Risk',
                status: 'critical',
                time: '14 May, 08:45 AM',
                priority: 'high'
            },
            {
                id: 'ALT-2544',
                description: 'Power Outage - Multiple Sectors',
                location: 'Lahug District',
                category: 'Infrastructure',
                status: 'critical',
                time: '14 May, 08:32 AM',
                priority: 'high'
            },
            {
                id: 'ALT-2542',
                description: 'Landslide Risk - Heavy Rainfall',
                location: 'Busay Highlands',
                category: 'Environmental Risk',
                status: 'critical',
                time: '14 May, 07:15 AM',
                priority: 'high'
            },
            {
                id: 'ALT-2541',
                description: 'Public WiFi Outage',
                location: 'Fuente Osmeña Circle',
                category: 'Internet Access',
                status: 'warning',
                time: '14 May, 06:54 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2540',
                description: 'Traffic Congestion - Road Closure',
                location: 'Colon Street Junction',
                category: 'Transportation',
                status: 'warning',
                time: '14 May, 06:22 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2539',
                description: 'Building Inspection Required',
                location: 'Cebu Provincial Capitol',
                category: 'Public Buildings',
                status: 'warning',
                time: '14 May, 05:48 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2538',
                description: 'Water Supply Pressure Low',
                location: 'Talisay District',
                category: 'Utilities',
                status: 'normal',
                time: '14 May, 05:30 AM',
                priority: 'low'
            },
            {
                id: 'ALT-2537',
                description: 'Public Park Lighting Maintenance',
                location: 'Plaza Independencia',
                category: 'Public Buildings',
                status: 'normal',
                time: '13 May, 09:15 PM',
                priority: 'low'
            },
            {
                id: 'ALT-2536',
                description: 'Bridge Structural Warning',
                location: 'Mactan Bridge',
                category: 'Infrastructure',
                status: 'resolved',
                time: '13 May, 04:17 PM',
                priority: 'high'
            },
            {
                id: 'ALT-2535',
                description: 'School Zone Traffic Signal Issue',
                location: 'Cebu Normal University',
                category: 'Transportation',
                status: 'resolved',
                time: '13 May, 02:40 PM',
                priority: 'medium'
            },
            {
                id: 'ALT-2534',
                description: 'Street Light Outage',
                location: 'Mabolo District',
                category: 'Infrastructure',
                status: 'normal',
                time: '13 May, 01:15 PM',
                priority: 'low'
            },
            {
                id: 'ALT-2533',
                description: 'Public Restroom Maintenance',
                location: 'Carbon Market',
                category: 'Public Buildings',
                status: 'normal',
                time: '13 May, 11:30 AM',
                priority: 'low'
            },
            {
                id: 'ALT-2532',
                description: 'Internet Connectivity Issues',
                location: 'Barangay Luz',
                category: 'Internet Access',
                status: 'warning',
                time: '13 May, 10:45 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2531',
                description: 'Drainage System Blockage',
                location: 'Mango Avenue',
                category: 'Infrastructure',
                status: 'warning',
                time: '13 May, 09:20 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2530',
                description: 'Traffic Light Malfunction',
                location: 'Jones Avenue',
                category: 'Transportation',
                status: 'warning',
                time: '13 May, 08:15 AM',
                priority: 'medium'
            },
            {
                id: 'ALT-2529',
                description: 'Power Fluctuation',
                location: 'Capitol Site',
                category: 'Infrastructure',
                status: 'normal',
                time: '13 May, 07:30 AM',
                priority: 'low'
            },
            {
                id: 'ALT-2528',
                description: 'Public WiFi Performance Degradation',
                location: 'IT Park',
                category: 'Internet Access',
                status: 'normal',
                time: '13 May, 06:45 AM',
                priority: 'low'
            },
            {
                id: 'ALT-2527',
                description: 'Water Main Leak',
                location: 'Banilad Area',
                category: 'Utilities',
                status: 'critical',
                time: '12 May, 09:15 PM',
                priority: 'high'
            },
            {
                id: 'ALT-2526',
                description: 'Fire Alarm System Maintenance',
                location: 'Ayala Center Cebu',
                category: 'Public Buildings',
                status: 'normal',
                time: '12 May, 08:30 PM',
                priority: 'low'
            },
            {
                id: 'ALT-2525',
                description: 'Air Quality Warning - Construction',
                location: 'Mandaue Bridge Area',
                category: 'Environmental Risk',
                status: 'warning',
                time: '12 May, 07:15 PM',
                priority: 'medium'
            },
        ];
    }
    
    // Initialize position listener for responsive updates
    window.addEventListener('resize', function() {
        if (alertsInterface && alertsInterface.style.display !== 'none') {
            positionAlertsInterface();
        }
    });
    
    // No auto-initialization - interface will only show when button is clicked
});