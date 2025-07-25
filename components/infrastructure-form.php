<!-- components/infrastructure-form.php -->
<div id="full-screen-infrastructure-form" style="display: none;">
    <div class="form-header">
        <h2>Add New Infrastructure</h2>
        <button id="infrastructure-form-close">&times;</button>
    </div>
    <div class="form-content">
        <div class="form-group">
            <label for="infrastructureID">Infrastructure ID:</label>
            <input type="text" id="infrastructureID" name="infrastructureID" required>
        </div>
        
        <div class="form-group">
            <label for="purchaseDate">Acquisition Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required>
        </div>
        
        <div class="form-group">
            <label for="locationID">Location ID:</label>
            <select id="locationID" name="locationID" required>
                <option value="">Select Location</option>
                <option value="location1">Cebu City Hall</option>
                <option value="location2">IT Park</option>
                <option value="location3">South Road Properties</option>
                <option value="location4">Lahug District</option>
                <option value="location5">Capitol Site</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="warrantyExpiry">Operation Start Date:</label>
            <input type="date" id="warrantyExpiry" name="warrantyExpiry" required>
        </div>
        
        <div class="form-group">
            <label for="serialNumber">Serial Number:</label>
            <input type="text" id="serialNumber" name="serialNumber" required>
        </div>
        
        <div class="form-group">
            <label for="lastMaintenanceDate">Inspection Date:</label>
            <input type="date" id="lastMaintenanceDate" name="lastMaintenanceDate" required>
        </div>
        
        <div class="form-group status-container">
            <label>Status:</label>
            <div class="status-options">
                <div class="radio-wrapper">
                    <input type="radio" name="status" id="status-active" value="active" checked>
                    <label for="status-active">Active</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="status" id="status-inactive" value="inactive">
                    <label for="status-inactive">Inactive</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="status" id="status-maintenance" value="maintenance">
                    <label for="status-maintenance">Maintenance</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="status" id="status-warning" value="warning">
                    <label for="status-warning">Warning</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="status" id="status-critical" value="critical">
                    <label for="status-critical">Critical</label>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="nextMaintenanceDate">Next Maintenance Date:</label>
            <input type="date" id="nextMaintenanceDate" name="nextMaintenanceDate" required>
        </div>
        
        <div class="button-container">
            <button id="add-infrastructure-btn" class="add-btn">Add Infrastructure</button>
            <button id="cancel-infrastructure-btn" class="cancel-btn">Cancel</button>
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../style/infrastructure-form.css' : 'style/infrastructure-form.css'; ?>">
<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../script/infrastructure-form.js' : 'script/infrastructure-form.js'; ?>"></script>