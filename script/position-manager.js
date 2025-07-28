document.addEventListener('DOMContentLoaded', function() {
  function updateLiveFeedCardPosition() {
    const liveFeedCard = document.querySelector('.live-feed-card');
    if (!liveFeedCard) return;
    
    const header = document.querySelector('header');
    const headerCollapsed = header && header.classList.contains('collapsed');
    
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content.visible');
    const sidebarExpanded = sidebarContent !== null;
    
    const windowWidth = window.innerWidth;
    
    let topPosition = '248px';
    let leftPosition = '360px';
    
    if (headerCollapsed) {
      topPosition = '20px';
    }
    
    if (sidebarExpanded) {
      leftPosition = windowWidth <= 768 ? '20px' : '360px';
    } else {
      leftPosition = windowWidth <= 768 ? '20px' : '80px';
    }
    
    liveFeedCard.style.position = 'fixed';
    liveFeedCard.style.top = topPosition;
    liveFeedCard.style.left = leftPosition;
    
    if (windowWidth <= 768) {
      liveFeedCard.style.left = '20px';
      
      if (headerCollapsed) {
        liveFeedCard.style.top = '20px';
      } else {
        liveFeedCard.style.top = windowWidth <= 425 ? '230px' : '267px';
      }
      
      if (windowWidth > 425 && windowWidth <= 768) {
        liveFeedCard.style.width = '250px';
        
        if (sidebarExpanded) {
          liveFeedCard.style.left = '510px';
        } else {
          liveFeedCard.style.left = '70px';
        }
      }
    }
    
    if (window.liveFeedCardVisible) {
      liveFeedCard.style.display = 'block';
    }
  }
  
  const header = document.querySelector('header');
  if (header) {
    const headerObserver = new MutationObserver(updateLiveFeedCardPosition);
    headerObserver.observe(header, { attributes: true });
  }
  
  const sidebar = document.querySelector('.sidebar-v2');
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