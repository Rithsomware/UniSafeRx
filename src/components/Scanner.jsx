
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Camera, X } from 'lucide-react';
import { toast } from "sonner";

const Scanner = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  const startScanner = async () => {
    setErrorMessage("");
    try {
      // Try to request camera access with more options for compatibility
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        setHasPermission(true);
        toast.success("Camera access granted");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      
      // Provide specific error messages based on the error
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setErrorMessage("Camera access was denied. Please allow camera permissions in your browser settings.");
        toast.error("Camera access denied");
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setErrorMessage("No camera found on this device");
        toast.error("No camera detected");
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setErrorMessage("Camera is in use by another application");
        toast.error("Camera is in use by another application");
      } else if (error.name === 'OverconstrainedError') {
        setErrorMessage("Camera doesn't meet the required constraints");
        toast.error("Camera constraints not met");
      } else {
        setErrorMessage(`Camera error: ${error.message || 'Unknown error'}`);
        toast.error("Camera access error");
      }
    }
  };
  
  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  // Simulated barcode scanning
  const simulateScan = () => {
    if (!isScanning || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Generate a random barcode for demo purposes
      const randomBarcode = `RX${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
      
      toast.success("Barcode detected!");
      onScanComplete(randomBarcode);
      stopScanner();
      setIsProcessing(false);
    }, 1500);
  };
  
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopScanner();
    };
  }, []);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-gray-100">
          {isScanning ? (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
                onClick={simulateScan}
                onCanPlay={() => {
                  // Ensure video is actually playing
                  videoRef.current.play().catch(err => {
                    console.error("Video play error:", err);
                    setErrorMessage("Could not start video stream");
                  });
                }}
              />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-unisafe-blue rounded-lg relative">
                  <div className="scanner-line top-0"></div>
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full bg-white"
                onClick={stopScanner}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium px-4 py-2 bg-black bg-opacity-50">
                {isProcessing ? "Processing scan..." : "Position barcode in the center square and tap"}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-gray-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-medium">Scan Medicine Barcode</h3>
                <p className="text-sm text-gray-500">
                  Position the barcode within the camera frame to verify authenticity
                </p>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
              </div>
              <Button 
                onClick={startScanner} 
                className="bg-unisafe-blue hover:bg-unisafe-darkBlue"
              >
                Start Scanning
              </Button>
              
              {/* Fallback option for testing */}
              {hasPermission === false && (
                <Button 
                  onClick={simulateScan} 
                  variant="outline"
                  className="mt-2"
                >
                  Test With Demo Data
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Scanner;
