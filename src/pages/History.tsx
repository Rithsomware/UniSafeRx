
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScanHistoryItem {
  id: string;
  timestamp: number;
  barcode: string;
  medicineName: string;
  manufacturer: string;
  isAuthentic: boolean;
  isSuspicious: boolean;
}

const HistoryPage = () => {
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  
  // Simulated history data
  useEffect(() => {
    // In a real app, this would come from localStorage, IndexedDB, or a backend
    const mockHistory: ScanHistoryItem[] = [
      {
        id: '1',
        timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        barcode: 'RX1234567',
        medicineName: 'Amoxicillin',
        manufacturer: 'PharmaTrust Inc.',
        isAuthentic: true,
        isSuspicious: false
      },
      {
        id: '2',
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        barcode: 'RX7654321',
        medicineName: 'Lisinopril',
        manufacturer: 'MediSecure Labs',
        isAuthentic: true,
        isSuspicious: false
      },
      {
        id: '3',
        timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        barcode: 'RX9876543',
        medicineName: 'Metformin',
        manufacturer: 'GlobalHealth Pharmaceuticals',
        isAuthentic: false,
        isSuspicious: true
      }
    ];
    
    setScanHistory(mockHistory);
  }, []);
  
  const formatTimestamp = (timestamp: number): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const getStatusIcon = (item: ScanHistoryItem) => {
    if (!item.isAuthentic || item.isSuspicious) {
      return item.isSuspicious 
        ? <AlertTriangle className="h-5 w-5 text-yellow-500" />
        : <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };
  
  const getStatusText = (item: ScanHistoryItem) => {
    if (!item.isAuthentic) {
      return 'Counterfeit';
    } else if (item.isSuspicious) {
      return 'Suspicious';
    } else {
      return 'Authentic';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Scan History</h1>
        
        {scanHistory.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Scan History</h3>
              <p className="text-gray-500 mb-6">You haven't scanned any medications yet.</p>
              <Link to="/scan">
                <Button className="bg-unisafe-blue hover:bg-unisafe-darkBlue">Scan Medicine</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="authentic">Authentic</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-3">
                  {scanHistory.map(item => (
                    <div 
                      key={item.id} 
                      className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <Link to={`/scan?barcode=${item.barcode}`} className="flex items-center p-4">
                        <div className="mr-3">
                          {getStatusIcon(item)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.medicineName}</h3>
                          <div className="flex text-sm text-gray-500">
                            <span>{item.manufacturer}</span>
                            <span className="mx-2">•</span>
                            <span>{formatTimestamp(item.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            !item.isAuthentic 
                              ? 'bg-red-100 text-red-800' 
                              : item.isSuspicious 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {getStatusText(item)}
                          </span>
                          <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="authentic">
                <div className="space-y-3">
                  {scanHistory
                    .filter(item => item.isAuthentic && !item.isSuspicious)
                    .map(item => (
                      <div 
                        key={item.id} 
                        className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                      >
                        <Link to={`/scan?barcode=${item.barcode}`} className="flex items-center p-4">
                          <div className="mr-3">
                            {getStatusIcon(item)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.medicineName}</h3>
                            <div className="flex text-sm text-gray-500">
                              <span>{item.manufacturer}</span>
                              <span className="mx-2">•</span>
                              <span>{formatTimestamp(item.timestamp)}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Authentic
                            </span>
                            <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                          </div>
                        </Link>
                      </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="flagged">
                <div className="space-y-3">
                  {scanHistory
                    .filter(item => !item.isAuthentic || item.isSuspicious)
                    .map(item => (
                      <div 
                        key={item.id} 
                        className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                      >
                        <Link to={`/scan?barcode=${item.barcode}`} className="flex items-center p-4">
                          <div className="mr-3">
                            {getStatusIcon(item)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.medicineName}</h3>
                            <div className="flex text-sm text-gray-500">
                              <span>{item.manufacturer}</span>
                              <span className="mx-2">•</span>
                              <span>{formatTimestamp(item.timestamp)}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              !item.isAuthentic 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {getStatusText(item)}
                            </span>
                            <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                          </div>
                        </Link>
                      </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HistoryPage;
