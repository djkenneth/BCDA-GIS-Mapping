<!-- components/alerts-interface.php -->
<div id="full-screen-alerts-interface" style="display: none;">
    <div class="alerts-header">
        <h2>Alert Management</h2>
        <button class="close-btn" id="close-alerts-btn">×</button>
    </div>

    <div class="alerts-tabs">
        <div class="tab active" data-tab="all">All Alerts</div>
        <div class="tab" data-tab="infrastructure">Infrastructure</div>
        <div class="tab" data-tab="buildings">Public Buildings</div>
        <div class="tab" data-tab="natural">Natural Features</div>
        <div class="tab" data-tab="environmental">Environmental Risks</div>
        <div class="tab" data-tab="poi">Points of Interest</div>
        <div class="tab" data-tab="demographics">Population Data</div>
        <div class="tab" data-tab="internet">Free Public Internet</div>
    </div>

    <div class="alerts-summary">
        <div class="summary-card">
            <div class="card-label">Total Alerts</div>
            <div class="summary-value" id="total-alerts">190</div>
        </div>
        <div class="summary-card">
            <div class="card-label">Critical Alerts</div>
            <div class="summary-value critical" id="critical-alerts">9</div>
        </div>
        <div class="summary-card">
            <div class="card-label">Warning Alerts</div>
            <div class="summary-value warning" id="warning-alerts">26</div>
        </div>
        <div class="summary-card">
            <div class="card-label">Active Alerts</div>
            <div class="summary-value active" id="normal-alerts">160</div>
        </div>
        <div class="summary-card">
            <div class="card-label">Response Time</div>
            <div class="summary-value" id="avg-response-time">15 min</div>
        </div>
    </div>
    
    <div class="alerts-filters">
        <div class="filter-group">
            <label>Priority:</label>
            <select id="priority-filter">
                <option value="all">All Priorities</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label>Category:</label>
            <select id="category-filter">
                <option value="all">All Categories</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="buildings">Public Buildings</option>
                <option value="natural">Natural Features</option>
                <option value="environmental">Environmental Risks</option>
                <option value="poi">Points of Interest</option>
                <option value="demographics">Population Data</option>
                <option value="internet">Free Public Internet</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label>Date Range:</label>
            <input type="date" id="date-from" value="<?php echo date('Y-m-d', strtotime('-7 days')); ?>">
        </div>
        <div class="filter-group">
            <label>to</label>
            <input type="date" id="date-to" value="<?php echo date('Y-m-d'); ?>">
        </div>
        
        <button id="apply-filters-btn" class="filter-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Apply Filters
        </button>
    </div>
    
    <div class="alerts-legend">
        <div class="legend-item">
            <span class="legend-color active-color"></span>
            <span>Active</span>
        </div>
        <div class="legend-item">
            <span class="legend-color warning-color"></span>
            <span>Warning</span>
        </div>
        <div class="legend-item">
            <span class="legend-color critical-color"></span>
            <span>Critical</span>
        </div>
        <div class="legend-item">
            <span class="legend-color maintenance-color"></span>
            <span>Maintenance</span>
        </div>
        <div class="legend-item">
            <span class="legend-color inactive-color"></span>
            <span>Inactive</span>
        </div>
    </div>
    
    <table class="alerts-table">
        <thead>
            <tr>
                <th>Priority</th>
                <th>ID</th>
                <th>Alert</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="alerts-table-body">
            <!-- Alert data will be populated via JavaScript -->
        </tbody>
    </table>
    
    <div class="pagination">
        <div class="page-info">
            Showing <span id="page-start">1</span>-<span id="page-end">10</span> of <span id="total-records">32</span> alerts
        </div>
        <div class="page-controls">
            <button id="prev-page-btn" class="page-button" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
            </button>
            <button id="next-page-btn" class="page-button">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    </div>
</div>

