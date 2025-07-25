<?php
// Clean URLs - remove index.php from URL
if (strpos($_SERVER['REQUEST_URI'], 'index.php') !== false) {
    $redirect_url = str_replace('index.php', '', $_SERVER['REQUEST_URI']);
    header("Location: $redirect_url", true, 301);
    exit();
}
?>
<script>
    document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to see if a camera code was specified
    const urlParams = new URLSearchParams(window.location.search);
    const cameraCode = urlParams.get('camera');
    
    if (cameraCode) {
        console.log("Auto-selecting camera with device code:", cameraCode);
        
        // Set a small delay to make sure the devices list has loaded
        setTimeout(function() {
            // Find the device with the specified code
            const deviceList = document.querySelectorAll('.device-item');
            let targetDevice = null;
            
            deviceList.forEach(device => {
                const deviceName = device.querySelector('.device-name').textContent;
                // Check if the device name contains the camera code
                if (deviceName.includes(cameraCode)) {
                    targetDevice = device;
                }
            });
            
            // If we found the device, click its stream button
            if (targetDevice) {
                const streamBtn = targetDevice.querySelector('.stream-btn');
                if (streamBtn && !streamBtn.disabled) {
                    console.log("Starting stream for camera:", cameraCode);
                    streamBtn.click();
                } else {
                    console.warn("Stream button for camera not available or disabled:", cameraCode);
                }
            } else {
                console.warn("Could not find camera with code:", cameraCode);
            }
        }, 1500); // 1.5 second delay to ensure devices are loaded
    }
});
</script>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Device Streaming Dashboard</title>
        <link rel="icon" type="image/x-icon" href="assets/dict.ico">

    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

    <!-- Leaflet CSS -->
        <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css?t=<?php echo time(); ?>"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin="" /> -->

    <!-- Leaflet JavaScript -->
    <!-- <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js?t=<?php echo time(); ?>"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script> -->

    <!-- MapLibre GL JS CSS -->
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css?t=<?php echo time(); ?>" />

    <!-- MapLibre GL JS JavaScript -->
    <script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js?t=<?php echo time(); ?>"></script>

    <!-- ECharts JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js?t=<?php echo time(); ?>"></script>
    <!-- <link rel="stylesheet" href="style/main.css?t=<?php echo time(); ?>" /> -->
    <link rel="stylesheet" href="../style/main.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="../style/streams.css?t=<?php echo time(); ?>">
    
