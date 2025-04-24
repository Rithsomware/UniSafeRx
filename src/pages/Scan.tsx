
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scanner from '@/components/Scanner';
import VerificationResult from '@/components/VerificationResult';
import MapView from '@/components/MapView';
import BlockchainInfo from '@/components/BlockchainInfo';
import { BlockData, MedicineInfo, verifyMedicine } from '@/utils/blockchainUtils';
import { AIVerificationResult, performAIVerification } from '@/utils/aiUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ScanPage = () => {
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string>("");
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | undefined>(undefined);
  const [blockchain, setBlockchain] = useState<BlockData[]>([]);
  const [aiResult, setAiResult] = useState<AIVerificationResult | undefined>(undefined);
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  
  const handleScanComplete = async (scannedBarcode: string) => {
    setBarcode(scannedBarcode);
    setIsScanning(false);
    setIsVerifying(true);
    
    try {
      // Verify medicine through blockchain
      const verificationResult = await verifyMedicine(scannedBarcode);
      
      // Perform AI verification
      const aiVerification = await performAIVerification(scannedBarcode);
      
      // Update state with results
      setMedicineInfo(verificationResult.medicineInfo);
      setBlockchain(verificationResult.blockchain);
      setAiResult(aiVerification);
      setVerificationMessage(verificationResult.message);
      setIsVerified(verificationResult.isAuthentic && aiVerification.isAuthentic);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationMessage("Error during verification process. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };
  
  const resetScan = () => {
    setIsScanning(true);
    setIsVerifying(false);
    setIsVerified(false);
    setBarcode("");
    setMedicineInfo(undefined);
    setBlockchain([]);
    setAiResult(undefined);
    setVerificationMessage("");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Medication Scanner</h1>
        
        {isScanning ? (
          <div className="max-w-md mx-auto">
            <Scanner onScanComplete={handleScanComplete} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Verification Results</h2>
              <button 
                onClick={resetScan}
                className="text-sm text-unisafe-blue hover:text-unisafe-darkBlue font-medium"
              >
                Scan Another
              </button>
            </div>
            
            {barcode && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Barcode:</span> {barcode}
              </div>
            )}
            
            <Tabs defaultValue="result" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="result">Results</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              <TabsContent value="result">
                <VerificationResult 
                  isVerifying={isVerifying}
                  isVerified={isVerified}
                  medicineInfo={medicineInfo}
                  blockchain={blockchain}
                  aiResult={aiResult}
                  message={verificationMessage}
                />
              </TabsContent>
              <TabsContent value="blockchain">
                <BlockchainInfo 
                  blockchain={blockchain}
                  isLoading={isVerifying}
                />
              </TabsContent>
              <TabsContent value="map">
                <MapView 
                  blockchain={blockchain}
                  isLoading={isVerifying}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanPage;
