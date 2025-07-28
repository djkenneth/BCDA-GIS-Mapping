document.addEventListener('DOMContentLoaded', function() {
    // Get monitoring interface elements
    const systemMonitoringBtn = document.getElementById('systemMonitoringBtn');
    const monitoringInterface = document.getElementById('full-screen-monitoring');
    const closeMonitoringBtn = document.getElementById('close-monitoring-btn');
    const tabs = document.querySelectorAll('.monitoring-tabs .tab');
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    // Handle button click to show monitoring interface
    if (systemMonitoringBtn) {
        systemMonitoringBtn.addEventListener('click', function() {
            console.log("Monitoring button clicked");
            showMonitoringInterface();
        });
    } else {
        console.error("systemMonitoringBtn not found in the DOM");
    }
    
    // Handle close button
    if (closeMonitoringBtn) {
        closeMonitoringBtn.addEventListener('click', function() {
            monitoringInterface.style.display = 'none';
        });
    }
    
    // Handle tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // In a real app, you would show/hide content based on the selected tab
            const tabCategory = this.getAttribute('data-tab');
            console.log('Selected tab:', tabCategory);
        });
    });
    
    // Handle category filter buttons
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Toggle active class
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            console.log('Selected category filter:', this.textContent);
        });
    });
    
    // Show monitoring interface and initialize
    function showMonitoringInterface() {
        console.log("Showing monitoring interface");
        
        // Make sure the interface exists before trying to show it
        if (!monitoringInterface) {
            console.error("Monitoring interface element not found");
            return;
        }
        
        // Position the interface based on header state
        positionMonitoringInterface();
        
        // Show the interface
        monitoringInterface.style.display = 'block';
        
        // Set up observers to reposition interface when relevant elements change
        setupObservers();
    }
    
    // Set up mutation observers for header and sidebar changes
    function setupObservers() {
        // Monitor header changes (collapsed/expanded)
        const header = document.querySelector('header');
        if (header) {
            const headerObserver = new MutationObserver(function(mutations) {
                positionMonitoringInterface();
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
                positionMonitoringInterface();
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
                positionMonitoringInterface();
            });
            
            sidebarContentObserver.observe(sidebarContent, { 
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
    
    // Position monitoring interface based on header and sidebar state
function positionMonitoringInterface() {
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content.visible');
    
    // Default positioning
    let topPosition = '284px'; // Current default
    let leftPosition = '60px';  // Current default
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
                topPosition = '244px'; // Changed from 284px to 244px
            }
        }
        
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '330px'; // Changed from 360px to 330px
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
                topPosition = '284px'; // Keep original for desktop
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
    if (monitoringInterface) {
        monitoringInterface.style.top = topPosition;
        monitoringInterface.style.left = leftPosition;
        monitoringInterface.style.right = rightPosition;
        monitoringInterface.style.bottom = bottomPosition;
    }
}
    
    // Initialize responsive behavior
    window.addEventListener('resize', function() {
        if (monitoringInterface && monitoringInterface.style.display !== 'none') {
            positionMonitoringInterface();
        }
    });
    
    // Initialize any charts or real-time data updates here
    function initCharts() {
        console.log('Initializing charts and real-time data...');
        // Add chart initialization logic here
        // Example: initialize Chart.js charts, update progress bars, etc.
    }
    
    // Update metrics periodically (example for real-time updates)
    function updateMetrics() {
        // Example: Update system performance metrics
        const uptimeElement = document.querySelector('[data-metric="uptime"]');
        const slaElement = document.querySelector('[data-metric="sla"]');
        const responseTimeElement = document.querySelector('[data-metric="response-time"]');
        
        // In a real application, you would fetch this data from an API
        if (uptimeElement) {
            // Update uptime percentage
        }
        
        if (slaElement) {
            // Update SLA compliance rate
        }
        
        if (responseTimeElement) {
            // Update average response time
        }
        
        console.log('Metrics updated');
    }
    
    // Initialize metrics updates when monitoring interface is shown
    let metricsInterval;
    
    function startMetricsUpdates() {
        // Update metrics every 30 seconds
        metricsInterval = setInterval(updateMetrics, 30000);
        console.log('Started metrics updates');
    }
    
    function stopMetricsUpdates() {
        if (metricsInterval) {
            clearInterval(metricsInterval);
            metricsInterval = null;
            console.log('Stopped metrics updates');
        }
    }
    
    // Enhanced show function with metrics updates
    function showMonitoringInterfaceWithUpdates() {
        showMonitoringInterface();
        initCharts();
        startMetricsUpdates();
    }
    
    // Enhanced close function
    function closeMonitoringInterface() {
        if (monitoringInterface) {
            monitoringInterface.style.display = 'none';
            stopMetricsUpdates();
        }
    }
    
    // Update the close button event listener
    if (closeMonitoringBtn) {
        closeMonitoringBtn.removeEventListener('click', function() {
            monitoringInterface.style.display = 'none';
        });
        closeMonitoringBtn.addEventListener('click', closeMonitoringInterface);
    }
    
    // Update the main button event listener
    if (systemMonitoringBtn) {
        systemMonitoringBtn.removeEventListener('click', function() {
            showMonitoringInterface();
        });
        systemMonitoringBtn.addEventListener('click', showMonitoringInterfaceWithUpdates);
    }
    
    // Handle visibility change to pause/resume updates
    document.addEventListener('visibilitychange', function() {
        if (monitoringInterface && monitoringInterface.style.display !== 'none') {
            if (document.hidden) {
                stopMetricsUpdates();
            } else {
                startMetricsUpdates();
            }
        }
    });

});