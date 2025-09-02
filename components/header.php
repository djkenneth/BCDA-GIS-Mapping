<header>
    <div class="nav-bar">
        <a href="javascript:history.back()">
            <div class="logo-wrapper">
                <img src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../assets/bcda-logo.png' : 'assets/bcda-logo.png'; ?>" alt="dict logo" class="logo" />
                <!-- <div class="logo-content">
                    <p class="logo-title">BCDA</p>
                    <p class="logo-subtitle">GIS Mapping System</p>
                </div> -->
            </div>
        </a>

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
            <span>STRATEGIC DASHBOARD</span>
        </button>
        <button class="header-button" id="viewAllAlertsBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/infrastructure.php' : 'components/icons/infrastructure.php'; ?>
            <span>PERFORMANCE ANALYTICS</span>
        </button>
        <!-- <button class="header-button" id="viewAllAlertsBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/critical-alerts.php' : 'components/icons/critical-alerts.php'; ?>
            <span>View Alerts</span>
        </button> -->
        <button class="header-button" id="systemMonitoringBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/active-towers.php' : 'components/icons/active-towers.php'; ?>
            <span>EXECUTIVE SUMMARY Report</span>
        </button>
        <button class="header-button" id="issueReportBtn">
            <?php include (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../components/icons/active-alerts.php' : 'components/icons/active-alerts.php'; ?>
            <span>Issue Report</span>
        </button>
    </div>
</header>

<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? "../script/header.js" : 'script/header.js'; ?>"></script>