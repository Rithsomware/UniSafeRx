
import { toast } from "sonner";

// Types
export interface AIVerificationResult {
  confidenceScore: number;
  features: {
    packagingScore: number;
    barcodeScore: number;
    hologramScore: number;
    printQualityScore: number;
  };
  anomalies: string[];
  isAuthentic: boolean;
}

// Simulated AI verification
export const performAIVerification = async (barcode: string, imageData?: string): Promise<AIVerificationResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo purposes, we'll use the barcode to determine if it's authentic
  const isAuthentic = !barcode.startsWith('RX9') || Math.random() > 0.3;
  
  // Generate varying confidence scores based on authenticity
  const baseScore = isAuthentic ? 90 + Math.random() * 9 : 50 + Math.random() * 30;
  const confidenceScore = Math.min(99.9, baseScore);
  
  // Generate feature scores
  const features = {
    packagingScore: isAuthentic ? 90 + Math.random() * 9 : 60 + Math.random() * 30,
    barcodeScore: isAuthentic ? 95 + Math.random() * 4 : 85 + Math.random() * 10,
    hologramScore: isAuthentic ? 92 + Math.random() * 7 : 40 + Math.random() * 40,
    printQualityScore: isAuthentic ? 93 + Math.random() * 6 : 50 + Math.random() * 40
  };
  
  // Generate anomalies based on authenticity
  const anomalies: string[] = [];
  if (!isAuthentic) {
    const possibleAnomalies = [
      "Hologram pattern inconsistency detected",
      "Print quality below manufacturer standards",
      "Package sealing irregularities found",
      "Barcode verification partial match only",
      "Color spectrum analysis shows discrepancies",
      "Font inconsistencies detected in packaging text",
      "Microprint authentication failed"
    ];
    
    // Add 1-3 random anomalies
    const anomalyCount = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < anomalyCount; i++) {
      const randomIndex = Math.floor(Math.random() * possibleAnomalies.length);
      anomalies.push(possibleAnomalies[randomIndex]);
      possibleAnomalies.splice(randomIndex, 1); // Remove used anomaly
    }
  }
  
  if (!isAuthentic) {
    toast.error("AI analysis detected possible counterfeit indicators");
  } else if (confidenceScore < 95) {
    toast.warning("AI verification completed with medium confidence");
  } else {
    toast.success("AI verification confirms product authenticity");
  }
  
  return {
    confidenceScore,
    features,
    anomalies,
    isAuthentic
  };
};

// Analyze medicine image (simulated)
export const analyzeMedicineImage = async (imageData: string): Promise<{ 
  recognized: boolean;
  name?: string; 
  manufacturer?: string;
  confidence?: number;
}> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo, we always recognize some medicine
  const recognized = Math.random() > 0.2;
  
  if (recognized) {
    const medicines = [
      { name: "Amoxicillin", manufacturer: "PharmaTrust Inc." },
      { name: "Lisinopril", manufacturer: "MediSecure Labs" },
      { name: "Metformin", manufacturer: "GlobalHealth Pharmaceuticals" },
      { name: "Atorvastatin", manufacturer: "BioPharma Solutions" },
      { name: "Amlodipine", manufacturer: "CardioHealth Labs" }
    ];
    
    const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)];
    const confidence = 75 + Math.random() * 20;
    
    return {
      recognized: true,
      name: randomMedicine.name,
      manufacturer: randomMedicine.manufacturer,
      confidence
    };
  }
  
  return { recognized: false };
};

// Detect anomalies in supply chain
export const detectSupplyChainAnomalies = async (blockchain: any[]): Promise<{
  hasAnomalies: boolean;
  anomalies: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    blockIndex: number;
  }[];
}> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const anomalies = [];
  
  // For demo, sometimes detect anomalies
  const hasAnomalies = Math.random() < 0.3;
  
  if (hasAnomalies && blockchain.length >= 3) {
    // Random time gap anomaly
    if (Math.random() > 0.5) {
      const randomIndex = 1 + Math.floor(Math.random() * (blockchain.length - 1));
      anomalies.push({
        type: 'time-gap',
        description: 'Unusual time gap detected between supply chain events',
        severity: Math.random() > 0.5 ? 'medium' : 'low',
        blockIndex: randomIndex
      });
    }
    
    // Random location anomaly
    if (Math.random() > 0.7) {
      const randomIndex = 1 + Math.floor(Math.random() * (blockchain.length - 1));
      anomalies.push({
        type: 'location',
        description: 'Unexpected geographic movement pattern detected',
        severity: 'medium',
        blockIndex: randomIndex
      });
    }
    
    // Random stakeholder anomaly
    if (Math.random() > 0.8) {
      const randomIndex = Math.floor(Math.random() * blockchain.length);
      anomalies.push({
        type: 'stakeholder',
        description: 'Unverified stakeholder in supply chain',
        severity: 'high',
        blockIndex: randomIndex
      });
    }
  }
  
  return {
    hasAnomalies: anomalies.length > 0,
    anomalies
  };
};
