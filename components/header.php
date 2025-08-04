<header>
    <div class="nav-bar">
        <a href="javascript:history.back()">
            <div class="logo-wrapper">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/dof-logo.png' : 'assets/dof-logo.png'; ?>" alt="dict logo" class="logo" />
                <div class="logo-content">
                    <p class="logo-title">Department of Finance</p>
                    <p class="logo-subtitle">Asset and Property Management</p>
                </div>
            </div>
        </a>

        <div class="flex items-center w-4/5">
            <div class="flex w-full">
                <!-- <div class="flex-1 desktop-metrics emergency-contacts-section">
                    <p class="text-sm text-accent-custom mb-2">Emergency Contacts</p>
                    <div class="emergency-grid">
                        <div class="emergency-contact">
                            <div class="emergency-number">117</div>
                            <div class="emergency-label">Police</div>
                        </div>
                        <div class="emergency-contact">
                            <div class="emergency-number">160</div>
                            <div class="emergency-label">Fire</div>
                        </div>
                        <div class="emergency-contact">
                            <div class="emergency-number">161</div>
                            <div class="emergency-label">Medical</div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 desktop-metrics public-alerts-section">
                    <p class="text-sm text-accent-custom mb-2">Public Alerts</p>
                    <div class="alerts-container" id="alerts-container">
                        <div class="alert-item alert-construction">
                            <span class="alert-icon"></span>
                            <span class="alert-text">Construction: Escario Street</span>
                        </div>
                        <div class="alert-item alert-closure">
                            <span class="alert-icon"></span>
                            <span class="alert-text">Road closure: IT Park area</span>
                        </div>
                        <div class="alert-item alert-weather">
                            <span class="alert-icon"></span>
                            <span class="alert-text">Weather alert: Heavy rainfall</span>
                        </div>
                    </div>
                </div>

                <div class="flex-1 desktop-metrics city-events-section">
                    <p class="text-sm text-accent-custom mb-2">City Events</p>
                    <div class="events-container">
                    </div>
                    <div class="no-events-message" style="display: none;">
                        <div class="no-events-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <p>No upcoming events</p>
                        <p style="font-size: 11px; color: rgba(255, 255, 255, 0.5);">Check back later for updates</p>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="icons">
            <div class="icon relative" id="bell-icon">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/bell-icon.png' : 'assets/bell-icon.png'; ?>" alt="Bell icon" class="bell-icon" style="width: 20px;">
            </div>

            <div class="icon" id="app-switcher-icon">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/app-switcher-icon.png' : 'assets/app-switcher-icon.png'; ?>" alt="App Switcher icon" class="switcher-icon" />
            </div>
            <div class="icon" id="search-icon">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/search-icon.png' : 'assets/search-icon.png'; ?>" alt="Search icon" class="switcher-icon" />
            </div>
        </div>
    </div>

    <!-- Search bar will be inserted here by JavaScript -->

    <div class="header-buttons-container">
        <button class="header-button" id="addEquipmentBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/infrastructure.php' : 'components/icons/infrastructure.php'; ?>
            <span>Add New Infrastructure</span>
        </button>
        <button class="header-button" id="viewAllAlertsBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/critical-alerts.php' : 'components/icons/critical-alerts.php'; ?>
            <span>View Alerts</span>
        </button>
        <button class="header-button" id="systemMonitoringBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/active-towers.php' : 'components/icons/active-towers.php'; ?>
            <span>Infrastructure Monitoring</span>
        </button>
        <button class="header-button" id="issueReportBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/active-alerts.php' : 'components/icons/active-alerts.php'; ?>
            <span>Issue Report</span>
        </button>
    </div>
</header>

<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? "../script/header.js" : 'script/header.js'; ?>"></script>