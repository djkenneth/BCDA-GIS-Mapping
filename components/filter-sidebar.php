<?php ?>

<div class="sidebar">
    <div class="sidebar-tabs-v2">
        <div class="sidebar-tab-v2 active" data-tab="layers">
            <i class="fas fa-layer-group"></i>
            <span>Features</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="government">
            <i class="fas fa-building"></i>
            <span>Government</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="land">
            <i class="fas fa-map"></i>
            <span>Land</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="vehicles">
            <i class="fas fa-car"></i>
            <span>Vehicles</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="it">
            <i class="fas fa-server"></i>
            <span>IT</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="office">
            <i class="fas fa-chair"></i>
            <span>Office</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="highvalue">
            <i class="fas fa-gem"></i>
            <span>High-Value</span>
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
                <input type="checkbox" id="all-government">
                <label for="all-government">Government Buildings</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-land">
                <label for="all-land">Land Properties</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-vehicles">
                <label for="all-vehicles">Vehicles</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-it">
                <label for="all-it">IT Infrastructure</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-office">
                <label for="all-office">Office Equipment</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-highvalue">
                <label for="all-highvalue">High-Value Assets</label>
            </div>
        </div>
    </div>
</div>

<!-- Government Buildings Panel -->
<div class="sidebar-content" id="government-content">
    <div class="content-header">
        <h3>Government Buildings</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Building Types</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="offices">
            <label for="offices">Offices</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="warehouses">
            <label for="warehouses">Warehouses</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="facilities">
            <label for="facilities">Facilities</label>
        </div>
    </div>
</div>

<!-- Land Properties Panel -->
<div class="sidebar-content" id="land-content">
    <div class="content-header">
        <h3>Land Properties</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Property Types</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="lots">
            <label for="lots">Lots</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="parcels">
            <label for="parcels">Parcels</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="estates">
            <label for="estates">Estates</label>
        </div>
    </div>
</div>

<!-- Vehicles Panel -->
<div class="sidebar-content" id="vehicles-content">
    <div class="content-header">
        <h3>Vehicles</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Fleet Management</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="fleet-management">
            <label for="fleet-management">Fleet Management</label>
        </div>
    </div>
</div>

<!-- IT Infrastructure Panel -->
<div class="sidebar-content" id="it-content">
    <div class="content-header">
        <h3>IT Infrastructure</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>IT Equipment</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="servers">
            <label for="servers">Servers</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="network-equipment">
            <label for="network-equipment">Network Equipment</label>
        </div>
    </div>
</div>

<!-- Office Equipment Panel -->
<div class="sidebar-content" id="office-content">
    <div class="content-header">
        <h3>Office Equipment</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Equipment Types</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="furniture">
            <label for="furniture">Furniture</label>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="fixtures">
            <label for="fixtures">Fixtures</label>
        </div>
    </div>
</div>

<!-- High-Value Assets Panel -->
<div class="sidebar-content" id="highvalue-content">
    <div class="content-header">
        <h3>High-Value Assets</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>
    <div class="content-section">
        <div class="content-section-title">
            <span>Specialized Equipment</span>
            <button class="select-all">Select All</button>
        </div>
        <div class="content-section-item">
            <input type="checkbox" id="specialized-equipment">
            <label for="specialized-equipment">Specialized Equipment</label>
        </div>
    </div>
</div>