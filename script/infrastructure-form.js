document.addEventListener('DOMContentLoaded', function() {

const issueReportButton = document.getElementById('issueReportBtn');
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

const categories = {
    "Roads & Transportation": [
        "Highways",
        "Main Roads",
        "Streets",
        "Public Transportation",
        "Traffic Data"
    ]
};

function initForm() {
    if (issueCategorySelect) {
        Object.keys(categories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            issueCategorySelect.appendChild(option);
        });
    }
    
    const dateReported = document.getElementById('issueDateReported');
    if (dateReported) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateReported.value = formattedDate;
    }
    
    checkCameraAvailability();
}

function checkCameraAvailability() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            if (mobileCameraBtn) {
                mobileCameraBtn.style.display = 'flex';
            }
        }
    }
}

function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const videoElement = document.createElement('video');
        videoElement.id = 'camera-preview';
        videoElement.autoplay = true;
        videoElement.style.width = '100%';
        videoElement.style.borderRadius = '4px';
        
        const captureBtn = document.createElement('button');
        captureBtn.textContent = 'Capture Photo';
        captureBtn.className = 'add-btn';
        captureBtn.style.margin = '10px auto';
        captureBtn.style.display = 'block';
        
        const cancelCaptureBtn = document.createElement('button');
        cancelCaptureBtn.textContent = 'Cancel';
        cancelCaptureBtn.className = 'cancel-btn';
        cancelCaptureBtn.style.margin = '10px auto';
        cancelCaptureBtn.style.display = 'block';
        
        const cameraContainer = document.createElement('div');
        cameraContainer.id = 'camera-container';
        cameraContainer.style.position = 'fixed';
        cameraContainer.style.top = '0';
        cameraContainer.style.left = '0';
        cameraContainer.style.width = '100%';
        cameraContainer.style.height = '100%';
        cameraContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        cameraContainer.style.zIndex = '2000';
        cameraContainer.style.display = 'flex';
        cameraContainer.style.flexDirection = 'column';
        cameraContainer.style.padding = '20px';
        cameraContainer.style.boxSizing = 'border-box';
        
        cameraContainer.appendChild(videoElement);
        
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.gap = '10px';
        btnContainer.appendChild(captureBtn);
        btnContainer.appendChild(cancelCaptureBtn);
        cameraContainer.appendChild(btnContainer);
        
        document.body.appendChild(cameraContainer);
        
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
            .then(function(stream) {
                videoElement.srcObject = stream;
                
                captureBtn.addEventListener('click', function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    const ctx = canvas.getContext('2d');
                    
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    
                    const dataURL = canvas.toDataURL('image/jpeg');
                    
                    previewImage.src = dataURL;
                    uploadPreview.style.display = 'block';
                    
                    fetch(dataURL)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                            
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            
                            photoUploadInput.files = dataTransfer.files;
                        });
                    
                    closeCamera(stream);
                });
                
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

function closeCamera(stream) {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    const cameraContainer = document.getElementById('camera-container');
    if (cameraContainer) {
        cameraContainer.remove();
    }
}

function showIssueForm() {
    if (fullScreenForm) {
        adjustFormPosition();
        fullScreenForm.style.display = 'block';
        resetForm();
    }
}

function hideIssueForm() {
    if (fullScreenForm) {
        fullScreenForm.style.display = 'none';
        resetForm();
    }
}

function resetForm() {
    if (issueCategorySelect) issueCategorySelect.selectedIndex = 0;
    if (issueTypeSelect) {
        while (issueTypeSelect.options.length > 1) {
            issueTypeSelect.remove(1);
        }
        issueTypeSelect.selectedIndex = 0;
    }
    
    const formInputs = fullScreenForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    formInputs.forEach(input => {
        input.value = '';
    });
    
    const dateReported = document.getElementById('issueDateReported');
    if (dateReported) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateReported.value = formattedDate;
    }
    
    const priorities = document.getElementsByName('priority');
    for (let i = 0; i < priorities.length; i++) {
        priorities[i].checked = priorities[i].value === 'medium';
    }
    
    resetPhotoUpload();
}

