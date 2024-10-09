import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';

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
    console.error('Error accessing camera: ', err);
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

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current.querySelector('video');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL('image/png');
      setCapturedImage(image); // Save captured image
      setScanning(false); // Stop scanning after capturing
    }
  };

  const sendImageToBackend = async () => {
    try {
      setSending(true); // Set sending state
      const formData = new FormData();
      formData.append('image', capturedImage);

      // Send POST request to backend
      const response = await fetch('https://your-backend-api.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type' is not needed for FormData; browser sets it automatically with boundaries
        },
      });

      const data = await response.json();
      alert('Image uploaded successfully');
      setSending(false); // Reset sending state

      // Reset captured image but keep the camera open for further actions
      setCapturedImage(null); // Reset the captured image
      setScanning(true); // Reopen the camera for the next scan
    } catch (error) {
      console.error('Error uploading image: ', error);
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
          Scan to Save the Product
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
              style={{ width: '100%' }}
              constraints={{ video: { facingMode: "environment" } }} // Ensure back camera is used
            />
          </div>
          
          {/* Button to capture image */}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-4"
            onClick={captureImage} // Capture the image from the video feed
          >
            Capture Image
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

      {/* Show captured image if available */}
      {capturedImage && (
        <div className="mt-4">
          <p className="text-center font-bold">Captured Image:</p>
          <img src={capturedImage} alt="Captured" className="rounded-md shadow-lg" />
          
          {/* Button to send image to backend */}
          <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-4 ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={sendImageToBackend}
            disabled={sending} // Disable the button while sending
          >
            {sending ? 'Sending...' : 'Send Image'}
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
