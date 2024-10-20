import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../Components/Axios"; // Import Axios

function CaptureButton() {
  const [capturing, setCapturing] = useState(false); // Manage camera state
  const [sending, setSending] = useState(false); // Sending state
  const videoRef = useRef(null); // Video reference for image capture

  const openCamera = () => {
    setCapturing(true); // Enable capturing
  };

  const closeCamera = () => {
    setCapturing(false); // Manually stop capturing (close the camera)
  };

  const triggerCapture = async () => {
    try {
      setSending(true); // Indicate the capture process is ongoing
      const token = localStorage.getItem("token"); // Retrieve token

      // Get the video element from the ref
      const videoElement = videoRef.current.querySelector("video");
      if (!videoElement) {
        alert("Camera is not available.");
        setSending(false);
        return;
      }

      // Create a canvas to draw the video frame
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Draw the current frame of the video onto the canvas
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );

      if (!blob) {
        alert("Failed to capture image.");
        setSending(false);
        return;
      }

      // Create FormData to send the image
      const formData = new FormData();
      formData.append("image", blob, "captured-image.jpg"); // Append the blob

      // Send the image to the backend using Axios
      const res = await axios.post("/scan", formData, {
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
      {!capturing && (
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2"
          onClick={openCamera} // Open the camera on click
        >
          Scan to Add Product
        </button>
      )}

      {/* Display the camera component and option to capture image */}
      {capturing && (
        <div className="w-full mt-4">
          <div ref={videoRef}>
            <video
              autoPlay
              playsInline
              style={{ width: "100%" }}
              ref={(el) => {
                if (el && capturing) {
                  navigator.mediaDevices
                    .getUserMedia({ video: { facingMode: "environment" } })
                    .then((stream) => {
                      el.srcObject = stream;
                    })
                    .catch((error) => {
                      console.error("Error accessing camera: ", error);
                      setCapturing(false);
                    });
                }
              }}
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
            onClick={() => {
              const stream = videoRef.current.querySelector("video").srcObject;
              if (stream) {
                stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
              }
              closeCamera();
            }} // Close the camera
          >
            Close Camera
          </button>
        </div>
      )}

      {/* Link to view products */}
      <Link to="/products">
        <button className="bg-green-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2 mt-4">
          View Products
        </button>
      </Link>
    </div>
  );
}

export default CaptureButton;
