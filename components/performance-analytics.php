<!-- components/performance-analytics.php -->
<div id="full-screen-alerts-interface" class="performance-analytics-main-container" style="display: none;">
    <div class="alerts-header">
        <h2>Performance Analytics</h2>
        <button class="close-btn" id="close-alerts-btn">×</button>
    </div>
    
    <div class="main-container">
        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label class="filter-label">Time Period</label>
                    <select class="filter-select" id="timePeriod">
                        <option value="q4-2024">Q4 2024</option>
                        <option value="2024">Full Year 2024</option>
                        <option value="ytd">Year-to-Date</option>
                        <option value="trailing-12">Trailing 12 Months</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="filter-label">Zone Selection</label>
                    <select class="filter-select" id="zoneFilter">
                        <option value="all">All Zones</option>
                        <option value="clark">Clark Freeport Zone</option>
                        <option value="subic">Subic Bay Freeport</option>
                        <option value="bataan">Bataan Technology Park</option>
                        <option value="taguig">Bonifacio Global City</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="filter-label">Performance Metric</label>
                    <select class="filter-select" id="metricFilter">
                        <option value="revenue">Revenue Performance</option>
                        <option value="occupancy">Occupancy Rates</option>
                        <option value="growth">Growth Metrics</option>
                        <option value="efficiency">Operational Efficiency</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="filter-label">Comparison</label>
                    <select class="filter-select" id="comparisonFilter">
                        <option value="previous-period">vs Previous Period</option>
                        <option value="previous-year">vs Previous Year</option>
                        <option value="budget">vs Budget Target</option>
                        <option value="industry">vs Industry Average</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">₱22.1B</div>
                <div class="metric-label">Total Portfolio Revenue</div>
                <div class="metric-trend trend-up">
                    <span>↗</span>
                    <span>+12.3% vs Q3 2024</span>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-value">89.4%</div>
                <div class="metric-label">Portfolio Occupancy Rate</div>
                <div class="metric-trend trend-up">
                    <span>↗</span>
                    <span>+3.2% vs previous period</span>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-value">15.7%</div>
                <div class="metric-label">Revenue Growth Rate</div>
                <div class="metric-trend trend-up">
                    <span>↗</span>
                    <span>Above target of 12%</span>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-value">₱2.8B</div>
                <div class="metric-label">EBITDA</div>
                <div class="metric-trend trend-up">
                    <span>↗</span>
                    <span>+18.5% margin improvement</span>
                </div>
            </div>
        </div>

        <div class="analytics-grid">
            <div class="analytics-card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Revenue Trends</div>
                        <div class="card-subtitle">Quarterly revenue performance across all zones</div>
                    </div>
                    <div class="trend-indicator trend-up">
                        <span>↗</span>
                        <span>+15.7% growth</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>

            <div class="analytics-card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Occupancy Rates by Zone</div>
                        <div class="card-subtitle">Current occupancy performance</div>
                    </div>
                    <div class="trend-indicator trend-up">
                        <span>↗</span>
                        <span>Portfolio avg: 89.4%</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="occupancyChart"></canvas>
                </div>
            </div>

            <div class="analytics-card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Growth Metrics Comparison</div>
                        <div class="card-subtitle">YoY growth across key performance indicators</div>
                    </div>
                    <div class="trend-indicator trend-up">
                        <span>↗</span>
                        <span>All metrics positive</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="growthChart"></canvas>
                </div>
            </div>

            <div class="analytics-card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Portfolio Performance Mix</div>
                        <div class="card-subtitle">Revenue contribution by zone</div>
                    </div>
                    <div class="trend-indicator trend-up">
                        <span>↗</span>
                        <span>Diversified portfolio</span>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="portfolioChart"></canvas>
                </div>
            </div>
        </div>

        <div class="performance-table">
            <div class="table-header">
                <h3>Zone Performance Summary</h3>
                <button class="export-btn" onclick="exportData()">Export Data</button>
            </div>
            <table id="performanceTable">
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>Revenue (₱B)</th>
                        <th>Occupancy (%)</th>
                        <th>Growth Rate (%)</th>
                        <th>Active Locators</th>
                        <th>Performance Status</th>
                        <th>Avg. Lease Rate (₱/sqm)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="zone-badge zone-clark">Clark Freeport</span></td>
                        <td>₱8.2B</td>
                        <td>92.3%</td>
                        <td>+16.8%</td>
                        <td>247</td>
                        <td><span class="status-indicator status-excellent"></span>Excellent</td>
                        <td>₱1,850</td>
                    </tr>
                    <tr>
                        <td><span class="zone-badge zone-taguig">BGC Taguig</span></td>
                        <td>₱6.9B</td>
                        <td>94.1%</td>
                        <td>+14.2%</td>
                        <td>189</td>
                        <td><span class="status-indicator status-excellent"></span>Excellent</td>
                        <td>₱3,200</td>
                    </tr>
                    <tr>
                        <td><span class="zone-badge zone-subic">Subic Bay</span></td>
                        <td>₱4.3B</td>
                        <td>87.6%</td>
                        <td>+18.9%</td>
                        <td>156</td>
                        <td><span class="status-indicator status-excellent"></span>Excellent</td>
                        <td>₱1,650</td>
                    </tr>
                    <tr>
                        <td><span class="zone-badge zone-bataan">Bataan Tech Park</span></td>
                        <td>₱2.7B</td>
                        <td>84.2%</td>
                        <td>+12.1%</td>
                        <td>98</td>
                        <td><span class="status-indicator status-good"></span>Good</td>
                        <td>₱1,200</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>