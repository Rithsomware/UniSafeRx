
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlockData } from '@/utils/blockchainUtils';
import { 
  Package, 
  Truck, 
  Store, 
  User, 
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BlockchainInfoProps {
  blockchain: BlockData[];
  isLoading?: boolean;
}

const BlockchainInfo: React.FC<BlockchainInfoProps> = ({ blockchain, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getTransactionIcon = (type: BlockData['transactionType'], status: BlockData['status']) => {
    switch (type) {
      case 'manufacture':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'distribution':
        return <Truck className="h-5 w-5 text-amber-500" />;
      case 'retail':
        return <Store className="h-5 w-5 text-green-500" />;
      case 'purchase':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'verification':
        return status === 'valid' 
          ? <CheckCircle className="h-5 w-5 text-green-500" /> 
          : <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Blockchain Verification</CardTitle>
      </CardHeader>
      <CardContent>
        {blockchain.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No blockchain data available</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {blockchain.map((block, index) => (
              <AccordionItem key={block.id} value={block.id} className={`border rounded-md mb-3 ${
                block.status === 'suspicious' 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200'
              }`}>
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex items-center w-full">
                    <div className="mr-3">
                      {getTransactionIcon(block.transactionType, block.status)}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">
                        {block.transactionType.charAt(0).toUpperCase() + block.transactionType.slice(1)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(block.timestamp).toLocaleString()}
                      </div>
                    </div>
                    {block.status === 'suspicious' && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                        Suspicious
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-1">
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Stakeholder</div>
                      <div className="col-span-2">{block.stakeholder}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Location</div>
                      <div className="col-span-2">
                        {`${block.location.lat.toFixed(4)}, ${block.location.lng.toFixed(4)}`}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Block Hash</div>
                      <div className="col-span-2">
                        <div className="truncate max-w-full font-mono text-xs">
                          {block.hash}
                        </div>
                      </div>
                    </div>
                    {block.additionalInfo && (
                      <>
                        <div className="border-t my-2"></div>
                        <div className="font-medium">Additional Information</div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {Object.entries(block.additionalInfo).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
                              <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockchainInfo;
