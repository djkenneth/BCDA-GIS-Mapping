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
                    <input type="checkbox" id="category-1">
                    <label for="category-1">Economic Zones</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="category-2">
                    <label for="category-2">Locator Management</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="category-3">
                    <label for="category-3">Infrastructure Projects</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="category-4">
                    <label for="category-4">AFP Modernization</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="category-5">
                    <label for="category-5">Investment Tracking</label>
                </div>
            </div>

            <div class="content-section-item category-content-section-item">
                <div class="flex">
                    <input type="checkbox" id="category-6">
                    <label for="category-6">Sustainability & Environment</label>
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
                <label for="subcategory-1">Clark Freeport Zone</label>
                <span class="site-count" data-count="subcategory-1">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="1" id="subcategory-1-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-2">New Clark City</label>
                <span class="site-count" data-count="subcategory-2">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="2" id="subcategory-2-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-3">Bonifacio Global City</label>
                <span class="site-count" data-count="subcategory-3">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="3" id="subcategory-3-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-4">McKinley Hill</label>
                <span class="site-count" data-count="subcategory-4">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="4" id="subcategory-4-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-5">Newport City</label>
                <span class="site-count" data-count="subcategory-5">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="5" id="subcategory-5-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-6">John Hay Special Economic Zone</label>
                <span class="site-count" data-count="subcategory-6">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="6" id="subcategory-6-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-7">Poro Point Freeport Zone</label>
                <span class="site-count" data-count="subcategory-7">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="7" id="subcategory-7-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-8">Bataan Technology Park</label>
                <span class="site-count" data-count="subcategory-8">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="8" id="subcategory-8-dropdown">
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
                <label for="subcategory-9">BPO & IT Services</label>
                <span class="site-count" data-count="subcategory-9">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="9" id="subcategory-9-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-10">Manufacturing & Logistics</label>
                <span class="site-count" data-count="subcategory-10">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="10" id="subcategory-10-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-11">Government Facilities</label>
                <span class="site-count" data-count="subcategory-11">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="11" id="subcategory-11-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-12">Tourism & Entertainment</label>
                <span class="site-count" data-count="subcategory-12">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="12" id="subcategory-12-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>

        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-13">Aviation & Aerospace</label>
                <span class="site-count" data-count="subcategory-13">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="13" id="subcategory-13-dropdown">
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
                <label for="subcategory-14">SCTEX Corridor</label>
                <span class="site-count" data-count="subcategory-14">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="14" id="subcategory-14-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-15">Clark International Airport</label>
                <span class="site-count" data-count="subcategory-15">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="15" id="subcategory-15-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-16">North-South Commuter Railway</label>
                <span class="site-count" data-count="subcategory-16">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="16" id="subcategory-16-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-17">Metro Manila Subway</label>
                <span class="site-count" data-count="subcategory-17">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="17" id="subcategory-17-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-18">BGC-Ortigas Link Bridge</label>
                <span class="site-count" data-count="subcategory-18">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="18" id="subcategory-18-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-19">National Fiber Backbone</label>
                <span class="site-count" data-count="subcategory-19">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="19" id="subcategory-19-dropdown">
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
                <label for="subcategory-20">Philippine Air Force Housing</label>
                <span class="site-count" data-count="subcategory-20">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="20" id="subcategory-20-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-21">Philippine Marine Corps HQ</label>
                <span class="site-count" data-count="subcategory-21">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="21" id="subcategory-21-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-22">Army Support Command</label>
                <span class="site-count" data-count="subcategory-22">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="22" id="subcategory-22-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-23">Special Service Center</label>
                <span class="site-count" data-count="subcategory-23">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="23" id="subcategory-23-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-24">Military Replication Projects</label>
                <span class="site-count" data-count="subcategory-24">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="24" id="subcategory-24-dropdown">
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
                <label for="subcategory-25">Joint Venture Projects</label>
                <span class="site-count" data-count="subcategory-25">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="25" id="subcategory-25-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-26">Asset Disposition</label>
                <span class="site-count" data-count="subcategory-26">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="26" id="subcategory-26-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-27">Revenue Monitoring</label>
                <span class="site-count" data-count="subcategory-27">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="27" id="subcategory-27-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-28">Foreign Investments</label>
                <span class="site-count" data-count="subcategory-28">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="28" id="subcategory-28-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-29">PPP Projects</label>
                <span class="site-count" data-count="subcategory-29">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="29" id="subcategory-29-dropdown">
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
                <label for="subcategory-30">Environmental Compliance</label>
                <span class="site-count" data-count="subcategory-30">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="30" id="subcategory-30-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-31">Green Building Standards</label>
                <span class="site-count" data-count="subcategory-31">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="31" id="subcategory-31-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-32">Waste Management</label>
                <span class="site-count" data-count="subcategory-32">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="32" id="subcategory-32-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-33">Renewable Energy</label>
                <span class="site-count" data-count="subcategory-33">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="33" id="subcategory-33-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-34">Carbon Footprint</label>
                <span class="site-count" data-count="subcategory-34">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="34" id="subcategory-34-dropdown">
                <!-- Sites will be populated by JavaScript -->
            </div>
        </div>

        <div class="content-section-item">
            <div class="checkbox-flex-container">
                <label for="subcategory-35">Biodiversity Protection</label>
                <span class="site-count" data-count="subcategory-35">0</span>
            </div>
            <div class="sites-dropdown" data-subcategory-id="35" id="subcategory-35-dropdown">
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