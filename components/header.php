<header>
    <div class="nav-bar">
        <a href="javascript:history.back()">
            <div class="logo-wrapper">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/dof-logo.png' : 'assets/dof-logo.png'; ?>" alt="dict logo" class="logo" />
                <div class="logo-content">
                    <!-- <p class="logo-title">Bases Conversion and Developement Authority</p> -->
                    <p class="logo-title">BCDA</p>
                    <p class="logo-subtitle">GIS Mapping System</p>
                </div>
            </div>
        </a>

        <div class="flex items-center w-4/5">
            <div class="flex w-full">
                <!-- Dashboard Cards Section -->
                <div class="header-cards-container">
                    <!-- Total Asset Value Card -->
                    <div class="header-card" data-card="asset-value">
                        <div class="card-header">
                            <h3>TOTAL ASSET VALUE</h3>
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="header-card-content">
                            <div class="main-value">₱8.5B</div>
                            <div class="sub-text">
                                <span class="increase">↑ 12.5% from last year</span>
                            </div>
                        </div>
                        <div class="card-dropdown">
                            <div class="dropdown-content">
                                <div class="breakdown-item">
                                    <div class="item-icon buildings"></div>
                                    <span class="item-label">Buildings & Facilities</span>
                                    <span class="item-value">₱3.2B</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon land"></div>
                                    <span class="item-label">Land Holdings</span>
                                    <span class="item-value">₱2.8B</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon vehicle"></div>
                                    <span class="item-label">Vehicle Fleet</span>
                                    <span class="item-value">₱890M</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon tech"></div>
                                    <span class="item-label">IT & Technology</span>
                                    <span class="item-value">₱1.1B</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon equipment"></div>
                                    <span class="item-label">Specialized Equipment</span>
                                    <span class="item-value">₱510M</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Maintenance Compliance Card -->
                    <div class="header-card" data-card="maintenance">
                        <div class="card-header">
                            <h3>MAINTENANCE COMPLIANCE</h3>
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="header-card-content">
                            <div class="main-value compliance">94.7%</div>
                            <div class="sub-text">
                                <span class="warning">⚠ 847 assets pending</span>
                            </div>
                        </div>
                        <div class="card-dropdown">
                            <div class="dropdown-content">
                                <div class="breakdown-item">
                                    <div class="item-icon on-schedule"></div>
                                    <span class="item-label">On Schedule</span>
                                    <span class="item-value">14,256</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon due-week"></div>
                                    <span class="item-label">Due This Week</span>
                                    <span class="item-value">423</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon due-month"></div>
                                    <span class="item-label">Due This Month</span>
                                    <span class="item-value">291</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon overdue"></div>
                                    <span class="item-label">Overdue</span>
                                    <span class="item-value">133</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon no-schedule"></div>
                                    <span class="item-label">No Schedule Set</span>
                                    <span class="item-value">744</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Document Coverage Card -->
                    <div class="header-card" data-card="documents">
                        <div class="card-header">
                            <h3>DOCUMENT COVERAGE</h3>
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="header-card-content">
                            <div class="main-value documents">89%</div>
                            <div class="sub-text">
                                <span class="missing">📄 1,745 missing docs</span>
                            </div>
                        </div>
                        <div class="card-dropdown">
                            <div class="dropdown-content">
                                <div class="breakdown-item">
                                    <div class="item-icon fully-doc"></div>
                                    <span class="item-label">Fully Documented</span>
                                    <span class="item-value">14,102</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon title-deeds"></div>
                                    <span class="item-label">Title Deeds</span>
                                    <span class="item-value">3,245 / 3,456</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon maintenance-records"></div>
                                    <span class="item-label">Maintenance Records</span>
                                    <span class="item-value">12,890 / 15,847</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon asset-photos"></div>
                                    <span class="item-label">Asset Photos</span>
                                    <span class="item-value">13,567 / 15,847</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon warranties"></div>
                                    <span class="item-label">Warranties</span>
                                    <span class="item-value">7,234 / 8,967</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Critical Alerts Card -->
                    <div class="header-card" data-card="alerts">
                        <div class="card-header">
                            <h3>CRITICAL ALERTS</h3>
                            <div class="dropdown-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="header-card-content">
                            <div class="main-value alerts">12</div>
                            <div class="sub-text">
                                <span class="warning">⚠ 45 pending reviews</span>
                            </div>
                        </div>
                        <div class="card-dropdown">
                            <div class="dropdown-content">
                                <div class="breakdown-item">
                                    <div class="item-icon emergency"></div>
                                    <span class="item-label">Emergency Maintenance</span>
                                    <span class="item-value">3</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon budget"></div>
                                    <span class="item-label">Budget Overruns</span>
                                    <span class="item-value">2</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon expired"></div>
                                    <span class="item-label">Expired Contracts</span>
                                    <span class="item-value">4</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon security"></div>
                                    <span class="item-label">Security Issues</span>
                                    <span class="item-value">3</span>
                                </div>
                                <div class="breakdown-item">
                                    <div class="item-icon pending-approvals"></div>
                                    <span class="item-label">Pending Approvals</span>
                                    <span class="item-value">45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            <span>Upload Documents</span>
        </button>
        <button class="header-button" id="addEquipmentBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/infrastructure.php' : 'components/icons/infrastructure.php'; ?>
            <span>Register New Asstes</span>
        </button>
        <!-- <button class="header-button" id="viewAllAlertsBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/critical-alerts.php' : 'components/icons/critical-alerts.php'; ?>
            <span>View Alerts</span>
        </button> -->
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