const input = document.getElementById("input");
const btnGenerateQR = document.getElementById("generateQR");
const imageQR = document.getElementById("imageQR");
const qrSizeSelect = document.getElementById("qrSize");
const fgColorInput = document.getElementById("fgColor");
const bgColorInput = document.getElementById("bgColor");
const downloadQRBtn = document.getElementById("downloadQR");
const downloadFormatSelect = document.getElementById("downloadFormat");
const downloadOptionsDiv = document.getElementById("downloadOptions");
const loadingIndicator = document.getElementById("loading");
const messageBox = document.getElementById("message");

/**
 * Manages the visibility of the output elements based on the current state.
 */
function updateUIState(state, msg = '') {
    // Hide all outputs initially
    imageQR.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
    downloadOptionsDiv.classList.add('hidden');
    messageBox.classList.add('hidden');

    switch (state) {
        case 'loading':
            loadingIndicator.classList.remove('hidden');
            break;
        case 'success':
            imageQR.classList.remove('hidden');
            downloadOptionsDiv.classList.remove('hidden');
            break;
        case 'error':
            messageBox.textContent = msg || "An error occurred. Check input or try again.";
            messageBox.classList.remove('hidden');
            break;
        case 'initial':
            messageBox.textContent = msg || "Enter content and generate a QR code.";
            messageBox.classList.remove('hidden');
            break;
    }
}


function generateQR() {
    const dataValue = input.value.trim();

    if (dataValue === '') {
        updateUIState('error', "Please enter content (Text or URL) to generate the QR code.");
        return;
    }

    // --- Collect Dynamic Parameters ---
    const size = qrSizeSelect.value;
    // Remove the '#' and ensure colors are valid hex strings for the API
    const fgColor = fgColorInput.value.replace('#', '');
    const bgColor = bgColorInput.value.replace('#', '');
    // ----------------------------------

    // 1. Set Loading State
    updateUIState('loading');

    // Construct the API URL with all dynamic parameters
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(dataValue)}&color=${fgColor}&bgcolor=${bgColor}&format=png&nocache=${Date.now()}`;

    // 2. Set up the image loading process

    // Create new temporary image element to handle loading events cleanly
    const tempImage = new Image();
    tempImage.src = apiUrl;

    tempImage.onload = () => {
        // Only update the display image and state once the new image is fully loaded
        imageQR.setAttribute('src', apiUrl);
        updateUIState('success');
    };

    tempImage.onerror = () => {
        // If the API fails to return an image (e.g., bad parameters)
        updateUIState('error', "Failed to generate QR code. Check API parameters or network connection.");
    };

    // Note: We no longer need the setTimeout, as the onload event handles the delay naturally,
    // but the spinner will show until the image is received.
}

/**
 * Downloads the generated QR code image in the selected format.
 */
function downloadQR() {
    const dataValue = input.value.trim();
    const format = downloadFormatSelect.value; // Get selected format (png or jpg)

    if (!imageQR.src || imageQR.classList.contains('hidden')) {
        updateUIState('error', "Please generate a QR code before attempting to download.");
        return;
    }

    // Use the currently generated image source and append the desired format
    let downloadUrl = imageQR.src;

    // Replace the existing format OR append new one
    if (downloadUrl.includes("&format=")) {
        downloadUrl = downloadUrl.replace(/format=\w+/, `format=${format}`);
    } else {
        downloadUrl += `&format=${format}`;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;

    // Set the filename based on the input data and selected format
    link.download = `qr-code-${dataValue.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.${format}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event Listeners
btnGenerateQR.addEventListener("click", generateQR);
downloadQRBtn.addEventListener("click", downloadQR);

// Initial state setup
document.addEventListener("DOMContentLoaded", () => {
    updateUIState('initial');
});