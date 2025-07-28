<!-- components/infrastructure-form.php -->
<div id="full-screen-infrastructure-form" style="display: none;">
    <div class="form-header">
        <h2>Add New Infrastructure Asset</h2>
        <button id="infrastructure-form-close">&times;</button>
    </div>
    <div class="form-content">
        <!-- Asset Basic Information Section -->
        <div class="form-section">
            <h3>Asset Basic Information</h3>
            
            <div class="form-group">
                <label for="infrastructureID">Asset ID/Serial Number:</label>
                <input type="text" id="infrastructureID" name="infrastructureID" required>
            </div>
            
            <div class="form-group">
                <label for="assetType">Asset Type/Classification:</label>
                <select id="assetType" name="assetType" required>
                    <option value="">Select Asset Type</option>
                    <option value="buildings">Buildings</option>
                    <option value="land">Land</option>
                    <option value="equipment">Equipment</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="furniture">Furniture</option>
                    <option value="it_infrastructure">IT Infrastructure</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="assetDescription">Asset Description:</label>
                <textarea id="assetDescription" name="assetDescription" rows="3" placeholder="Detailed description of the asset"></textarea>
            </div>
            
            <div class="form-group">
                <label for="assetSpecifications">Asset Specifications:</label>
                <textarea id="assetSpecifications" name="assetSpecifications" rows="3" placeholder="Technical specifications, dimensions, capacity, etc."></textarea>
            </div>
            
            <div class="form-group">
                <label for="identificationTags">Identification Tags:</label>
                <input type="text" id="identificationTags" name="identificationTags" placeholder="Barcode, QR code, or other identification tags">
            </div>
        </div>

        <!-- Financial Information Section -->
        <div class="form-section">
            <h3>Financial Information</h3>
            
            <div class="form-group">
                <label for="acquisitionCost">Acquisition Cost (PHP):</label>
                <input type="number" id="acquisitionCost" name="acquisitionCost" step="0.01" min="0" placeholder="0.00">
            </div>
            
            <div class="form-group">
                <label for="purchaseDate">Acquisition Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" required>
            </div>
            
            <div class="form-group">
                <label for="warrantyExpiry">Operation Start Date:</label>
                <input type="date" id="warrantyExpiry" name="warrantyExpiry" required>
            </div>
        </div>

        <!-- Location and Mapping Section -->
        <div class="form-section">
            <h3>Location and GIS Mapping</h3>
            
            <div class="form-group">
                <label for="locationID">Primary Location:</label>
                <select id="locationID" name="locationID" required>
                    <option value="">Select Location</option>
                    <option value="location1">Cebu City Hall</option>
                    <option value="location2">IT Park</option>
                    <option value="location3">South Road Properties</option>
                    <option value="location4">Lahug District</option>
                    <option value="location5">Capitol Site</option>
                    <option value="location6">Balamban</option>
                    <option value="location7">Talisay</option>
                    <option value="location8">Mandaue</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="geographicRegion">Geographic Region:</label>
                <select id="geographicRegion" name="geographicRegion">
                    <option value="">Select Region</option>
                    <option value="north">North District</option>
                    <option value="south">South District</option>
                    <option value="central">Central District</option>
                    <option value="east">East District</option>
                    <option value="west">West District</option>
                </select>
            </div>
            
            <div class="form-group-row">
                <div class="form-group">
                    <label for="latitude">Latitude:</label>
                    <input type="number" id="latitude" name="latitude" step="0.000001" placeholder="10.3157" title="GPS Latitude coordinates">
                </div>
                <div class="form-group">
                    <label for="longitude">Longitude:</label>
                    <input type="number" id="longitude" name="longitude" step="0.000001" placeholder="123.8854" title="GPS Longitude coordinates">
                </div>
            </div>
            
            <div class="form-group">
                <button type="button" id="mapLocationPicker" class="map-picker-btn">
                    <i class="fas fa-map-marker-alt"></i> Pick Location on Map
                </button>
            </div>
        </div>

        <!-- Department and Management Section -->
        <div class="form-section">
            <h3>Department and Management</h3>
            
            <div class="form-group">
                <label for="currentDepartment">Current Department:</label>
                <select id="currentDepartment" name="currentDepartment" required>
                    <option value="">Select Department</option>
                    <option value="finance">Department of Finance</option>
                    <option value="engineering">City Engineering</option>
                    <option value="health">City Health Office</option>
                    <option value="education">Education Department</option>
                    <option value="social_services">Social Services</option>
                    <option value="planning">City Planning</option>
                    <option value="environment">Environment Department</option>
                    <option value="public_safety">Public Safety</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="assetCondition">Asset Condition:</label>
                <select id="assetCondition" name="assetCondition" required>
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="transferNotes">Transfer Notes:</label>
                <textarea id="transferNotes" name="transferNotes" rows="2" placeholder="Notes about asset transfer or reassignment"></textarea>
            </div>
        </div>

        <!-- Status and Maintenance Section -->
        <div class="form-section">
            <h3>Status and Maintenance</h3>
            
            <div class="form-group status-container">
                <label>Current Status:</label>
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
                        <label for="status-maintenance">Under Maintenance</label>
                    </div>
                    <div class="radio-wrapper">
                        <input type="radio" name="status" id="status-warning" value="warning">
                        <label for="status-warning">Warning</label>
                    </div>
                    <div class="radio-wrapper">
                        <input type="radio" name="status" id="status-critical" value="critical">
                        <label for="status-critical">Critical</label>
                    </div>
                    <div class="radio-wrapper">
                        <input type="radio" name="status" id="status-pending-transfer" value="pending_transfer">
                        <label for="status-pending-transfer">Pending Transfer</label>
                    </div>
                    <div class="radio-wrapper">
                        <input type="radio" name="status" id="status-decommissioned" value="decommissioned">
                        <label for="status-decommissioned">Decommissioned</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="lastMaintenanceDate">Last Inspection Date:</label>
                <input type="date" id="lastMaintenanceDate" name="lastMaintenanceDate" required>
            </div>
            
            <div class="form-group">
                <label for="nextMaintenanceDate">Next Maintenance Date:</label>
                <input type="date" id="nextMaintenanceDate" name="nextMaintenanceDate" required>
            </div>
        </div>

        <!-- Asset Photos Section -->
        <div class="form-section">
            <h3>Asset Photos and Documentation</h3>
            
            <div class="form-group">
                <label for="assetPhotos">Asset Photos:</label>
                <div class="file-upload-container">
                    <input type="file" id="assetPhotos" name="assetPhotos[]" multiple accept="image/*" class="file-input">
                    <label for="assetPhotos" class="file-upload-label">
                        <i class="fas fa-camera"></i> Choose Photos (Multiple)
                    </label>
                    <div id="photo-preview" class="photo-preview-container"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="relatedDocuments">Related Documents:</label>
                <div class="file-upload-container">
                    <input type="file" id="relatedDocuments" name="relatedDocuments[]" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" class="file-input">
                    <label for="relatedDocuments" class="file-upload-label">
                        <i class="fas fa-file-upload"></i> Upload Documents
                    </label>
                    <div id="document-preview" class="document-preview-container"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="documentTypes">Document Types:</label>
                <div class="checkbox-group">
                    <div class="checkbox-wrapper">
                        <label for="doc-deeds">Deeds</label>
                        <input type="checkbox" id="doc-deeds" name="documentTypes[]" value="deeds">
                    </div>
                    <div class="checkbox-wrapper">
                        <label for="doc-permits">Permits</label>
                        <input type="checkbox" id="doc-permits" name="documentTypes[]" value="permits">
                    </div>
                    <div class="checkbox-wrapper">
                        <label for="doc-maintenance">Maintenance Records</label>
                        <input type="checkbox" id="doc-maintenance" name="documentTypes[]" value="maintenance_records">
                    </div>
                    <div class="checkbox-wrapper">
                        <label for="doc-warranty">Warranty</label>
                        <input type="checkbox" id="doc-warranty" name="documentTypes[]" value="warranty">
                    </div>
                    <div class="checkbox-wrapper">
                        <label for="doc-inspection">Inspection Reports</label>
                        <input type="checkbox" id="doc-inspection" name="documentTypes[]" value="inspection_reports">
                    </div>
                    <div class="checkbox-wrapper">
                        <label for="doc-other">Other</label>
                        <input type="checkbox" id="doc-other" name="documentTypes[]" value="other">
                    </div>
                </div>
            </div>
        </div>

        <!-- Previous Location History Section -->
        <div class="form-section">
            <h3>Asset History</h3>
            
            <div class="form-group">
                <label>Previous Location History:</label>
                <div id="locationHistory" class="location-history-container">
                    <div class="history-item">
                        <span class="history-date">New Asset</span>
                        <span class="history-location">No previous locations</span>
                        <span class="history-status">Initial Registration</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Buttons -->
        <div class="button-container">
            <button id="add-infrastructure-btn" class="add-btn">
                <i class="fas fa-plus"></i> Add Asset to Registry
            </button>
            <button id="cancel-infrastructure-btn" class="cancel-btn">
                <i class="fas fa-times"></i> Cancel
            </button>
            <!-- <button id="save-draft-btn" class="draft-btn">
                <i class="fas fa-save"></i> Save Draft
            </button> -->
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../style/infrastructure-form.css' : 'style/infrastructure-form.css'; ?>">
<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../script/infrastructure-form.js' : 'script/infrastructure-form.js'; ?>"></script>