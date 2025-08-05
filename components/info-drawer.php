<div id="info-drawer">
    <div id="drawer-header">
        <h3>Site Information</h3>
        <button id="drawer-close">×</button>
        <!-- <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default">
            Launch Default Modal
        </button> -->
    </div>

    <div id="drawer-content">
        <!-- Content will be populated by JavaScript including integrated live feed -->
    </div>
</div>

<!-- Photo Modal -->
<div id="photo-modal" class="photo-modal" style="display: none;">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="photo-carousel" id="photo-carousel">
            <!-- Photos will be loaded here -->
        </div>
    </div>
</div>

<div class="modal fade" id="modal-default">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Default Modal</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="false">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="imageCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#imageCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#imageCarousel" data-slide-to="1"></li>
                        <li data-target="#imageCarousel" data-slide-to="2"></li>
                        <li data-target="#imageCarousel" data-slide-to="3"></li>
                    </ol>

                    <!-- Carousel Items -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="https://images.unsplash.com/photo-1564763557753-051f91b57684?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="First slide">
                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                                <h5>Beautiful Landscape</h5>
                                <p class="mb-0">Stunning mountain views and natural scenery.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="https://images.unsplash.com/photo-1535779023901-a39d15762564?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Second slide">
                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                                <h5>Urban Architecture</h5>
                                <p class="mb-0">Modern city buildings and architectural designs.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="https://plus.unsplash.com/premium_photo-1661924187597-233d38b88221?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Third slide">
                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                                <h5>Nature Photography</h5>
                                <p class="mb-0">Wildlife and natural environment captures.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Controls -->
                    <a class="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .photo-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;
    }

    .photo-item[data-index*="0"] {
        grid-row: span 2 / span 2;

    }

    .photo-item[data-index*="2"] {
        grid-column-start: 2;
    }

    .photo-item[data-index*="0"] .photo {
        object-fit: cover;
    }

    .photo {
        width: 100%;
        height: 100%;
    }

    .carousel-caption {
        background: rgba(0, 0, 0, 0.7) !important;
        border-radius: 8px;
        bottom: 20px;
    }

    .carousel-item img {
        height: 400px;
        object-fit: cover;
        border-radius: 8px;
    }

    .thumbnail-nav {
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }

    .thumbnail-nav:hover {
        border-color: #007bff;
        transform: scale(1.05);
    }

    .carousel-control-prev,
    .carousel-control-next {
        width: 5%;
    }

    .carousel-indicators {
        bottom: 10px;
    }

    .carousel-indicators li {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 0 5px;
    }
</style>