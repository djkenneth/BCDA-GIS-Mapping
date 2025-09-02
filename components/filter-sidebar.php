<!-- components/filter-sidebar.php -->

<div class="sidebar">
    <div class="sidebar-tabs-v2">
        <div class="sidebar-tab-v2 active" data-tab="layers">
            <i class="fas fa-layer-group"></i>
            <span>Features</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="zones">
            <i class="fas fa-landmark"></i>
            <span>Economic Zones</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="locators">
            <i class="fas fa-building"></i>
            <span>Locators</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="infrastructure">
            <i class="fas fa-hammer"></i>
            <span>Infrastructure</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="afp">
            <i class="fas fa-shield-alt"></i>
            <span>AFP Modernization</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="investments">
            <i class="fas fa-chart-line"></i>
            <span>Investments</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="sustainability">
            <i class="fas fa-leaf"></i>
            <span>Sustainability</span>
        </div>
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
            <div class="content-section-title">
                <span>Layer Groups</span>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all">
                <label for="all">All</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-economic-zones">
                <label for="all-economic-zones">Economic Zones</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-locator-management">
                <label for="all-locator-management">Locator Management</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-infrastructure-projects">
                <label for="all-infrastructure-projects">Infrastructure Projects</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-afp-modernization">
                <label for="all-afp-modernization">AFP Modernization</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-investment-tracking">
                <label for="all-investment-tracking">Investment Tracking</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-sustainability-environment">
                <label for="all-sustainability-environment">Sustainability & Environment</label>
            </div>
        </div>
    </div>
</div>

<!-- Economic Zones Panel -->
<div class="sidebar-content" id="zones-content">
    <div class="content-header">
        <h3>🏛️ Economic Zones</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Zone Areas</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="clark-freeport">
            <label for="clark-freeport">Clark Freeport Zone</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="new-clark-city">
            <label for="new-clark-city">New Clark City</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="bonifacio-global">
            <label for="bonifacio-global">Bonifacio Global City</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="mckinley-hill">
            <label for="mckinley-hill">McKinley Hill</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="newport-city">
            <label for="newport-city">Newport City</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="john-hay-zone">
            <label for="john-hay-zone">John Hay Special Economic Zone</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="poro-point">
            <label for="poro-point">Poro Point Freeport Zone</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="bataan-tech">
            <label for="bataan-tech">Bataan Technology Park</label>
        </div>
    </div>
</div>

<!-- Locator Management Panel -->
<div class="sidebar-content" id="locators-content">
    <div class="content-header">
        <h3>🏢 Locator Management</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Active Locators (1,198)</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="bpo-it-services">
            <label for="bpo-it-services">BPO & IT Services</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="manufacturing-logistics">
            <label for="manufacturing-logistics">Manufacturing & Logistics</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="government-facilities">
            <label for="government-facilities">Government Facilities</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="tourism-entertainment">
            <label for="tourism-entertainment">Tourism & Entertainment</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="aviation-aerospace">
            <label for="aviation-aerospace">Aviation & Aerospace</label>
        </div>
    </div>
</div>

<!-- Infrastructure Projects Panel -->
<div class="sidebar-content" id="infrastructure-content">
    <div class="content-header">
        <h3>🏗️ Infrastructure Projects</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Major Projects</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="sctex-corridor">
            <label for="sctex-corridor">SCTEX Corridor</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="clark-airport">
            <label for="clark-airport">Clark International Airport</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="ns-commuter-railway">
            <label for="ns-commuter-railway">North-South Commuter Railway</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="metro-subway">
            <label for="metro-subway">Metro Manila Subway</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="bgc-ortigas-bridge">
            <label for="bgc-ortigas-bridge">BGC-Ortigas Link Bridge</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="fiber-backbone">
            <label for="fiber-backbone">National Fiber Backbone</label>
        </div>
    </div>
</div>

<!-- AFP Modernization Panel -->
<div class="sidebar-content" id="afp-content">
    <div class="content-header">
        <h3>⚔️ AFP Modernization</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Military Projects</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="paf-housing">
            <label for="paf-housing">Philippine Air Force Housing</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="pmc-hq">
            <label for="pmc-hq">Philippine Marine Corps HQ</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="army-support">
            <label for="army-support">Army Support Command</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="special-service">
            <label for="special-service">Special Service Center</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="military-replication">
            <label for="military-replication">Military Replication Projects</label>
        </div>
    </div>
</div>

<!-- Investment Tracking Panel -->
<div class="sidebar-content" id="investments-content">
    <div class="content-header">
        <h3>💼 Investment Tracking</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Investment Categories</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="joint-venture">
            <label for="joint-venture">Joint Venture Projects</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="asset-disposition">
            <label for="asset-disposition">Asset Disposition</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="revenue-monitoring">
            <label for="revenue-monitoring">Revenue Monitoring</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="foreign-investments">
            <label for="foreign-investments">Foreign Investments</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="ppp-projects">
            <label for="ppp-projects">PPP Projects</label>
        </div>
    </div>
</div>

<!-- Sustainability & Environment Panel -->
<div class="sidebar-content" id="sustainability-content">
    <div class="content-header">
        <h3>🌱 Sustainability & Environment</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Environmental Categories</span>
            <button class="select-all">Select All</button>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="environmental-compliance">
            <label for="environmental-compliance">Environmental Compliance</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="green-building">
            <label for="green-building">Green Building Standards</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="waste-management">
            <label for="waste-management">Waste Management</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="renewable-energy">
            <label for="renewable-energy">Renewable Energy</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="carbon-footprint">
            <label for="carbon-footprint">Carbon Footprint</label>
        </div>
        
        <div class="content-section-item">
            <input type="checkbox" id="biodiversity-protection">
            <label for="biodiversity-protection">Biodiversity Protection</label>
        </div>
    </div>
</div>