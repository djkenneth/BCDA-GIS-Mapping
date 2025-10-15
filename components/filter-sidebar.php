<!-- components/filter-sidebar.php -->

<div class="sidebar">
    <div class="sidebar-tabs-v2">
        <div class="sidebar-tab-v2 active" data-tab="layers">
            <div class="icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <span>Features</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="zones">
            <div class="icon">
                <i class="fas fa-landmark"></i>
            </div>
            <span>Economic Zones</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="locators">
            <div class="icon">
                <i class="fas fa-building"></i>
            </div>
            <span>Locators</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="infrastructure">
            <div class="icon">
                <i class="fas fa-hammer"></i>
            </div>
            <span>Infrastructure</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="afp">
            <div class="icon">
                <i class="fas fa-shield-alt"></i>
            </div>
            <span>AFP Modernization</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="investments">
            <div class="icon">
                <i class="fas fa-chart-line"></i>
            </div>
            <span>Investments</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="sustainability">
            <div class="icon">
                <i class="fas fa-leaf"></i>
            </div>
            <span>Sustainability</span>
        </div>

        <!-- <div class="sidebar-tab-v2" style="margin-top: 2rem;" data-tab="alert-event">
            <i class="fas fa-calendar-days"></i>
            <span>Alert & Event</span>
        </div> -->
    </div>
</div>

<!-- Layers Panel -->
<div class="sidebar-content visible" id="layers-content">
    <div class="content-header">
        <h3>Map Features</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="layer-group">
        <div class="content-section">
            <div class="content-section-item">
                <div class="flex">
                    <input type="checkbox" id="all">
                    <label for="all">All</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="economic-zones">
                    <label for="economic-zones">Economic Zones</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="locator-management">
                    <label for="locator-management">Locator Management</label>
                </div>

            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="infrastructure-projects">
                    <label for="infrastructure-projects">Infrastructure Projects</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="afp-modernization">
                    <label for="afp-modernization">AFP Modernization</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="investment-tracking">
                    <label for="investment-tracking">Investment Tracking</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="sustainability-environment">
                    <label for="sustainability-environment">Sustainability & Environment</label>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Economic Zones Panel -->
<div class="sidebar-content" id="zones-content">
    <div class="content-header">
        <h3>Economic Zones</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        
        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="clark-freeport">Clark Freeport Zone</label>
                <span class="site-count" data-count="clark-freeport">0</span>
            </div>
            <div class="sites-dropdown" id="clark-freeport-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="new-clark-city">New Clark City</label>
                <span class="site-count" data-count="new-clark-city">0</span>
            </div>
            <div class="sites-dropdown" id="new-clark-city-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="bonifacio-global">Bonifacio Global City</label>
                <span class="site-count" data-count="bonifacio-global">0</span>
            </div>
            <div class="sites-dropdown" id="bonifacio-global-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="mckinley-hill">McKinley Hill</label>
                <span class="site-count" data-count="mckinley-hill">0</span>
            </div>
            <div class="sites-dropdown" id="mckinley-hill-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="newport-city">Newport City</label>
                <span class="site-count" data-count="newport-city">0</span>
            </div>
            <div class="sites-dropdown" id="newport-city-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="john-hay-zone">John Hay Special Economic Zone</label>
                <span class="site-count" data-count="john-hay-zone">0</span>
            </div>
            <div class="sites-dropdown" id="john-hay-zone-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="poro-point">Poro Point Freeport Zone</label>
                <span class="site-count" data-count="poro-point">0</span>
            </div>
            <div class="sites-dropdown" id="poro-point-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="bataan-tech">Bataan Technology Park</label>
                <span class="site-count" data-count="bataan-tech">0</span>
            </div>
            <div class="sites-dropdown" id="bataan-tech-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Locator Management Panel -->
<div class="sidebar-content" id="locators-content">
    <div class="content-header">
        <h3>Locator Management</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="bpo-it-services">BPO & IT Services</label>
                <span class="site-count" data-count="bpo-it-services">0</span>
            </div>
            <div class="sites-dropdown" id="bpo-it-services-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="manufacturing-logistics">Manufacturing & Logistics</label>
                <span class="site-count" data-count="manufacturing-logistics">0</span>
            </div>
            <div class="sites-dropdown" id="manufacturing-logistics-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="government-facilities">Government Facilities</label>
                <span class="site-count" data-count="government-facilities">0</span>
            </div>
            <div class="sites-dropdown" id="government-facilities-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="tourism-entertainment">Tourism & Entertainment</label>
                <span class="site-count" data-count="tourism-entertainment">0</span>
            </div>
            <div class="sites-dropdown" id="tourism-entertainment-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>

        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="aviation-aerospace">Aviation & Aerospace</label>
                <span class="site-count" data-count="aviation-aerospace">0</span>
            </div>
            <div class="sites-dropdown" id="aviation-aerospace-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Infrastructure Projects Panel -->
