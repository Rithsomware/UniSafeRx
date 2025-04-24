
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { BlockData, MedicineInfo } from '@/utils/blockchainUtils';
import { AIVerificationResult } from '@/utils/aiUtils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface VerificationResultProps {
  isVerifying: boolean;
  isVerified: boolean;
  medicineInfo?: MedicineInfo;
  blockchain: BlockData[];
  aiResult?: AIVerificationResult;
  message?: string;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  isVerifying,
  isVerified,
  medicineInfo,
  blockchain,
  aiResult,
  message
}) => {
  if (isVerifying) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 text-unisafe-blue animate-spin mb-4" />
            <h3 className="text-lg font-medium">Verifying Medicine</h3>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              Checking blockchain records and performing AI analysis to verify authenticity...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If not verified and no data
  if (!isVerified && !medicineInfo && blockchain.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">Verification Failed</h3>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              {message || "This product could not be verified. It may be counterfeit or not registered in our database."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Determine verification status
  let verificationStatus = 'verified';
  if (blockchain.some(block => block.status === 'counterfeit')) {
    verificationStatus = 'counterfeit';
  } else if (blockchain.some(block => block.status === 'suspicious') || (aiResult && !aiResult.isAuthentic)) {
    verificationStatus = 'suspicious';
  }
  
  return (
    <Card className={`
      ${verificationStatus === 'verified' ? 'border-green-200' : ''}
      ${verificationStatus === 'suspicious' ? 'border-yellow-200' : ''}
      ${verificationStatus === 'counterfeit' ? 'border-red-200' : ''}
    `}>
      <CardHeader className={`
        ${verificationStatus === 'verified' ? 'bg-green-50' : ''}
        ${verificationStatus === 'suspicious' ? 'bg-yellow-50' : ''}
        ${verificationStatus === 'counterfeit' ? 'bg-red-50' : ''}
      `}>
        <div className="flex items-center space-x-3">
          {verificationStatus === 'verified' && (
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          )}
          {verificationStatus === 'suspicious' && (
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          )}
          {verificationStatus === 'counterfeit' && (
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          )}
          <div>
            <CardTitle>
              {verificationStatus === 'verified' && 'Authentic Product'}
              {verificationStatus === 'suspicious' && 'Suspicious Product'}
              {verificationStatus === 'counterfeit' && 'Counterfeit Warning'}
            </CardTitle>
            <CardDescription>
              {verificationStatus === 'verified' && 'This product has been verified as authentic'}
              {verificationStatus === 'suspicious' && 'This product has suspicious traits that require attention'}
              {verificationStatus === 'counterfeit' && 'This product may be counterfeit - do not use'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {medicineInfo && (
          <>
            <h3 className="text-lg font-medium mb-3">Medicine Information</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
              <div className="text-sm font-medium">Name:</div>
              <div className="text-sm">{medicineInfo.name}</div>
              
              <div className="text-sm font-medium">Manufacturer:</div>
              <div className="text-sm">{medicineInfo.manufacturer}</div>
              
              <div className="text-sm font-medium">Batch Number:</div>
              <div className="text-sm">{medicineInfo.batchNumber}</div>
              
              <div className="text-sm font-medium">Expires:</div>
              <div className="text-sm">{medicineInfo.expirationDate}</div>
              
              <div className="text-sm font-medium">Dosage:</div>
              <div className="text-sm">{medicineInfo.dosage}</div>
              
              <div className="text-sm font-medium">Active Ingredients:</div>
              <div className="text-sm">{medicineInfo.activeIngredients.join(", ")}</div>
              
              <div className="text-sm font-medium">Package Type:</div>
              <div className="text-sm">{medicineInfo.packageType}</div>
            </div>
            
            <Separator className="my-4" />
          </>
        )}
        
        {aiResult && (
          <>
            <h3 className="text-lg font-medium mb-3">AI Verification</h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Overall Confidence</div>
                <div className="text-sm font-medium">{aiResult.confidenceScore.toFixed(1)}%</div>
              </div>
              <Progress value={aiResult.confidenceScore} className={`
                ${aiResult.confidenceScore > 80 ? 'bg-green-100' : ''}
                ${aiResult.confidenceScore > 60 && aiResult.confidenceScore <= 80 ? 'bg-yellow-100' : ''}
                ${aiResult.confidenceScore <= 60 ? 'bg-red-100' : ''}
              `} />
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
                <div className="text-sm">
                  <div className="font-medium mb-1">Packaging Analysis</div>
                  <Progress value={aiResult.features.packagingScore} className="h-2 mb-1" />
                  <div className="text-xs text-gray-500">{aiResult.features.packagingScore.toFixed(1)}%</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-1">Barcode Verification</div>
                  <Progress value={aiResult.features.barcodeScore} className="h-2 mb-1" />
                  <div className="text-xs text-gray-500">{aiResult.features.barcodeScore.toFixed(1)}%</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-1">Hologram Check</div>
                  <Progress value={aiResult.features.hologramScore} className="h-2 mb-1" />
                  <div className="text-xs text-gray-500">{aiResult.features.hologramScore.toFixed(1)}%</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-1">Print Quality</div>
                  <Progress value={aiResult.features.printQualityScore} className="h-2 mb-1" />
                  <div className="text-xs text-gray-500">{aiResult.features.printQualityScore.toFixed(1)}%</div>
                </div>
              </div>
              
              {aiResult.anomalies.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Detected Anomalies:</div>
                  <ul className="list-disc pl-5 text-sm text-red-600 space-y-1">
                    {aiResult.anomalies.map((anomaly, index) => (
                      <li key={index}>{anomaly}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
        
        {message && (
          <div className="text-sm border-t pt-4 mt-2">
            <span className="font-medium">Note: </span>{message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
