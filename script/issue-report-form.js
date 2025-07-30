document.addEventListener('DOMContentLoaded', function() {
    
    
    // DOM Elements - Check for multiple possible button IDs
    const issueReportButton = document.getElementById('issueReportBtn') || 
                             document.getElementById('reportIssueBtn') || 
                             document.getElementById('issue-report-btn') ||
                             document.querySelector('[data-action="report-issue"]') ||
                             document.querySelector('.issue-report-button');
    
    const fullScreenForm = document.getElementById('full-screen-issue-report-form');
    const closeBtn = document.getElementById('issue-form-close');
    const submitBtn = document.getElementById('submit-issue-btn');
    const cancelBtn = document.getElementById('cancel-issue-btn');
    const issueCategorySelect = document.getElementById('issueCategory');
    const issueTypeSelect = document.getElementById('issueType');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const photoUploadInput = document.getElementById('photoUpload');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const removePhotoBtn = document.getElementById('removePhoto');
    const mobileCameraBtn = document.getElementById('mobileCameraBtn');


    // Category data structure with subcategories
    const categories = {
        "Roads & Transportation": [
            "Highways",
            "Main Roads",
            "Streets",
            "Public Transportation",
            "Traffic Data"
        ],
        "Utilities": [
            "Power Distribution",
            "Water Supply",
            "Telecommunications",
            "Gas Lines"
        ],
        "Public Buildings": [
            "Government Buildings",
            "Schools",
            "Hospitals",
            "Community Centers"
        ],
        "Environmental": [
            "Air Quality",
            "Water Quality",
            "Noise Pollution",
            "Waste Management"
        ],
        "Safety & Security": [
            "Street Lighting",
            "Emergency Services",
            "Public Safety",
            "Traffic Safety"
        ]
    };

    // Initialize form elements when DOM loads
    function initForm() {
        
        // Populate category dropdown
        if (issueCategorySelect) {
            // Clear existing options except the first one
            while (issueCategorySelect.options.length > 1) {
                issueCategorySelect.remove(1);
            }
            
            Object.keys(categories).forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                issueCategorySelect.appendChild(option);
            });
        }
        
        // Set the current date as default for datepicker
        const dateReported = document.getElementById('issueDateReported');
        if (dateReported) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            dateReported.value = formattedDate;
        }
        
        // Check if device can use camera
        checkCameraAvailability();
    }

    // Check if the device can use camera
    function checkCameraAvailability() {
        // Only show the camera button on mobile devices
        if (window.matchMedia('(max-width: 768px)').matches) {
            // Check if the browser supports getUserMedia
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Show the camera button
                if (mobileCameraBtn) {
                    mobileCameraBtn.style.display = 'flex';
                }
            }
        }
    }

    // Function to open camera
    function openCamera() {
        // Check if device supports camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Create video element
            const videoElement = document.createElement('video');
            videoElement.id = 'camera-preview';
            videoElement.autoplay = true;
            videoElement.style.width = '100%';
            videoElement.style.borderRadius = '4px';
            
            // Create capture button
            const captureBtn = document.createElement('button');
            captureBtn.textContent = 'Capture Photo';
            captureBtn.className = 'camera-capture-btn';
            captureBtn.style.margin = '10px auto';
            captureBtn.style.display = 'block';
            
            // Create cancel button
            const cancelCaptureBtn = document.createElement('button');
            cancelCaptureBtn.textContent = 'Cancel';
            cancelCaptureBtn.className = 'camera-cancel-btn';
            cancelCaptureBtn.style.margin = '10px auto';
            cancelCaptureBtn.style.display = 'block';
            
            // Create container for camera UI
            const cameraContainer = document.createElement('div');
            cameraContainer.id = 'camera-container';
            cameraContainer.className = 'camera-overlay';
            
            // Add elements to container
            cameraContainer.appendChild(videoElement);
            
            // Button container
            const btnContainer = document.createElement('div');
            btnContainer.className = 'camera-buttons';
            btnContainer.appendChild(captureBtn);
            btnContainer.appendChild(cancelCaptureBtn);
            cameraContainer.appendChild(btnContainer);
            
            // Add container to body
            document.body.appendChild(cameraContainer);
            
            // Request camera access
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
                .then(function(stream) {
                    videoElement.srcObject = stream;
                    
                    // Handle capture button click
                    captureBtn.addEventListener('click', function() {
                        // Create canvas to capture image
                        const canvas = document.createElement('canvas');
                        canvas.width = videoElement.videoWidth;
                        canvas.height = videoElement.videoHeight;
                        const ctx = canvas.getContext('2d');
                        
                        // Draw the video frame to the canvas
                        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                        
                        // Convert to data URL
                        const dataURL = canvas.toDataURL('image/jpeg');
                        
                        // Display in preview
                        if (previewImage) {
                            previewImage.src = dataURL;
                        }
                        if (uploadPreview) {
                            uploadPreview.style.display = 'block';
                        }
                        
                        // Convert dataURL to Blob for form submission
                        fetch(dataURL)
                            .then(res => res.blob())
                            .then(blob => {
                                // Create a File object
                                const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                                
                                // Create a FileList-like object
                                const dataTransfer = new DataTransfer();
                                dataTransfer.items.add(file);
                                
                                // Set the file to the input
                                if (photoUploadInput) {
                                    photoUploadInput.files = dataTransfer.files;
                                }
                            });
                        
                        // Close camera
                        closeCamera(stream);
                    });
                    
                    // Handle cancel button click
                    cancelCaptureBtn.addEventListener('click', function() {
                        closeCamera(stream);
                    });
                })
                .catch(function(error) {
                    console.error("Camera error: ", error);
                    alert("Camera access denied or not available.");
                    cameraContainer.remove();
                });
        } else {
            alert("Your device doesn't support camera access, or you've denied permission.");
        }
    }

    // Function to close camera
    function closeCamera(stream) {
        // Stop all video streams
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Remove camera UI
        const cameraContainer = document.getElementById('camera-container');
        if (cameraContainer) {
            cameraContainer.remove();
        }
    }

    // Show the issue report form
    function showIssueForm() {
        if (fullScreenForm) {
            adjustFormPosition();
            fullScreenForm.style.display = 'block';
            resetForm();
        } else {
            console.error("Form element not found!");
        }
    }

    // Hide the issue report form
    function hideIssueForm() {
        if (fullScreenForm) {
            fullScreenForm.style.display = 'none';
            resetForm();
        }
    }

    // Reset form fields
    function resetForm() {
        // Reset dropdowns
        if (issueCategorySelect) issueCategorySelect.selectedIndex = 0;
        if (issueTypeSelect) {
            // Clear existing options except the first one
            while (issueTypeSelect.options.length > 1) {
                issueTypeSelect.remove(1);
            }
            issueTypeSelect.selectedIndex = 0;
        }
        
        // Reset text inputs
        if (fullScreenForm) {
            const formInputs = fullScreenForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
            formInputs.forEach(input => {
                input.value = '';
            });
        }
        
        // Reset date to current date
        const dateReported = document.getElementById('issueDateReported');
        if (dateReported) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            dateReported.value = formattedDate;
        }
        
        // Reset priority to Medium
        const priorities = document.getElementsByName('priority');
        for (let i = 0; i < priorities.length; i++) {
            priorities[i].checked = priorities[i].value === 'medium';
        }
        
        // Reset photo upload
        resetPhotoUpload();
    }

    // Reset photo upload section
    function resetPhotoUpload() {
        if (photoUploadInput) photoUploadInput.value = '';
        if (uploadPreview) uploadPreview.style.display = 'none';
        if (previewImage) previewImage.src = '';
    }

    // Update issue types based on selected category
    function updateIssueTypes() {
        if (!issueCategorySelect || !issueTypeSelect) return;
        
        const selectedCategory = issueCategorySelect.value;
        
        // Clear existing options except the first one
        while (issueTypeSelect.options.length > 1) {
            issueTypeSelect.remove(1);
        }
        
        // Add new options based on selected category
        if (selectedCategory && categories[selectedCategory]) {
            categories[selectedCategory].forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                issueTypeSelect.appendChild(option);
            });
        }
    }

