<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Department of Finance</title>
    <link rel="icon" type="image/x-icon" href="assets/dof-logo.ico">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/css/adminlte.min.css"/>

    <!-- MapLibre GL JS CSS -->
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.1.1/dist/maplibre-gl.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js?t=<?php echo time(); ?>"></script>

    <link rel="stylesheet" href="style/main.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/infrastructure-monitoring.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/alert-management.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/filter-sidebar.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/issue-report-form.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/components/drawer.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/components/card.css?t=<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/infrastructure-cards.css?t=<?php echo time(); ?>" />
</head>

<body>
    <?php include("components/header.php") ?>

    <?php include("components/filter-sidebar.php") ?>
    
    <?php include("components/info-drawer.php") ?>
    <?php include("components/alerts-interface.php") ?>
    <?php include("components/infrastructure-monitoring.php") ?>
    <?php include("components/infrastructure-form.php") ?>
    <?php include("components/issue-report-form.php") ?>

    <div class="map-container">
        <div id="map"></div>
    </div>

    <div class="container">
        <?php include("components/infrastructure-cards.php") ?>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/js/adminlte.min.js"></script>
    
    <!-- MapLibre GL JS JavaScript -->
    <script src="https://unpkg.com/maplibre-gl@4.1.1/dist/maplibre-gl.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js?t=<?php echo time(); ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>]

    <script src="script/utils.js"></script>
    <script src="script/data.js?t=<?php echo time(); ?>"></script>
    <script src="script/marker-manager.js?t=<?php echo time(); ?>"></script>
    <script src="script/markers.js?t=<?php echo time(); ?>"></script>
    <script src="script/charts.js?t=<?php echo time(); ?>"></script>
    <script src="script/menu.js?t=<?php echo time(); ?>"></script>
    <script src="script/notification-menu.js?t=<?php echo time(); ?>"></script>
    <script src="script/filter-sidebar.js?t=<?php echo time(); ?>"></script>
    <script src="script/panel-manager.js?t=<?php echo time(); ?>"></script>
    <script src="script/alert-management.js?t=<?php echo time(); ?>"></script>
    <script src="script/infrastructure-monitoring.js?t=<?php echo time(); ?>"></script>
    <script src="script/infrastructure-form.js?t=<?php echo time(); ?>"></script>
    <script src="script/issue-report-form.js?t=<?php echo time(); ?>"></script>

    <script src="script/info-drawer/drawer-utils.js?t=<?php echo time(); ?>"></script>
    <script src="script/info-drawer/drawer-categories.js?t=<?php echo time(); ?>"></script>

    <script src="script/info-drawer/drawer-analytics.js?t=<?php echo time(); ?>"></script>
    <script src="script/info-drawer/drawer-maintenance.js?t=<?php echo time(); ?>"></script>
    <script src="script/info-drawer/drawer-reports.js?t=<?php echo time(); ?>"></script>
    <script src="script/info-drawer/drawer-media.js?t=<?php echo time(); ?>"></script>

    <script src="script/info-drawer.js?t=<?php echo time(); ?>"></script>
    <script src="script/bottom-cards.js?t=<?php echo time(); ?>"></script>
    <script src="script/index.js?t=<?php echo time(); ?>"></script>

    <script src="https://dev.aitbs.com.ph/plugins/eassist.js?apiKey=sk_uKzHeyAIIiASnjNrZSY9jgjC"></script>
</body>

</html>