function resetPhotoUpload() {
    if (photoUploadInput) photoUploadInput.value = '';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (previewImage) previewImage.src = '';
}

function updateIssueTypes() {
    if (!issueCategorySelect || !issueTypeSelect) return;
    
    const selectedCategory = issueCategorySelect.value;
    
    while (issueTypeSelect.options.length > 1) {
        issueTypeSelect.remove(1);
    }
    
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
    
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content-v2.visible');
    
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
        // ADD THIS TABLET BREAKPOINT
        if (header && header.classList.contains('collapsed')) {
            topPosition = '0px';
        } else {
            topPosition = '244px'; // Tablet header height
        }
        
        if (sidebarContent && sidebarContent.classList.contains('visible')) {
            leftPosition = '360px';
        } else {
            leftPosition = '60px';
        }
    } else {
        // Desktop
        if (header) {
            if (header.classList.contains('collapsed')) {
                topPosition = '0px';
            } else {
                topPosition = '284px'; // Desktop header height
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

function handleSubmit() {
    console.log("Submit button clicked - processing form submission");
    
    const formData = new FormData();
    formData.append('issueType', issueTypeSelect.value);
    formData.append('issueCategory', issueCategorySelect.value);
    formData.append('issueLocation', document.getElementById('issueLocation').value);
    formData.append('issueDateReported', document.getElementById('issueDateReported').value);
    formData.append('contactEmail', document.getElementById('contactEmail').value);
    formData.append('contactPhone', document.getElementById('contactPhone').value);
    formData.append('issueDescription', document.getElementById('issueDescription').value);
    
    const priorities = document.getElementsByName('priority');
    let selectedPriority = 'medium';
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) {
            selectedPriority = priorities[i].value;
            break;
        }
    }
    formData.append('priority', selectedPriority);
    
    if (photoUploadInput.files.length > 0) {
        formData.append('photo', photoUploadInput.files[0]);
    }
    
    console.log("Form data collected:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    showSuccessMessage();
}

function showSuccessMessage() {
    console.log("Showing success message");
    
    const message = document.createElement('div');
    message.textContent = 'Issue reported successfully!';
    message.style.backgroundColor = '#4CAF50';
    message.style.color = 'white';
    message.style.padding = '15px';
    message.style.borderRadius = '4px';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.zIndex = '1000';
    message.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(message);
    console.log("Success message added to DOM");
    
    setTimeout(function() {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.removeChild(message);
        }, 500);
    }, 3000);
    
    setTimeout(function() {
        hideIssueForm();
        console.log("Form hidden after submission");
    }, 1000);
}

function handlePhotoUpload(files) {
    if (files.length > 0) {
        const file = files[0];
        
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

if (issueReportButton) {
    issueReportButton.addEventListener('click', function() {
        console.log("Issue Report button clicked");
        showIssueForm();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', hideIssueForm);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', hideIssueForm);
}

if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
}

if (issueCategorySelect) {
    issueCategorySelect.addEventListener('change', updateIssueTypes);
}

if (photoUploadArea && photoUploadInput) {
    photoUploadArea.addEventListener('click', function() {
        photoUploadInput.click();
    });
    
    photoUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUploadArea.style.borderColor = 'var(--primary-color)';
    });
    
    photoUploadArea.addEventListener('dragleave', function() {
        photoUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    photoUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        photoUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        handlePhotoUpload(e.dataTransfer.files);
    });
    
    photoUploadInput.addEventListener('change', function() {
        handlePhotoUpload(this.files);
    });
}

if (mobileCameraBtn) {
    mobileCameraBtn.addEventListener('click', function() {
        openCamera();
    });
}

if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', resetPhotoUpload);
}

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

const sidebar = document.querySelector('.sidebar-v2');
if (sidebar) {
    const sidebarObserver = new MutationObserver(adjustFormPosition);
    sidebarObserver.observe(sidebar, { attributes: true, subtree: true });
}

window.addEventListener('resize', function() {
    adjustFormPosition();
    checkCameraAvailability();
});

initForm();

if (fullScreenForm && window.location.search.includes('showform=true')) {
    showIssueForm();
}
});