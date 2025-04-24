
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, BarChart2, Globe } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-unisafe-blue" />,
      title: "Instant Verification",
      description: "Verify medicine authenticity in seconds using our advanced AI-powered scanning technology."
    },
    {
      icon: <Shield className="h-10 w-10 text-unisafe-green" />,
      title: "Blockchain Security",
      description: "Every medication's journey is securely recorded on the blockchain with tamper-proof timestamps and geolocation."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-unisafe-orange" />,
      title: "Supply Chain Tracking",
      description: "Monitor the complete journey from manufacturer to consumer with detailed tracking information."
    },
    {
      icon: <Globe className="h-10 w-10 text-unisafe-blue" />,
      title: "Global Database",
      description: "Access a comprehensive database of verified medications and manufacturers worldwide."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How UniSafe RX Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium text-center mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">The Verification Process</h2>
            <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12">
              UniSafe RX combines AI-powered image recognition with blockchain verification 
              to secure the pharmaceutical supply chain from manufacturer to consumer.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-unisafe-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-unisafe-blue">1</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Medicine Registration</h3>
                  <p className="text-gray-500">
                    Manufacturers register medicine batches on the blockchain with unique identifiers 
                    and production details.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-unisafe-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-unisafe-blue">2</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Supply Chain Tracking</h3>
                  <p className="text-gray-500">
                    Each transfer of medicine is recorded with timestamp and geolocation, creating 
                    an immutable supply chain trail.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-unisafe-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-unisafe-blue">3</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Consumer Verification</h3>
                  <p className="text-gray-500">
                    Consumers scan medicine packaging to instantly verify authenticity and view the 
                    complete supply chain journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-unisafe-blue">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-sm uppercase tracking-wide opacity-75">Medications Verified</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm uppercase tracking-wide opacity-75">Pharmaceutical Partners</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">99.8%</div>
                <div className="text-sm uppercase tracking-wide opacity-75">Verification Accuracy</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">48</div>
                <div className="text-sm uppercase tracking-wide opacity-75">Countries Covered</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
