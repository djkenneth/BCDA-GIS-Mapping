<div id="full-screen-issue-report-form" style="display: none;">
    <div class="form-header">
        <h2>Report an Issue</h2>
        <button id="issue-form-close">&times;</button>
    </div>
    <div class="form-content">
        <div class="form-group">
            <label for="issueType">Issue Type:</label>
            <select id="issueType" class="input-field" name="issueType">
                <option value="">Select Issue Type</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="issueCategory">Category:</label>
            <select id="issueCategory" class="input-field" name="issueCategory">
                <option value="">Select Category</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="issueLocation">Location:</label>
            <input type="text" id="issueLocation" name="issueLocation" placeholder="Search for a location or click on the map">
        </div>
        
        <div class="form-group">
            <label for="issueDateReported">Date Reported:</label>
            <input type="date" id="issueDateReported" name="issueDateReported">
        </div>
        
        <div class="form-group">
            <label for="contactEmail">Contact Email:</label>
            <input type="email" id="contactEmail" name="contactEmail" placeholder="Email address (optional)">
        </div>
        
        <div class="form-group">
            <label for="contactPhone">Contact Phone:</label>
            <input type="tel" id="contactPhone" name="contactPhone" placeholder="Phone number (optional)">
        </div>
        
        <div class="form-group status-container">
            <label>Priority:</label>
            <div class="status-options">
                <div class="radio-wrapper">
                    <input type="radio" name="priority" id="priority-low" value="low">
                    <label for="priority-low">Low</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="priority" id="priority-medium" value="medium" checked>
                    <label for="priority-medium">Medium</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="priority" id="priority-high" value="high">
                    <label for="priority-high">High</label>
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="priority" id="priority-critical" value="critical">
                    <label for="priority-critical">Critical</label>
                </div>
            </div>
        </div>
        
        <div class="form-group description-container">
            <label for="issueDescription">Description:</label>
            <textarea id="issueDescription" name="issueDescription" placeholder="Please describe the issue in detail..."></textarea>
        </div>
        
        <div class="form-group photo-upload-container">
            <label>Upload Photo (Optional):</label>
            <div class="photo-upload-area" id="photoUploadArea">
                <div class="upload-placeholder">
                    <img src="assets/icons/camera-icon.png" alt="Upload" class="upload-icon">
                    <span>Drag and drop a photo here, or click to browse</span>
                </div>
                <input type="file" id="photoUpload" name="photoUpload" accept="image/*" hidden>
            </div>
            <!-- New mobile camera button -->
            <div class="mobile-camera-button" id="mobileCameraBtn">
                    <img src="assets/icons/camera-icon.png" alt="Upload" class="upload-icon">
                <span>Take Photo</span>
            </div>
            <div class="upload-preview" id="uploadPreview" style="display: none;">
                <img id="previewImage" src="" alt="Preview">
                <button type="button" id="removePhoto" class="remove-photo">&times;</button>
            </div>
        </div>
        
        <div class="button-container">
            <button id="submit-issue-btn" class="add-btn">Submit Report</button>
            <button id="cancel-issue-btn" class="cancel-btn">Cancel</button>
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../style/issue-report-form.css' : 'style/issue-report-form.css'; ?>">
<script src="<?php echo (strpos($_SERVER['REQUEST_URI'], 'streams') !== false) ? '../script/issue-report-form.js' : 'script/issue-report-form.js'; ?>"></script>