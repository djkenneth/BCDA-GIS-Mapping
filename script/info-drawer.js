// script/info-drawer.js

document.addEventListener("DOMContentLoaded", function () {
  function showInfoDrawer(site, category, subcategory) {
    const drawer = document.getElementById("info-drawer");
    const drawerContent = document.getElementById("drawer-content");
    const sideWrapper = document.querySelector(".side-wrapper");
    const deviceChannel = document.querySelector('#device-channel');

    if (drawer) {
      drawer.setAttribute("data-site-id", site.id);
    }

    hideAllSections();

    if (sideWrapper) {
      sideWrapper.classList.add("active");

      const cards = sideWrapper.querySelectorAll(".card");
      cards.forEach((card) => {
        if (!card.querySelector(".card-close-btn")) {
          const closeBtn = document.createElement("button");
          closeBtn.className = "card-close-btn";
          closeBtn.innerHTML = "✕";
          closeBtn.setAttribute("title", "Close card");

          closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sideWrapper.classList.remove("active");            
          });

          card.appendChild(closeBtn);
        }
      });
    }

    drawerContent.innerHTML = `
      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <h6 id="site-name">Site Details</h6>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Category:</span>
            <span class="site-detail-value">${category.title}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Zone Type:</span>
            <span class="site-detail-value">${site.id}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Subcategory:</span>
            <span class="site-detail-value">${subcategory?.title}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Status:</span>
            <span class="site-detail-value">
              <span class="status-${site.status}">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Location:</span>
            <span class="site-detail-value">
              ${site.location[0].toFixed(6)}° N, ${site.location[1].toFixed(6)}° E
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Lot Size:</span>
            <span class="site-detail-value">
              ${site.lotSize}
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Lease Expiry:</span>
            <span class="site-detail-value">
              ${site.leaseExpiry}
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Employees:</span>
            <span class="site-detail-value">
              ${site.employees}
            </span>
          </div>
        </div>
      </div>

      ${showGenerateReportTab(category, site)}
    `;

    setupTabEventListeners();

    deviceChannel.innerHTML = site.id

    drawer.classList.add("open");
    drawer.classList.add("style-1");
    
    const directGenerateBtn = document.getElementById(
      "direct-generate-report-btn"
    );
    
    if (directGenerateBtn) {
      directGenerateBtn.addEventListener("click", function () {
        // Show loading state
        const originalText = directGenerateBtn.innerHTML;
        directGenerateBtn.innerHTML =
          '<span style="margin-right: 8px;">⏳</span>Generating Report...';
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

  function hideAllSections() {
    const sections = document.querySelectorAll(".tab-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  }

  function setupViewPortalButton() {
    const viewPortalBtn = document.getElementById('view-portal-btn');
    if (viewPortalBtn) {
        viewPortalBtn.addEventListener('click', function() {
            const drawer = document.getElementById('info-drawer');
            const siteId = drawer ? drawer.getAttribute('data-site-id') : null;
            
            if (siteId) {
                openLocatorPortal(siteId);
            } else {
                console.warn('No site selected for portal view');
                showNotification('Please select a site to view in portal', 'warning');
            }
        });
    }
}

function openLocatorPortal(siteId) {
    // showPortalModal(siteId);
}

  // Alternative modal approach
  function showPortalModal(siteId) {
      const modal = document.createElement('div');
      modal.className = 'portal-modal';
      modal.innerHTML = `
          <div class="portal-modal-content">
              <div class="portal-header">
                  <h3>Locator Portal - Site ${siteId}</h3>
                  <button class="portal-close">&times;</button>
              </div>
              <div class="portal-iframe-container">
                  What is Lorem Ipsum?

                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
          </div>
      `;
      
      const closeBtn = modal.querySelector('.portal-close');
      closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
      });
      
      document.body.appendChild(modal);
  }
  
  setupViewPortalButton();

  window.showInfoDrawer = showInfoDrawer;
});
