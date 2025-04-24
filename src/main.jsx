
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Request camera permissions on startup
const requestCameraPermissions = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("Camera permissions granted on startup");
  } catch (error) {
    console.log("Camera permissions were not granted on startup");
  }
};

// Try to get camera permissions early
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  requestCameraPermissions();
}

createRoot(document.getElementById("root")).render(<App />);
