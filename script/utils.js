// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Get document icon based on file extension
function getDocumentIcon(extension) {
  const iconMap = {
    pdf: '<i class="fas fa-file-pdf"></i>',
    doc: '<i class="fas fa-file-word"></i>',
    docx: '<i class="fas fa-file-word"></i>',
    xls: '<i class="fas fa-file-excel"></i>',
    xlsx: '<i class="fas fa-file-excel"></i>',
    ppt: '<i class="fas fa-file-powerpoint"></i>',
    pptx: '<i class="fas fa-file-powerpoint"></i>',
  };

  return iconMap[extension] || '<i class="fas fa-file"></i>';
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

  // Styling
  notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

  // Type-specific styling
  const colors = {
    success: "#4CAF50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196F3",
  };
  notification.style.backgroundColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Auto remove
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

// Remove notification
function removeNotification(notification) {
  notification.style.opacity = "0";
  notification.style.transform = "translateX(100%)";

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 300);
}
