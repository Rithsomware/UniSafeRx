
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlockData } from '@/utils/blockchainUtils';
import { Skeleton } from '@/components/ui/skeleton';

// This is a placeholder component to represent the map
// In a real implementation, you would use leaflet or another mapping library
const MapPlaceholder: React.FC<{
  locations: Array<{ lat: number; lng: number; label: string; timestamp: number }>;
}> = ({ locations }) => {
  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Map visualization with {locations.length} location points
          <br />
          <span className="text-xs">(Would use Leaflet in production)</span>
        </p>
      </div>
      
      {/* Simplified location indicators */}
      <div className="absolute inset-0">
        {locations.map((loc, index) => {
          // Very simplified positioning (just for visual representation)
          const x = (((loc.lng + 180) / 360) * 100);
          const y = (((90 - loc.lat) / 180) * 100);
          
          return (
            <div 
              key={index}
              className={`absolute w-4 h-4 rounded-full ${
                index === locations.length - 1 
                  ? 'bg-unisafe-blue pulse-ring' 
                  : 'bg-unisafe-orange'
              }`}
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: index + 1
              }}
              title={`${loc.label} - ${new Date(loc.timestamp).toLocaleDateString()}`}
            >
              <span className="absolute top-4 left-4 text-xs font-bold bg-white px-1 rounded">
                {index + 1}
              </span>
            </div>
          );
        })}
        
        {/* Very simplified path */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <path 
            d={locations.map((loc, i) => {
              const x = (((loc.lng + 180) / 360) * 100);
              const y = (((90 - loc.lat) / 180) * 100);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            fill="none" 
          />
        </svg>
      </div>
    </div>
  );
};

interface MapViewProps {
  blockchain: BlockData[];
  isLoading?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ blockchain, isLoading = false }) => {
  const [locations, setLocations] = useState<Array<{ lat: number; lng: number; label: string; timestamp: number }>>([]);
  
  useEffect(() => {
    if (blockchain && blockchain.length > 0) {
      const mappedLocations = blockchain.map(block => ({
        lat: block.location.lat,
        lng: block.location.lng,
        label: `${block.stakeholder} (${block.transactionType})`,
        timestamp: block.timestamp
      }));
      
      setLocations(mappedLocations);
    }
  }, [blockchain]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Supply Chain Journey</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-64" />
        ) : locations.length > 0 ? (
          <MapPlaceholder locations={locations} />
        ) : (
          <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
            <p className="text-gray-500">No location data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;
