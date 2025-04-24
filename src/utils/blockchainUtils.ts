
import { toast } from "sonner";

// Types
export interface BlockData {
  id: string;
  timestamp: number;
  barcode: string;
  location: { lat: number; lng: number };
  transactionType: 'manufacture' | 'distribution' | 'retail' | 'purchase' | 'verification';
  previousHash: string;
  hash: string;
  stakeholder: string;
  status: 'valid' | 'suspicious' | 'counterfeit';
  additionalInfo?: Record<string, any>;
}

export interface MedicineInfo {
  name: string;
  manufacturer: string;
  batchNumber: string;
  expirationDate: string;
  dosage: string;
  activeIngredients: string[];
  packageType: string;
  description?: string;
}

// Mock data
const medicineDatabase: Record<string, MedicineInfo> = {
  "RX1234567": {
    name: "Amoxicillin",
    manufacturer: "PharmaTrust Inc.",
    batchNumber: "BT202307",
    expirationDate: "2025-07-31",
    dosage: "500mg",
    activeIngredients: ["Amoxicillin Trihydrate"],
    packageType: "Blister pack",
    description: "Antibiotic used to treat bacterial infections"
  },
  "RX7654321": {
    name: "Lisinopril",
    manufacturer: "MediSecure Labs",
    batchNumber: "BT202306",
    expirationDate: "2025-06-30",
    dosage: "10mg",
    activeIngredients: ["Lisinopril Dihydrate"],
    packageType: "Bottle",
    description: "ACE inhibitor used to treat high blood pressure"
  },
  "RX9876543": {
    name: "Metformin",
    manufacturer: "GlobalHealth Pharmaceuticals",
    batchNumber: "BT202308",
    expirationDate: "2025-08-31",
    dosage: "850mg",
    activeIngredients: ["Metformin Hydrochloride"],
    packageType: "Blister pack",
    description: "Used to treat type 2 diabetes"
  }
};

// Simplified hash function for demo
const createHash = (data: string): string => {
  let hash = 0;
  if (data.length === 0) return hash.toString(16);
  
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to hexadecimal string and ensure it's 64 characters
  const hexHash = Math.abs(hash).toString(16).padStart(12, '0');
  return hexHash.repeat(6).substring(0, 64);
};

