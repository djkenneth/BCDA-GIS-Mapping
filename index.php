<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cebu City Interactive Data-Driven Map</title>
    <link rel="icon" type="image/x-icon" href="assets/cebu-logo.ico">

    <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css?t=<?php echo time(); ?>"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin="" /> -->

    <!-- MapLibre GL JS CSS -->
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@^5.6.1/dist/maplibre-gl.css?t=<?php echo time(); ?>" />

    <!-- MapLibre GL JS JavaScript -->
    <script src="https://unpkg.com/maplibre-gl@^5.6.1/dist/maplibre-gl.js?t=<?php echo time(); ?>"></script>

    <!-- <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js?t=<?php echo time(); ?>"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script> -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js?t=<?php echo time(); ?>"></script>

    <link rel="stylesheet" href="style/main.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/custom.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/infrastructure-monitoring.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/alert-management.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/filter-sidebar-v2.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/issue-report-form.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/components/drawer.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/components/card.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/infrastructure-cards.css?t=<?php echo time(); ?>" />

    <style>
        .infrastructure-scroll-area {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            scrollbar-width: thin;
            scrollbar-color: #FAD754 #002722;
        }
        
        #style-1::-webkit-scrollbar-track,
        .infrastructure-scroll-area::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px #FAD754;
            border-radius: 10px;
            background-color: #002722;
        }
        
        #style-1::-webkit-scrollbar,
        .infrastructure-scroll-area::-webkit-scrollbar {
            width: 12px;
            height: 12px;
            border-radius: 10px;
            background-color: #002722;
        }
        
        #style-1::-webkit-scrollbar-thumb,
        .infrastructure-scroll-area::-webkit-scrollbar-thumb {
            border-radius: 20px;
            -webkit-box-shadow: inset 0 0 6px #FAD754;
            background-color: #FAD754;
        }
        
        #style-1::-webkit-scrollbar-thumb:horizontal,
        .infrastructure-scroll-area::-webkit-scrollbar-thumb:horizontal {
            border-radius: 20px;
            -webkit-box-shadow: inset 0 0 6px #FAD754;
            background-color: #FAD754;
        }
    </style>
</head>

<body>
    <?php include("components/header.php") ?>
    
    <?php include("components/filter-sidebar-v2.php") ?>
    <?php include("components/info-drawer.php") ?>
    <?php include("components/alerts-interface.php") ?>
    <?php include("components/infrastructure-monitoring.php") ?>
    <?php include("components/infrastructure-form.php") ?>
    <?php include("components/issue-report-form.php") ?>

    <div class="map-container">
        <div id="map"></div>
    </div>

    <div class="container">
        <?php include("components/cards.php") ?>
        <?php include("components/infrastructure-cards.php") ?>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js?t=<?php echo time(); ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <script>
        function testJsPDF() {
            try {
                // For newer versions
                if (window.jspdf && window.jspdf.jsPDF) {
                    const doc = new window.jspdf.jsPDF();
                    return true;
                } else if (typeof window.jspdf === 'function') {
                    const doc = new window.jspdf();
                    console.log("jsPDF is loaded correctly!");
                    return true;
                } else {
                    console.error("jsPDF is not available in the expected format");
                    return false;
                }
            } catch (e) {
                console.error("Error loading jsPDF:", e);
                return false;
            }
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            testJsPDF();
        });
    </script>

<script src="script/cebu-city-markers.js?t=<?php echo time(); ?>"></script>
    <script src="script/charts.js?t=<?php echo time(); ?>"></script>
    <script src="script/menu.js?t=<?php echo time(); ?>"></script>
    <script src="script/notification-menu.js?t=<?php echo time(); ?>"></script>
    <script src="script/filter-sidebar-v2.js?t=<?php echo time(); ?>"></script>
    <script src="script/panel-manager.js?t=<?php echo time(); ?>"></script>
    <script src="script/alert-management.js?t=<?php echo time(); ?>"></script>
    <script src="script/infrastructure-monitoring.js?t=<?php echo time(); ?>"></script>
    <script src="script/infrastructure-form.js?t=<?php echo time(); ?>"></script>
    <script src="script/cebu-city-data.js?t=<?php echo time(); ?>"></script>
    <script src="script/issue-report-form.js?t=<?php echo time(); ?>"></script>
    <script src="script/custom-marker-manager.js?t=<?php echo time(); ?>"></script>
    <script src="script/info-drawer.js?t=<?php echo time(); ?>"></script>
    <script src="script/infrastructure-cards.js?t=<?php echo time(); ?>"></script>
    <script src="script/index.js?t=<?php echo time(); ?>"></script>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.pathname.includes('streams')) {
            const header = document.querySelector('header');
            if (header) {
                header.classList.remove('collapsed');
                localStorage.removeItem('headerCollapsed');
                
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            }
        }
    });
    </script>
    
    <script 
        src="https://dev.aitbs.com.ph/plugins/eassist.js?apiKey=sk_uKzHeyAIIiASnjNrZSY9jgjC">
    </script>
    <style>
        .flex, .colunm > * {
            flex-wrap: unset !important;
        }
    </style>
</body>
</html>