import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';

function ScanButton() {
  const [scanning, setScanning] = useState(false); // Manage scanning state
  const [scanResult, setScanResult] = useState(null); // Store scan result
  const [loadingCamera, setLoadingCamera] = useState(false); // Loading state for the camera

  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Save the scan result
      setScanning(false); // Stop scanning after successful scan
    }
  };

  const handleError = (err) => {
    console.error('Error accessing camera: ', err);
    setScanning(false); // Stop scanning on error
  };

  const openCamera = () => {
    setLoadingCamera(true); // Start camera loading
    setScanning(true); // Enable scanning
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg p-8">
      {/* Button to open the camera */}
      {!scanning && !loadingCamera && (
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2"
          onClick={openCamera} // Open the camera on click
        >
          Scan to Save the Product
        </button>
      )}

      {/* Show loading spinner or text when the camera is loading */}
      {loadingCamera && (
        <div className="flex justify-center items-center text-center">
          <p className="text-lg font-bold text-gray-700">Loading Camera...</p>
        </div>
      )}

      {/* Display the QR scanner component when scanning */}
      {scanning && (
        <div className="w-full mt-4">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            constraints={{ video: { facingMode: "environment" } }} // Ensure back camera is used
          />
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
