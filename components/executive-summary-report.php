<!-- components/executive-summary-report.php -->

<div id="full-screen-monitoring" class="executive-summary-container" style="display: none;">
    <div class="monitoring-header">
        <h2>Executive Summary</h2>
        <button class="close-btn" id="close-monitoring-btn">×</button>
    </div>

    <div class="main-container">
        <div class="executive-controls">
            <div class="report-generator">
                <h4 style="margin-bottom: 1rem; color: #ffd700;">📊 Generate Executive Report</h4>
                <div class="generator-grid">
                    <div class="input-group">
                        <label class="input-label">Report Type</label>
                        <select class="input-field" id="reportType">
                            <option value="board-presentation">Board Presentation</option>
                            <option value="quarterly-summary">Quarterly Summary</option>
                            <option value="strategic-review">Strategic Review</option>
                            <option value="investor-briefing">Investor Briefing</option>
                            <option value="performance-dashboard">Performance Dashboard</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Time Period</label>
                        <select class="input-field" id="timePeriod">
                            <option value="q4-2024">Q4 2024</option>
                            <option value="full-2024">Full Year 2024</option>
                            <option value="ytd-2025">YTD 2025</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Audience Level</label>
                        <select class="input-field" id="audienceLevel">
                            <option value="board-directors">Board of Directors</option>
                            <option value="senior-management">Senior Management</option>
                            <option value="department-heads">Department Heads</option>
                            <option value="external-stakeholders">External Stakeholders</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Format</label>
                        <select class="input-field" id="reportFormat">
                            <option value="powerpoint">PowerPoint (.pptx)</option>
                            <option value="pdf">PDF Report</option>
                            <option value="excel">Excel Dashboard</option>
                            <option value="word">Word Document</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="executive-action-btn" onclick="generateReport()">
                    🎯 Generate Report
                </button>
                <button class="executive-action-btn" onclick="scheduleReport()">
                    📅 Schedule Auto-Report
                </button>
                <button class="executive-action-btn" onclick="shareReport()">
                    📤 Share & Distribute
                </button>
            </div>
        </div>

        <div class="kpi-dashboard">
            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-title">Total Portfolio Value</div>
                    <div class="kpi-trend trend-positive">↗ +8.2%</div>
                </div>
                <div class="kpi-value">₱127.5B</div>
                <div class="kpi-subtitle">Asset valuation as of Q4 2024</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-title">Annual Revenue</div>
                    <div class="kpi-trend trend-positive">↗ +15.7%</div>
                </div>
                <div class="kpi-value">₱22.1B</div>
                <div class="kpi-subtitle">Full year 2024 performance</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-title">Portfolio ROI</div>
                    <div class="kpi-trend trend-positive">↗ +2.1%</div>
                </div>
                <div class="kpi-value">13.8%</div>
                <div class="kpi-subtitle">Return on investment</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-title">Active Locators</div>
                    <div class="kpi-trend trend-positive">↗ +12.3%</div>
                </div>
                <div class="kpi-value">690</div>
                <div class="kpi-subtitle">Across all zones</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-title">EBITDA Margin</div>
                    <div class="kpi-trend trend-positive">↗ +1.8%</div>
                </div>
                <div class="kpi-value">12.7%</div>
                <div class="kpi-subtitle">Operational efficiency</div>
            </div>
        </div>

        <div class="executive-summary-grid">
            <div class="summary-card">
                <div class="card-title">
                    📈 Executive Performance Summary
                </div>

                <div class="summary-section">
                    <div class="section-header">Q4 2024 Highlights</div>
                    <div class="summary-text">
                        BCDA achieved exceptional performance in Q4 2024, with total revenue reaching ₱22.1 billion, representing a 15.7% year-over-year growth. This growth was driven by strong performance across all zones, with particularly notable contributions from Clark Freeport Zone and Bonifacio Global City.
                    </div>

                    <div class="highlight-metrics">
                        <div class="highlight-item">
                            <div class="highlight-value">₱8.2B</div>
                            <div class="highlight-label">Clark Freeport Revenue</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-value">94.1%</div>
                            <div class="highlight-label">BGC Occupancy Rate</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-value">18.9%</div>
                            <div class="highlight-label">Subic Bay Growth</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-value">₱2.8B</div>
                            <div class="highlight-label">Total EBITDA</div>
                        </div>
                    </div>
                </div>

                <div class="summary-section">
                    <div class="section-header">Strategic Achievements</div>
                    <div class="summary-text">
                        Key strategic initiatives delivered significant value creation, including the completion of major infrastructure projects, successful attraction of high-value locators, and implementation of sustainable development practices across all zones. The portfolio diversification strategy continues to reduce risk while maximizing returns.
                    </div>
                </div>

                <div class="summary-section">
                    <div class="section-header">Market Position</div>
                    <div class="summary-text">
                        BCDA maintains its position as the leading developer of premier business districts in the Philippines, with industry-leading occupancy rates and premium lease rates. The organization's reputation for quality infrastructure and business environment continues to attract Fortune 500 companies and local industry leaders.
                    </div>
                </div>
            </div>

            <div class="strategic-priorities">
                <div class="card-title">🎯 Strategic Priorities 2025</div>

                <div class="priority-item">
                    <div class="priority-number">1</div>
                    <div class="priority-content">
                        <div class="priority-title">Sustainable Development</div>
                        <div class="priority-desc">Green building certifications and renewable energy implementation</div>
                    </div>
                </div>

                <div class="priority-item">
                    <div class="priority-number">2</div>
                    <div class="priority-content">
                        <div class="priority-title">Digital Infrastructure</div>
                        <div class="priority-desc">5G deployment and smart city technologies</div>
                    </div>
                </div>

                <div class="priority-item">
                    <div class="priority-number">3</div>
                    <div class="priority-content">
                        <div class="priority-title">Portfolio Expansion</div>
                        <div class="priority-desc">New zone development and strategic acquisitions</div>
                    </div>
                </div>

                <div class="priority-item">
                    <div class="priority-number">4</div>
                    <div class="priority-content">
                        <div class="priority-title">Locator Diversification</div>
                        <div class="priority-desc">Attract high-growth sectors and international investors</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="quick-insights">
            <div class="card-title">💡 Key Strategic Insights</div>
            <div class="insights-grid">
                <div class="insight-item">
                    <div class="insight-icon">🏢</div>
                    <div class="insight-title">Market Leadership</div>
                    <div class="insight-text">BCDA zones command 23% premium over industry average lease rates</div>
                </div>
                <div class="insight-item">
                    <div class="insight-icon">📊</div>
                    <div class="insight-title">Growth Trajectory</div>
                    <div class="insight-text">Consistent 15%+ annual growth over the past 3 years</div>
                </div>
                <div class="insight-item">
                    <div class="insight-icon">🌱</div>
                    <div class="insight-title">Sustainability Focus</div>
                    <div class="insight-text">67% of new developments achieve green building certifications</div>
                </div>
                <div class="insight-item">
                    <div class="insight-icon">🎯</div>
                    <div class="insight-title">Operational Excellence</div>
                    <div class="insight-text">Industry-leading 89.4% portfolio occupancy rate</div>
                </div>
            </div>
        </div>

        <div class="report-templates">
            <div class="card-title">📋 Report Templates</div>
            <div class="template-grid">
                <div class="template-card" onclick="selectTemplate('board-quarterly')">
                    <div class="template-icon">📊</div>
                    <div class="template-title">Board Quarterly</div>
                    <div class="template-desc">Comprehensive quarterly board presentation</div>
                </div>
                <div class="template-card" onclick="selectTemplate('investor-update')">
                    <div class="template-icon">💼</div>
                    <div class="template-title">Investor Update</div>
                    <div class="template-desc">Financial performance and strategic updates</div>
                </div>
                <div class="template-card" onclick="selectTemplate('strategic-review')">
                    <div class="template-icon">🎯</div>
                    <div class="template-title">Strategic Review</div>
                    <div class="template-desc">Annual strategic planning and review</div>
                </div>
                <div class="template-card" onclick="selectTemplate('performance-dashboard')">
                    <div class="template-icon">📈</div>
                    <div class="template-title">Performance Dashboard</div>
                    <div class="template-desc">Executive KPI dashboard and metrics</div>
                </div>
                <div class="template-card" onclick="selectTemplate('risk-assessment')">
                    <div class="template-icon">⚠️</div>
                    <div class="template-title">Risk Assessment</div>
                    <div class="template-desc">Portfolio risk analysis and mitigation</div>
                </div>
                <div class="template-card" onclick="selectTemplate('sustainability-report')">
                    <div class="template-icon">🌱</div>
                    <div class="template-title">Sustainability Report</div>
                    <div class="template-desc">ESG performance and initiatives</div>
                </div>
            </div>
        </div>
    </div>
</div>