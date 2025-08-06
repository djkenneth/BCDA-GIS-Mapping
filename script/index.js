// script/index.js

function initializeCardCloseButtons() {
  const sideWrapper = document.querySelector(".side-wrapper");
  if (sideWrapper) {
    const cards = sideWrapper.querySelectorAll(".card");

    cards.forEach((card) => {
      if (!card.querySelector(".card-close-btn")) {
        const closeBtn = document.createElement("button");
        closeBtn.className = "card-close-btn";
        closeBtn.innerHTML = "×";
        closeBtn.setAttribute("title", "Close cards");

        closeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          sideWrapper.classList.remove("active");

          // Clean up integrated live feed when closing
          const videoElement = document.getElementById(
            "live-feed-video-player"
          );
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
            videoElement.src = "";
          }
        });

        card.appendChild(closeBtn);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeCardCloseButtons();
});
