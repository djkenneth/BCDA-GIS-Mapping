<?php ?>

<div class="sidebar-v2">
    <div class="sidebar-tabs-v2">
        <div class="sidebar-tab-v2 active" data-tab="layers">
            <i class="fas fa-layer-group"></i>
            <span>Features</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="infrastructure">
            <i class="fas fa-road"></i>
            <span>Infrastructure</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="buildings">
            <i class="fas fa-building"></i>
            <span>Buildings</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="natural">
            <i class="fas fa-leaf"></i>
            <span>Natural</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="risks">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Risks</span>
        </div>
        <div class="sidebar-tab-v2" data-tab="poi">
            <i class="fas fa-map-marker-alt"></i>
            <span>Points of Interest</span>
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
                <input type="checkbox" id="all-infrastructure">
                <label for="all-infrastructure">Infrastructure</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-buildings">
                <label for="all-buildings">Public Buildings</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-natural">
                <label for="all-natural">Natural Features</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-risks">
                <label for="all-risks">Environmental Risks</label>
            </div>

            <div class="content-section-item">
                <input type="checkbox" id="all-poi">
                <label for="all-poi">Points of Interest</label>
            </div>
        </div>
    </div>
</div>

<!-- Infrastructure Panel -->
<div class="sidebar-content" id="infrastructure-content">
    <div class="content-header">
        <h3>Infrastructure</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>

    <div class="content-section">
        <div class="content-section-title">
            <span>Infrastructure</span>
            <button class="select-all">Select All</button>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="bir-headquarters">
            <label for="bir-headquarters">BIR Headquarters</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="dof-regional-office">
            <label for="dof-regional-office">DOF Regional Office</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="bir-reqional-office">
            <label for="bir-reqional-office">BIR Regional Office</label>
        </div>
    </div>
</div>

<!-- Public Buildings Panel -->
<div class="sidebar-content" id="buildings-content">
    <div class="content-header">
        <h3>Public Buildings</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>

    <div class="content-section">
        <div class="content-section-title">
            <span>Public Services</span>
            <button class="select-all">Select All</button>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="government-offices">
            <label for="government-offices">Government Offices</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="dof-district-office">
            <label for="dof-district-office">DOF District Office</label>
        </div>
    </div>
</div>

<!-- Natural Features Panel -->
<div class="sidebar-content" id="natural-content">
    <div class="content-header">
        <h3>Natural Features</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>

    <div class="content-section">
        <div class="content-section-title">
            <span>Features</span>
            <button class="select-all">Select All</button>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="topography">
            <label for="topography">Topography</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="parks">
            <label for="parks">Parks & Green Spaces</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="dof-central-office">
            <label for="dof-central-office">DOF Central Office</label>
        </div>
    </div>
</div>

<!-- Environmental Risks Panel -->
<div class="sidebar-content" id="risks-content">
    <div class="content-header">
        <h3>Environmental Risks</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>

    <div class="content-section">
        <div class="content-section-title">
            <span>Risk Types</span>
            <button class="select-all">Select All</button>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="other-hazards">
            <label for="other-hazards">Other Environmental Hazards</label>
        </div>
    </div>
</div>

<!-- Points of Interest Panel -->
<div class="sidebar-content" id="poi-content">
    <div class="content-header">
        <h3>Points of Interest</h3>
        <button class="close-panel"><i class="fas fa-times"></i></button>
    </div>

    <div class="content-section">
        <div class="content-section-title">
            <span>POI Types</span>
            <button class="select-all">Select All</button>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="businesses">
            <label for="businesses">Businesses</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="recreational">
            <label for="recreational">Recreational Areas</label>
        </div>

        <div class="content-section-item">
            <input type="checkbox" id="community-centers">
            <label for="community-centers">Community Centers</label>
        </div>
    </div>
</div>