</head>
<body>
<?php include("../components/header.php") ?>
    <div class="container">
        <!-- Sidebar with device list -->
        <div class="sidebar">
            <div class="sidebar-header">
                Devices
            </div>
            <div class="sidebar-container" id="style-1">
                <div class="sidebar-content" id="deviceList">
                    <!-- Device list will be populated here -->
                    <div class="loading">
                        <div class="spinner"></div>
                        Loading devices...
                    </div>
                </div>
            </div>
            <div class="sidebar-footer">
                <span id="deviceCount">0</span> devices found
            </div>
        </div>

        <!-- Main content with video streams -->
        <div class="main-content">
            <div class="header">
                <h2>Video Streams (<span id="streamCount">0</span>/4)</h2>
                <div>
                    <button id="clearAllBtn" class="clear-all-btn" disabled>
                        Clear All Streams
                    </button>
                    <button id="backToIndexBtn" class="clear-all-btn" onclick="window.location.href='../index.php'">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
            <div id="errorContainer"></div>
            <div id="streamsGrid" class="streams-grid grid-1x1">
                <div class="empty-state" id="emptyState">
                    <div class="empty-icon">📹</div>
                    <p>No active streams</p>
                    <p>Select a device from the sidebar to start streaming</p>
                </div>
                <!-- Stream containers will be added here -->
            </div>
        </div>
    </div>

    <script>
        // Configuration
        const MAX_STREAMS = 4;
        const API_BASE_URL = 'https://philtower.itbsstudio.com'; // Replace with your API base URL if needed

        // State
        let devices = [];
        let activeStreams = [];
        let hlsPlayers = {}; // Store HLS.js instances

        // DOM Elements
        const deviceListEl = document.getElementById('deviceList');
        const deviceCountEl = document.getElementById('deviceCount');
        const streamsGridEl = document.getElementById('streamsGrid');
        const streamCountEl = document.getElementById('streamCount');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const emptyStateEl = document.getElementById('emptyState');
        const errorContainerEl = document.getElementById('errorContainer');

        // Fetch devices from API
     async function fetchDevices() {
        try {
            showDeviceLoading();
            const response = await fetch(`${API_BASE_URL}/api/devices`);
            
            if (!response.ok) {
                throw new Error(`Error fetching devices: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Parse the response based on the specified format
            let allDevices = [];
            
            if (data && data.code === 1000 && data.data && Array.isArray(data.data.pageData)) {
                allDevices = data.data.pageData.map(device => ({
                    code: device.deviceCode,
                    name: device.deviceName + " (" + device.deviceCode + ")",
                    deviceStatus: device.status === "1" ? 1 : 0,
                    ip: device.deviceIp,
                    model: device.deviceModel,
                    manufacturer: device.manufacturerName,
                    channelId: `${device.deviceCode}$1$0$0`
                }));
            } else if (data && data.data && Array.isArray(data.data.list)) {
                allDevices = data.data.list;
            }
            
            // Define the excluded device codes
            const EXCLUDED_DEVICE_CODES = ['1000012', '1000014', '1000006'];
            
            // Filter out the excluded devices
            devices = allDevices.filter(device => {
                const deviceCode = device.code || device.deviceCode;
                return !EXCLUDED_DEVICE_CODES.includes(deviceCode);
            });
            
            renderDeviceList();
        } catch (error) {
            showError(error.message);
            renderEmptyDeviceList();
        }
    }

        // Start a stream for a specific device
       async function startStream(device) {
    if (activeStreams.length >= MAX_STREAMS) {
        showError('Maximum number of streams reached (4). Please stop a stream before starting a new one.');
        return;
    }

    // Disable the stream button immediately to prevent multiple clicks
    const streamButtons = document.querySelectorAll('.stream-btn');
    streamButtons.forEach(btn => {
        if (btn.parentElement.querySelector('.device-name').textContent.includes(device.name || device.code)) {
            btn.disabled = true;
            btn.textContent = 'Loading...';
        }
    });

    // Create a temporary placeholder for the stream with a loader
    const tempStreamId = 'temp-' + Date.now();
    
    // Determine grid layout based on current streams plus the temporary one
    const tempStreamsCount = activeStreams.length + 1;
    let gridClass = 'grid-1x1';
    if (tempStreamsCount === 2) {
        gridClass = 'grid-1x2';
    } else if (tempStreamsCount > 2) {
        gridClass = 'grid-2x2';
    }
    
    // Update the grid class
    streamsGridEl.className = `streams-grid ${gridClass}`;
    
    // Hide empty state if visible
    if (emptyStateEl) {
        emptyStateEl.style.display = 'none';
    }
    
    // Create temporary stream container with loader
    const tempContainer = document.createElement('div');
    tempContainer.id = `temp-container-${tempStreamId}`;
    tempContainer.className = 'stream-container temp-stream';
    
    tempContainer.innerHTML = `
        <div class="initial-stream-loader">
            <div class="stream-loader-spinner"></div>
            <div class="initial-loader-text">Initializing stream for ${device.name || device.code}...</div>
        </div>
    `;
    
    // Add the temporary container to the grid
    streamsGridEl.appendChild(tempContainer);
    
    try {
        const channelId = device.channelId || device.code;
        
        // Call API to start the stream
        const response = await fetch(`${API_BASE_URL}/api/video/start-stream?channel_id=${channelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Remove the temporary container now that we have a response
        const tempElement = document.getElementById(`temp-container-${tempStreamId}`);
        if (tempElement) {
            tempElement.remove();
        }
        
        if (!response.ok) {
            throw new Error(`Error starting stream: ${response.statusText}`);
        }
        
        const streamData = await response.json();
        
        // Add to active streams
        const stream = {
            id: streamData.stream_id,
            device: device,
            url: streamData.html_stream_url,
            rtspUrl: streamData.rtsp_url
        };
        
        activeStreams.push(stream);
        
        // Update UI
        updateStreamGrid();
        
        // Log for debugging
        console.log('Stream started:', streamData);
    } catch (error) {
        // Remove the temporary container if there was an error
        const tempElement = document.getElementById(`temp-container-${tempStreamId}`);
        if (tempElement) {
            tempElement.remove();
        }
        
        // Re-enable the button if there was an error
        streamButtons.forEach(btn => {
            if (btn.parentElement.querySelector('.device-name').textContent.includes(device.name || device.code)) {
                btn.disabled = false;
                btn.textContent = 'Stream';
            }
        });
        
        showError(`Failed to start stream: ${error.message}`);
        
        // If this was going to be the only stream, show the empty state again
        if (activeStreams.length === 0) {
            if (emptyStateEl) {
                emptyStateEl.style.display = 'flex';
                streamsGridEl.appendChild(emptyStateEl);
            }
            streamsGridEl.className = 'streams-grid grid-1x1';
        }
    }
}

        // Stop a specific stream
        async function stopStream(streamId) {
            try {
                // Call API to stop the stream
                const response = await fetch(`${API_BASE_URL}/api/stream/${streamId}`, {
                    method: 'DELETE'
                });
                const response1 = await fetch(`${API_BASE_URL}/streams/cleanup/${streamId}`, {
                    method: 'POST'
                });
                if (!response.ok || !response1.ok) {
                    throw new Error(`Error stopping stream: ${response.statusText}`);
                }
                
                // Destroy HLS.js instance if it exists
                if (hlsPlayers[streamId]) {
                    hlsPlayers[streamId].destroy();
                    delete hlsPlayers[streamId];
                }
                
                // Remove from active streams
                activeStreams = activeStreams.filter(stream => stream.id !== streamId);
                
                // Update UI
                updateStreamGrid();
            } catch (error) {
                showError(`Failed to stop stream: ${error.message}`);
            }
        }

        // Clear all streams
        async function clearAllStreams() {
            try {
                // Call API to clean up all streams
                const response = await fetch(`${API_BASE_URL}/streams/cleanup`, {
                    method: 'POST'
                });
                
                if (!response.ok) {
                    throw new Error(`Error clearing streams: ${response.statusText}`);
                }
               
                // Destroy all HLS.js instances
                Object.values(hlsPlayers).forEach(player => {
                    player.destroy();
                });
                hlsPlayers = {};
                
                // Clear active streams array
                activeStreams = [];
                
                // Update UI
                renderDeviceList();
                updateStreamGrid();
            } catch (error) {
                showError(`Failed to clear streams: ${error.message}`);
            }
        }

        // Render the device list
        function renderDeviceList() {
            deviceListEl.innerHTML = '';
            
            if (devices.length === 0) {
                deviceListEl.innerHTML = '<div class="empty-state">No devices found</div>';
                deviceCountEl.textContent = '0';
                return;
            }
            
            const deviceListUl = document.createElement('ul');
            deviceListUl.className = 'device-list';
            
            devices.forEach(device => {
                const deviceChannelId = device.channelId || `${device.code}$1$0$0`;
                
                const isStreaming = activeStreams.some(stream => 
                    stream.device.channelId === deviceChannelId ||
                    stream.device.code === device.code
                );
                
                const deviceItemLi = document.createElement('li');
                deviceItemLi.className = 'device-item';
                
                const deviceInfo = document.createElement('div');
                deviceInfo.className = 'device-info';
                
                const deviceName = document.createElement('div');
                deviceName.className = 'device-name';
                deviceName.textContent = device.name || device.deviceName || device.code || 'Unnamed Device';
                
                const deviceIp = document.createElement('div');
                deviceIp.style.fontSize = '0.8rem';
                deviceIp.style.color = '#6b7280';
                deviceIp.textContent = device.ip || device.deviceIp || '';
                
                const deviceStatus = document.createElement('div');
                deviceStatus.className = `device-status ${device.deviceStatus === 1 ? 'status-online' : 'status-offline'}`;
                deviceStatus.textContent = device.deviceStatus === 1 ? 'Online' : 'Offline';
                
                deviceInfo.appendChild(deviceName);
                deviceInfo.appendChild(deviceIp);
                deviceInfo.appendChild(deviceStatus);
                
                const streamBtn = document.createElement('button');
                streamBtn.className = 'stream-btn';
                streamBtn.textContent = 'Stream';
                streamBtn.disabled = device.deviceStatus !== 1 || isStreaming || activeStreams.length >= MAX_STREAMS;
                streamBtn.addEventListener('click', () => startStream(device));
                
                deviceItemLi.appendChild(deviceInfo);
                deviceItemLi.appendChild(streamBtn);
                deviceListUl.appendChild(deviceItemLi);
            });
            
            deviceListEl.appendChild(deviceListUl);
            deviceCountEl.textContent = devices.length;
        }

        // Show device list loading state
        function showDeviceLoading() {
            deviceListEl.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    Loading devices...
                </div>
            `;
        }

        // Render empty device list
        function renderEmptyDeviceList() {
            deviceListEl.innerHTML = '<div class="empty-state">No devices found</div>';
            deviceCountEl.textContent = '0';
        }

        // Update the stream grid
        function updateStreamGrid() {
            // Update stream count
            streamCountEl.textContent = activeStreams.length;
            
            // Update clear all button
            clearAllBtn.disabled = activeStreams.length === 0;
            
            // Show/hide empty state
            if (activeStreams.length === 0) {
                emptyStateEl.style.display = 'flex';
                streamsGridEl.innerHTML = '';
                streamsGridEl.appendChild(emptyStateEl);
                streamsGridEl.className = 'streams-grid grid-1x1';
                return;
            } else {
                emptyStateEl.style.display = 'none';
            }
            
            // Update grid layout based on number of streams
            if (activeStreams.length === 1) {
                streamsGridEl.className = 'streams-grid grid-1x1';
            } else if (activeStreams.length === 2) {
                streamsGridEl.className = 'streams-grid grid-1x2';
            } else {
                streamsGridEl.className = 'streams-grid grid-2x2';
            }
            
            // Clear existing streams
            streamsGridEl.innerHTML = '';
            
            // Add stream containers
            activeStreams.forEach(stream => {
                const streamContainer = document.createElement('div');
                streamContainer.className = 'stream-container';
                streamContainer.id = `container-${stream.id}`;
                
                // Create video element with unique ID
                const video = document.createElement('video');
                video.id = `video-${stream.id}`;
                video.className = 'stream-video';
                video.controls = true;
                video.autoplay = true;
                
                // Create loader
                const loader = document.createElement('div');
                loader.className = 'stream-loader';
                loader.id = `loader-${stream.id}`;
                
                const loaderSpinner = document.createElement('div');
                loaderSpinner.className = 'stream-loader-spinner';
                
                const loaderText = document.createElement('div');
                loaderText.textContent = 'Loading stream...';
                
                loader.appendChild(loaderSpinner);
                loader.appendChild(loaderText);
                
                // Create overlay with close button
                const overlay = document.createElement('div');
                overlay.className = 'stream-overlay';
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-stream-btn';
                closeBtn.innerHTML = '×';
                closeBtn.addEventListener('click', () => stopStream(stream.id));
                
                overlay.appendChild(closeBtn);
                
                // Create info bar
                const infoBar = document.createElement('div');
                infoBar.className = 'stream-info';
                infoBar.textContent = stream.device.name || stream.device.channelName || stream.device.code || 'Unnamed Device';
                
                // Append elements to container
                streamContainer.appendChild(video);
                streamContainer.appendChild(loader);
                streamContainer.appendChild(overlay);
                streamContainer.appendChild(infoBar);
                
                // Append container to grid
                streamsGridEl.appendChild(streamContainer);
                
                // Initialize HLS.js after the element is added to the DOM
                setTimeout(() => {
                    initializeHlsPlayer(stream.id, stream.url);
                }, 100);
            });
            
            // Update device list to reflect current streaming status
            renderDeviceList();

            
        }
        
        // Initialize HLS.js player for a stream
        function initializeHlsPlayer(streamId, streamUrl) {
    const videoElement = document.getElementById(`video-${streamId}`);
    const loaderElement = document.getElementById(`loader-${streamId}`);
    
    if (!videoElement) {
        console.error(`Video element not found for stream ${streamId}`);
        return;
    }
    
    // Make sure loader is visible
    if (loaderElement) {
        loaderElement.style.display = 'flex';
    }
    
    // Clean up any existing player
    if (hlsPlayers[streamId]) {
        hlsPlayers[streamId].destroy();
    }
    
    // Log for debugging
    console.log(`Initializing HLS player for stream ${streamId} with URL: ${streamUrl}`);
    
    if (Hls.isSupported()) {
        const hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 0
        });
        
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);
        
        // Handle manifest parsed event - stream is ready to play
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            console.log(`Stream ${streamId} manifest parsed, attempting to play`);
            
            // Use the play promise to know when playback actually starts
            videoElement.play()
                .then(() => {
                    console.log(`Stream ${streamId} playback started successfully`);
                    // Hide loader only when playback actually starts
                    if (loaderElement) {
                        loaderElement.style.display = 'none';
                    }
                })
                .catch(e => {
                    console.warn(`Autoplay prevented for stream ${streamId}:`, e);
                    // Keep loader visible but change message
                    if (loaderElement) {
                        const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                        if (messageEl) {
                            messageEl.textContent = 'Click to play video';
                        }
                    }
                });
        });
        // Add a playback started flag
        let playbackStarted = false;
        // Add additional events to better handle loading states
        hls.on(Hls.Events.MEDIA_ATTACHED, function() {
            console.log(`Stream ${streamId} media attached`);
        });
        
                // And modify your FRAG_LOADING event handler
        hls.on(Hls.Events.FRAG_LOADING, function() {
            // Only show loader if playback hasn't started yet
            if (!playbackStarted && loaderElement) {
                loaderElement.style.display = 'flex';
                const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                if (messageEl) {
                    messageEl.textContent = 'Loading stream...';
                }
            }
        });
        hls.on(Hls.Events.FRAG_LOADED, function() {
            console.log(`Stream ${streamId} fragment loaded`);
        });
        
                // In your FRAG_BUFFERED event handler
        hls.on(Hls.Events.FRAG_BUFFERED, function() {
            console.log(`Stream ${streamId} fragment buffered, video should be visible now`);
            // Mark playback as started
            playbackStarted = true;
            // Hide loader when buffer is ready
            if (loaderElement && videoElement.readyState >= 3) { // HAVE_FUTURE_DATA or higher
                loaderElement.style.display = 'none';
            }
        });
        // Add a handler for when playback actually stalls
            videoElement.addEventListener('waiting', function() {
                // Only show the loader during a real stall after playback has started
                if (playbackStarted && loaderElement) {
                    loaderElement.style.display = 'flex';
                    const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                    if (messageEl) {
                        messageEl.textContent = 'Buffering...';
                    }
                }
            });
                
        // Enhanced error handling
        hls.on(Hls.Events.ERROR, function(event, data) {
            console.error(`HLS error in stream ${streamId}:`, data);
            
            // Show loader with error message
            if (loaderElement) {
                loaderElement.style.display = 'flex';
                const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                if (messageEl) {
                    messageEl.textContent = 'Stream error. Attempting to recover...';
                }
            }
            
            if (data.fatal) {
                switch(data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // Try to recover network error
                        console.log(`Network error for stream ${streamId}, trying to recover...`);
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log(`Media error for stream ${streamId}, trying to recover...`);
                        hls.recoverMediaError();
                        break;
                    default:
                        // Cannot recover, destroy and recreate
                        console.log(`Fatal error for stream ${streamId}, destroying player...`);
                        hls.destroy();
                        delete hlsPlayers[streamId];
                        
                        // Show error message in loader
                        if (loaderElement) {
                            const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                            if (messageEl) {
                                messageEl.textContent = 'Stream failed. Reconnecting...';
                            }
                        }
                        
                        setTimeout(() => {
                            initializeHlsPlayer(streamId, streamUrl);
                        }, 2000); // Slightly longer delay to prevent rapid retries
                        break;
                }
            }
        });
        
        // Add timeupdate listener to ensure loader is hidden once playback starts
        videoElement.addEventListener('timeupdate', function onTimeUpdate() {
            if (videoElement.currentTime > 0) {
                console.log(`Stream ${streamId} playback confirmed`);
                if (loaderElement) {
                    loaderElement.style.display = 'none';
                }
                // Remove listener after it's triggered once
                videoElement.removeEventListener('timeupdate', onTimeUpdate);
            }
        });
        
        // Store the HLS instance for later cleanup
        hlsPlayers[streamId] = hls;
        
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoElement.src = streamUrl;
        
        // Add loading events for Safari
        videoElement.addEventListener('loadstart', function() {
            console.log(`Stream ${streamId} loadstart`);
            if (loaderElement) {
                loaderElement.style.display = 'flex';
            }
        });
        
        videoElement.addEventListener('waiting', function() {
            console.log(`Stream ${streamId} waiting for data`);
            if (loaderElement) {
                loaderElement.style.display = 'flex';
            }
        });
        
        videoElement.addEventListener('playing', function() {
            console.log(`Stream ${streamId} playing`);
            if (loaderElement) {
                loaderElement.style.display = 'none';
            }
        });
        
        videoElement.addEventListener('canplay', function() {
            console.log(`Stream ${streamId} can play`);
            if (loaderElement) {
                loaderElement.style.display = 'none';
            }
        });
        
        videoElement.addEventListener('loadedmetadata', function() {
            console.log(`Stream ${streamId} metadata loaded`);
            videoElement.play().catch(e => {
                console.warn(`Autoplay prevented for stream ${streamId}:`, e);
                // Update loader message
                if (loaderElement) {
                    const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                    if (messageEl) {
                        messageEl.textContent = 'Click to play video';
                    }
                }
            });
        });
        
        // Add error handler for Safari
        videoElement.addEventListener('error', function() {
            console.error(`Video error in stream ${streamId}`);
            showError(`Stream playback error for device ${streamId}`);
            
            // Show error in loader
            if (loaderElement) {
                loaderElement.style.display = 'flex';
                const messageEl = loaderElement.querySelector('div:not(.stream-loader-spinner)');
                if (messageEl) {
                    messageEl.textContent = 'Stream error. Try again later.';
                }
            }
        });
    } else {
        const container = document.getElementById(`container-${streamId}`);
        if (container) {
            container.innerHTML = '<p style="color: white; padding: 20px; text-align: center;">Your browser does not support HLS video streaming.</p>';
        }
    }
}

        // Show error message
        function showError(message) {
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = message;
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.style.float = 'right';
            closeBtn.innerHTML = '×';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '1.2rem';
            closeBtn.addEventListener('click', () => errorEl.remove());
            
            errorEl.prepend(closeBtn);
            errorContainerEl.appendChild(errorEl);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (errorEl.parentNode === errorContainerEl) {
                    errorEl.remove();
                }
            }, 5000);
        }

        // Initialize the app
        function init() {
            // Set up event listeners
            clearAllBtn.addEventListener('click', clearAllStreams);
            
            // Fetch devices
            fetchDevices();
            
            // Set up refresh interval (every 30 seconds)
            //setInterval(fetchDevices, 30000);
        }

        // Start the app
        document.addEventListener('DOMContentLoaded', init);

            
    </script>
        <!-- Chart JavaScript -->
        <script src="../script/menu.js?t=<?php echo time(); ?>"></script> 
        <script src="../script/charts.js?t=<?php echo time(); ?>"></script>
        
         
        <script src="../script/notification-menu.js?t=<?php echo time(); ?>"></script>
</body>
</html>