// Generate a blockchain for a medicine
export const generateBlockchain = (barcode: string, includeCounterfeit = false): BlockData[] => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  // Generate a historical blockchain trail
  const blocks: BlockData[] = [];
  
  // Manufacture block (first block)
  blocks.push({
    id: `block-${blocks.length + 1}`,
    timestamp: now - 30 * day, // 30 days ago
    barcode,
    location: { lat: 40.7128, lng: -74.006 }, // New York
    transactionType: 'manufacture',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '',
    stakeholder: 'PharmaTrust Manufacturing Plant',
    status: 'valid',
    additionalInfo: {
      batchSize: 10000,
      qualityScore: 98.5,
      facility: 'Main Plant'
    }
  });
  
  // Distribution block
  blocks.push({
    id: `block-${blocks.length + 1}`,
    timestamp: now - 20 * day, // 20 days ago
    barcode,
    location: { lat: 39.9526, lng: -75.1652 }, // Philadelphia
    transactionType: 'distribution',
    previousHash: '',
    hash: '',
    stakeholder: 'MedExpress Distribution',
    status: 'valid',
    additionalInfo: {
      transportConditions: 'Temperature controlled',
      vehicleId: 'TR-78934',
      destinationHub: 'Northeast Regional'
    }
  });
  
  // Retail block
  blocks.push({
    id: `block-${blocks.length + 1}`,
    timestamp: now - 10 * day, // 10 days ago
    barcode,
    location: { lat: 42.3601, lng: -71.0589 }, // Boston
    transactionType: 'retail',
    previousHash: '',
    hash: '',
    stakeholder: 'HealthPlus Pharmacy',
    status: 'valid',
    additionalInfo: {
      storeId: 'HP-9856',
      inventoryBatch: 'INV20234',
      storedConditions: 'Room temperature'
    }
  });
  
  // Purchase block
  blocks.push({
    id: `block-${blocks.length + 1}`,
    timestamp: now - 5 * day, // 5 days ago
    barcode,
    location: { lat: 42.3601, lng: -71.0589 }, // Boston (same as retail)
    transactionType: 'purchase',
    previousHash: '',
    hash: '',
    stakeholder: 'Patient Purchase',
    status: 'valid',
    additionalInfo: {
      prescriptionId: 'RX89675234',
      insurer: 'HealthGuard Insurance',
      pharmacist: 'J. Smith'
    }
  });
  
  // Add counterfeit block if needed (for demo purposes)
  if (includeCounterfeit) {
    blocks.push({
      id: `block-${blocks.length + 1}`,
      timestamp: now - 1 * day, // 1 day ago
      barcode,
      location: { lat: 41.8781, lng: -87.6298 }, // Chicago
      transactionType: 'verification',
      previousHash: '',
      hash: '',
      stakeholder: 'Unknown Verification',
      status: 'suspicious',
      additionalInfo: {
        anomalyType: 'Unexpected location',
        riskScore: 89,
        alarmTriggered: true
      }
    });
  }
  
  // Add current verification
  blocks.push({
    id: `block-${blocks.length + 1}`,
    timestamp: now,
    barcode,
    location: { lat: 42.3601, lng: -71.0589 }, // Boston
    transactionType: 'verification',
    previousHash: '',
    hash: '',
    stakeholder: 'User Verification',
    status: 'valid',
    additionalInfo: {
      deviceId: 'MOBILE-APP',
      verificationMethod: 'Barcode Scan',
      aiConfidenceScore: 97.8
    }
  });
  
  // Calculate and set hashes
  for (let i = 0; i < blocks.length; i++) {
    if (i > 0) {
      blocks[i].previousHash = blocks[i-1].hash;
    }
    
    const blockData = JSON.stringify({
      timestamp: blocks[i].timestamp,
      barcode: blocks[i].barcode,
      location: blocks[i].location,
      transactionType: blocks[i].transactionType,
      previousHash: blocks[i].previousHash,
      stakeholder: blocks[i].stakeholder
    });
    
    blocks[i].hash = createHash(blockData);
  }
  
  return blocks;
};

// Verify a medicine by barcode
export const verifyMedicine = async (barcode: string): Promise<{
  isAuthentic: boolean;
  medicineInfo?: MedicineInfo;
  blockchain: BlockData[];
  message: string;
}> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Determine if medicine exists in our database
  const medicineExists = medicineDatabase[barcode] !== undefined;
  
  // Counterfeit chance (for demo purposes)
  const isCounterfeit = barcode.startsWith('RX9') && Math.random() < 0.5;
  
  if (!medicineExists) {
    toast.error("Medicine not found in database");
    return {
      isAuthentic: false,
      blockchain: [],
      message: "This product is not registered in our database. It may be counterfeit."
    };
  }
  
  const medicineInfo = medicineDatabase[barcode];
  const blockchain = generateBlockchain(barcode, isCounterfeit);
  
  if (isCounterfeit) {
    toast.error("Warning: Possible counterfeit detected!");
    return {
      isAuthentic: false,
      medicineInfo,
      blockchain,
      message: "Verification failed. This product shows signs of being counterfeit. Please contact authorities."
    };
  }
  
  toast.success("Medicine verified as authentic");
  return {
    isAuthentic: true,
    medicineInfo,
    blockchain,
    message: "This product is verified as authentic and has a valid supply chain record."
  };
};

// Get current geolocation
export const getCurrentLocation = (): Promise<{ lat: number, lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        // Fallback location
        resolve({ lat: 40.7128, lng: -74.006 });
      }
    );
  });
};
