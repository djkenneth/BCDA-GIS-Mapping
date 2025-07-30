document.addEventListener("DOMContentLoaded", function () {
  function showInfoDrawer(site, category) {
    const drawer = document.getElementById("info-drawer");
    const drawerContent = document.getElementById("drawer-content");
    const sideWrapper = document.querySelector(".side-wrapper");

    if (drawer) {
      drawer.setAttribute('data-site-id', site.id);
    }

    hideAllSections();
    
    if (sideWrapper) {
      sideWrapper.classList.add("active");
      
      const cards = sideWrapper.querySelectorAll('.card');
      cards.forEach(card => {
        if (!card.querySelector('.card-close-btn')) {
          const closeBtn = document.createElement('button');
          closeBtn.className = 'card-close-btn';
          closeBtn.innerHTML = '✕';
          closeBtn.setAttribute('title', 'Close card');
          
          closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sideWrapper.classList.remove('active');
            
            if (window.hideLiveFeedCard) {
              window.hideLiveFeedCard();
            }
          });
          
          card.appendChild(closeBtn);
        }
      });
    }

    const technicalDetails = getTechnicalDetails(site.id);
    const networkInfo = getNetworkInfo(site.id);
    const maintenanceLogs = getMaintenanceLogs(site.id);

    const categoryLabel = getCategoryLabel(category.category, site.subcategory);

    drawerContent.innerHTML = `
      <!-- Live Feed Card Integration -->
      <div class="live-feed-card-integrated" id="live-feed-card-integrated" style="display: block;">
        <div class="live-feed-header">
          <div class="alert-indicator">
            <span class="alert-dot"></span>
            <span>Live Feed - ${site.name}</span>
          </div>
        </div>
        
        <div class="live-feed-video">
          <video id="live-feed-video-player" autoplay muted playsinline></video>
          <div id="live-feed-loader" class="live-feed-loader">
            <div class="loader-spinner"></div>
            <div>Loading stream...</div>
          </div>
        </div>
        
        <div class="live-feed-info">
          <div class="info-row">
            <span>Device Channel</span>
            <span class="personnel-count">${site.id || '1000013'}</span>
          </div>
          <button id="live-feed-view-btn" class="view-btn" data-camera-code="${site.id || '1000013'}" data-site-id="${site.id}">View in Stream Viewer</button>
        </div>
      </div>

      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Category:</span>
            <span class="site-detail-value">${categoryLabel}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Subcategory:</span>
            <span class="site-detail-value">${site.subcategory}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Status:</span>
            <span class="site-detail-value"><span class="status-${site.status}">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span></span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Location:</span>
            <span class="site-detail-value">${site.location[0].toFixed(6)}, ${site.location[1].toFixed(6)}</span>
          </div>
        </div>
        <div class="site-description">
          <span class="site-detail-label">Description</span>
          <p>${site.description}</p>
        </div>
      </div>

      <div class="tab-navigation">
        ${generateTabButtons(category.category)}
      </div>

      <div class="tab-content">
        <div id="technical-details-section" class="tab-section active">
          <div class="detail-section">
            <div id="technical-details-content"></div>
          </div>
        </div>

        <div id="performance-analytics-section" class="tab-section">
          <div class="detail-section">
            <div id="performance-analytics-content"></div>
          </div>
        </div>

        <div id="maintenance-history-section" class="tab-section">
          <div class="detail-section">
            <div id="maintenance-history-content"></div>
          </div>
        </div>

        <div id="network-info-section" class="tab-section">
          <div class="detail-section">
            <div id="network-info-content"></div>
          </div>
        </div>

        <div id="schedule-inspection-section" class="tab-section">
          <div class="detail-section">
            <div id="inspection-content">
              <form id="inspection-form">
                <div class="form-group">
                  <label>Inspection Type</label>
                  <select>
                    <option value="routine">Routine Inspection</option>
                    <option value="emergency">Emergency Response</option>
                    <option value="annual">Annual Comprehensive</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Date</label>
                  <input type="date">
                </div>
                <div class="form-group">
                  <label>Time</label>
                  <input type="time">
                </div>
                <div class="form-group">
                  <label>Technician</label>
                  <select>
                    <option value="john">John Smith</option>
                    <option value="maria">Maria Rodriguez</option>
                    <option value="david">David Chen</option>
                    <option value="sarah">Sarah Johnson</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Enter inspection notes..."></textarea>
                </div>
                <div class="site-actions">
                  <div class="site-actions-row">
                    <button type="button" class="btn-primary" id="schedule-btn">Schedule</button>
                    <button type="button" class="btn-secondary" id="cancel-inspection-btn">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="download-report-main-section" class="tab-section">
          <div class="detail-section">
            <div id="download-report-content">
              <h4>Generate Comprehensive Report</h4>
              <p>Generate a detailed  executive report for <strong>${site.name}</strong> including all technical specifications, performance analytics, maintenance history, and strategic recommendations.</p>
              
              <div class="report-preview-section" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <h5 style="margin-bottom: 10px; color: #FAD754;">Report Contents:</h5>
                <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
                  <li>Site Information & Classification</li>
                  <li>${getCategorySpecificReportSections(category.category).join('</li><li>')}</li>
                  <li>Strategic Recommendations</li>
                </ul>
              </div>
              
              <div class="site-actions">
                <div class="site-actions-row">
                  <button class="btn-primary" id="direct-generate-report-btn" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
                    <span style="margin-right: 8px;"></span>Generate Executive Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    drawer.classList.add("open");
    drawer.classList.add("style-1");

    loadTechnicalDetails(site, category);
    addEventListeners(site, category, drawer);
    
    // Initialize live feed after drawer content is loaded
    setTimeout(() => {
      initializeLiveFeed(site);
      setupLiveFeedEventListeners(site);
    }, 100);
  }

  // Initialize live feed for the integrated card
  async function initializeLiveFeed(site) {
    const videoElement = document.getElementById('live-feed-video-player');
    const loaderElement = document.getElementById('live-feed-loader');
    
    if (!videoElement) {
      console.error('Video element not found in integrated live feed');
      return;
    }
    
    if (!loaderElement) {
      console.warn('Loader element not found in integrated live feed');
    }
    
    try {
      if (loaderElement) {
        loaderElement.style.display = 'flex';
        loaderElement.innerHTML = `
          <div class="loader-spinner"></div>
          <div>Loading stream...</div>
        `;
      }
      
      // Get stream URL (you'll need to implement this based on your API)
      const streamUrl = await getStreamUrl(site.id || '1000013');
      
      if (!streamUrl) {
        throw new Error('Could not get stream URL');
      }
      
      await initializeHlsPlayer(videoElement, streamUrl, loaderElement);
    } catch (error) {
      console.error('Error initializing integrated live feed:', error);
      updateLiveFeedError(error.message, loaderElement);
    }
  }

  // Update live feed error display
  function updateLiveFeedError(errorMessage, loaderElement) {
    if (loaderElement) {
      loaderElement.innerHTML = `
        <div style="text-align: center;">
          <div>⚠️</div>
          <div style="margin-top: 10px; font-size: 12px;">
            ${errorMessage}
          </div>
          <div style="font-size: 11px; margin-top: 5px; opacity: 0.8;">
            Click View for full stream viewer
          </div>
        </div>
      `;
    }
  }

  // Setup event listeners for the integrated live feed
  function setupLiveFeedEventListeners(site) {
    const viewBtn = document.getElementById('live-feed-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function() {
        const cameraCode = this.getAttribute('data-camera-code') || site.id || '1000013';
        
        const currentPath = window.location.pathname;
        let streamsPath;
        
        if (currentPath.includes('/streams/') || currentPath.endsWith('streams.php')) {
          streamsPath = `?camera=${cameraCode}`;
        } else if (currentPath === '/' || currentPath.endsWith('index.php') || currentPath.includes('/index.php')) {
          streamsPath = `streams/?camera=${cameraCode}`;
        } else {
          streamsPath = `streams/?camera=${cameraCode}`;
        }
        
        window.location.href = streamsPath;
      });
    }
  }

  // Get stream URL function (implement based on your API)
  async function getStreamUrl(cameraCode) {
    try {
      const storedStreamInfo = getStoredStreamUrl(cameraCode);
      
      if (storedStreamInfo && storedStreamInfo.url) {
        const isValid = await isStreamUrlValid(storedStreamInfo.url);
        
        if (isValid) {
          return storedStreamInfo.url;
        } else {
          localStorage.removeItem(`stream_${cameraCode}`);
        }
      }
      
      const streamData = await startCameraStream(cameraCode);
      if (streamData) {
        storeStreamUrl(cameraCode, streamData);
        return streamData.html_stream_url;
      }
    } catch (error) {
      console.error('Error getting stream URL:', error);
    }
    
    return null;
  }

  // Store stream URL
  function storeStreamUrl(cameraCode, streamData) {
    const streamInfo = {
      url: streamData.html_stream_url,
      rtspUrl: streamData.rtsp_url,
      streamId: streamData.stream_id,
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem(`stream_${cameraCode}`, JSON.stringify(streamInfo));
      return streamInfo;
    } catch (error) {
      console.error('Error storing stream URL in local storage:', error);
      return null;
    }
  }

  // Get stored stream URL
  function getStoredStreamUrl(cameraCode) {
    try {
      const streamInfoStr = localStorage.getItem(`stream_${cameraCode}`);
      if (!streamInfoStr) return null;
      
      const streamInfo = JSON.parse(streamInfoStr);
      return streamInfo;
    } catch (error) {
      console.error('Error retrieving stream URL from local storage:', error);
      localStorage.removeItem(`stream_${cameraCode}`);
      return null;
    }
  }

  // Validate stream URL
  async function isStreamUrlValid(streamUrl) {
    if (!streamUrl) return false;
    
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(false);
      }, 5000);
      
      fetch(streamUrl, { method: 'HEAD' })
        .then(response => {
          clearTimeout(timeoutId);
          const isValid = response.ok;
          resolve(isValid);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          console.error('Error validating stream URL:', error);
          resolve(false);
        });
    });
  }

  // Start camera stream
  async function startCameraStream(cameraCode) {
    try {
      const channelId = `${cameraCode}$1$0$0`;
      
      const response = await fetch(`https://philtower.itbsstudio.com/api/video/start-stream?channel_id=${channelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error starting stream: ${response.statusText}`);
      }
      
      const streamData = await response.json();
      return streamData;
    } catch (error) {
      console.error('Error starting camera stream:', error);
      return null;
    }
  }

  // Initialize HLS player
  function initializeHlsPlayer(videoElement, streamUrl, loaderElement) {
    return new Promise((resolve, reject) => {
      if (window.integratedHlsPlayer) {
        window.integratedHlsPlayer.destroy();
        window.integratedHlsPlayer = null;
      }
      
      if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 0
        });
        
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);
        
        window.integratedHlsPlayer = hls;
        
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          videoElement.play().then(() => {
            resolve();
          }).catch(e => {
            console.warn('Autoplay prevented in integrated live feed:', e);
            resolve();
          });
        });
        
        hls.on(Hls.Events.FRAG_BUFFERED, function() {
          if (loaderElement && videoElement.readyState >= 3) {
            loaderElement.style.display = 'none';
          }
        });
        
        hls.on(Hls.Events.ERROR, function(event, data) {
          console.error('HLS error in integrated live feed:', data);
          if (data.fatal) {
            reject(new Error('Fatal HLS error: ' + data.type));
          }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = streamUrl;
        videoElement.addEventListener('loadedmetadata', function() {
          videoElement.play().then(() => {
            if (loaderElement) {
              loaderElement.style.display = 'none';
            }
            resolve();
          }).catch(reject);
        });
      } else {
        reject(new Error('HLS not supported in this browser'));
      }
      
      videoElement.addEventListener('timeupdate', function onTimeUpdate() {
        if (videoElement.currentTime > 0 && loaderElement) {
          loaderElement.style.display = 'none';
          videoElement.removeEventListener('timeupdate', onTimeUpdate);
        }
      });
    });
  }

  // Helper function to get category-specific report sections
  function getCategorySpecificReportSections(categoryName) {
    const sections = {
      'Infrastructure': [
        'Structural Engineering Specifications',
        'Infrastructure Performance Metrics',
        'System Status & Connectivity',
        'Maintenance & Inspection Records'
      ],
      'Public Buildings': [
        'Building Specifications & Capacity',
        'Occupancy & Utilization Analytics',
        'Building Systems Status',
        'Facility Maintenance History'
      ],
      'Natural Features': [
        'Conservation Specifications',
        'Biodiversity & Ecological Health',
        'Environmental Monitoring Data',
        'Conservation Activity Records'
      ],
      'Environmental Risks': [
        'Risk Assessment & Classification',
        'Hazard Monitoring Performance',
        'Early Warning System Status',
        'Incident & Response History'
      ],
      'Points of Interest': [
        'Facility Specifications & Services',
        'Visitor Analytics & Engagement',
        'Operational Status & Amenities',
        'Maintenance & Events History'
      ],
      'Population Data': [
        'Demographic Profile & Statistics',
        'Community Engagement Metrics',
        'Data Quality & Collection Status',
        'Survey & Census History'
      ],
      'Internet Access': [
        'Network Infrastructure Specifications',
        'Connectivity Performance Metrics',
        'Service Status & Reliability',
        'Network Maintenance Records'
      ],
      'National Broadband Project': [
        'NBP Infrastructure Specifications',
        'Network Performance & Adoption',
        'Connectivity Status & Integration',
        'Deployment & Maintenance History'
      ],
      'Traffic Data': [
        'Traffic Monitoring Infrastructure',
        'Traffic Analytics & Flow Data',
        'Monitoring System Status',
        'Data Collection History'
      ]
    };
    
    return sections[categoryName] || [
      'Technical Specifications',
      'Performance Analytics',
      'Operational Status',
      'Activity History'
    ];
  }

  function showExpandedView(site, category, drawer) {
    const technicalDetails = getTechnicalDetails(site.id);
    const categoryTemplate = categoryTemplates[category.category] || categoryTemplates['default'];
    const categorySpecificDetails = categoryTemplate({...site, technicalDetails: technicalDetails});
    const categoryLabel = getCategoryLabel(category.category, site.subcategory);

    document.getElementById("drawer-content").innerHTML = `
      <!-- Live Feed Card Integration -->
      <div class="live-feed-card-integrated" id="live-feed-card-integrated" style="display: block;">
        <div class="live-feed-header">
          <div class="alert-indicator">
            <span class="alert-dot"></span>
            <span>Live Feed - ${site.name}</span>
          </div>
        </div>
        
        <div class="live-feed-video">
          <video id="live-feed-video-player" autoplay muted playsinline></video>
          <div id="live-feed-loader" class="live-feed-loader">
            <div class="loader-spinner"></div>
            <div>Loading stream...</div>
          </div>
        </div>
        
        <div class="live-feed-info">
          <div class="info-row">
            <span>Device Channel</span>
            <span class="personnel-count">${site.id || '1000013'}</span>
          </div>
          <button id="live-feed-view-btn" class="view-btn" data-camera-code="${site.id || '1000013'}" data-site-id="${site.id}">View in Stream Viewer</button>
        </div>
      </div>
    
      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Category:</span>
            <span class="site-detail-value">${categoryLabel}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Subcategory:</span>
            <span class="site-detail-value">${site.subcategory}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Status:</span>
            <span class="site-detail-value"><span class="status-${site.status}">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span></span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Location:</span>
            <span class="site-detail-value">${site.location[0].toFixed(6)}, ${site.location[1].toFixed(6)}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">ID:</span>
            <span class="site-detail-value">${site.id}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Description</h4>
        <p style="color: rgba(255, 255, 255, 0.9); line-height: 1.5; margin: 0;">${site.description}</p>
      </div>
      
      <div class="detail-section">
        ${categorySpecificDetails}
      </div>
      
      <div class="site-actions">
        <div class="site-actions-row">
          <button class="btn-primary" id="view-less">Show Less</button>
          <button class="btn-secondary" id="maintenance-log-btn">${getFirstButtonLabel(category.category)}</button>
        </div>
        <div class="site-actions-row">
          <button class="btn-secondary" id="network-info-btn">${getSecondButtonLabel(category.category)}</button>
          <button class="btn-secondary" id="technical-details-btn">Technical Details</button>
        </div>
        <div class="site-actions-row">
          <button class="btn-secondary" id="schedule-inspection-btn">Schedule Inspection</button>
        </div>
      </div>
    
      <div id="maintenance-log-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>${getFirstButtonLabel(category.category)}</h3>
          <div id="maintenance-log-content"></div>
        </div>
      </div>
    
      <div id="network-info-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>${getSecondButtonLabel(category.category)}</h3>
          <div id="network-info-content"></div>
        </div>
      </div>
    
      <div id="technical-details-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>Technical Details</h3>
          <div id="technical-details-content"></div>
        </div>
      </div>

      <div id="inspection-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>Schedule Inspection</h3>
          <div id="inspection-content">
            <form id="inspection-form">
              <div class="form-group">
                <label>Inspection Type</label>
                <select>
                  <option value="routine">Routine Inspection</option>
                  <option value="emergency">Emergency Response</option>
                  <option value="annual">Annual Comprehensive</option>
                </select>
              </div>
              <div class="form-group">
                <label>Date</label>
                <input type="date">
              </div>
              <div class="form-group">
                <label>Time</label>
                <input type="time">
              </div>
              <div class="form-group">
                <label>Technician</label>
                <select>
                  <option value="john">John Smith</option>
                  <option value="maria">Maria Rodriguez</option>
                  <option value="david">David Chen</option>
                  <option value="sarah">Sarah Johnson</option>
                </select>
              </div>
              <div class="form-group">
                <label>Notes</label>
                <textarea placeholder="Enter inspection notes..."></textarea>
              </div>
              <div class="site-actions">
                <div class="site-actions-row">
                  <button type="button" class="btn-primary" id="schedule-btn">Schedule</button>
                  <button type="button" class="btn-secondary" id="cancel-inspection-btn">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    
      <div class="site-actions">
        <div class="site-actions-row">
          <button class="bg-accent-custom" id="download-report" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
            <span style="margin-right: 8px;"></span>Generate Executive Report
          </button>
        </div>
      </div>
    `;
      
    const viewLessBtn = document.getElementById("view-less");
    if (viewLessBtn) {
      viewLessBtn.addEventListener("click", function() {
        drawer.classList.remove("expanded");
        showInfoDrawer(site, category);
      });
    }
    
    const expandedDownloadBtn = document.getElementById("download-report");
    if (expandedDownloadBtn) {
      expandedDownloadBtn.addEventListener("click", function() {
        // Show loading state
        const originalText = expandedDownloadBtn.innerHTML;
        expandedDownloadBtn.innerHTML = '<span style="margin-right: 8px;">⏳</span>Generating Report...';
        expandedDownloadBtn.disabled = true;
        
        // Generate PDF report after short delay
        setTimeout(() => {
          downloadPDFReport(site, category);
          
          // Reset button state
          expandedDownloadBtn.innerHTML = originalText;
          expandedDownloadBtn.disabled = false;
        }, 800);
      });
    }

    const scheduleInspectionBtn = document.getElementById("schedule-inspection-btn");
    if (scheduleInspectionBtn) {
      scheduleInspectionBtn.addEventListener("click", function() {
        hideAllSections();
        const inspectionSection = document.getElementById("inspection-section");
        if (inspectionSection) {
          inspectionSection.style.display = "block";
        }
      });
    }

    const scheduleBtn = document.getElementById("schedule-btn");
    if (scheduleBtn) {
      scheduleBtn.addEventListener("click", function() {
        alert("Inspection scheduled successfully!");
        const inspectionSection = document.getElementById("inspection-section");
        if (inspectionSection) {
          inspectionSection.style.display = "none";
        }
      });
    }

    const cancelInspectionBtn = document.getElementById("cancel-inspection-btn");
    if (cancelInspectionBtn) {
      cancelInspectionBtn.addEventListener("click", function() {
        const inspectionSection = document.getElementById("inspection-section");
        if (inspectionSection) {
          inspectionSection.style.display = "none";
        }
      });
    }
    
    addMaintenanceLogListener(site, category);
    addNetworkInfoListener(site, category);
    addTechnicalDetailsListener(site, category);
    
    // Initialize live feed for expanded view
    setTimeout(() => {
      initializeLiveFeed(site);
      setupLiveFeedEventListeners(site);
    }, 100);
  }

  // Rest of the existing functions remain the same...
  // [Continue with all the existing functions from the original file]
  
  function generateTabButtons(categoryName) {
    const allTabs = [
      { id: 'technical-details', label: 'Technical Details', categories: ['all'] },
      { id: 'performance-analytics', label: getPerformanceLabel(categoryName), categories: ['all'] },
      { id: 'maintenance-history', label: getMaintenanceLabel(categoryName), categories: getMaintenanceCategories() },
      { id: 'network-info', label: getNetworkLabel(categoryName), categories: getNetworkCategories() },
      { id: 'schedule-inspection', label: 'Schedule Inspection', categories: ['all'] },
      { id: 'download-report-main', label: 'Generate Report', categories: ['all'] }
    ];

    return allTabs.map(tab => {
      if (tab.categories.includes('all') || tab.categories.includes(categoryName)) {
        return `<button class="tab-btn" data-tab="${tab.id}">${tab.label}</button>`;
      }
      return '';
    }).join('');
  }

  function getPerformanceLabel(categoryName) {
    switch(categoryName) {
      case "Internet Access":
      case "Free Public Internet":
      case "National Broadband Project":
        return "Network Performance";
      case "Infrastructure":
        return "Infrastructure Analytics";
      case "Public Buildings":
        return "Building Analytics";
      case "Natural Features":
        return "Conservation Analytics";
      case "Environmental Risks":
        return "Risk Analytics";
      case "Points of Interest":
        return "Visitor Analytics";
      case "Population Data":
        return "Demographic Analytics";
      case "Traffic Data":
        return "Traffic Analytics";
      default:
        return "Performance Analytics";
    }
  }

  function getMaintenanceLabel(categoryName) {
    switch(categoryName) {
      case "Internet Access":
      case "Free Public Internet":
      case "National Broadband Project":
        return "Maintenance History";
      case "Infrastructure":
        return "Maintenance Records";
      case "Public Buildings":
        return "Building Maintenance";
      case "Natural Features":
        return "Conservation Records";
      case "Environmental Risks":
        return "Incident History";
      case "Points of Interest":
        return "Facility Records";
      case "Population Data":
        return "Data Updates";
      case "Traffic Data":
        return "Monitoring History";
      default:
        return "Activity History";
    }
  }

  function getNetworkLabel(categoryName) {
    switch(categoryName) {
      case "Internet Access":
      case "Free Public Internet":
      case "National Broadband Project":
        return "Network Info";
      case "Infrastructure":
        return "System Status";
      case "Public Buildings":
        return "Building Systems";
      case "Natural Features":
        return "Environmental Data";
      case "Environmental Risks":
        return "Risk Monitoring";
      case "Points of Interest":
        return "Facility Status";
      case "Population Data":
        return "Data Sources";
      case "Traffic Data":
        return "Traffic Monitoring";
      default:
        return "System Info";
    }
  }

  function getMaintenanceCategories() {
    return [
      "Internet Access", "Free Public Internet", "National Broadband Project", 
      "Infrastructure", "Public Buildings", "Natural Features", 
      "Environmental Risks", "Points of Interest", "Traffic Data"
    ];
  }

  function getNetworkCategories() {
    return [
      "Internet Access", "Free Public Internet", "National Broadband Project", 
      "Infrastructure", "Public Buildings", "Natural Features", 
      "Environmental Risks", "Points of Interest", "Population Data", "Traffic Data"
    ];
  }

  function loadTechnicalDetails(site, category) {
    const technicalDetails = getTechnicalDetails(site.id);
    const content = document.getElementById("technical-details-content");
    
    const categoryTemplate = categoryTemplates[category.category] || categoryTemplates['default'];
    const categorySpecificDetails = categoryTemplate({...site, technicalDetails: technicalDetails});
    
    content.innerHTML = categorySpecificDetails;
  }

  function addEventListeners(site, category, drawer) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabSections.forEach(section => section.classList.remove('active'));
        
        this.classList.add('active');
        const targetSection = document.getElementById(targetTab + '-section');
        if (targetSection) {
          targetSection.classList.add('active');
          
          if (targetTab === 'performance-analytics') {
            loadPerformanceAnalytics(site, category);
          } else if (targetTab === 'maintenance-history') {
            loadMaintenanceHistory(site, category);
          } else if (targetTab === 'network-info') {
            loadNetworkInfo(site, category);
          } else if (targetTab === 'download-report-main') {
            loadDownloadReportContent(site, category);
          }
        }
      });
    });

    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
      firstTab.classList.add('active');
    }

    const drawerCloseBtn = document.getElementById("drawer-close");
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", function() {
        drawer.classList.remove("open");
        drawer.classList.remove("expanded");
        
        const sideWrapper = document.querySelector(".side-wrapper");
        if (sideWrapper) {
          sideWrapper.classList.remove("active");
        }
        
        hideAllSections();
        
        // Clean up integrated live feed
        const videoElement = document.getElementById('live-feed-video-player');
        if (videoElement) {
          videoElement.pause();
          if (window.integratedHlsPlayer) {
            try {
              window.integratedHlsPlayer.destroy();
              window.integratedHlsPlayer = null;
            } catch (error) {
              console.warn("Error destroying integrated HLS player:", error);
            }
          }
          videoElement.src = '';
        }
        
        if (window.hideLiveFeedCard) {
          window.hideLiveFeedCard();
        }
      });
    }

    const viewMoreBtn = document.getElementById("view-more");
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener("click", function() {
        drawer.classList.toggle("expanded");

        if (drawer.classList.contains("expanded")) {
          showExpandedView(site, category, drawer);
        }
      });
    }

    const scheduleBtn = document.getElementById("schedule-btn");
    if (scheduleBtn) {
      scheduleBtn.addEventListener("click", function() {
        alert("Inspection scheduled successfully!");
        const inspectionSection = document.getElementById("inspection-section");
        if (inspectionSection) {
          inspectionSection.style.display = "none";
        }
      });
    }

    const cancelInspectionBtn = document.getElementById("cancel-inspection-btn");
    if (cancelInspectionBtn) {
      cancelInspectionBtn.addEventListener("click", function() {
        const form = document.getElementById("inspection-form");
        if (form) {
          form.reset();
        }
        const inspectionSection = document.getElementById("inspection-section");
        if (inspectionSection) {
          inspectionSection.style.display = "none";
        }
      });
    }

    // Add event listener for direct PDF generation
    const directGenerateBtn = document.getElementById("direct-generate-report-btn");
    if (directGenerateBtn) {
      directGenerateBtn.addEventListener("click", function() {
        // Show loading state
        const originalText = directGenerateBtn.innerHTML;
        directGenerateBtn.innerHTML = '<span style="margin-right: 8px;">⏳</span>Generating Report...';
        directGenerateBtn.disabled = true;
        
        // Generate PDF report after short delay
        setTimeout(() => {
          downloadPDFReport(site, category);
          
          // Reset button state
          directGenerateBtn.innerHTML = originalText;
          directGenerateBtn.disabled = false;
        }, 1000);
      });
    }
  }

  function loadDownloadReportContent(site, category) {
    const content = document.getElementById("download-report-content");
    if (content) {
      content.innerHTML = `
        <h4>Generate Comprehensive Report</h4>
        <p>Generate a detailed executive report for <strong>${site.name}</strong> including all technical specifications, performance analytics, maintenance history, and strategic recommendations.</p>
        
        <div class="report-preview-section" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <h5 style="margin-bottom: 10px; color: #FAD754;">Report Contents:</h5>
          <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
            <li>Site Information & Classification</li>
            <li>${getCategorySpecificReportSections(category.category).join('</li><li>')}</li>
            <li>Strategic Recommendations</li>
          </ul>
        </div>
        
        <div class="site-actions">
          <div class="site-actions-row">
            <button class="btn-primary" id="generate-report-btn" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
              <span style="margin-right: 8px;"></span>Generate Executive Report
            </button>
          </div>
        </div>
      `;

      const generateReportBtn = document.getElementById("generate-report-btn");
      if (generateReportBtn) {
        generateReportBtn.addEventListener("click", function() {
          // Show loading state
          const originalText = generateReportBtn.innerHTML;
          generateReportBtn.innerHTML = '<span style="margin-right: 8px;">⏳</span>Generating Report...';
          generateReportBtn.disabled = true;
          
          // Generate PDF report
          setTimeout(() => {
            downloadPDFReport(site, category);
            
            // Reset button state
            generateReportBtn.innerHTML = originalText;
            generateReportBtn.disabled = false;
          }, 800);
        });
      }
    }
  }

  function loadPerformanceAnalytics(site, category) {
    const content = document.getElementById("performance-analytics-content");
    const analyticsHtml = generatePerformanceAnalytics(category.category, site);
    content.innerHTML = analyticsHtml;
  }

  function loadMaintenanceHistory(site, category) {
    const content = document.getElementById("maintenance-history-content");
    const maintenanceLogs = getMaintenanceLogs(site.id);
    
    let headerText = getMaintenanceLabel(category.category);
    let contentHtml = `<h4>${headerText}</h4>`;
    
    if (category.category === "Internet Access" || category.category === "Free Public Internet" || category.category === "National Broadband Project") {
      if (maintenanceLogs.length === 0) {
        contentHtml += '<div class="empty-state">No maintenance records found for this site.</div>';
      } else {
        maintenanceLogs.forEach((log) => {
          contentHtml += `
            <div class="maintenance-entry">
              <div class="maintenance-entry-header">
                <span class="maintenance-entry-date">${log.date}</span>
                <span class="maintenance-entry-type ${log.type.toLowerCase()}">${log.type}</span>
              </div>
              <div class="maintenance-entry-content">
                <p><strong>Technician:</strong> ${log.technician}</p>
                <p><strong>Duration:</strong> ${log.duration}</p>
                <p><strong>Description:</strong> ${log.description}</p>
                <p><strong>Findings:</strong> ${log.findings}</p>
                ${log.followUpRequired ? 
                  `<div class="maintenance-follow-up">
                    <p><strong>Follow-up Required:</strong> Yes</p>
                    <p><strong>Follow-up Date:</strong> ${log.followUpDate}</p>
                    <p><strong>Follow-up Notes:</strong> ${log.followUpNotes}</p>
                  </div>` : 
                  `<p><strong>Follow-up Required:</strong> No</p>`
                }
              </div>
            </div>
          `;
        });
      }
    } else {
      contentHtml += generateCategorySpecificHistory(category.category, site);
    }
    
    content.innerHTML = contentHtml;
  }

  function loadNetworkInfo(site, category) {
    const content = document.getElementById("network-info-content");
    let headerText = getNetworkLabel(category.category);
    let contentHTML = `<h4>${headerText}</h4>`;
    
    if (category.category === "Internet Access" || category.category === "Free Public Internet" || category.category === "National Broadband Project") {
      const networkInfo = getNetworkInfo(site.id);
      
      contentHTML += `
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Status:</span>
            <span class="detail-item-value">${networkInfo.status}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Uptime:</span>
            <span class="detail-item-value">${networkInfo.uptime}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Bandwidth:</span>
            <span class="detail-item-value">${networkInfo.bandwidth}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Latency:</span>
            <span class="detail-item-value">${networkInfo.latency}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Signal Strength:</span>
            <span class="detail-item-value">${networkInfo.signalStrength}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Connected Devices:</span>
            <span class="detail-item-value">${networkInfo.connectedDevices}</span>
          </div>
        </div>
        <div class="detail-item" style="margin-top: 15px;">
          <span class="detail-item-label">Last Update:</span>
          <span class="detail-item-value">${networkInfo.lastUpdate}</span>
        </div>
      `;
    } else {
      contentHTML += generateCategorySpecificNetworkInfo(category.category, site);
    }
    
    content.innerHTML = contentHTML;
  }

  function generateCategorySpecificHistory(category, site) {
    switch(category) {
      case "Infrastructure":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-15</span>
              <span class="maintenance-entry-type routine">Structural Inspection</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Inspector:</strong> Civil Engineer Maria Santos</p>
              <p><strong>Duration:</strong> 6 hours</p>
              <p><strong>Findings:</strong> Infrastructure condition rated at 86%. Minor concrete spalling observed on south wall. Overall structural integrity remains excellent.</p>
              <p><strong>Recommendations:</strong> Schedule concrete repair within 3 months. No immediate safety concerns.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-02-28</span>
              <span class="maintenance-entry-type routine">Preventive Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Technician:</strong> Maintenance Team Alpha</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Findings:</strong> All systems operational. Drainage cleaned, lighting checked, safety equipment verified.</p>
              <p><strong>Status:</strong> Maintenance completed successfully</p>
            </div>
          </div>
        `;
      case "Public Buildings":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-10</span>
              <span class="maintenance-entry-type routine">HVAC Service</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Contractor:</strong> CoolAir Systems Inc.</p>
              <p><strong>Duration:</strong> 8 hours</p>
              <p><strong>Work Performed:</strong> Annual HVAC system maintenance, filter replacement, efficiency testing</p>
              <p><strong>Results:</strong> System efficiency improved by 12%. Energy consumption reduced.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-03-22</span>
              <span class="maintenance-entry-type routine">Safety Inspection</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Inspector:</strong> Fire Safety Bureau</p>
              <p><strong>Duration:</strong> 3 hours</p>
              <p><strong>Findings:</strong> All fire safety systems operational. Emergency exits clear. Fire extinguishers serviced.</p>
              <p><strong>Compliance:</strong> 100% - Certificate renewed</p>
            </div>
          </div>
        `;
      case "Natural Features":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-30</span>
              <span class="maintenance-entry-type routine">Ecological Assessment</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Biologist:</strong> Dr. Elena Rodriguez</p>
              <p><strong>Duration:</strong> 12 hours (2 days)</p>
              <p><strong>Assessment:</strong> Biodiversity index remains high at 7.8/10. Native species population stable.</p>
              <p><strong>Observations:</strong> Minimal invasive species encroachment. Water quality excellent.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-01-15</span>
              <span class="maintenance-entry-type routine">Trail Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Parks & Recreation Crew</p>
              <p><strong>Duration:</strong> 16 hours (4 days)</p>
              <p><strong>Work Done:</strong> Trail clearing, erosion control, signage updates, waste removal</p>
              <p><strong>Status:</strong> All visitor trails restored to excellent condition</p>
            </div>
          </div>
        `;
      case "Environmental Risks":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-20</span>
              <span class="maintenance-entry-type emergency">Flood Risk Assessment</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Risk Management Office</p>
              <p><strong>Trigger:</strong> Heavy rainfall warning issued</p>
              <p><strong>Assessment:</strong> Water levels monitored. Early warning systems activated.</p>
              <p><strong>Actions:</strong> Community alerts sent. Emergency response teams on standby.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-03-08</span>
              <span class="maintenance-entry-type routine">Sensor Calibration</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Technician:</strong> Environmental Monitoring Team</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Work:</strong> All 12 monitoring sensors calibrated and tested</p>
              <p><strong>Status:</strong> All systems operational. Data accuracy verified.</p>
            </div>
          </div>
        `;
      case "Points of Interest":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-12</span>
              <span class="maintenance-entry-type routine">Facility Cleaning</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Service:</strong> Heritage Site Maintenance</p>
              <p><strong>Duration:</strong> 6 hours</p>
              <p><strong>Work:</strong> Deep cleaning, artifact preservation check, visitor area maintenance</p>
              <p><strong>Visitor Impact:</strong> No disruption to regular operating hours</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-02-14</span>
              <span class="maintenance-entry-type routine">Security Update</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Contractor:</strong> SecureGuard Systems</p>
              <p><strong>Duration:</strong> 3 hours</p>
              <p><strong>Upgrades:</strong> CCTV system updated, access control systems tested</p>
              <p><strong>Result:</strong> Security coverage improved by 25%</p>
            </div>
          </div>
        `;
      case "Traffic Data":
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-18</span>
              <span class="maintenance-entry-type routine">Sensor Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Traffic Management Systems</p>
              <p><strong>Duration:</strong> 2 hours</p>
              <p><strong>Work:</strong> Traffic counting sensors cleaned and calibrated</p>
              <p><strong>Data Quality:</strong> 99.8% accuracy maintained</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-03</span>
              <span class="maintenance-entry-type routine">Data Analysis</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Analyst:</strong> Traffic Engineering Office</p>
              <p><strong>Period:</strong> Q1 2025 Data Review</p>
              <p><strong>Findings:</strong> 15% increase in traffic volume during peak hours</p>
              <p><strong>Recommendations:</strong> Consider traffic flow optimization measures</p>
            </div>
          </div>
        `;
      default:
        return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-20</span>
              <span class="maintenance-entry-type routine">General Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> General Maintenance Crew</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Work:</strong> Routine inspection and maintenance procedures completed</p>
              <p><strong>Status:</strong> All systems operating normally</p>
            </div>
          </div>
        `;
    }
  }

  function generateCategorySpecificNetworkInfo(category, site) {
    switch(category) {
      case "Infrastructure":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Monitoring Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Collection:</span>
              <span class="detail-item-value">Real-time</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Sensor Network:</span>
              <span class="detail-item-value">8 sensors active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connectivity:</span>
              <span class="detail-item-value">4G/LTE + Fiber backup</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Power Status:</span>
              <span class="detail-item-value">Grid + Solar backup</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Communication:</span>
              <span class="detail-item-value">2 minutes ago</span>
            </div>
          </div>
          
        `;
      case "Public Buildings":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Building Management System:</span>
              <span class="detail-item-value">Online</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Occupancy Sensors:</span>
              <span class="detail-item-value">15 active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">HVAC Control:</span>
              <span class="detail-item-value">Automated</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Energy Monitoring:</span>
              <span class="detail-item-value">Real-time</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Security Integration:</span>
              <span class="detail-item-value">Connected</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Occupancy:</span>
              <span class="detail-item-value">68% (820/1200)</span>
            </div>
          </div>
          
        `;
      case "Natural Features":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Weather Station:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Water Quality Sensors:</span>
              <span class="detail-item-value">3 monitoring points</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Air Quality Index:</span>
              <span class="detail-item-value">Good (42 AQI)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Soil Moisture:</span>
              <span class="detail-item-value">Optimal (65%)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Temperature:</span>
              <span class="detail-item-value">28°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Humidity:</span>
              <span class="detail-item-value">72%</span>
            </div>
          </div>
          
        `;
      case "Environmental Risks":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Alert System Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Monitoring Sensors:</span>
              <span class="detail-item-value">12 operational</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Risk Level:</span>
              <span class="detail-item-value">${site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Medium' : 'Low'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Alert:</span>
              <span class="detail-item-value">None (30 days)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Communication Range:</span>
              <span class="detail-item-value">5 km radius</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Response Time:</span>
              <span class="detail-item-value">< 5 minutes</span>
            </div>
          </div>
         
        `;
      case "Points of Interest":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Visitor Counter:</span>
              <span class="detail-item-value">Digital tracking active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Visitors:</span>
              <span class="detail-item-value">142 people</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">WiFi Status:</span>
              <span class="detail-item-value">Available (50 Mbps)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Audio Guide System:</span>
              <span class="detail-item-value">12 languages available</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Security Cameras:</span>
              <span class="detail-item-value">8 cameras active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Emergency Stations:</span>
              <span class="detail-item-value">4 locations</span>
            </div>
          </div>
          
        
        `;
      case "Population Data":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Data Collection Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Survey Completion:</span>
              <span class="detail-item-value">74% response rate</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High (95% accuracy)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Update Frequency:</span>
              <span class="detail-item-value">Monthly</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Source Integration:</span>
              <span class="detail-item-value">PSA + Local Records</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Privacy Compliance:</span>
              <span class="detail-item-value">DPA Compliant</span>
            </div>
          </div>
          
        `;
      case "Traffic Data":
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Traffic Sensors:</span>
              <span class="detail-item-value">6 active sensors</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Volume:</span>
              <span class="detail-item-value">1,847 vehicles/hour</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Average Speed:</span>
              <span class="detail-item-value">45 km/h</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Congestion Level:</span>
              <span class="detail-item-value">${site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Medium' : 'Low'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Accuracy:</span>
              <span class="detail-item-value">99.8%</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Real-time Updates:</span>
              <span class="detail-item-value">Every 30 seconds</span>
            </div>
          </div>
          
        `;
      default:
        return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">System Status:</span>
              <span class="detail-item-value">Operational</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connectivity:</span>
              <span class="detail-item-value">Online</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Update:</span>
              <span class="detail-item-value">5 minutes ago</span>
            </div>
          </div>
        `;
    }
  }

  function hideAllSections() {
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
  }

  function getCategoryLabel(category, subcategory) {
    const categoryMappings = {
      'Infrastructure': 'Infrastructure',
      'Public Buildings': 'Public Buildings',
      'Natural Features': 'Natural Features',
      'Environmental Risks': 'Environmental Risks',
      'Points of Interest': 'Points of Interest',
      'Population Data': 'Population Data',
      'Internet Access': 'Internet Access',
      'Traffic Data': 'Traffic Data',
      'National Broadband Project': 'National Broadband Project'
    };
    
    return categoryMappings[category] || category;
  }

  function addMaintenanceLogListener(site, category) {
    const maintenanceLogBtn = document.getElementById("maintenance-log-btn");
    if (maintenanceLogBtn) {
      maintenanceLogBtn.addEventListener("click", function() {
        hideAllSections();
        
        const logSection = document.getElementById("maintenance-log-section");
        const logContent = document.getElementById("maintenance-log-content");
        
        if (!logSection || !logContent) {
          console.error('Maintenance log section or content not found');
          return;
        }
        
        logSection.style.display = "block";
        
        let headerText = getFirstButtonLabel(category.category);
        logSection.querySelector("h3").textContent = headerText;
        
        let contentHtml = '';
        
        if (category.category === "Internet Access" || category.category === "Free Public Internet") {
          const logs = getMaintenanceLogs(site.id);
          
          if (logs.length === 0) {
            contentHtml = '<div class="empty-state">No maintenance records found for this site.</div>';
          } else {
            logs.forEach((log) => {
              contentHtml += `
                <div class="maintenance-entry">
                  <div class="maintenance-entry-header">
                    <span class="maintenance-entry-date">${log.date}</span>
                    <span class="maintenance-entry-type ${log.type.toLowerCase()}">${log.type}</span>
                  </div>
                  <div class="maintenance-entry-content">
                    <p><strong>Technician:</strong> ${log.technician}</p>
                    <p><strong>Duration:</strong> ${log.duration}</p>
                    <p><strong>Description:</strong> ${log.description}</p>
                    <p><strong>Findings:</strong> ${log.findings}</p>
                    ${log.followUpRequired ? 
                      `<div class="maintenance-follow-up">
                        <p><strong>Follow-up Required:</strong> Yes</p>
                        <p><strong>Follow-up Date:</strong> ${log.followUpDate}</p>
                        <p><strong>Follow-up Notes:</strong> ${log.followUpNotes}</p>
                      </div>` : 
                      `<p><strong>Follow-up Required:</strong> No</p>`
                    }
                  </div>
                </div>
              `;
            });
          }
        } else {
          contentHtml = generatePerformanceAnalytics(category.category, site);
        }
        
        logContent.innerHTML = contentHtml;
      });
    }
  }

  function addNetworkInfoListener(site, category) {
    const networkInfoBtn = document.getElementById("network-info-btn");
    if (networkInfoBtn) {
      networkInfoBtn.addEventListener("click", function() {
        hideAllSections();
        
        const networkInfoSection = document.getElementById("network-info-section");
        const networkInfoContent = document.getElementById("network-info-content");
        
        if (!networkInfoSection || !networkInfoContent) {
          console.error('Network info section or content not found');
          return;
        }
        
        networkInfoSection.style.display = "block";
        
        let headerText = getSecondButtonLabel(category.category);
        networkInfoSection.querySelector("h3").textContent = headerText;
        
        let contentHTML = '';
        
        if (category.category === "Internet Access" || category.category === "Free Public Internet") {
          const networkInfo = getNetworkInfo(site.id);
          
          contentHTML = `
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-item-label">Status:</span>
                <span class="detail-item-value">${networkInfo.status}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Uptime:</span>
                <span class="detail-item-value">${networkInfo.uptime}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Bandwidth:</span>
                <span class="detail-item-value">${networkInfo.bandwidth}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Latency:</span>
                <span class="detail-item-value">${networkInfo.latency}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Signal Strength:</span>
                <span class="detail-item-value">${networkInfo.signalStrength}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Connected Devices:</span>
                <span class="detail-item-value">${networkInfo.connectedDevices}</span>
              </div>
            </div>
            <div class="detail-item" style="margin-top: 15px;">
              <span class="detail-item-label">Last Update:</span>
              <span class="detail-item-value">${networkInfo.lastUpdate}</span>
            </div>
          `;
        } else {
          contentHTML = generateDataManagementContent(category.category, site);
        }
        
        networkInfoContent.innerHTML = contentHTML;
      });
    }
  }

function addTechnicalDetailsListener(site, category) {
    const technicalDetailsBtn = document.getElementById("technical-details-btn");
    if (technicalDetailsBtn) {
      technicalDetailsBtn.addEventListener("click", function() {
        hideAllSections();
        
        const technicalDetailsSection = document.getElementById("technical-details-section");
        const technicalDetailsContent = document.getElementById("technical-details-content");
        
        if (!technicalDetailsSection || !technicalDetailsContent) {
          console.error('Technical details section or content not found');
          return;
        }
        
        technicalDetailsSection.style.display = "block";
        
        const technicalDetails = getTechnicalDetails(site.id);
        
        let contentHTML = `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Installation Date:</span>
              <span class="detail-item-value">${technicalDetails.installationDate}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Maintenance:</span>
              <span class="detail-item-value">${technicalDetails.lastMaintenance}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Coverage Area:</span>
              <span class="detail-item-value">${technicalDetails.coverageArea}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">${technicalDetails.operatingHours}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Service Provider:</span>
              <span class="detail-item-value">${technicalDetails.serviceProvider}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Inspection:</span>
              <span class="detail-item-value">${technicalDetails.lastInspection}</span>
            </div>
          </div>
        `;
        
        technicalDetailsContent.innerHTML = contentHTML;
      });
    }
  }

  function getFirstButtonLabel(category) {
    switch(category) {
      case "Internet Access":
      case "Free Public Internet":
        return "Maintenance History";
      default:
        return "Performance Analytics";
    }
  }

  function getSecondButtonLabel(category) {
    switch(category) {
      case "Internet Access":
      case "Free Public Internet":
        return "Network Info";
      case "Infrastructure":
        return "Infrastructure Status";
      case "Public Buildings":
        return "Building Directory";
      case "Natural Features":
        return "Environmental Data";
      case "Environmental Risks":
        return "Risk Assessment";
      case "Points of Interest":
        return "Location Details";
      case "Population Data":
        return "Demographic Profile";
      case "National Broadband Project":
        return "Network Connectivity";
      default:
        return "Data Management";
    }
  }

  function generatePerformanceAnalytics(category, site) {
    let title, metrics, chartType;
    
    switch(category) {
      case "Infrastructure":
        title = "Infrastructure Performance Metrics";
        metrics = [
          { name: "Condition Rating", value: "86%", trend: "stable" },
          { name: "Maintenance Efficiency", value: "92%", trend: "up" },
          { name: "Utilization Rate", value: "78%", trend: "up" },
          { name: "Service Reliability", value: "99.8%", trend: "stable" }
        ];
        chartType = "condition";
        break;
      case "Public Buildings":
        title = "Building Performance Metrics";
        metrics = [
          { name: "Occupancy Rate", value: "92%", trend: "up" },
          { name: "Energy Efficiency", value: "85%", trend: "up" },
          { name: "Maintenance Cost", value: "-12%", trend: "down" },
          { name: "User Satisfaction", value: "4.7/5", trend: "up" }
        ];
        chartType = "occupancy";
        break;
      case "Natural Features":
        title = "Conservation Performance";
        metrics = [
          { name: "Biodiversity Index", value: "7.8/10", trend: "up" },
          { name: "Water Quality", value: "Good", trend: "stable" },
          { name: "Visitor Impact", value: "Low", trend: "stable" },
          { name: "Preservation Rating", value: "92%", trend: "up" }
        ];
        chartType = "biodiversity";
        break;
      case "Environmental Risks":
        title = "Risk Mitigation Performance";
        metrics = [
          { name: "Early Warning Effectiveness", value: "95%", trend: "up" },
          { name: "Community Preparedness", value: "83%", trend: "up" },
          { name: "Response Time", value: "8.4 min", trend: "down" },
          { name: "Recovery Rate", value: "76%", trend: "up" }
        ];
        chartType = "risk";
        break;
      case "Points of Interest":
        title = "Visitor Engagement Analytics";
        metrics = [
          { name: "Visitor Satisfaction", value: "4.8/5", trend: "up" },
          { name: "Average Visit Duration", value: "72 min", trend: "up" },
          { name: "Return Rate", value: "68%", trend: "up" },
          { name: "Digital Engagement", value: "89%", trend: "up" }
        ];
        chartType = "visitors";
        break;
      case "Population Data":
        title = "Community Engagement Metrics";
        metrics = [
          { name: "Survey Participation", value: "74%", trend: "up" },
          { name: "Public Service Utilization", value: "82%", trend: "up" },
          { name: "Community Program Attendance", value: "65%", trend: "stable" },
          { name: "Digital Access", value: "91%", trend: "up" }
        ];
        chartType = "community";
        break;
      case "National Broadband Project":
        title = "Network Performance Analytics";
        metrics = [
          { name: "Network Availability", value: "99.95%", trend: "up" },
          { name: "Bandwidth Utilization", value: "78%", trend: "up" },
          { name: "User Adoption", value: "86%", trend: "up" },
          { name: "Service Quality", value: "4.7/5", trend: "stable" }
        ];
        chartType = "network";
        break;
      case "Internet Access":
      case "Free Public Internet":
        title = "Network Performance Metrics";
        metrics = [
          { name: "Network Uptime", value: "99.8%", trend: "up" },
          { name: "Average Speed", value: "95 Mbps", trend: "up" },
          { name: "User Satisfaction", value: "4.6/5", trend: "up" },
          { name: "Peak Usage", value: "350 users", trend: "up" }
        ];
        chartType = "network";
        break;
      case "Traffic Data":
        title = "Traffic Performance Analytics";
        metrics = [
          { name: "Average Daily Volume", value: "15,000", trend: "up" },
          { name: "Peak Hour Congestion", value: "Medium", trend: "stable" },
          { name: "Traffic Flow Efficiency", value: "78%", trend: "up" },
          { name: "Incident Response Time", value: "12 min", trend: "down" }
        ];
        chartType = "traffic";
        break;
      default:
        title = "Performance Metrics";
        metrics = [
          { name: "Overall Rating", value: "87%", trend: "up" },
          { name: "Operational Efficiency", value: "92%", trend: "up" },
          { name: "Maintenance Compliance", value: "98%", trend: "stable" },
          { name: "User Satisfaction", value: "4.5/5", trend: "up" }
        ];
        chartType = "general";
    }
    
    let metricsHtml = '';
    metrics.forEach(metric => {
      const trendIcon = metric.trend === "up" ? 
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>' : 
        metric.trend === "down" ? 
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      
      metricsHtml += `
        <div class="metric-row">
          <span class="metric-label">${metric.name}</span>
          <span class="metric-value">
            ${metric.value} ${trendIcon}
          </span>
        </div>
      `;
    });
    
    let chartHtml = '';
    if (chartType === "condition") {
      chartHtml = `
        <div class="chart-container">
          <h4>Infrastructure Condition Trend</h4>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 75%;" title="2022: 78%"></div>
            <div class="chart-bar" style="height: 80%;" title="2023: 82%"></div>
            <div class="chart-bar" style="height: 84%;" title="2024: 86%"></div>
            <div class="chart-bar" style="height: 86%;" title="2025: 88%"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
    } else if (chartType === "risk") {
      chartHtml = `
        <div class="chart-container">
          <h4>Risk Incident Frequency</h4>
          <div class="chart-bars">
            <div class="chart-bar risk-high" style="height: 90%;" title="2022: 18 incidents"></div>
            <div class="chart-bar risk-medium" style="height: 70%;" title="2023: 14 incidents"></div>
            <div class="chart-bar risk-low" style="height: 40%;" title="2024: 8 incidents"></div>
            <div class="chart-bar risk-low" style="height: 25%;" title="2025: 5 incidents"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
    } else {
      chartHtml = `
        <div class="chart-container">
          <h4>Performance Trend</h4>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 65%;" title="2022"></div>
            <div class="chart-bar" style="height: 72%;" title="2023"></div>
            <div class="chart-bar" style="height: 85%;" title="2024"></div>
            <div class="chart-bar" style="height: 92%;" title="2025"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
    }
    
    return `
      <h4>${title}</h4>
      <div class="metrics-grid">
        ${metricsHtml}
      </div>
      ${chartHtml}
      <div class="last-updated">
        Last updated: May 26, 2025
      </div>
    `;
  }

  function generateDataManagementContent(category, site) {
    let content = '';
    
    switch(category) {
      case "Infrastructure":
        content = `
          <h4>Infrastructure Status</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Current Status:</span>
              <span class="detail-item-value">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Engineering Standard:</span>
              <span class="detail-item-value">ISO 12944-5:2018</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Material Composition:</span>
              <span class="detail-item-value">Reinforced Concrete</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Design Capacity:</span>
              <span class="detail-item-value">250,000 users daily</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Expected Lifespan:</span>
              <span class="detail-item-value">45 years</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Age:</span>
              <span class="detail-item-value">7 years</span>
            </div>
          </div>
          
          <h4>Utility Connections</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Power Supply: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Water Supply: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Data Network: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Emergency Systems: Operational</span>
          </div>
        `;
        break;
        
      case "Public Buildings":
        content = `
          <h4>Building Directory</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Floors:</span>
              <span class="detail-item-value">5</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">10,540 sq. meters</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Occupancy Capacity:</span>
              <span class="detail-item-value">1,200 persons</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">Monday-Friday, 8:00 AM - 5:00 PM</span>
            </div>
          </div>
          
          <h4>Facility Status</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Main Power: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backup Generator: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Fire Safety Systems: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Elevator Systems: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>HVAC Systems: Operational</span>
          </div>
        `;
        break;
        
      case "Natural Features":
        content = `
          <h4>Environmental Data</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">24.5 hectares</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Elevation:</span>
              <span class="detail-item-value">120-350 meters</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Climate Zone:</span>
              <span class="detail-item-value">Tropical</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Ecosystem Type:</span>
              <span class="detail-item-value">Riparian Forest</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Native Species:</span>
              <span class="detail-item-value">78 cataloged</span>
            </div>
          </div>
          
          <h4>Biodiversity Indicators</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Flora Diversity Index:</span>
              <span class="detail-item-value">High (7.8/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Fauna Diversity Index:</span>
              <span class="detail-item-value">Medium (6.4/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Invasive Species Presence:</span>
              <span class="detail-item-value">Low (2.1/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Conservation Status:</span>
              <span class="detail-item-value">Protected</span>
            </div>
          </div>
        `;
        break;
        
      case "Environmental Risks":
        content = `
          <h4>Risk Assessment</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Risk Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Risk Level:</span>
              <span class="detail-item-value">${site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Medium' : 'Low'}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Affected Area:</span>
              <span class="detail-item-value">3.7 sq. kilometers</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Population Exposure:</span>
              <span class="detail-item-value">~15,000 people</span>
            </div>
          </div>
          
          <h4>Hazard Monitoring Systems</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Early Warning System: Active</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Real-time Sensors: Online (12/12)</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Community Alert System: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Data Integration: Connected to NDRRMC</span>
          </div>
        `;
        break;
        
      case "Points of Interest":
        content = `
          <h4>Location Details</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Establishment Date:</span>
              <span class="detail-item-value">2015</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">4.2 hectares</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Ownership:</span>
              <span class="detail-item-value">${site.subcategory.includes("Community") ? "Public" : "Private"}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">9:00 AM - 8:00 PM</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Peak Visitor Time:</span>
              <span class="detail-item-value">2:00 PM - 5:00 PM</span>
            </div>
          </div>
          
          <h4>Visitor Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Daily Average Visitors:</span>
              <span class="detail-item-value">2,500</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Monthly Visitor Trend:</span>
              <span class="detail-item-value">Increasing</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Visitor Satisfaction:</span>
              <span class="detail-item-value">4.7/5.0</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Special Events:</span>
              <span class="detail-item-value">2 upcoming in May 2025</span>
            </div>
          </div>
        `;
        break;
        
      case "Population Data":
        content = `
          <h4>Demographic Profile</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Area Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Population:</span>
              <span class="detail-item-value">68,750</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Population Density:</span>
              <span class="detail-item-value">12,500/km²</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Growth Rate:</span>
              <span class="detail-item-value">1.8% annually</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Median Age:</span>
              <span class="detail-item-value">28.5 years</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Household Size:</span>
              <span class="detail-item-value">4.2 persons</span>
            </div>
          </div>
          
          <h4>Community Statistics</h4>
          <div style="margin-bottom: 10px;">
            <p style="margin-bottom: 5px; font-weight: 500;">Age Distribution:</p>
            <div style="display: flex; height: 20px; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
              <div style="width: 28%; background-color: #90CAF9; height: 100%;" title="0-19 years: 28%"></div>
              <div style="width: 38%; background-color: #42A5F5; height: 100%;" title="20-39 years: 38%"></div>
              <div style="width: 22%; background-color: #1E88E5; height: 100%;" title="40-59 years: 22%"></div>
              <div style="width: 12%; background-color: #0D47A1; height: 100%;" title="60+ years: 12%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span>0-19: 28%</span>
              <span>20-39: 38%</span>
              <span>40-59: 22%</span>
              <span>60+: 12%</span>
            </div>
          </div>
          
          <div style="margin-bottom: 10px;">
            <p style="margin-bottom: 5px; font-weight: 500;">Education Levels:</p>
            <div style="display: flex; height: 20px; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
              <div style="width: 18%; background-color: #FFCC80; height: 100%;" title="Primary: 18%"></div>
              <div style="width: 42%; background-color: #FFB74D; height: 100%;" title="Secondary: 42%"></div>
              <div style="width: 32%; background-color: #FF9800; height: 100%;" title="Tertiary: 32%"></div>
              <div style="width: 8%; background-color: #E65100; height: 100%;" title="Post-graduate: 8%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span>Primary: 18%</span>
              <span>Secondary: 42%</span>
              <span>Tertiary: 32%</span>
              <span>Post-grad: 8%</span>
            </div>
          </div>
        `;
        break;
        
      case "National Broadband Project":
        content = `
          <h4>Network Connectivity</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Node Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Installation Date:</span>
              <span class="detail-item-value">June 15, 2023</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Coverage Radius:</span>
              <span class="detail-item-value">3.2 kilometers</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Capacity:</span>
              <span class="detail-item-value">10 Gbps</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connection Type:</span>
              <span class="detail-item-value">Fiber Optic</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Power Supply:</span>
              <span class="detail-item-value">Main grid + Solar backup</span>
            </div>
          </div>
          
          <h4>Network Connectivity</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backbone Connection: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Last Mile Distribution: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Local Government Network: Integrated</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Educational Institutions: 8 connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Public Access Points: 24 active</span>
          </div>
        `;
        break;
        
      default:
        content = `
          <h4>Data Management</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Status:</span>
              <span class="detail-item-value">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Updated:</span>
              <span class="detail-item-value">May 7, 2025</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Database Size:</span>
              <span class="detail-item-value">14.8 GB</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Records:</span>
              <span class="detail-item-value">26,542</span>
            </div>
          </div>
          
          <h4>System Status</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Primary Database: Online</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backup System: Synchronized</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>API Services: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Analytics Dashboard: Available</span>
          </div>
        `;
    }
    
    return content;
  }

  const categoryTemplates = {
    'Infrastructure': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Infrastructure Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Construction Date:</span>
            <span class="detail-item-value">${details.installationDate || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${details.coverageArea || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Capacity:</span>
            <span class="detail-item-value">${details.capacity || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Condition Rating:</span>
            <span class="detail-item-value">${details.conditionRating || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Responsible Agency:</span>
            <span class="detail-item-value">${details.serviceProvider || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${details.operatingHours || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    },
    
    'Public Buildings': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Building Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Year Built:</span>
            <span class="detail-item-value">${details.installationDate || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Square Footage:</span>
            <span class="detail-item-value">${details.squareFootage || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${details.operatingHours || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Capacity:</span>
            <span class="detail-item-value">${details.capacity || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Renovation:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Accessibility Features:</span>
            <span class="detail-item-value">${details.accessibilityFeatures || 'Available'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Maintaining Authority:</span>
            <span class="detail-item-value">${details.serviceProvider || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'Natural Features': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Natural Feature Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Area Size:</span>
            <span class="detail-item-value">${details.coverageArea || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Protected Status:</span>
            <span class="detail-item-value">${details.protectedStatus || 'Protected'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Conservation Efforts:</span>
            <span class="detail-item-value">${details.conservationEfforts || 'Ongoing monitoring'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Assessment:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Biodiversity Rating:</span>
            <span class="detail-item-value">${details.biodiversityRating || 'High'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Responsible Agency:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Cebu Environment and Natural Resources Office'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'Environmental Risks': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Risk Assessment</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Risk Level:</span>
            <span class="detail-item-value">${site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Moderate' : 'Low'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Assessment Date:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Affected Area:</span>
            <span class="detail-item-value">${details.coverageArea || site.subcategory}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Mitigation Measures:</span>
            <span class="detail-item-value">${details.mitigationMeasures || 'Early warning systems, infrastructure reinforcement'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Historical Incidents:</span>
            <span class="detail-item-value">${details.historicalIncidents || 'Multiple minor incidents recorded'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Agency:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Cebu City Risk Reduction and Management Office'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'Points of Interest': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Point of Interest Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Established:</span>
            <span class="detail-item-value">${details.installationDate || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${details.operatingHours || '8:00 AM - 6:00 PM'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Visitor Capacity:</span>
            <span class="detail-item-value">${details.capacity || 'Varies by season'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Services Offered:</span>
            <span class="detail-item-value">${details.servicesOffered || 'Information, amenities, guided tours'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Contact Information:</span>
            <span class="detail-item-value">${details.contactInformation || '+63 32 XXX XXXX'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Management:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Cebu City Tourism Office'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Renovation:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'Population Data': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Population Statistics</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Census Date:</span>
            <span class="detail-item-value">${details.censusDate || '2024'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Total Population:</span>
            <span class="detail-item-value">${details.totalPopulation || 'See demographic data'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Density (per km²):</span>
            <span class="detail-item-value">${details.densityPerKm || 'Varies by district'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Age Distribution:</span>
            <span class="detail-item-value">${details.ageDistribution || '0-14: 28%, 15-64: 67%, 65+: 5%'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Growth Rate:</span>
            <span class="detail-item-value">${details.growthRate || '1.8% annually'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Data Source:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Philippine Statistics Authority'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Updated:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'Internet Access': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Internet Access Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Installation Date:</span>
            <span class="detail-item-value">${details.installationDate || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Provider:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Department of Information and Communications Technology'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Connection Type:</span>
            <span class="detail-item-value">${details.connectionType || 'Fiber Optic'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Average Speed:</span>
            <span class="detail-item-value">${details.averageSpeed || '100 Mbps'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Radius:</span>
            <span class="detail-item-value">${details.coverageArea || '100-500 meters'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${details.operatingHours || '24/7'}</span>
          </div>
        </div>
      `;
    },
    
    'Traffic Data': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Traffic Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Since:</span>
            <span class="detail-item-value">${details.installationDate || '2023'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Peak Hours:</span>
            <span class="detail-item-value">${details.peakHours || 'Weekdays 7-9 AM, 5-7 PM'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Average Daily Volume:</span>
            <span class="detail-item-value">${details.averageVolume || '15,000-30,000 vehicles'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Congestion Level:</span>
            <span class="detail-item-value">${site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Moderate' : 'Low'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Updated:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Agency:</span>
            <span class="detail-item-value">${details.serviceProvider || 'Cebu City Traffic Management'}</span>
          </div>
        </div>
      `;
    },
    
    'National Broadband Project': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>NBP Infrastructure Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Deployment Date:</span>
            <span class="detail-item-value">${details.installationDate || '2023-2025'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Network Type:</span>
            <span class="detail-item-value">${site.subcategory || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Bandwidth Capacity:</span>
            <span class="detail-item-value">${details.capacity || '10 Gbps'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${details.coverageArea || 'Varies by facility type'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Status:</span>
            <span class="detail-item-value">${site.status || 'Active'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Service Provider:</span>
            <span class="detail-item-value">${details.serviceProvider || 'DICT - National Broadband Program'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    },

    'default': (site) => {
      const details = site.technicalDetails || {};
      return `
        <h4>Technical Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Installation Date:</span>
            <span class="detail-item-value">${details.installationDate || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${details.lastMaintenance || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${details.coverageArea || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${details.operatingHours || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Service Provider:</span>
            <span class="detail-item-value">${details.serviceProvider || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${details.lastInspection || 'N/A'}</span>
          </div>
        </div>
      `;
    }
  };

  // ENHANCED PDF GENERATION FUNCTION WITH CATEGORY-SPECIFIC CONTENT
  function downloadPDFReport(site, category) {
    try {
      if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        console.error("jsPDF library not found");
        alert("PDF generation library is not available. Please ensure jsPDF is loaded.");
        return;
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      
      // Set document properties
      doc.setProperties({
        title: `${site.name} - Infrastructure Report`,
        subject: `${category.category} Executive Report`,
        author: 'Department of Finance Management System',
        keywords: `infrastructure, ${category.category}, site report`,
        creator: 'Dashboard System'
      });
      
      // Category-specific colors
      let headerColor = getCategoryColor(category.category);
      
      // Header Section
      doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.rect(0, 0, 210, 30, 'F');
      
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text("DEPARTMENT OF FINANCE", 105, 12, { align: "center" });
      doc.text("EXECUTIVE REPORT", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.text(`${category.category} Analysis`, 105, 26, { align: "center" });
      
      let yPosition = 45;
      
      // Site Information Header
      doc.setFontSize(16);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text("SITE INFORMATION", 15, yPosition);
      
      // Add underline
      doc.setDrawColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.setLineWidth(0.8);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      
      // Basic site information with enhanced formatting
      const basicInfo = [
        [`Site Name:`, site.name],
        [`Category:`, getCategoryLabel(category.category, site.subcategory)],
        [`Subcategory:`, site.subcategory],
        [`Current Status:`, site.status.charAt(0).toUpperCase() + site.status.slice(1)],
        [`Geographic Location:`, `${site.location[0].toFixed(6)}, ${site.location[1].toFixed(6)}`],
        [`Site Identifier:`, site.id],
        [`Report Generated:`, `${dateStr} at ${timeStr}`]
      ];
      
      basicInfo.forEach(([label, value], index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(label, 20, yPosition + (index * 7));
        doc.setFont("helvetica", "normal");
        doc.text(value, 80, yPosition + (index * 7));
      });
      
      yPosition += (basicInfo.length * 7) + 15;
      
      // Description Section
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text("SITE DESCRIPTION", 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 10;
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      
      const descriptionLines = doc.splitTextToSize(site.description, 175);
      doc.text(descriptionLines, 20, yPosition);
      yPosition += (descriptionLines.length * 5) + 15;
      
      // Category-Specific Technical Details
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      
      const categorySpecificData = getCategorySpecificPDFData(category.category, site);
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text(categorySpecificData.technicalTitle, 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      
      // Technical details in two columns for better space utilization
      const halfLength = Math.ceil(categorySpecificData.technicalDetails.length / 2);
      const leftColumn = categorySpecificData.technicalDetails.slice(0, halfLength);
      const rightColumn = categorySpecificData.technicalDetails.slice(halfLength);
      
      leftColumn.forEach(([label, value], index) => {
        if (yPosition + (index * 7) > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(label, 20, yPosition + (index * 7));
        doc.setFont("helvetica", "normal");
        doc.text(value, 75, yPosition + (index * 7));
      });
      
      let rightYPosition = yPosition;
      rightColumn.forEach(([label, value], index) => {
        if (rightYPosition + (index * 7) > 270) {
          doc.addPage();
          rightYPosition = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(label, 110, rightYPosition + (index * 7));
        doc.setFont("helvetica", "normal");
        doc.text(value, 165, rightYPosition + (index * 7));
      });
      
      yPosition += Math.max(leftColumn.length, rightColumn.length) * 7 + 15;
      
      // Performance Analytics Section
      if (yPosition > 180) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text("PERFORMANCE ANALYTICS", 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      
      const performanceMetrics = getCategoryPerformanceMetrics(category.category, site);
      
      performanceMetrics.forEach((metric, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${metric}`, 20, yPosition + (index * 6));
      });
      
      yPosition += (performanceMetrics.length * 6) + 15;
      
      // Operational Status Section  
      if (yPosition > 180) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text(categorySpecificData.statusTitle, 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      
      categorySpecificData.statusDetails.forEach((detail, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${detail}`, 20, yPosition + (index * 6));
      });
      
      yPosition += (categorySpecificData.statusDetails.length * 6) + 15;
      
      // Maintenance & History Section
      if (yPosition > 150) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text(categorySpecificData.maintenanceTitle, 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      
      const maintenanceData = getCategoryMaintenanceData(category.category, site);
      
      maintenanceData.forEach((item, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFont("helvetica", "bold");
        doc.text(`${item.date} - ${item.type}`, 20, yPosition + (index * 20));
        doc.setFont("helvetica", "normal");
        doc.text(`Technician: ${item.technician}`, 20, yPosition + (index * 20) + 5);
        doc.text(`Duration: ${item.duration}`, 20, yPosition + (index * 20) + 10);
        
        const findingsLines = doc.splitTextToSize(`Findings: ${item.findings}`, 160);
        doc.text(findingsLines, 20, yPosition + (index * 20) + 15);
      });
      
      yPosition += (maintenanceData.length * 20) + 20;
      
      // Strategic Recommendations Section
      if (yPosition > 180) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text("STRATEGIC RECOMMENDATIONS", 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      
      const recommendations = getCategoryRecommendations(category.category, site);
      
      recommendations.forEach((rec, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
        doc.text(recLines, 20, yPosition + (index * 12));
      });
      
      yPosition += (recommendations.length * 12) + 20;
      
      // Executive Summary Section
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
      doc.text("EXECUTIVE SUMMARY", 15, yPosition);
      doc.line(15, yPosition + 2, 195, yPosition + 2);
      
      yPosition += 12;
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      
      const executiveSummary = getExecutiveSummary(category.category, site);
      const summaryLines = doc.splitTextToSize(executiveSummary, 175);
      doc.text(summaryLines, 20, yPosition);
      
      // Footer on all pages
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, 15, 285);
        doc.text(`Department of Finance Management System`, 105, 285, { align: 'center' });
        doc.text(`Generated: ${dateStr}`, 195, 285, { align: 'right' });
        
        // Add classification footer
        doc.setFontSize(7);
        doc.text(`OFFICIAL USE - ${category.category.toUpperCase()} INFRASTRUCTURE REPORT`, 105, 292, { align: 'center' });
      }
      
      // Save the PDF with enhanced filename
      const sanitizedSiteName = site.name.replace(/[^a-zA-Z0-9]/g, '_');
      const sanitizedCategory = category.category.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${site.id}_${sanitizedSiteName}_${sanitizedCategory}_Executive_Report_${now.toISOString().split('T')[0]}.pdf`;
      
      doc.save(filename);
      
    } catch (error) {
      console.error("Error generating enhanced PDF report:", error);
      alert("Could not generate PDF report. Please check console for details and ensure jsPDF library is properly loaded.");
    }
  }

  // Helper function to get category-specific colors
  function getCategoryColor(categoryName) {
    const colors = {
      'Infrastructure': [41, 128, 185],
      'Public Buildings': [39, 174, 96],
      'Natural Features': [46, 204, 113],
      'Environmental Risks': [231, 76, 60],
      'Points of Interest': [155, 89, 182],
      'Population Data': [243, 156, 18],
      'Internet Access': [52, 152, 219],
      'Free Public Internet': [52, 152, 219],
      'National Broadband Project': [26, 188, 156],
      'Traffic Data': [230, 126, 34]
    };
    return colors[categoryName] || [52, 73, 94];
  }

  // Helper function to get category-specific PDF data
  function getCategorySpecificPDFData(categoryName, site) {
    const technicalDetails = getTechnicalDetails(site.id);
    
    switch(categoryName) {
      case 'Infrastructure':
        return {
          technicalTitle: "INFRASTRUCTURE SPECIFICATIONS",
          technicalDetails: [
            ["Construction Date:", technicalDetails.installationDate || "2018-2020"],
            ["Engineering Standard:", "ISO 12944-5:2018"],
            ["Material Composition:", "Reinforced Concrete & Steel"],
            ["Design Capacity:", "250,000 users daily"],
            ["Current Age:", "5-7 years"],
            ["Expected Lifespan:", "45-50 years"],
            ["Coverage Area:", technicalDetails.coverageArea || "Metropolitan area"],
            ["Structural Condition:", "86% (Excellent)"],
            ["Safety Compliance:", "100% Certified"],
            ["Environmental Rating:", "Grade A"],
            ["Maintenance Schedule:", "Quarterly inspections"],
            ["Responsible Agency:", technicalDetails.serviceProvider || "Cebu City Engineering Dept."]
          ],
          statusTitle: "INFRASTRUCTURE OPERATIONAL STATUS",
          statusDetails: [
            "Structural integrity monitoring: Real-time sensors active",
            "Primary power supply: Grid connection stable",
            "Water supply systems: Fully operational and tested",
            "Data network connectivity: High-speed fiber active",
            "Emergency backup systems: Tested monthly, 100% operational",
            "Safety systems: Fire suppression, evacuation routes certified",
            "Environmental controls: Air quality and noise within limits",
            "Access control: Security systems operational 24/7"
          ],
          maintenanceTitle: "INFRASTRUCTURE MAINTENANCE RECORDS"
        };
        
      case 'Public Buildings':
        return {
          technicalTitle: "BUILDING SPECIFICATIONS",
          technicalDetails: [
            ["Year Built:", technicalDetails.installationDate || "2015-2018"],
            ["Total Floor Area:", "10,540 sq. meters"],
            ["Number of Floors:", "5 floors"],
            ["Occupancy Capacity:", "1,200 persons"],
            ["Building Classification:", site.subcategory],
            ["Operating Schedule:", technicalDetails.operatingHours || "8:00 AM - 5:00 PM"],
            ["Accessibility Features:", "Full ADA compliance"],
            ["Energy Rating:", "LEED Gold Certified"],
            ["Fire Safety Rating:", "Class A"],
            ["Seismic Rating:", "Zone 4 Compliant"],
            ["HVAC System:", "Central air, 85% efficiency"],
            ["Managing Authority:", technicalDetails.serviceProvider || "Cebu City Administration"]
          ],
          statusTitle: "BUILDING SYSTEMS STATUS",
          statusDetails: [
            "HVAC systems: Operational at 85% efficiency, recently serviced",
            "Fire safety systems: All detectors, alarms, and sprinklers active",
            "Elevator systems: 4 units operational, monthly safety inspections",
            "Backup generator: 500kW capacity, tested weekly",
            "Security systems: 24/7 monitoring, CCTV coverage complete",
            "Building automation: Smart systems managing lighting and climate",
            "Emergency systems: Evacuation routes clear, emergency lighting tested",
            "Telecommunications: High-speed internet and phone systems active"
          ],
          maintenanceTitle: "BUILDING MAINTENANCE HISTORY"
        };
        
      case 'Natural Features':
        return {
          technicalTitle: "CONSERVATION SPECIFICATIONS",
          technicalDetails: [
            ["Protected Area Size:", "24.5 hectares"],
            ["Elevation Range:", "120-350 meters above sea level"],
            ["Climate Classification:", "Tropical monsoon"],
            ["Primary Ecosystem:", "Riparian Forest"],
            ["Protection Status:", "City-designated nature preserve"],
            ["Biodiversity Index:", "7.8/10 (High)"],
            ["Native Species Count:", "78 catalogued species"],
            ["Endangered Species:", "3 species under protection"],
            ["Water Quality Rating:", "Excellent (Class A)"],
            ["Air Quality Index:", "Good (42 AQI)"],
            ["Conservation Priority:", "High priority preservation zone"],
            ["Managing Agency:", technicalDetails.serviceProvider || "Cebu Environment Office"]
          ],
          statusTitle: "ECOLOGICAL HEALTH STATUS",
          statusDetails: [
            "Biodiversity monitoring: High species diversity maintained",
            "Water quality systems: 3 monitoring stations active",
            "Invasive species control: Minimal presence, active management",
            "Wildlife monitoring: 6 camera traps recording continuously",
            "Trail maintenance: All visitor paths well-maintained and safe",
            "Soil conservation: Erosion control measures effective",
            "Vegetation health: Native flora thriving, restoration ongoing",
            "Visitor impact management: Low impact, sustainable tourism practices"
          ],
          maintenanceTitle: "CONSERVATION ACTIVITY RECORDS"
        };
        
      case 'Environmental Risks':
        return {
          technicalTitle: "RISK ASSESSMENT SPECIFICATIONS",
          technicalDetails: [
            ["Primary Risk Type:", site.subcategory],
            ["Current Risk Level:", site.status === 'critical' ? 'High' : site.status === 'warning' ? 'Medium' : 'Low'],
            ["Affected Geographic Area:", "3.7 sq. kilometers"],
            ["Population at Risk:", "~15,000 residents"],
            ["Monitoring Sensor Network:", "12 active units"],
            ["Early Warning Range:", "5 km radius coverage"],
            ["Response Time Target:", "< 5 minutes"],
            ["Risk Probability:", "Moderate (seasonal)"],
            ["Historical Frequency:", "5 incidents in past 3 years"],
            ["Mitigation Effectiveness:", "89% success rate"],
            ["Community Preparedness:", "83% awareness level"],
            ["Managing Agency:", technicalDetails.serviceProvider || "Cebu DRRMO"]
          ],
          statusTitle: "HAZARD MONITORING STATUS",
          statusDetails: [
            "Early warning system: Operational with AI-powered predictions",
            "Real-time sensor network: 12/12 sensors online and calibrated",
            "Community alert system: SMS, radio, and mobile app notifications",
            "Emergency response teams: 24/7 standby with 5-minute response time",
            "Data integration: Connected to PAGASA and NDRRMC systems",
            "Public awareness programs: Regular drills and education campaigns",
            "Evacuation routes: Clearly marked and regularly maintained",
            "Emergency supplies: Strategic stockpiles maintained at 3 locations"
          ],
          maintenanceTitle: "INCIDENT AND RESPONSE HISTORY"
        };
        
      case 'Points of Interest':
        return {
          technicalTitle: "FACILITY SPECIFICATIONS",
          technicalDetails: [
            ["Establishment Date:", technicalDetails.installationDate || "2015"],
            ["Total Site Area:", "4.2 hectares"],
            ["Facility Classification:", site.subcategory],
            ["Daily Operating Hours:", "9:00 AM - 8:00 PM"],
            ["Peak Visitor Capacity:", "2,500 daily average"],
            ["Peak Operating Hours:", "2:00 PM - 5:00 PM"],
            ["Ownership Type:", site.subcategory.includes("Community") ? "Public" : "Private"],
            ["Accessibility Rating:", "Full universal access"],
            ["Heritage Status:", "Culturally significant site"],
            ["Tourism Category:", "Major attraction"],
            ["Annual Visitor Count:", "850,000+ visitors"],
            ["Managing Authority:", technicalDetails.serviceProvider || "Cebu Tourism Office"]
          ],
          statusTitle: "VISITOR SERVICES STATUS",
          statusDetails: [
            "WiFi infrastructure: High-speed internet (50 Mbps) available",
            "Audio guide systems: Available in 12 languages",
            "Security monitoring: 8 CCTV cameras with 24/7 coverage",
            "Emergency response: 4 strategically located emergency stations",
            "Digital visitor tracking: Real-time occupancy monitoring",
            "Accessibility services: Wheelchair access, audio descriptions",
            "Information services: Multi-lingual staff and digital displays",
            "Gift shop and amenities: Full visitor services operational"
          ],
          maintenanceTitle: "FACILITY MAINTENANCE RECORDS"
        };
        
      case 'Population Data':
        return {
          technicalTitle: "DEMOGRAPHIC PROFILE SPECIFICATIONS",
          technicalDetails: [
            ["Geographic Classification:", site.subcategory],
            ["Total Population Count:", "68,750 residents"],
            ["Population Density:", "12,500 people per km²"],
            ["Annual Growth Rate:", "1.8% (above national average)"],
            ["Median Age:", "28.5 years"],
            ["Average Household Size:", "4.2 persons"],
            ["Survey Response Rate:", "74% participation"],
            ["Data Accuracy Level:", "95% confidence"],
            ["Census Methodology:", "Door-to-door + digital"],
            ["Update Frequency:", "Monthly updates, annual census"],
            ["Privacy Compliance:", "DPA compliant data handling"],
            ["Data Source Authority:", technicalDetails.serviceProvider || "PSA + Local Records"]
          ],
          statusTitle: "COMMUNITY DEMOGRAPHIC INDICATORS",
          statusDetails: [
            "Age distribution: Balanced with 38% in prime working age (20-39)",
            "Education levels: 32% tertiary educated, 8% post-graduate",
            "Digital connectivity: 91% have regular internet access",
            "Public service utilization: 82% actively use city services",
            "Community program participation: 65% engage in local programs",
            "Economic indicators: Rising middle-class population",
            "Health metrics: Above-average life expectancy and wellness",
            "Quality of life index: 7.2/10 based on resident surveys"
          ],
          maintenanceTitle: "DATA COLLECTION HISTORY"
        };
        
      case 'Internet Access':
      case 'Free Public Internet':
        return {
          technicalTitle: "NETWORK INFRASTRUCTURE SPECIFICATIONS",
          technicalDetails: [
            ["Installation Date:", technicalDetails.installationDate || "2022-2023"],
            ["Connection Technology:", "Fiber Optic Backbone"],
            ["Bandwidth Capacity:", "1 Gbps dedicated"],
            ["Average Download Speed:", "95 Mbps"],
            ["Average Upload Speed:", "45 Mbps"],
            ["Coverage Radius:", technicalDetails.coverageArea || "500 meters"],
            ["Operating Schedule:", "24/7 continuous service"],
            ["Maximum Concurrent Users:", "350 simultaneous connections"],
            ["Network Uptime:", "99.8% availability"],
            ["Security Protocol:", "WPA3 encryption"],
            ["Bandwidth Management:", "Fair usage policy implemented"],
            ["Service Provider:", technicalDetails.serviceProvider || "DICT Philippines"]
          ],
          statusTitle: "NETWORK OPERATIONAL STATUS",
          statusDetails: [
            "Network availability: 99.8% uptime with redundant connections",
            "Signal strength: Excellent coverage (-65 dBm average)",
            "Latency performance: 18ms average response time",
            "Current device load: 8 active connections (normal load)",
            "Bandwidth utilization: 78% of capacity during peak hours",
            "User satisfaction: 4.6/5 rating from regular users",
            "Security status: No breaches, regular security updates applied",
            "Equipment status: All hardware operational, backup systems ready"
          ],
          maintenanceTitle: "NETWORK MAINTENANCE RECORDS"
        };
        
      case 'National Broadband Project':
        return {
          technicalTitle: "NBP INFRASTRUCTURE SPECIFICATIONS",
          technicalDetails: [
            ["Project Phase:", "Phase 2 (2023-2025)"],
            ["Network Node Type:", site.subcategory],
            ["Bandwidth Capacity:", "10 Gbps backbone"],
            ["Coverage Radius:", technicalDetails.coverageArea || "3.2 km radius"],
            ["Connection Technology:", "Fiber Optic Network"],
            ["Power Infrastructure:", "Grid + Solar backup system"],
            ["Connected Institutions:", "Educational (8), Government (12)"],
            ["Public Access Points:", "24 locations operational"],
            ["Network Reliability:", "99.95% uptime target"],
            ["Deployment Status:", "85% complete"],
            ["Integration Level:", "Full government network integration"],
            ["Project Authority:", "DICT - National Broadband Program"]
          ],
          statusTitle: "NETWORK CONNECTIVITY STATUS",
          statusDetails: [
            "Backbone connection: Active fiber link to national network",
            "Last mile distribution: Operational to all target locations",
            "Government network integration: 100% of offices connected",
            "Educational institution connectivity: 8 schools online",
            "Public WiFi access: 24 hotspots providing free internet",
            "Network performance: 99.95% availability maintained",
            "User adoption rate: 86% of target population using services",
            "Technical support: 24/7 monitoring and rapid response team"
          ],
          maintenanceTitle: "DEPLOYMENT AND MAINTENANCE HISTORY"
        };
        
      case 'Traffic Data':
        return {
          technicalTitle: "TRAFFIC MONITORING SPECIFICATIONS",
          technicalDetails: [
            ["Monitoring Start Date:", technicalDetails.installationDate || "2023"],
            ["Sensor Technology:", "Inductive loop + Camera system"],
            ["Data Collection Interval:", "Real-time every 30 seconds"],
            ["Average Daily Volume:", "18,500 vehicles"],
            ["Peak Traffic Hours:", "7-9 AM, 5-7 PM weekdays"],
            ["Data Accuracy Rate:", "99.8% measurement precision"],
            ["Current Congestion Level:", site.status === 'critical' ? 'High' : 'Medium'],
            ["Speed Monitoring Range:", "5-80 km/h detection"],
            ["Vehicle Classification:", "Cars, trucks, motorcycles, buses"],
            ["Weather Compensation:", "Auto-adjust for conditions"],
            ["Storage Capacity:", "2 years historical data"],
            ["Managing Authority:", technicalDetails.serviceProvider || "Cebu Traffic Management"]
          ],
          statusTitle: "TRAFFIC MONITORING SYSTEM STATUS",
          statusDetails: [
            "Traffic sensor array: 6 units active with redundant coverage",
            "Data processing: Real-time analytics with trend prediction",
            "Alert system: Automated congestion warnings operational",
            "Current traffic volume: 1,847 vehicles/hour (normal flow)",
            "Average speed monitoring: 45 km/h in monitored zone",
            "Incident detection: Automated accident/breakdown alerts",
            "Data integration: Connected to city traffic management center",
            "Public information: Real-time updates via mobile apps and signs"
          ],
          maintenanceTitle: "TRAFFIC MONITORING HISTORY"
        };
        
      default:
        return {
          technicalTitle: "TECHNICAL SPECIFICATIONS",
          technicalDetails: [
            ["Installation Date:", technicalDetails.installationDate || "N/A"],
            ["System Type:", site.subcategory || "General Infrastructure"],
            ["Last Maintenance:", technicalDetails.lastMaintenance || "N/A"],
            ["Coverage Area:", technicalDetails.coverageArea || "N/A"],
            ["Operating Schedule:", technicalDetails.operatingHours || "N/A"],
            ["Service Provider:", technicalDetails.serviceProvider || "N/A"],
            ["Last Inspection:", technicalDetails.lastInspection || "N/A"],
            ["Operational Status:", site.status.charAt(0).toUpperCase() + site.status.slice(1)],
            ["Maintenance Schedule:", "Regular as needed"],
            ["Performance Rating:", "Standard operational level"],
            ["Compliance Status:", "Meets all requirements"],
            ["Responsible Authority:", "Cebu City Government"]
          ],
          statusTitle: "OPERATIONAL STATUS",
          statusDetails: [
            "System status: Operational and within normal parameters",
            "Connectivity: Active connection to city networks",
            "Data quality: High accuracy and reliability maintained",
            "Performance: Meeting established service level agreements",
            "Maintenance: Regular schedule maintained",
            "Compliance: All regulatory requirements met",
            "Monitoring: Continuous oversight and reporting",
            "User services: Available and functioning as designed"
          ],
          maintenanceTitle: "ACTIVITY HISTORY"
        };
    }
  }

  // Helper function to get category-specific performance metrics
  function getCategoryPerformanceMetrics(categoryName, site) {
    const baseMetrics = {
      'Infrastructure': [
        "Structural condition rating: 86% (Excellent) - Above city average of 78%",
        "Maintenance efficiency: 92% improvement over 3-year period",
        "Service utilization rate: 78% of design capacity during peak periods",
        "Safety compliance: 100% certified with zero incidents in past 24 months",
        "Environmental impact assessment: Minimal negative impact, Grade A rating",
        "Public satisfaction score: 4.5/5 from quarterly user surveys",
        "Cost efficiency: 12% under budget with enhanced service delivery",
        "Infrastructure resilience: Exceeds seismic and weather resistance standards"
      ],
      'Public Buildings': [
        "Current occupancy utilization: 92% (High efficiency, optimal space usage)",
        "Energy efficiency performance: 85% (LEED Gold standard compliance)",
        "Operational cost reduction: 12% year-over-year through smart systems",
        "User satisfaction rating: 4.7/5 (Excellent) from monthly feedback surveys",
        "Safety incident rate: 0% (Perfect safety record for 18 consecutive months)",
        "Accessibility compliance: 100% ADA compliant with universal design features",
        "Technology integration: Smart building systems reduce energy consumption by 15%",
        "Maintenance cost per sq ft: ₱12.50 (20% below city average)"
      ],
      'Natural Features': [
        "Biodiversity health index: 7.8/10 (High) - stable ecosystem with increasing species count",
        "Water quality assessment: Good (92%) - exceeds national standards for protected areas",
        "Ecosystem preservation rate: 92% of original habitat intact and thriving",
        "Visitor impact sustainability: Low environmental impact maintained despite 15% visitor increase",
        "Conservation program effectiveness: High success rate in species protection",
        "Species population trends: Stable to increasing for 85% of monitored species",
        "Trail system condition: Excellent with minimal erosion and full accessibility",
        "Community engagement: 78% local participation in conservation programs"
      ],
      'Environmental Risks': [
        "Early warning system effectiveness: 95% accuracy in hazard prediction",
        "Community preparedness level: 83% of population trained in emergency response",
        "Average emergency response time: 8.4 minutes (exceeds 15-minute target)",
        "Risk mitigation success rate: 89% of identified risks successfully managed",
        "Public awareness and education: High (78%) community knowledge of risks and procedures",
        "Sensor network reliability: 99.2% uptime with redundant monitoring systems",
        "Incident prediction accuracy: 87% for weather-related events",
        "Community drill participation: 65% participation in quarterly emergency exercises"
      ],
      'Points of Interest': [
        "Visitor satisfaction rating: 4.8/5 (Outstanding) - highest in regional tourism survey",
        "Average visit duration: 72 minutes (exceeds target of 60 minutes)",
        "Return visitor rate: 68% (indicating high visitor loyalty and satisfaction)",
        "Digital engagement level: 89% of visitors use digital services and guides",
        "Facility condition rating: Excellent with proactive maintenance program",
        "Accessibility service rating: Good (90%) with ongoing improvements planned",
        "Economic impact: ₱125 average revenue per visitor contributing to local economy",
        "Cultural preservation score: 95% authentic experience maintained despite modernization"
      ],
      'Population Data': [
        "Survey participation rate: 74% (exceeds national average of 65%)",
        "Data collection accuracy: 95% confidence level with statistical validation",
        "Public service utilization: 82% of residents actively use city services",
        "Community program engagement: 65% participation in local government programs",
        "Digital literacy and access: 91% have regular internet access and digital skills",
        "Quality of life index: 7.2/10 based on comprehensive resident satisfaction surveys",
        "Economic mobility indicators: 6.8/10 showing positive trends in income growth",
        "Healthcare access: 89% have access to quality healthcare within 5km radius"
      ],
      'Internet Access': [
        "Network availability: 99.8% uptime (exceeds SLA of 99.5%)",
        "Average download speed: 95 Mbps (90% faster than minimum commitment)",
        "Average upload speed: 45 Mbps (supporting video calls and cloud services)",
        "Peak concurrent users: 350 (meeting maximum design capacity)",
        "User satisfaction rating: 4.6/5 from monthly user experience surveys",
        "Connection reliability: 99.2% stable connections with minimal dropouts",
        "Coverage effectiveness: 92% of target area receives excellent signal strength",
        "Support response time: Average 15 minutes for technical issues resolution"
      ],
      'Free Public Internet': [
        "Network availability: 99.8% uptime providing consistent free internet access",
        "Average connection speed: 95 Mbps download enabling full web functionality",
        "Daily active users: 280 average with peaks of 450 during events",
        "Peak usage periods: 2-6 PM (students) and 7-10 PM (general public)",
        "User satisfaction: 4.6/5 rating for free public internet service quality",
        "Data usage per session: 450 MB average supporting educational and business needs",
        "Service cost efficiency: ₱12.50 per user per day (excellent public value)",
        "Digital inclusion impact: 78% report improved access to online services and education"
      ],
      'National Broadband Project': [
        "Network availability: 99.95% uptime (exceeds national target of 99.9%)",
        "Bandwidth utilization: 78% average with capacity for growth",
        "User adoption rate: 86% of target institutions and residents connected",
        "Service quality rating: 4.7/5 from government and educational users",
        "Connection reliability: 99.9% with redundant fiber backbone",
        "Government integration: 100% of targeted government offices connected",
        "Educational connectivity: 8 schools connected with full internet access",
        "Economic impact: Estimated ₱2.3M annual economic benefit to local community"
      ],
      'Traffic Data': [
        "Average daily traffic volume: 18,500 vehicles (within sustainable capacity)",
        "Peak hour congestion index: Medium (manageable with current infrastructure)",
        "Traffic flow efficiency: 78% (good flow with minor bottlenecks during rush hour)",
        "Incident response time: 12 minutes average (meeting city standards)",
        "Data collection accuracy: 99.8% precision in vehicle counting and classification",
        "Sensor network uptime: 99.5% operational availability",
        "Traffic signal optimization: 15% improvement in flow efficiency through AI analytics",
        "Air quality correlation: Traffic-related emissions within acceptable limits"
      ]
    };
    
    return baseMetrics[categoryName] || [
      "Overall performance rating: 87% (Good) - meeting established benchmarks",
      "Operational efficiency: 92% - optimized resource utilization",
      "Maintenance compliance: 98% - proactive maintenance program",
      "User satisfaction: 4.5/5 - positive community feedback",
      "System reliability: 99.2% - consistent service delivery",
      "Cost effectiveness: Within budget with value-added services",
      "Performance improvement: 8% year-over-year enhancement",
      "Future readiness: Infrastructure prepared for next 10 years of growth"
    ];
  }

  // Helper function to get category-specific maintenance data
  function getCategoryMaintenanceData(categoryName, site) {
    const maintenanceLogs = getMaintenanceLogs(site.id);
    
    // If we have actual maintenance logs, use them, otherwise generate category-specific examples
    if (maintenanceLogs && maintenanceLogs.length > 0 && maintenanceLogs[0].date !== "2025-03-10") {
      return maintenanceLogs.slice(0, 3); // Return up to 3 most recent
    }
    
    // Generate category-specific maintenance examples
    const categoryMaintenance = {
      'Infrastructure': [
        {
          date: "2025-04-15",
          type: "Comprehensive Structural Inspection",
          technician: "Civil Engineer Maria Santos, P.E.",
          duration: "6 hours",
          findings: "Infrastructure condition rated at 86% (Excellent). Minor concrete spalling observed on south wall requiring attention within 3 months. Overall structural integrity remains excellent with no immediate safety concerns. Recommended preventive concrete repair and protective coating application."
        },
        {
          date: "2025-02-28", 
          type: "Preventive Maintenance",
          technician: "Maintenance Team Alpha (4 members)",
          duration: "4 hours",
          findings: "All systems operational within specifications. Drainage systems cleaned and flow-tested. LED lighting system inspection completed - all fixtures operational. Safety equipment verified and emergency systems tested. Concrete surfaces cleaned and sealed."
        },
        {
          date: "2025-01-10",
          type: "Quarterly Safety Inspection",
          technician: "Safety Inspector Carlos Mendoza",
          duration: "3 hours",
          findings: "Safety compliance at 100%. All emergency exits clear and properly marked. Fire safety equipment within service dates. Structural stability confirmed. No safety hazards identified. Certificate of compliance issued."
        }
      ],
      'Public Buildings': [
        {
          date: "2025-05-10",
          type: "HVAC System Service",
          technician: "CoolAir Systems Inc. (Certified Contractor)",
          duration: "8 hours", 
          findings: "Annual HVAC system maintenance completed successfully. All 5 units serviced, filters replaced with HEPA-grade filters. System efficiency improved by 12% through calibration. Energy consumption reduced by estimated 8%. Next service scheduled for May 2026."
        },
        {
          date: "2025-03-22",
          type: "Fire Safety Inspection",
          technician: "Bureau of Fire Protection Inspector",
          duration: "3 hours",
          findings: "All fire safety systems operational and compliant. Emergency exits unobstructed and properly lit. Fire extinguishers serviced and within certification dates. Sprinkler system pressure tested and operational. 100% compliance rating achieved, certificate renewed for 12 months."
        },
        {
          date: "2025-01-28",
          type: "Elevator Maintenance",
          technician: "Elevator Solutions Corp.",
          duration: "5 hours",
          findings: "All 4 elevator units inspected and serviced. Safety mechanisms tested and calibrated. Door sensors cleaned and adjusted. Emergency communication systems verified. All units operating within safety parameters with smooth operation."
        }
      ],
      'Natural Features': [
        {
          date: "2025-04-30",
          type: "Ecological Assessment", 
          technician: "Dr. Elena Rodriguez (Marine Biologist)",
          duration: "12 hours (2 days)",
          findings: "Comprehensive biodiversity assessment completed. Biodiversity index maintained at high level (7.8/10). Native species population stable with 3 new bird species documented. Water quality excellent in all test locations. Minimal invasive species encroachment successfully managed."
        },
        {
          date: "2025-01-15",
          type: "Trail System Maintenance",
          technician: "Parks & Recreation Crew (6 members)", 
          duration: "16 hours (4 days)",
          findings: "Complete trail system renovation completed. All visitor trails restored to excellent condition. New erosion control measures installed on steep sections. Trail signage updated with QR codes for digital guides. Waste removal and landscape restoration completed."
        },
        {
          date: "2024-11-20",
          type: "Wildlife Monitoring System",
          technician: "Conservation Technology Team",
          duration: "6 hours",
          findings: "Wildlife camera network maintenance completed. 6 cameras cleaned, batteries replaced, and data downloaded. 847 wildlife images captured in past quarter showing healthy animal populations. Motion sensors calibrated for optimal detection range."
        }
      ],
      'Environmental Risks': [
        {
          date: "2025-05-20",
          type: "Emergency Risk Assessment",
          technician: "Risk Management Office (5 specialists)",
          duration: "4 hours",
          findings: "Comprehensive risk evaluation triggered by weather alert. Water levels monitored across 12 sensor points. Early warning systems activated and tested - all communications functional. Community alert messages sent to 15,000 registered residents. Emergency response teams positioned strategically."
        },
        {
          date: "2025-03-08", 
          type: "Sensor Network Calibration",
          technician: "Environmental Monitoring Team",
          duration: "4 hours",
          findings: "All 12 environmental monitoring sensors calibrated and tested for accuracy. Data transmission verified at 99.8% reliability. Backup power systems tested and operational. Sensor housing cleaned and weatherproofing inspected. Real-time data feed to NDRRMC confirmed operational."
        },
        {
          date: "2024-12-15",
          type: "Community Preparedness Drill",
          technician: "Emergency Response Coordinator",
          duration: "3 hours",
          findings: "Quarterly community emergency drill conducted with 65% resident participation. Evacuation routes tested and timing recorded. Emergency communication systems performed well. Community feedback collected for system improvements. Overall preparedness level rated at 83%."
        }
      ],
      'Points of Interest': [
        {
          date: "2025-05-12",
          type: "Heritage Site Maintenance",
          technician: "Cultural Heritage Preservation Team",
          duration: "6 hours",
          findings: "Comprehensive facility cleaning and preservation work completed. Artifact preservation protocols verified and updated. Visitor area deep cleaning with heritage-safe products. All historical displays inspected and maintained. No disruption to normal operating hours during maintenance."
        },
        {
          date: "2025-02-14",
          type: "Security System Upgrade",
          technician: "SecureGuard Systems (Licensed Contractor)", 
          duration: "3 hours",
          findings: "CCTV system upgraded with 4K resolution cameras. Access control systems tested and user permissions updated. Motion detection calibrated for optimal coverage. Integration with city emergency response systems verified. Security coverage improved by 25% with new system."
        },
        {
          date: "2024-12-10",
          type: "Visitor Experience Enhancement",
          technician: "Digital Experience Team",
          duration: "4 hours",
          findings: "Audio guide systems updated with new content in 12 languages. WiFi network expanded and speed increased to 50 Mbps. Interactive displays calibrated and software updated. QR code systems for contactless information access implemented successfully."
        }
      ],
      'Internet Access': [
        {
          date: "2025-05-18",
          type: "Network Infrastructure Maintenance",
          technician: "DICT Technical Team (3 engineers)",
          duration: "3 hours",
          findings: "Comprehensive network equipment servicing completed. Router and switch firmware updated to latest security versions. Fiber optic connections cleaned and signal strength tested. Bandwidth optimization algorithms updated resulting in 15% performance improvement. 99.8% uptime maintained throughout service period."
        },
        {
          date: "2025-04-02",
          type: "Equipment Upgrade and Security Patch", 
          technician: "Network Solutions Inc. (Certified Partner)",
          duration: "6 hours",
          findings: "Core router hardware upgraded to support increased user demand. Critical security patches applied to all network equipment. User authentication system enhanced with improved encryption. Network monitoring tools updated for better performance tracking. Zero service interruption during upgrade process."
        },
        {
          date: "2025-02-15",
          type: "Coverage Area Expansion",
          technician: "Installation Team (5 technicians)",
          duration: "8 hours",
          findings: "WiFi coverage area extended by 20% through strategic antenna placement. Signal strength improved in previously weak areas. New access points configured with load balancing. Coverage now reaches 92% of target area with excellent signal quality. User capacity increased to 400 concurrent connections."
        }
      ],
      'Traffic Data': [
        {
          date: "2025-05-18",
          type: "Traffic Sensor Maintenance",
          technician: "Traffic Management Systems Team",
          duration: "2 hours",
          findings: "All 6 traffic counting sensors cleaned and recalibrated for accuracy. Inductive loop sensors tested for proper vehicle detection. Camera systems cleaned and focus adjusted for optimal image quality. Data accuracy verified at 99.8% through calibration vehicles. Real-time data feed confirmed operational."
        },
        {
          date: "2025-04-03",
          type: "Quarterly Data Analysis",
          technician: "Traffic Engineering Office (Data Analyst)",
          duration: "4 hours",
          findings: "Q1 2025 traffic data comprehensive analysis completed. 15% increase in traffic volume during peak hours identified. Traffic flow patterns analyzed for optimization opportunities. Recommendations developed for signal timing adjustments. Historical data trends show consistent growth requiring infrastructure planning."
        },
        {
          date: "2025-01-20",
          type: "System Integration Update",
          technician: "Smart City Technology Team",
          duration: "3 hours",
          findings: "Traffic monitoring system integrated with city-wide smart traffic management platform. Real-time data sharing with traffic signal controllers implemented. Mobile app integration completed for public traffic information. AI analytics module installed for predictive traffic modeling and incident detection."
        }
      ]
    };
    
    return categoryMaintenance[categoryName] || [
      {
        date: "2025-04-20",
        type: "General System Maintenance",
        technician: "General Maintenance Crew",
        duration: "4 hours",
        findings: "Routine inspection and maintenance procedures completed according to established protocols. All systems checked and found operating within normal parameters. Preventive maintenance tasks completed successfully. Next scheduled maintenance in 3 months."
      },
      {
        date: "2025-02-15",
        type: "Safety and Compliance Check",
        technician: "Safety Inspector",
        duration: "2 hours",
        findings: "Safety protocols verified and all compliance requirements met. Equipment inspected and found in good working order. Documentation updated and filed appropriately. No safety concerns identified."
      }
    ];
  }

  // Helper function to get category-specific recommendations
  function getCategoryRecommendations(categoryName, site) {
    const recommendations = {
      'Infrastructure': [
        "Schedule concrete repair and protective coating for south wall within 3 months to prevent structural deterioration and extend infrastructure lifespan",
        "Implement IoT-based structural health monitoring system with real-time sensors to enable predictive maintenance and early problem detection",
        "Upgrade drainage systems with larger capacity pipes and smart flow control to handle increased rainfall intensity due to climate change",
        "Conduct comprehensive seismic resilience assessment and retrofitting as needed to meet updated building code requirements",
        "Develop 10-year infrastructure modernization plan including smart technology integration and sustainability improvements",
        "Establish emergency response protocols and backup systems to ensure continued operation during natural disasters or system failures"
      ],
      'Public Buildings': [
        "Continue monthly HVAC preventive maintenance program to maintain 85% efficiency rating and extend equipment lifespan by 30%",
        "Install comprehensive smart building automation system to reduce energy consumption by estimated 15% and improve occupant comfort",
        "Schedule elevator modernization project within 12 months to improve reliability, reduce maintenance costs, and enhance accessibility features",
        "Implement visitor management system with digital check-in to optimize space utilization and improve security monitoring",
        "Upgrade to LED lighting throughout building to reduce energy costs by 40% and improve lighting quality for occupants",
        "Develop building resilience plan including backup power, emergency systems, and climate adaptation measures"
      ],
      'Natural Features': [
        "Expand invasive species control program with quarterly monitoring and removal activities to maintain current biodiversity levels",
        "Install 4 additional wildlife monitoring cameras for comprehensive ecosystem surveillance and research data collection", 
        "Develop interpretive trail system with educational markers and QR-code linked digital content to enhance visitor experience while promoting conservation awareness",
        "Create designated buffer zones around sensitive habitats with restricted access to minimize human impact on critical breeding and nesting areas",
        "Establish citizen science program engaging local community in biodiversity monitoring and conservation activities",
        "Implement climate change adaptation strategies including assisted migration of vulnerable species and habitat restoration"
      ],
      'Environmental Risks': [
        "Upgrade early warning system with AI-powered prediction capabilities to improve forecast accuracy from 87% to 95% for weather-related events",
        "Conduct quarterly community preparedness drills to maintain 85%+ readiness level and improve emergency response coordination",
        "Install 6 additional monitoring sensors in high-risk areas to provide comprehensive coverage and redundant data collection",
        "Develop comprehensive mobile application for real-time risk alerts, evacuation routes, and emergency information accessible to all residents",
        "Create community resilience hubs with emergency supplies, communication equipment, and trained volunteer coordinators",
        "Establish inter-agency coordination protocols with neighboring municipalities for regional disaster response and resource sharing"
      ],
      'Points of Interest': [
        "Expand WiFi infrastructure coverage by 25% to accommodate increasing digital engagement and support for 500+ concurrent users",
        "Install interactive digital kiosks with multilingual information systems, virtual reality experiences, and accessibility features",
        "Develop comprehensive virtual tour platform with 360-degree photography and augmented reality features to extend accessibility globally",
        "Create seasonal events calendar with cultural performances, educational workshops, and community engagement activities to increase return visitor rate to 75%",
        "Implement sustainable tourism practices including visitor impact monitoring, waste reduction programs, and eco-friendly transportation options",
        "Establish partnership with local universities for cultural research, preservation projects, and student internship programs"
      ],
      'Population Data': [
        "Implement real-time demographic tracking system using anonymized mobile data and IoT sensors for better urban planning and service delivery",
        "Increase survey participation to 85% through gamification, digital platforms, and community incentive programs",
        "Develop predictive analytics platform for population growth modeling, infrastructure needs assessment, and resource allocation planning",
        "Create public-facing community dashboard with real-time demographic insights, service utilization data, and quality of life indicators",
        "Establish data-driven policy development process using demographic insights to guide budget allocation and program development",
        "Implement privacy-preserving data collection methods and transparent data governance policies to maintain public trust"
      ],
      'National Broadband Project': [
        "Connect 12 additional educational institutions to expand digital access and support distance learning capabilities throughout the region",
        "Implement redundant fiber backbone connections with automatic failover to ensure 99.99% uptime for critical government services",
        "Develop comprehensive digital literacy programs targeting 5,000 residents to increase adoption rate from 86% to 95%",
        "Plan Phase 3 expansion to underserved rural communities within 25km radius to bridge the digital divide",
        "Establish local technical support center with trained staff for rapid response to connectivity issues and user support",
        "Create innovation hub with high-speed connectivity to support local startups, remote work, and digital entrepreneurship"
      ],
      'Traffic Data': [
        "Install AI-powered smart traffic signal system to improve traffic flow efficiency by 20% and reduce average commute times",
        "Implement automated incident detection system with camera analytics and sensor fusion for response times under 5 minutes",
        "Develop comprehensive traffic mobile application providing real-time conditions, route optimization, and public transit integration",
        "Coordinate with urban planning department to identify infrastructure improvements based on traffic data analysis and growth projections",
        "Establish integrated transportation management center connecting traffic data with public transit, parking, and emergency services",
        "Create sustainable transportation incentive program using traffic data to encourage public transit use and reduce congestion"
      ]
    };
    
    return recommendations[categoryName] || [
      "Continue regular preventive maintenance schedule to ensure optimal performance and extend equipment lifespan",
      "Monitor key performance indicators monthly with quarterly trend analysis for continuous improvement opportunities", 
      "Implement user feedback collection system to identify service gaps and enhancement opportunities",
      "Plan comprehensive annual review and technology upgrade assessment to maintain modern service standards",
      "Develop emergency response protocols and backup procedures to ensure service continuity during disruptions",
      "Establish performance benchmarking against similar facilities to identify best practices and improvement opportunities"
    ];
  }

  // Helper function to generate executive summary
  function getExecutiveSummary(categoryName, site) {
    const summaries = {
      'Infrastructure': `This comprehensive infrastructure assessment of ${site.name} reveals a well-maintained facility operating at 86% condition rating, significantly above the city average. The infrastructure demonstrates excellent structural integrity, full safety compliance, and efficient resource utilization. Current performance metrics indicate sustainable long-term operation with proactive maintenance extending asset lifespan. Key recommendations focus on preventive concrete repair, IoT monitoring implementation, and climate resilience upgrades. The facility serves as a model for infrastructure management with its 99.8% service reliability and positive community impact. Investment in recommended improvements will ensure continued excellent performance and prepare the infrastructure for future growth demands.`,
      
      'Public Buildings': `${site.name} demonstrates exemplary public building management with 92% occupancy utilization and 4.7/5 user satisfaction rating. The facility achieves LEED Gold energy efficiency standards while maintaining 100% safety compliance over 18 consecutive months. Smart building systems contribute to 12% operational cost reduction and enhanced user experience. The building successfully balances high utilization with excellent maintenance standards, positioning it as a flagship public facility. Recommended HVAC continuation, smart automation expansion, and elevator modernization will maintain this excellence while preparing for increased demand. The facility's success model should be replicated across other public buildings in the city system.`,
      
      'Natural Features': `The ecological assessment of ${site.name} demonstrates exceptional conservation success with a biodiversity index of 7.8/10 and 92% ecosystem preservation rate. This 24.5-hectare preserve maintains excellent water quality, stable native species populations, and sustainable visitor management despite 15% annual visitor growth. The conservation program effectively balances environmental protection with public access and education. Wildlife monitoring systems provide valuable research data while invasive species management maintains ecosystem integrity. Recommended expansions in monitoring technology, educational infrastructure, and community engagement will enhance both conservation outcomes and visitor experience while serving as a model for urban environmental preservation.`,
      
      'Environmental Risks': `Risk management assessment for ${site.name} shows highly effective hazard mitigation with 95% early warning accuracy and 89% risk management success rate. The comprehensive monitoring system protects approximately 15,000 residents across 3.7 square kilometers with response times averaging 8.4 minutes. Community preparedness levels at 83% indicate strong public engagement and awareness. The integration with national disaster systems provides regional coordination capabilities. Recommended AI enhancement, sensor expansion, and mobile application development will further improve prediction accuracy and community resilience. This facility represents best practices in community risk management and emergency preparedness.`,
      
      'Points of Interest': `${site.name} excels as a premier cultural destination with 4.8/5 visitor satisfaction and 68% return rate, welcoming over 850,000 annual visitors. The facility successfully combines heritage preservation with modern amenities, achieving 89% digital engagement while maintaining 95% cultural authenticity. Comprehensive accessibility features and multilingual services ensure inclusive access. Economic impact analysis shows significant contribution to local tourism economy. Recommended WiFi expansion, virtual reality integration, and seasonal programming will enhance visitor experience while supporting sustainable tourism growth. The facility serves as a model for heritage site management and community cultural preservation.`,
      
      'Population Data': `Demographic analysis of ${site.name} reveals a dynamic community of 68,750 residents with balanced age distribution and strong educational attainment. The 74% survey participation rate provides high-quality data supporting evidence-based policy development. Community engagement metrics show 82% public service utilization and 91% digital connectivity, indicating strong civic participation and modern infrastructure access. The 1.8% annual growth rate and rising quality of life index (7.2/10) demonstrate positive community trends. Recommended real-time tracking systems, predictive analytics, and public dashboards will enhance data-driven governance while maintaining resident privacy and trust.`,
      
      'Internet Access': `Network performance analysis for ${site.name} demonstrates exceptional public internet service with 99.8% uptime and 95 Mbps average speeds, significantly exceeding minimum commitments. The system successfully serves 350 concurrent users with 4.6/5 satisfaction rating, providing crucial digital access to the community. Technical infrastructure proves robust with redundant systems and proactive maintenance protocols. Cost efficiency at ₱12.50 per user daily provides excellent public value. Recommended Wi-Fi 6 upgrades, coverage expansion, and digital literacy programs will enhance service capacity and community impact while maintaining the high performance standards established.`,
      
      'National Broadband Project': `The NBP implementation at ${site.name} achieves outstanding connectivity with 99.95% uptime and 86% user adoption across target institutions. This Phase 2 deployment successfully connects 8 educational institutions and 12 government offices with 10 Gbps backbone capacity. The project demonstrates significant economic impact with estimated ₱2.3M annual community benefit. Integration with existing infrastructure proves seamless with full government network connectivity achieved. Recommended Phase 3 expansion, digital literacy programming, and technical support center establishment will maximize the project's transformational impact on regional digital equity and economic development.`,
      
      'Traffic Data': `Traffic monitoring analysis for ${site.name} provides comprehensive transportation insights with 99.8% data accuracy across 18,500 daily vehicle movements. The system successfully identifies traffic patterns, peak congestion periods, and optimization opportunities while maintaining real-time data processing capabilities. Current congestion levels remain manageable with 78% flow efficiency during peak periods. Integration with city traffic management systems enables coordinated response to incidents and planned events. Recommended smart signal implementation, AI-powered analytics, and public information systems will transform raw data into actionable traffic improvements and enhanced mobility for residents and visitors.`
    };
    
    return summaries[categoryName] || `Assessment of ${site.name} shows a well-managed facility operating within established parameters with good performance metrics and user satisfaction. The facility demonstrates reliable service delivery, appropriate maintenance standards, and compliance with relevant regulations. Current operational status meets community needs while providing room for enhancement through recommended improvements. Regular monitoring and proactive maintenance ensure continued service quality and preparation for future growth. This facility contributes positively to the city's infrastructure portfolio and serves as a foundation for continued community development.`;
  }

  function getTechnicalDetails(siteId) {
    return window.siteTechnicalDetails?.[siteId] || window.siteTechnicalDetails?.["default"] || {
      installationDate: "2020-01-01",
      lastMaintenance: "2025-01-15",
      coverageArea: "Varies by facility",
      operatingHours: "24/7",
      serviceProvider: "Department of Finance Management System",
      lastInspection: "2025-02-28"
    };
  }

  function getNetworkInfo(siteId) {
    return window.siteNetworkInfo?.[siteId] || window.siteNetworkInfo?.["default"] || {
      status: "Active",
      uptime: "99.8%",
      bandwidth: "450 Mbps",
      latency: "18ms",
      signalStrength: "-65 dBm",
      connectedDevices: 8,
      lastUpdate: "2025-05-26 14:25:36"
    };
  }

  function getMaintenanceLogs(siteId) {
    return window.sitesMaintenanceLogs?.[siteId] || window.sitesMaintenanceLogs?.["default"] || [
      {
        date: "2025-03-10",
        type: "Routine",
        technician: "John Smith",
        duration: "4 hours",
        description: "Standard quarterly maintenance and inspection.",
        findings: "All systems operating within normal parameters.",
        followUpRequired: false
      }
    ];
  }

  window.showInfoDrawer = showInfoDrawer;
});