import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import axios from "axios"; // Import Axios

function ScanButton() {
  const [scanning, setScanning] = useState(false); // Manage scanning state
  const [scanResult, setScanResult] = useState(null); // Store scan result
  const [capturedImage, setCapturedImage] = useState(null); // To store captured image
  const [sending, setSending] = useState(false); // Sending state
  const videoRef = useRef(null); // Video reference for image capture

  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Save the scan result
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error("Error accessing camera: ", err);
    setScanning(false); // Stop scanning on error
  };

  const openCamera = () => {
    setCapturedImage(null); // Reset captured image when camera is reopened
    setScanResult(null); // Reset scan result
    setScanning(true); // Enable scanning
  };

  const closeCamera = () => {
    setScanning(false); // Manually stop scanning (close the camera)
    setCapturedImage(null); // Clear captured image if closing manually
  };

  const triggerCapture = async () => {
    try {
      setSending(true); // Indicate the capture process is ongoing
      const token = localStorage.getItem("token"); // Replace with how you manage tokens

      // Convert the captured image to a Blob (if capturedImage is a URL or base64 string)
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create FormData to send the image
      const formData = new FormData();
      formData.append("image", blob, "captured-image.jpg"); // Append the blob

      // Send the image to the backend using Axios
      const res = await axios.post("https://expirify-backend.onrender.com/scan", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
        },
      });

      if (res.status === 200) {
        alert(`Image captured successfully: ${res.data.message}`);
      } else {
        alert(`Failed to capture image: ${res.data.message}`);
      }

      setSending(false); // Reset sending state
    } catch (error) {
      console.error("Error triggering image capture:", error);
      alert("Error capturing image");
      setSending(false); // Reset sending state on error
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg p-8">
      {/* Button to open the camera */}
      {!scanning && !capturedImage && (
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2"
          onClick={openCamera} // Open the camera on click
        >
          Scan to Add the Product
        </button>
      )}

      {/* Display the QR scanner component and option to capture image */}
      {scanning && !capturedImage && (
        <div className="w-full mt-4">
          <div ref={videoRef}>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              constraints={{ video: { facingMode: "environment" } }} // Ensure back camera is used
            />
          </div>

          {/* Button to trigger image capture */}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-4"
            onClick={triggerCapture} // Trigger capture
            disabled={sending} // Disable button while sending
          >
            {sending ? "Capturing..." : "Capture Image"}
          </button>

          {/* Button to close camera */}
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-4"
            onClick={closeCamera} // Close the camera
          >
            Close Camera
          </button>
        </div>
      )}

      {/* Show scan result if available */}
      {scanResult && (
        <div className="mt-4 p-4 bg-green-200 rounded-md">
          <p className="text-center font-bold">Scanned Product: {scanResult}</p>
        </div>
      )}

      {/* Link to view products */}
      <Link to="/products">
        <button className="bg-green-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2 mt-4">
          Watch your Products
        </button>
      </Link>
    </div>
  );
}

export default ScanButton;