function adjustFormPosition() {
    if (!fullScreenForm) return;
    
    // Position form based on header and sidebar state
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content.visible');
    
    // Default positioning
    let topPosition = '284px'; // Current default
    let leftPosition = '60px';  // Current default
    let rightPosition = '0';
    let bottomPosition = '0';
    
    // Check if we're in mobile view
    if (window.matchMedia('(max-width: 768px)').matches) {
        // Mobile view - take full screen
        topPosition = '0';
        leftPosition = '0';
        rightPosition = '0';
        bottomPosition = '0';
    } else if (window.matchMedia('(max-width: 1024px) and (min-width: 769px)').matches) {
        // ADD THIS NEW TABLET SECTION
        if (header) {
            if (header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '244px'; // Changed from 284px to 244px
            }
        }
        
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '330px'; // Changed from 360px to 330px
            } else {
                leftPosition = '60px';
            }
        }
    } else {
        // Desktop view - adjust based on header and sidebar state
        
        // Check header state
        if (header) {
            if (header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '284px'; // Keep original for desktop
            }
        }
        
        // Check sidebar state
        if (sidebar) {
            if (sidebarContent && sidebarContent.classList.contains('visible')) {
                leftPosition = '360px'; // Keep original for desktop
            } else {
                leftPosition = '60px';
            }
        }
    }
    
    // Apply the calculated positions
    fullScreenForm.style.top = topPosition;
    fullScreenForm.style.left = leftPosition;
    fullScreenForm.style.right = rightPosition;
    fullScreenForm.style.bottom = bottomPosition;
}

    // Handle form submission
    function handleSubmit() {
        // Collect form data
        const formData = new FormData();
        
        // Add form fields
        const issueType = document.getElementById('issueType');
        const issueCategory = document.getElementById('issueCategory');
        const issueLocation = document.getElementById('issueLocation');
        const issueDateReported = document.getElementById('issueDateReported');
        const contactEmail = document.getElementById('contactEmail');
        const contactPhone = document.getElementById('contactPhone');
        const issueDescription = document.getElementById('issueDescription');
        
        if (issueType) formData.append('issueType', issueType.value);
        if (issueCategory) formData.append('issueCategory', issueCategory.value);
        if (issueLocation) formData.append('issueLocation', issueLocation.value);
        if (issueDateReported) formData.append('issueDateReported', issueDateReported.value);
        if (contactEmail) formData.append('contactEmail', contactEmail.value);
        if (contactPhone) formData.append('contactPhone', contactPhone.value);
        if (issueDescription) formData.append('issueDescription', issueDescription.value);
        
        // Get selected priority
        const priorities = document.getElementsByName('priority');
        let selectedPriority = 'medium';
        for (let i = 0; i < priorities.length; i++) {
            if (priorities[i].checked) {
                selectedPriority = priorities[i].value;
                break;
            }
        }
        formData.append('priority', selectedPriority);
        
        // Add photo if uploaded
        if (photoUploadInput && photoUploadInput.files.length > 0) {
            formData.append('photo', photoUploadInput.files[0]);
        }
        
        // Print form data to console for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Validation
        const requiredFields = ['issueCategory', 'issueLocation', 'issueDescription'];
        let isValid = true;
        
        for (let field of requiredFields) {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                isValid = false;
                break;
            }
        }
        
        if (isValid) {
            // Here you would send the formData to your server using fetch or XMLHttpRequest
            // For now, just show a success message and close the form
            showSuccessMessage();
        }
    }

    // Show success message
    function showSuccessMessage() {
        // Create success message
        const message = document.createElement('div');
        message.textContent = 'Issue reported successfully!';
        message.className = 'success-message';
        
        document.body.appendChild(message);
        
        // Hide message after 3 seconds
        setTimeout(function() {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease';
            
            // Remove from DOM after fade out
            setTimeout(function() {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 500);
        }, 3000);
        
        // Hide form after 1 second
        setTimeout(function() {
            hideIssueForm();
        }, 1000);
    }

    // Handle photo upload
    function handlePhotoUpload(files) {
        if (files.length > 0) {
            const file = files[0];
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            // Create a preview
            const reader = new FileReader();
            reader.onload = function(e) {
                if (previewImage) {
                    previewImage.src = e.target.result;
                }
                if (uploadPreview) {
                    uploadPreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Event Listeners
    // Issue report button click - Try multiple approaches
    if (issueReportButton) {
        issueReportButton.addEventListener('click', function(e) {
            e.preventDefault();
            showIssueForm();
        });
    } else {
        console.warn("Issue report button not found - trying alternative selectors");
        
        // Try to find button by text content
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');
        buttons.forEach(btn => {
            const text = btn.textContent.trim().toLowerCase();
            if (text.includes('report') && text.includes('issue') || 
                text.includes('report issue') ||
                text.includes('issue report')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showIssueForm();
                });
            }
        });
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideIssueForm();
        });
    }

    // Cancel button click
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideIssueForm();
        });
    }

    // Submit button click
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSubmit();
        });
    }

    // Category change
    if (issueCategorySelect) {
        issueCategorySelect.addEventListener('change', updateIssueTypes);
    }

    // Photo upload area click
    if (photoUploadArea && photoUploadInput) {
        photoUploadArea.addEventListener('click', function() {
            photoUploadInput.click();
        });
        
        // Drag and drop functionality
        photoUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            photoUploadArea.classList.add('dragover');
        });
        
        photoUploadArea.addEventListener('dragleave', function() {
            photoUploadArea.classList.remove('dragover');
        });
        
        photoUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            photoUploadArea.classList.remove('dragover');
            handlePhotoUpload(e.dataTransfer.files);
        });
        
        // File input change
        photoUploadInput.addEventListener('change', function() {
            handlePhotoUpload(this.files);
        });
    }

    // Add event listener for mobile camera button
    if (mobileCameraBtn) {
        mobileCameraBtn.addEventListener('click', function() {
            openCamera();
        });
    }

    // Remove photo button click
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetPhotoUpload();
        });
    }

    // Observe header collapse state to adjust form position
    const header = document.querySelector('header');
    if (header) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    adjustFormPosition();
                }
            });
        });
        
        observer.observe(header, { attributes: true });
    }

    // Observe sidebar state changes to adjust form position
    const sidebar = document.querySelector('.sidebar-v2');
    if (sidebar) {
        const sidebarObserver = new MutationObserver(adjustFormPosition);
        sidebarObserver.observe(sidebar, { attributes: true, subtree: true });
    }

    // Listen for window resize to handle responsive layout
    window.addEventListener('resize', function() {
        adjustFormPosition();
        checkCameraAvailability();
    });

    // Initialize the form
    initForm();

    // For testing/development - auto initialize if URL parameter is present
    if (fullScreenForm && window.location.search.includes('showissueform=true')) {
        showIssueForm();
    }

    // Global function to show form (can be called from anywhere)
    window.showIssueReportForm = showIssueForm;
    
});