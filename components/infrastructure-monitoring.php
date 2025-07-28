<!-- components/infrastructure-monitoring.php -->
<div id="full-screen-monitoring" style="display: none;">
    <div class="monitoring-header">
        <h2>Infrastructure Monitoring</h2>
        <button class="close-btn" id="close-monitoring-btn">×</button>
    </div>
    
    <div class="monitoring-tabs">
        <div class="tab active" data-tab="overview">Overview</div>
        <div class="tab" data-tab="infrastructure">Infrastructure</div>
        <div class="tab" data-tab="buildings">Public Buildings</div>
        <div class="tab" data-tab="environmental">Environmental Risk</div>
        <div class="tab" data-tab="natural">Natural Features</div>
        <div class="tab" data-tab="analytics">Analytics</div>
    </div>
    
    <div class="legend">
        <div class="legend-item">
            <div class="legend-color active-color"></div>
            <span>Active/Normal</span>
        </div>
        <div class="legend-item">
            <div class="legend-color warning-color"></div>
            <span>Warning/Needs Attention</span>
        </div>
        <div class="legend-item">
            <div class="legend-color critical-color"></div>
            <span>Critical/Requires Action</span>
        </div>
        <div class="legend-item">
            <div class="legend-color maintenance-color"></div>
            <span>Maintenance</span>
        </div>
    </div>
    
    <div class="dashboard-grid">
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">System Performance</h3>
                <div class="card-actions">
                    
                </div>
            </div>
            <div class="card-body">
                <div class="metric-row">
                    <span class="metric-label">System Uptime</span>
                    <span class="metric-value positive" data-metric="uptime">99.9%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar progress-green" style="width: 99.9%"></div>
                </div>
                <div class="progress-labels">
                    <span>Target: 99.5%</span>
                    <span>Actual: 99.9%</span>
                </div>
                
                <div class="metric-row">
                    <span class="metric-label">SLA Compliance Rate</span>
                    <span class="metric-value positive" data-metric="sla">98.2%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar progress-green" style="width: 98.2%"></div>
                </div>
                <div class="progress-labels">
                    <span>Target: 95%</span>
                    <span>Actual: 98.2%</span>
                </div>
                
                <div class="metric-row">
                    <span class="metric-label">Response Time (Avg)</span>
                    <span class="metric-value positive" data-metric="response-time">15 min</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar progress-green" style="width: 85%"></div>
                </div>
                <div class="progress-labels">
                    <span>Target: 30 min</span>
                    <span>Actual: 15 min</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Infrastructure Status</h3>
                <div class="card-actions">
                    
                </div>
            </div>
            <div class="infrastructure-status">
                <div class="status-circle">
                    <div class="circle-label">Total</div>
                    <div class="circle-value">198</div>
                    <div class="circle-subtext">Infrastructure Units</div>
                </div>
                <div class="status-counts">
                    <div class="count-item">
                        <div class="count-indicator" style="background-color: var(--green-status);"></div>
                        <div class="count-value">160</div>
                        <div class="count-label">Active</div>
                    </div>
                    <div class="count-item">
                        <div class="count-indicator" style="background-color: var(--warning-status);"></div>
                        <div class="count-value">26</div>
                        <div class="count-label">Warning</div>
                    </div>
                    <div class="count-item">
                        <div class="count-indicator" style="background-color: var(--red-status);"></div>
                        <div class="count-value">9</div>
                        <div class="count-label">Critical</div>
                    </div>
                    <div class="count-item">
                        <div class="count-indicator" style="background-color: var(--yellow-status);"></div>
                        <div class="count-value">3</div>
                        <div class="count-label">Maintenance</div>
                    </div>
                    <div class="count-item">
                        <div class="count-indicator" style="background-color: var(--inactive-status);"></div>
                        <div class="count-value">1</div>
                        <div class="count-label">Inactive</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Usage Analytics</h3>
                <div class="card-actions">
                    
                </div>
            </div>
            <div class="card-body">
                <div class="metric-row">
                    <span class="metric-label">Peak Usage Hours</span>
                    <span class="metric-value">12:00-14:00, 18:00-20:00</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Daily Active Users</span>
                    <span class="metric-value">750-1,200</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Average Session Duration</span>
                    <span class="metric-value">45 minutes</span>
                </div>
                
                <div class="chart-container">
                    <div class="bar-chart">
                        <div class="chart-bar" style="height: 30%;" data-label="8AM"></div>
                        <div class="chart-bar" style="height: 45%;" data-label="10AM"></div>
                        <div class="chart-bar" style="height: 85%;" data-label="12PM"></div>
                        <div class="chart-bar" style="height: 70%;" data-label="2PM"></div>
                        <div class="chart-bar" style="height: 40%;" data-label="4PM"></div>
                        <div class="chart-bar" style="height: 65%;" data-label="6PM"></div>
                        <div class="chart-bar" style="height: 90%;" data-label="8PM"></div>
                        <div class="chart-bar" style="height: 50%;" data-label="10PM"></div>
                        <div class="chart-axis"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <h2 class="section-title">Priority Infrastructure Monitoring</h2>
    
    <div class="category-filters">
        <div class="category-filter active">All (198)</div>
        <div class="category-filter">Roads & Transportation (45)</div>
        <div class="category-filter">Utilities (38)</div>
        <div class="category-filter">Building Types (28)</div>
        <div class="category-filter">Features (32)</div>
        <div class="category-filter">Risk Types (15)</div>
        <div class="category-filter">POI Types (25)</div>
        <div class="category-filter">Data Types (8)</div>
    </div>
    
    <table class="infrastructure-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Last Inspection</th>
                <th>Next Maintenance</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Mandaue-Mactan Bridge</td>
                <td>Bridges</td>
                <td>Mandaue Channel</td>
                <td>
                    <span class="status-badge badge-critical">
                        <span class="badge-status-dot"></span>
                        Critical
                    </span>
                </td>
                <td>May 10, 2025</td>
                <td>May 15, 2025</td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            </tr>
            <tr>
                <td>Lahug Power Substation</td>
                <td>Power Distribution</td>
                <td>Lahug District</td>
                <td>
                    <span class="status-badge badge-critical">
                        <span class="badge-status-dot"></span>
                        Critical
                    </span>
                </td>
                <td>May 12, 2025</td>
                <td>Immediate</td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            </tr>
            <tr>
                <td>Tres de Abril Street</td>
                <td>Roads</td>
                <td>Barangay Pasil</td>
                <td>
                    <span class="status-badge badge-warning">
                        <span class="badge-status-dot"></span>
                        Warning
                    </span>
                </td>
                <td>May 8, 2025</td>
                <td>May 18, 2025</td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            </tr>
            <tr>
                <td>Guadalupe Water Reservoir</td>
                <td>Water Supply</td>
                <td>Guadalupe River Basin</td>
                <td>
                    <span class="status-badge badge-warning">
                        <span class="badge-status-dot"></span>
                        Warning
                    </span>
                </td>
                <td>May 7, 2025</td>
                <td>May 17, 2025</td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            </tr>
            <tr>
                <td>City Hall Annex Building</td>
                <td>Public Buildings</td>
                <td>M.C. Briones St.</td>
                <td>
                    <span class="status-badge badge-warning">
                        <span class="badge-status-dot"></span>
                        Warning
                    </span>
                </td>
                <td>May 5, 2025</td>
                <td>May 20, 2025</td>
                <td>
                    <button class="action-btn">View</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

