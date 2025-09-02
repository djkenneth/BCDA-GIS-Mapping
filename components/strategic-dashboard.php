<!-- components/strategic-dashboard.php -->

<div id="full-screen-infrastructure-form" style="display: none;">
    <div class="dashboard-container">
        <div class="form-header">
            <h2>Strategic Dashboard</h2>
            <button id="close">&times;</button>
        </div>

        <!-- Zone Filters Section -->
        <div class="filters-section">
            <div class="filters-header">
                <div class="filters-title">
                    🔍 Zone Filters & Controls
                </div>
                <div class="zone-count" id="zoneCount">Showing 4 of 4 zones</div>
            </div>

            <div class="filters-grid">
                <div class="filter-group">
                    <label class="filter-label">Zone Category</label>
                    <select class="filter-select" id="categoryFilter">
                        <option value="all">All Categories</option>
                        <option value="operational">Operational</option>
                        <option value="development">Development</option>
                        <option value="aviation">Aviation</option>
                        <option value="business">Business District</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label class="filter-label">Performance Level</label>
                    <select class="filter-select" id="performanceFilter">
                        <option value="all">All Performance</option>
                        <option value="high">High Performing</option>
                        <option value="medium">Medium Performing</option>
                        <option value="low">Below Target</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label class="filter-label">Search Zone</label>
                    <input type="text" class="filter-input" id="searchFilter" placeholder="Search zone name...">
                </div>

                <button class="clear-filters-btn" onclick="clearAllFilters()">
                    Clear All
                </button>
            </div>

            <div class="zone-filter-pills">
                <div class="zone-pill active" data-zone="all" onclick="toggleZoneFilter(this, 'all')">All Zones</div>
                <div class="zone-pill" data-zone="clark-freeport" onclick="toggleZoneFilter(this, 'clark-freeport')">Clark Freeport</div>
                <div class="zone-pill" data-zone="new-clark" onclick="toggleZoneFilter(this, 'new-clark')">New Clark City</div>
                <div class="zone-pill" data-zone="bonifacio" onclick="toggleZoneFilter(this, 'bonifacio')">Bonifacio Global</div>
                <div class="zone-pill" data-zone="clark-aviation" onclick="toggleZoneFilter(this, 'clark-aviation')">Clark Aviation</div>
            </div>
        </div>

        <!-- Key Performance Indicators -->
        <div class="kpi-section">
            <div class="kpi-card">
                <div class="kpi-value">₱22.1B</div>
                <div class="kpi-label">Gross Revenues (2024)</div>
                <div class="kpi-change positive">+202% vs 2023</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-value">₱147.46B</div>
                <div class="kpi-label">Total Disposition Proceeds</div>
                <div class="kpi-change positive">+4% vs 2023</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-value">₱16.6B</div>
                <div class="kpi-label">Total Comprehensive Income</div>
                <div class="kpi-change positive">+437% vs 2023</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-value">₱184.8B</div>
                <div class="kpi-label">Total Equity</div>
                <div class="kpi-change positive">+8.88% vs 2023</div>
            </div>
        </div>

        <!-- Economic Zones Overview -->
        <div class="section-title">🏛️ Economic Zones Portfolio</div>
        <div class="zones-overview" id="zonesContainer">
            <div class="zone-card"
                data-zone="clark-freeport"
                data-category="operational"
                data-performance="high"
                data-name="Clark Freeport Zone">
                <div class="zone-header">
                    <div class="zone-name">Clark Freeport Zone</div>
                    <div class="zone-status operational">OPERATIONAL</div>
                </div>
                <div class="zone-metrics">
                    <div class="zone-metric">
                        <div class="zone-metric-value">1,198</div>
                        <div class="zone-metric-label">Locators</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">₱3.49B</div>
                        <div class="zone-metric-label">Net Income</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">143,408</div>
                        <div class="zone-metric-label">Workers</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">$5.10B</div>
                        <div class="zone-metric-label">Exports</div>
                    </div>
                </div>
            </div>

            <div class="zone-card"
                data-zone="new-clark"
                data-category="development"
                data-performance="medium"
                data-name="New Clark City">
                <div class="zone-header">
                    <div class="zone-name">New Clark City</div>
                    <div class="zone-status development">DEVELOPMENT</div>
                </div>
                <div class="zone-metrics">
                    <div class="zone-metric">
                        <div class="zone-metric-value">9,450</div>
                        <div class="zone-metric-label">Hectares</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">₱2.61B</div>
                        <div class="zone-metric-label">2024 Investments</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">600K</div>
                        <div class="zone-metric-label">Projected Workforce</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">60%</div>
                        <div class="zone-metric-label">Forest Reserves</div>
                    </div>
                </div>
            </div>

            <div class="zone-card"
                data-zone="bonifacio"
                data-category="business"
                data-performance="high"
                data-name="Bonifacio Global City">
                <div class="zone-header">
                    <div class="zone-name">Bonifacio Global City</div>
                    <div class="zone-status operational">OPERATIONAL</div>
                </div>
                <div class="zone-metrics">
                    <div class="zone-metric">
                        <div class="zone-metric-value">₱6.0B</div>
                        <div class="zone-metric-label">Net Revenue</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">₱3.5B</div>
                        <div class="zone-metric-label">Net Income</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">89%</div>
                        <div class="zone-metric-label">CityFlats Occupancy</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">16%</div>
                        <div class="zone-metric-label">Waste Reduction</div>
                    </div>
                </div>
            </div>

            <div class="zone-card"
                data-zone="clark-aviation"
                data-category="aviation"
                data-performance="high"
                data-name="Clark Aviation Capital">
                <div class="zone-header">
                    <div class="zone-name">Clark Aviation Capital</div>
                    <div class="zone-status operational">OPERATIONAL</div>
                </div>
                <div class="zone-metrics">
                    <div class="zone-metric">
                        <div class="zone-metric-value">2,404,888</div>
                        <div class="zone-metric-label">Passengers</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">₱924.51M</div>
                        <div class="zone-metric-label">Revenue</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">2,367</div>
                        <div class="zone-metric-label">Hectares</div>
                    </div>
                    <div class="zone-metric">
                        <div class="zone-metric-value">11,433</div>
                        <div class="zone-metric-label">Employees</div>
                    </div>
                </div>
            </div>

            <!-- No Results Message (hidden by default) -->
            <div class="no-results hidden" id="noResults">
                No zones match your current filter criteria. Try adjusting your filters or clearing them to see all zones.
            </div>
        </div>

        <!-- Performance Analytics -->
        <div class="section-title">📈 Performance Analytics</div>
        <div class="performance-grid">
            <div class="chart-container">
                <h3 style="color: #ffffff; margin-bottom: 15px; font-size: 16px;">Revenue Trend (2020-2024)</h3>
                <div class="chart-placeholder">
                    Revenue Growth Chart: ₱7.3B (2023) → ₱22.1B (2024)
                    <br>202% Year-over-Year Growth
                </div>
            </div>

            <div class="quick-stats">
                <h3 style="color: #ffffff; margin-bottom: 15px; font-size: 16px;">Quick Stats</h3>
                <div class="stat-item">
                    <span class="stat-label">AFP Modernization Share</span>
                    <span class="stat-value">₱62.80B</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">BCDA Share</span>
                    <span class="stat-value">₱49.29B</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Remittances to Govt (2024)</span>
                    <span class="stat-value">₱5.87B</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Assets</span>
                    <span class="stat-value">₱218.8B</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Active Economic Zones</span>
                    <span class="stat-value">8</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Major Infrastructure Projects</span>
                    <span class="stat-value">15+</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">International Partnerships</span>
                    <span class="stat-value">31</span>
                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../style/strategic-dashboard.css' : 'style/strategic-dashboard.css'; ?>">
<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../script/strategic-dashboard.js' : 'script/strategic-dashboard.js'; ?>"></script>