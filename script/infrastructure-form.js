// script/infrastructure-form.js - Updated for DOF Asset Management System

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const fullScreenForm = document.getElementById('full-screen-infrastructure-form');
    const closeBtn = document.getElementById('infrastructure-form-close');
    const addBtn = document.getElementById('add-infrastructure-btn');
    const cancelBtn = document.getElementById('cancel-infrastructure-btn');
    
    // Form inputs
    const assetTypeSelect = document.getElementById('assetType');
    const currentDepartmentSelect = document.getElementById('currentDepartment');
    const locationSelect = document.getElementById('locationID');
    
    // File upload elements
    const assetPhotosInput = document.getElementById('assetPhotos');
    const relatedDocumentsInput = document.getElementById('relatedDocuments');
    const photoPreviewContainer = document.getElementById('photo-preview');
    const documentPreviewContainer = document.getElementById('document-preview');
    
    // Map and GPS elements
    const mapLocationPicker = document.getElementById('mapLocationPicker');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    
    // Status radio buttons
    const statusRadios = document.querySelectorAll('input[name="status"]');
    
    // Location history container
    const locationHistoryContainer = document.getElementById('locationHistory');

    // Asset type categories with their subcategories
    const assetSubCategories = {
        'buildings': [
            'Government Office Buildings',
            'Public Schools',
            'Hospitals and Health Centers',
            'Community Centers',
            'Fire Stations',
            'Police Stations',
            'Libraries',
            'Recreation Centers',
            'Warehouses',
            'Other Buildings'
        ],
        'land': [
            'Government Lots',
            'Parks and Recreation Areas',
            'Road Rights of Way',
            'Waterfront Properties',
            'Agricultural Land',
            'Commercial Lots',
            'Residential Lots',
            'Forest Land',
            'Other Land Assets'
        ],
        'equipment': [
            'Construction Equipment',
            'Medical Equipment',
            'Office Equipment',
            'Security Equipment',
            'Communication Equipment',
            'Laboratory Equipment',
            'Kitchen Equipment',
            'Sports Equipment',
            'Other Equipment'
        ],
        'vehicles': [
            'Service Vehicles',
            'Emergency Vehicles',
            'Construction Vehicles',
            'Public Transport',
            'Administrative Vehicles',
            'Motorcycles',
            'Boats and Marine Vessels',
            'Other Vehicles'
        ],
        'furniture': [
            'Office Furniture',
            'Classroom Furniture',
            'Medical Furniture',
            'Public Seating',
            'Storage Furniture',
            'Other Furniture'
        ],
        'it_infrastructure': [
            'Servers and Network Equipment',
            'Computer Systems',
            'Software Licenses',
            'Communication Systems',
            'Security Systems',
            'Audio Visual Equipment',
            'Other IT Assets'
        ]
    };

    // Department locations mapping
    const departmentLocations = {
        'finance': ['Cebu City Hall', 'Capitol Site'],
        'engineering': ['Cebu City Hall', 'IT Park', 'South Road Properties'],
        'health': ['City Health Office', 'Cebu City Hall', 'Balamban', 'Talisay'],
        'education': ['All Locations'],
        'social_services': ['Cebu City Hall', 'Lahug District'],
        'planning': ['Cebu City Hall', 'IT Park'],
        'environment': ['All Locations'],
        'public_safety': ['All Locations']
    };

    // Initialize form
    function initForm() {
        // Set default date values
        setDefaultDates();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize file upload handlers
        initFileUploadHandlers();
        
        // Initialize validation
        setupFormValidation();
    }

    // Set default dates
    function setDefaultDates() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        const lastInspectionDate = document.getElementById('lastMaintenanceDate');
        if (lastInspectionDate && !lastInspectionDate.value) {
            lastInspectionDate.value = formattedDate;
        }
        
        // Set next maintenance date to 6 months from today
        const nextMaintenanceDate = document.getElementById('nextMaintenanceDate');
        if (nextMaintenanceDate && !nextMaintenanceDate.value) {
            const sixMonthsLater = new Date(today);
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
            nextMaintenanceDate.value = sixMonthsLater.toISOString().split('T')[0];
        }
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Form control buttons
        if (closeBtn) closeBtn.addEventListener('click', hideInfrastructureForm);
        if (cancelBtn) cancelBtn.addEventListener('click', hideInfrastructureForm);
        if (addBtn) addBtn.addEventListener('click', handleSubmit);
        
        // Asset type change handler
        if (assetTypeSelect) {
            assetTypeSelect.addEventListener('change', updateAssetSubCategories);
        }
        
        // Department change handler
        if (currentDepartmentSelect) {
            currentDepartmentSelect.addEventListener('change', updateAvailableLocations);
        }
        
        // Map location picker
        if (mapLocationPicker) {
            mapLocationPicker.addEventListener('click', openMapLocationPicker);
        }
        
        // GPS coordinate validation
        if (latitudeInput) {
            latitudeInput.addEventListener('blur', validateGPSCoordinates);
        }
        if (longitudeInput) {
            longitudeInput.addEventListener('blur', validateGPSCoordinates);
        }
        
        // Status change handler
        statusRadios.forEach(radio => {
            radio.addEventListener('change', handleStatusChange);
        });
        
        // Auto-calculate acquisition cost based on asset type
        if (assetTypeSelect) {
            assetTypeSelect.addEventListener('change', suggestAcquisitionCostRange);
        }
    }

    // Initialize file upload handlers
    function initFileUploadHandlers() {
        // Asset photos upload
        if (assetPhotosInput) {
            assetPhotosInput.addEventListener('change', handleAssetPhotosUpload);
        }
        
        // Related documents upload
        if (relatedDocumentsInput) {
            relatedDocumentsInput.addEventListener('change', handleDocumentsUpload);
        }
        
        // Drag and drop for photos
        setupDragAndDropHandlers();
    }

    // Setup drag and drop handlers
    function setupDragAndDropHandlers() {
        const photoLabel = document.querySelector('label[for="assetPhotos"]');
        const documentLabel = document.querySelector('label[for="relatedDocuments"]');
        
        if (photoLabel) {
            setupDragAndDrop(photoLabel, handleAssetPhotosUpload, 'image/*');
        }
        
        if (documentLabel) {
            setupDragAndDrop(documentLabel, handleDocumentsUpload, '.pdf,.doc,.docx,.xls,.xlsx');
        }
    }

    // Generic drag and drop setup
    function setupDragAndDrop(element, handler, acceptTypes) {
        element.addEventListener('dragover', function(e) {
            e.preventDefault();
            element.style.backgroundColor = 'rgba(250, 215, 84, 0.1)';
            element.style.borderColor = 'var(--primary-color)';
        });
        
        element.addEventListener('dragleave', function(e) {
            e.preventDefault();
            element.style.backgroundColor = '';
            element.style.borderColor = '';
        });
        
        element.addEventListener('drop', function(e) {
            e.preventDefault();
            element.style.backgroundColor = '';
            element.style.borderColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Create a mock change event
                const mockEvent = { target: { files: files } };
                handler(mockEvent);
            }
        });
    }

    // Handle asset photos upload
    function handleAssetPhotosUpload(event) {
        const files = event.target.files;
        
        if (files.length === 0) return;
        
        // Clear previous previews
        if (photoPreviewContainer) {
            photoPreviewContainer.innerHTML = '';
        }
        
        Array.from(files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                if (file.size > 10 * 1024 * 1024) { // 10MB limit
                    showNotification('Error: Image file size must be less than 10MB', 'error');
                    return;
                }
                
                createImagePreview(file, index);
            } else {
                showNotification('Error: Please select only image files', 'error');
            }
        });
    }

    // Create image preview
    function createImagePreview(file, index) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'photo-preview-item';
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="Asset Photo ${index + 1}">
                <div class="photo-overlay">
                    <span class="photo-name">${file.name}</span>
                    <button type="button" class="remove-photo-btn" data-index="${index}">×</button>
                </div>
            `;
            
            // Add remove functionality
            const removeBtn = previewDiv.querySelector('.remove-photo-btn');
            removeBtn.addEventListener('click', function() {
                removePhotoPreview(index);
            });
            
            if (photoPreviewContainer) {
                photoPreviewContainer.appendChild(previewDiv);
            }
        };
        reader.readAsDataURL(file);
    }

    // Handle documents upload
    function handleDocumentsUpload(event) {
        const files = event.target.files;
        
        if (files.length === 0) return;
        
        // Clear previous previews
        if (documentPreviewContainer) {
            documentPreviewContainer.innerHTML = '';
        }
        
        Array.from(files).forEach((file, index) => {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                showNotification('Error: Document file size must be less than 50MB', 'error');
                return;
            }
            
            createDocumentPreview(file, index);
        });
    }

    // Create document preview
    function createDocumentPreview(file, index) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'document-preview-item';
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const fileIcon = getDocumentIcon(fileExtension);
        
        previewDiv.innerHTML = `
            <div class="document-icon">${fileIcon}</div>
            <div class="document-info">
                <span class="document-name">${file.name}</span>
                <span class="document-size">${formatFileSize(file.size)}</span>
            </div>
            <button type="button" class="remove-document-btn" data-index="${index}">×</button>
        `;
        
        // Add remove functionality
        const removeBtn = previewDiv.querySelector('.remove-document-btn');
        removeBtn.addEventListener('click', function() {
            removeDocumentPreview(index);
        });
        
        if (documentPreviewContainer) {
            documentPreviewContainer.appendChild(previewDiv);
        }
    }

    // Validate GPS coordinates
    function validateGPSCoordinates() {
        const lat = parseFloat(latitudeInput?.value || 0);
        const lng = parseFloat(longitudeInput?.value || 0);
        
        const isValidLat = lat >= -90 && lat <= 90;
        const isValidLng = lng >= -180 && lng <= 180;
        
        // Check if coordinates are within Philippines bounds (approximate)
        const isInPhilippines = (lat >= 4.5 && lat <= 21.5) && (lng >= 116 && lng <= 127);
        
        if (latitudeInput) {
            latitudeInput.style.borderColor = isValidLat ? '' : '#ff4444';
        }
        if (longitudeInput) {
            longitudeInput.style.borderColor = isValidLng ? '' : '#ff4444';
        }
        
        if (lat !== 0 && lng !== 0 && !isInPhilippines) {
            showNotification('Warning: Coordinates appear to be outside Philippines', 'warning');
        }
        
        return isValidLat && isValidLng;
    }

    // Open map location picker (placeholder for future implementation)
    function openMapLocationPicker() {
        showNotification('Map location picker will be available in the next update', 'info');
        // TODO: Implement map integration with MapLibre GL JS or similar
    }

    // Update asset subcategories based on selected type
    function updateAssetSubCategories(event) {
        const selectedType = event.target.value;
        
        // This could be used to show additional subcategory fields
        // For now, we'll just show suggestions in the specifications field
        const specificationsField = document.getElementById('assetSpecifications');
        if (specificationsField && selectedType && assetSubCategories[selectedType]) {
            const suggestions = assetSubCategories[selectedType].join(', ');
            specificationsField.placeholder = `Suggestions: ${suggestions}`;
        }
    }

    // Update available locations based on department
    function updateAvailableLocations(event) {
        const selectedDepartment = event.target.value;
        
        if (!locationSelect || !selectedDepartment) return;
        
        const availableLocations = departmentLocations[selectedDepartment] || [];
        
        // Clear current options except the first one
        while (locationSelect.options.length > 1) {
            locationSelect.remove(1);
        }
        
        // Add available locations
        availableLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location.toLowerCase().replace(/\s+/g, '_');
            option.textContent = location;
            locationSelect.appendChild(option);
        });
    }

    // Handle status changes
    function handleStatusChange(event) {
        const selectedStatus = event.target.value;
        
        // Show relevant fields based on status
        const maintenanceDateField = document.getElementById('nextMaintenanceDate');
        const inspectionDateField = document.getElementById('lastMaintenanceDate');
        
        if (selectedStatus === 'maintenance' || selectedStatus === 'critical') {
            if (maintenanceDateField) {
                maintenanceDateField.required = true;
                maintenanceDateField.parentNode.style.display = 'block';
            }
        }
        
        if (selectedStatus === 'decommissioned') {
            if (maintenanceDateField) {
                maintenanceDateField.required = false;
                maintenanceDateField.parentNode.style.display = 'none';
            }
        }
    }

    // Suggest acquisition cost range
    function suggestAcquisitionCostRange(event) {
        const selectedType = event.target.value;
        const costField = document.getElementById('acquisitionCost');
        
        if (!costField || !selectedType) return;
        
        const costSuggestions = {
            'buildings': '₱500,000 - ₱50,000,000',
            'land': '₱100,000 - ₱100,000,000',
            'equipment': '₱10,000 - ₱5,000,000',
            'vehicles': '₱200,000 - ₱3,000,000',
            'furniture': '₱5,000 - ₱500,000',
            'it_infrastructure': '₱20,000 - ₱2,000,000'
        };
        
        const suggestion = costSuggestions[selectedType];
        if (suggestion) {
            costField.placeholder = `Typical range: ${suggestion}`;
        }
    }

    // Setup form validation
    function setupFormValidation() {
        const form = fullScreenForm;
        if (!form) return;
        
        // Add real-time validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }

    // Validate individual field
    function validateField(event) {
        const field = event.target;
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.style.borderColor = '#ff4444';
            showFieldError(field, field.validationMessage);
        } else {
            field.style.borderColor = '';
            clearFieldError(field);
        }
        
        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
    }

    // Clear field error
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        if (field.style.borderColor === 'rgb(255, 68, 68)') {
            field.style.borderColor = '';
        }
    }

    // Show infrastructure form
    function showInfrastructureForm() {
        if (fullScreenForm) {
            adjustFormPosition();
            fullScreenForm.style.display = 'block';
            resetForm();
        }
    }

    // Hide infrastructure form
    function hideInfrastructureForm() {
        if (fullScreenForm) {
            fullScreenForm.style.display = 'none';
            resetForm();
        }
    }

    // Reset form to initial state
    function resetForm() {
        // Reset all input fields
        const form = fullScreenForm;
        if (form) {
            form.reset();
        }
        
        // Clear file previews
        if (photoPreviewContainer) photoPreviewContainer.innerHTML = '';
        if (documentPreviewContainer) documentPreviewContainer.innerHTML = '';
        
        // Reset default dates
        setDefaultDates();
        
        // Clear any validation errors
        const errorElements = form?.querySelectorAll('.field-error');
        errorElements?.forEach(error => error.remove());
        
        // Reset field border colors
        const fields = form?.querySelectorAll('input, select, textarea');
        fields?.forEach(field => {
            field.style.borderColor = '';
        });
        
        // Reset location history
        if (locationHistoryContainer) {
            locationHistoryContainer.innerHTML = `
                <div class="history-item">
                    <span class="history-date">New Asset</span>
                    <span class="history-location">No previous locations</span>
                    <span class="history-status">Initial Registration</span>
                </div>
            `;
        }
    }

    // Handle main form submission
    function handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }
        
        // Collect form data
        const formData = collectFormData();
        
        // TODO: Send to server
        // For now, just show success message
        processFormSubmission(formData);
    }

    // Validate entire form
    function validateForm() {
        const form = fullScreenForm;
        if (!form) return false;
        
        let isValid = true;
        
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        // Validate GPS coordinates if provided
        if ((latitudeInput?.value || longitudeInput?.value) && !validateGPSCoordinates()) {
            isValid = false;
        }
        
        // Validate acquisition cost
        const costField = document.getElementById('acquisitionCost');
        if (costField?.value && parseFloat(costField.value) < 0) {
            showFieldError(costField, 'Acquisition cost cannot be negative');
            isValid = false;
        }
        
        return isValid;
    }

    // Collect all form data
    function collectFormData() {
        const formData = new FormData();
        
        // Basic asset information
        formData.append('infrastructureID', document.getElementById('infrastructureID')?.value || '');
        formData.append('assetType', document.getElementById('assetType')?.value || '');
        formData.append('assetDescription', document.getElementById('assetDescription')?.value || '');
        formData.append('assetSpecifications', document.getElementById('assetSpecifications')?.value || '');
        formData.append('identificationTags', document.getElementById('identificationTags')?.value || '');
        
        // Financial information
        formData.append('acquisitionCost', document.getElementById('acquisitionCost')?.value || '0');
        formData.append('purchaseDate', document.getElementById('purchaseDate')?.value || '');
        formData.append('warrantyExpiry', document.getElementById('warrantyExpiry')?.value || '');
        
        // Location information
        formData.append('locationID', document.getElementById('locationID')?.value || '');
        formData.append('geographicRegion', document.getElementById('geographicRegion')?.value || '');
        formData.append('latitude', document.getElementById('latitude')?.value || '');
        formData.append('longitude', document.getElementById('longitude')?.value || '');
        
        // Department and management
        formData.append('currentDepartment', document.getElementById('currentDepartment')?.value || '');
        formData.append('assetCondition', document.getElementById('assetCondition')?.value || '');
        formData.append('transferNotes', document.getElementById('transferNotes')?.value || '');
        
        // Status and maintenance
        const selectedStatus = document.querySelector('input[name="status"]:checked');
        formData.append('status', selectedStatus?.value || 'active');
        formData.append('lastMaintenanceDate', document.getElementById('lastMaintenanceDate')?.value || '');
        formData.append('nextMaintenanceDate', document.getElementById('nextMaintenanceDate')?.value || '');
        
        // File uploads
        if (assetPhotosInput?.files) {
            Array.from(assetPhotosInput.files).forEach((file, index) => {
                formData.append(`assetPhotos[${index}]`, file);
            });
        }
        
        if (relatedDocumentsInput?.files) {
            Array.from(relatedDocumentsInput.files).forEach((file, index) => {
                formData.append(`relatedDocuments[${index}]`, file);
            });
        }
        
        // Document types checkboxes
        const documentTypes = [];
        const checkedBoxes = document.querySelectorAll('input[name="documentTypes[]"]:checked');
        checkedBoxes.forEach(checkbox => {
            documentTypes.push(checkbox.value);
        });
        formData.append('documentTypes', JSON.stringify(documentTypes));
        
        return formData;
    }

    // Process form submission
    function processFormSubmission(formData) {
        // Show loading state
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
        
        // Simulate API call
        setTimeout(() => {
            // Success
            showNotification('Infrastructure asset added successfully!', 'success');
            
            // Add to location history
            addToLocationHistory();
            
            // Reset form
            setTimeout(() => {
                hideInfrastructureForm();
                
                // Reset button
                if (addBtn) {
                    addBtn.disabled = false;
                    addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Asset to Registry';
                }
            }, 1500);
            
        }, 2000);
    }

    // Add to location history
    function addToLocationHistory() {
        const locationSelect = document.getElementById('locationID');
        const selectedLocation = locationSelect?.options[locationSelect.selectedIndex]?.text || 'Unknown';
        const today = new Date().toISOString().split('T')[0];
        
        if (locationHistoryContainer) {
            locationHistoryContainer.innerHTML = `
                <div class="history-item current">
                    <span class="history-date">${today}</span>
                    <span class="history-location">${selectedLocation}</span>
                    <span class="history-status">Initial Registration</span>
                </div>
            `;
        }
    }

    // Adjust form position based on header and sidebar state
    function adjustFormPosition() {
        if (!fullScreenForm) return;
        
        const header = document.querySelector('header');
        const sidebar = document.querySelector('.sidebar-v2');
        const sidebarContent = document.querySelector('.sidebar-content.visible');
        
        let topPosition = '228px';
        let leftPosition = '340px';
        let rightPosition = '0';
        let bottomPosition = '0';
        
        if (window.matchMedia('(max-width: 768px)').matches) {
            topPosition = '0';
            leftPosition = '0';
            rightPosition = '0';
            bottomPosition = '0';
        } else if (window.matchMedia('(max-width: 1024px)').matches) {
            if (header && header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '244px';
            }
            
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '360px';
            } else {
                leftPosition = '60px';
            }
        } else {
            if (header) {
                if (header.classList.contains('collapsed')) {
                    topPosition = '0px';
                } else {
                    topPosition = '284px';
                }
            }
            
            if (sidebar) {
                if (sidebarContent && sidebarContent.classList.contains('visible')) {
                    leftPosition = '360px';
                } else {
                    leftPosition = '60px';
                }
            }
        }
        
        fullScreenForm.style.top = topPosition;
        fullScreenForm.style.left = leftPosition;
        fullScreenForm.style.right = rightPosition;
        fullScreenForm.style.bottom = bottomPosition;
    }

    // Remove photo preview
    function removePhotoPreview(index) {
        const previewItems = photoPreviewContainer?.querySelectorAll('.photo-preview-item');
        if (previewItems && previewItems[index]) {
            previewItems[index].remove();
        }
    }

    // Remove document preview
    function removeDocumentPreview(index) {
        const previewItems = documentPreviewContainer?.querySelectorAll('.document-preview-item');
        if (previewItems && previewItems[index]) {
            previewItems[index].remove();
        }
    }

    // Load draft if exists
    function loadDraft() {
        try {
            const draftData = localStorage.getItem('infrastructure_form_draft');
            if (draftData) {
                const data = JSON.parse(draftData);

                // Populate form fields with draft data
                // This would require more complex implementation
                showNotification('Draft data available. Would you like to load it?', 'info');
            }
        } catch (error) {
            console.error('Error loading draft:', error);
        }
    }

    // Global form control functions
    window.showInfrastructureForm = showInfrastructureForm;
    window.hideInfrastructureForm = hideInfrastructureForm;

    // Initialize when DOM is ready
    initForm();
    
    // Load draft if available
    loadDraft();
    
    // Setup observers for responsive positioning
    const header = document.querySelector('header');
    if (header) {
        const headerObserver = new MutationObserver(adjustFormPosition);
        headerObserver.observe(header, { attributes: true });
    }
    
    const sidebar = document.querySelector('.sidebar-v2');
    if (sidebar) {
        const sidebarObserver = new MutationObserver(adjustFormPosition);
        sidebarObserver.observe(sidebar, { attributes: true, subtree: true });
    }
    
    // Handle window resize
    window.addEventListener('resize', adjustFormPosition);
});