<div class="sidebar-content" id="infrastructure-content">
    <div class="content-header">
        <h3>Infrastructure Projects</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="sctex-corridor">SCTEX Corridor</label>
                <span class="site-count" data-count="sctex-corridor">0</span>
            </div>
            <div class="sites-dropdown" id="sctex-corridor-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="clark-airport">Clark International Airport</label>
                <span class="site-count" data-count="clark-airport">0</span>
            </div>
            <div class="sites-dropdown" id="clark-airport-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="ns-commuter-railway">North-South Commuter Railway</label>
                <span class="site-count" data-count="ns-commuter-railway">0</span>
            </div>
            <div class="sites-dropdown" id="ns-commuter-railway-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="metro-subway">Metro Manila Subway</label>
                <span class="site-count" data-count="metro-subway">0</span>
            </div>
            <div class="sites-dropdown" id="metro-subway-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="bgc-ortigas-bridge">BGC-Ortigas Link Bridge</label>
                <span class="site-count" data-count="bgc-ortigas-bridge">0</span>
            </div>
            <div class="sites-dropdown" id="bgc-ortigas-bridge-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="fiber-backbone">National Fiber Backbone</label>
                <span class="site-count" data-count="fiber-backbone">0</span>
            </div>
            <div class="sites-dropdown" id="fiber-backbone-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- AFP Modernization Panel - Updated Structure -->
<div class="sidebar-content" id="afp-content">
    <div class="content-header">
        <h3>AFP Modernization</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="paf-housing">Philippine Air Force Housing</label>
                <span class="site-count" data-count="paf-housing">0</span>
            </div>
            <div class="sites-dropdown" id="paf-housing-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="pmc-hq">Philippine Marine Corps HQ</label>
                <span class="site-count" data-count="pmc-hq">0</span>
            </div>
            <div class="sites-dropdown" id="pmc-hq-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="army-support">Army Support Command</label>
                <span class="site-count" data-count="army-support">0</span>
            </div>
            <div class="sites-dropdown" id="army-support-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="special-service">Special Service Center</label>
                <span class="site-count" data-count="special-service">0</span>
            </div>
            <div class="sites-dropdown" id="special-service-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="military-replication">Military Replication Projects</label>
                <span class="site-count" data-count="military-replication">0</span>
            </div>
            <div class="sites-dropdown" id="military-replication-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Investment Tracking Panel - Updated Structure -->
<div class="sidebar-content" id="investments-content">
    <div class="content-header">
        <h3>Investment Tracking</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="joint-venture">Joint Venture Projects</label>
                <span class="site-count" data-count="joint-venture">0</span>
            </div>
            <div class="sites-dropdown" id="joint-venture-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="asset-disposition">Asset Disposition</label>
                <span class="site-count" data-count="asset-disposition">0</span>
            </div>
            <div class="sites-dropdown" id="asset-disposition-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="revenue-monitoring">Revenue Monitoring</label>
                <span class="site-count" data-count="revenue-monitoring">0</span>
            </div>
            <div class="sites-dropdown" id="revenue-monitoring-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="foreign-investments">Foreign Investments</label>
                <span class="site-count" data-count="foreign-investments">0</span>
            </div>
            <div class="sites-dropdown" id="foreign-investments-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="ppp-projects">PPP Projects</label>
                <span class="site-count" data-count="ppp-projects">0</span>
            </div>
            <div class="sites-dropdown" id="ppp-projects-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Sustainability & Environment Panel - Updated Structure -->
<div class="sidebar-content" id="sustainability-content">
    <div class="content-header">
        <h3>Sustainability & Environment</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="environmental-compliance">Environmental Compliance</label>
                <span class="site-count" data-count="environmental-compliance">0</span>
            </div>
            <div class="sites-dropdown" id="environmental-compliance-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="green-building">Green Building Standards</label>
                <span class="site-count" data-count="green-building">0</span>
            </div>
            <div class="sites-dropdown" id="green-building-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="waste-management">Waste Management</label>
                <span class="site-count" data-count="waste-management">0</span>
            </div>
            <div class="sites-dropdown" id="waste-management-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="renewable-energy">Renewable Energy</label>
                <span class="site-count" data-count="renewable-energy">0</span>
            </div>
            <div class="sites-dropdown" id="renewable-energy-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="carbon-footprint">Carbon Footprint</label>
                <span class="site-count" data-count="carbon-footprint">0</span>
            </div>
            <div class="sites-dropdown" id="carbon-footprint-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="biodiversity-protection">Biodiversity Protection</label>
                <span class="site-count" data-count="biodiversity-protection">0</span>
            </div>
            <div class="sites-dropdown" id="biodiversity-protection-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Alert & Event Panel -->
<div class="sidebar-content" id="alert-event-content">
    <div class="content-header">
        <h3>Alert & Event</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="sidebar-section">
            <div class="section-header">Recent Alerts</div>
            <div class="alert-item critical">
                <div class="alert-text">Infrastructure maintenance: Clark Freeport</div>
            </div>
            <div class="alert-item warning">
                <div class="alert-text">Permit renewal deadline: BGC locators</div>
            </div>
            <div class="alert-item info">
                <div class="alert-text">Traffic advisory: SCTEX corridor</div>
            </div>
        </div>
    </div>

    <div class="content-section">
        <div class="sidebar-section">
            <div class="section-header">Upcoming Events</div>
            <div class="event-item upcoming">
                <div class="event-text">Locator Business Forum</div>
                <div class="event-date">Mar 15</div>
            </div>
            <div class="event-item ongoing">
                <div class="event-text">NCC Infrastructure Inspection</div>
                <div class="event-date">Mar 10-12</div>
            </div>
            <div class="event-item upcoming">
                <div class="event-text">BGC Sustainability Summit</div>
                <div class="event-date">Mar 20-22</div>
            </div>
        </div>
    </div>
</div>