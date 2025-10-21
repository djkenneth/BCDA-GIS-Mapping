// script/position-manager.js

document.addEventListener('DOMContentLoaded', function() {
  function updateLiveFeedCardPosition() {
    const header = document.querySelector('header');
    const headerCollapsed = header && header.classList.contains('collapsed');
    
    const sidebarContent = document.querySelector('.sidebar-content.visible');
    const sidebarExpanded = sidebarContent !== null;
    
    const windowWidth = window.innerWidth;
    
    let topPosition = CONFIG.DESKTOP.TOP;
    let leftPosition = '360px';

    if (headerCollapsed) {
      topPosition = '20px';
    }
    
    if (sidebarExpanded) {
      leftPosition = windowWidth <= CONFIG.BREAKPOINTS.MOBILE ? '20px' : '360px';
    } else {
      leftPosition = windowWidth <= CONFIG.BREAKPOINTS.MOBILE ? '20px' : '80px';
    }
  }
  
  const header = document.querySelector('header');
  
  if (header) {
    const headerObserver = new MutationObserver(updateLiveFeedCardPosition);
    headerObserver.observe(header, { attributes: true });
  }
  
  const sidebar = document.querySelector('.sidebar');

  if (sidebar) {
    const sidebarObserver = new MutationObserver(updateLiveFeedCardPosition);
    sidebarObserver.observe(sidebar, { attributes: true });
  }
  
  const sidebarContents = document.querySelectorAll('.sidebar-content');

  sidebarContents.forEach(content => {
    const contentObserver = new MutationObserver(updateLiveFeedCardPosition);
    contentObserver.observe(content, { attributes: true });
  });
  
  window.addEventListener('resize', updateLiveFeedCardPosition);
  
  const originalShowLiveFeedCard = window.showLiveFeedCard;

  if (originalShowLiveFeedCard) {
    window.showLiveFeedCard = function(position) {
      originalShowLiveFeedCard(position);
      setTimeout(updateLiveFeedCardPosition, 50);
    };
  }
  
  updateLiveFeedCardPosition();
});