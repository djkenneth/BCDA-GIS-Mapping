// Initialize live feed for the integrated card
async function initializeLiveFeed(site) {
  const videoElement = document.getElementById("live-feed-video-player");
  const loaderElement = document.getElementById("live-feed-loader");

  if (!videoElement) {
    console.error("Video element not found in integrated live feed");
    return;
  }

  if (!loaderElement) {
    console.warn("Loader element not found in integrated live feed");
  }

  try {
    if (loaderElement) {
      loaderElement.style.display = "flex";
      loaderElement.innerHTML = `
          <div class="loader-spinner"></div>
          <div>Loading stream...</div>
        `;
    }

    // Get stream URL (you'll need to implement this based on your API)
    const streamUrl = await getStreamUrl(site.id || "1000013");

    if (!streamUrl) {
      throw new Error("Could not get stream URL");
    }

    await initializeHlsPlayer(videoElement, streamUrl, loaderElement);
  } catch (error) {
    console.error("Error initializing integrated live feed:", error);
    updateLiveFeedError(error.message, loaderElement);
  }
}

// Setup event listeners for the integrated live feed
function setupLiveFeedEventListeners(site) {
  const viewBtn = document.getElementById("live-feed-view-btn");
  if (viewBtn) {
    viewBtn.addEventListener("click", function () {
      const cameraCode =
        this.getAttribute("data-camera-code") || site.id || "1000013";

      const currentPath = window.location.pathname;
      let streamsPath;

      if (
        currentPath.includes("/streams/") ||
        currentPath.endsWith("streams.php")
      ) {
        streamsPath = `?camera=${cameraCode}`;
      } else if (
        currentPath === "/" ||
        currentPath.endsWith("index.php") ||
        currentPath.includes("/index.php")
      ) {
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
    console.error("Error getting stream URL:", error);
  }

  return null;
}

// Store stream URL
function storeStreamUrl(cameraCode, streamData) {
  const streamInfo = {
    url: streamData.html_stream_url,
    rtspUrl: streamData.rtsp_url,
    streamId: streamData.stream_id,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(`stream_${cameraCode}`, JSON.stringify(streamInfo));
    return streamInfo;
  } catch (error) {
    console.error("Error storing stream URL in local storage:", error);
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
    console.error("Error retrieving stream URL from local storage:", error);
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

    fetch(streamUrl, { method: "HEAD" })
      .then((response) => {
        clearTimeout(timeoutId);
        const isValid = response.ok;
        resolve(isValid);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error("Error validating stream URL:", error);
        resolve(false);
      });
  });
}

// Start camera stream
async function startCameraStream(cameraCode) {
  try {
    const channelId = `${cameraCode}$1$0$0`;

    const response = await fetch(
      `https://philtower.itbsstudio.com/api/video/start-stream?channel_id=${channelId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error starting stream: ${response.statusText}`);
    }

    const streamData = await response.json();
    return streamData;
  } catch (error) {
    console.error("Error starting camera stream:", error);
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

    if (typeof Hls !== "undefined" && Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 0,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);

      window.integratedHlsPlayer = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoElement
          .play()
          .then(() => {
            resolve();
          })
          .catch((e) => {
            console.warn("Autoplay prevented in integrated live feed:", e);
            resolve();
          });
      });

      hls.on(Hls.Events.FRAG_BUFFERED, function () {
        if (loaderElement && videoElement.readyState >= 3) {
          loaderElement.style.display = "none";
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error("HLS error in integrated live feed:", data);
        if (data.fatal) {
          reject(new Error("Fatal HLS error: " + data.type));
        }
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
      videoElement.addEventListener("loadedmetadata", function () {
        videoElement
          .play()
          .then(() => {
            if (loaderElement) {
              loaderElement.style.display = "none";
            }
            resolve();
          })
          .catch(reject);
      });
    } else {
      reject(new Error("HLS not supported in this browser"));
    }

    videoElement.addEventListener("timeupdate", function onTimeUpdate() {
      if (videoElement.currentTime > 0 && loaderElement) {
        loaderElement.style.display = "none";
        videoElement.removeEventListener("timeupdate", onTimeUpdate);
      }
    });
  });
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
