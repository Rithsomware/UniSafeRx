import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Package, Clock, Hash, ArrowRight } from 'lucide-react';
import { BlockData, generateBlockchain } from '@/utils/blockchainUtils';

const ExplorerPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Sample blockchain data for explorer
  const recentBlocks = [
    {
      id: 'block-10458',
      timestamp: Date.now() - 1000 * 60 * 5,
      barcode: 'RX8372945',
      transactionType: 'verification',
      hash: '4f9a0c8f5d6e3b2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8'
    },
    {
      id: 'block-10457',
      timestamp: Date.now() - 1000 * 60 * 8,
      barcode: 'RX2953847',
      transactionType: 'purchase',
      hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a'
    },
    {
      id: 'block-10456',
      timestamp: Date.now() - 1000 * 60 * 12,
      barcode: 'RX7629384',
      transactionType: 'retail',
      hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'
    },
    {
      id: 'block-10455',
      timestamp: Date.now() - 1000 * 60 * 20,
      barcode: 'RX6574839',
      transactionType: 'distribution',
      hash: 'f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1'
    },
  ];
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate search delay
    setTimeout(() => {
      // If the query looks like a barcode, generate a chain
      if (searchQuery.startsWith('RX') && searchQuery.length >= 7) {
        setSearchResults(generateBlockchain(searchQuery));
      } else {
        // Otherwise empty results (in a real app, would search by other fields)
        setSearchResults([]);
      }
      
      setIsSearching(false);
    }, 1000);
  };
  
  const formatTimestamp = (timestamp: number): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 24 * 60) {
      const hours = Math.round(diffMins / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleString();
    }
  };
  
  const getTransactionTypeLabel = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blockchain Explorer</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by barcode, hash, or block number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-unisafe-blue hover:bg-unisafe-darkBlue"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {hasSearched && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isSearching ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-14 bg-gray-200 rounded"></div>
                  <div className="h-14 bg-gray-200 rounded"></div>
                  <div className="h-14 bg-gray-200 rounded"></div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((block) => (
                    <div key={block.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 bg-unisafe-blue bg-opacity-10 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-unisafe-blue" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="font-medium">{block.id}</h3>
                            <span className="text-sm text-gray-500">{formatTimestamp(block.timestamp)}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Transaction:</span> {getTransactionTypeLabel(block.transactionType)}
                            </div>
                            <div>
                              <span className="text-gray-500">Barcode:</span> {block.barcode}
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-gray-500">Hash:</span>
                              <span className="font-mono text-xs ml-1 break-all">{block.hash}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-unisafe-blue" />
                Recent Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBlocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{block.id}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{formatTimestamp(block.timestamp)}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{getTransactionTypeLabel(block.transactionType)}</span>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <Hash className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2 h-5 w-5 text-unisafe-blue" />
                Blockchain Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Total Blocks</div>
                    <div className="text-2xl font-bold">10,458</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Medicines Tracked</div>
                    <div className="text-2xl font-bold">5,279</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Transactions Today</div>
                    <div className="text-2xl font-bold">143</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Manufacturers</div>
                    <div className="text-2xl font-bold">28</div>
                  </div>
                </div>
                
                <div className="p-4 bg-unisafe-blue bg-opacity-10 rounded-lg border border-unisafe-blue border-opacity-20">
                  <div className="flex items-start">
                    <div className="mr-3">
                      <div className="w-8 h-8 bg-unisafe-blue rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-unisafe-darkBlue">Blockchain Demo</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        This is a simulated blockchain for demonstration purposes. In a production 
                        environment, this would connect to a real blockchain network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExplorerPage;
