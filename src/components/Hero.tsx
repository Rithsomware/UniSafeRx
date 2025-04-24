
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-70 z-0"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Protect Patients with</span>
            <span className="block text-unisafe-blue">UniSafe RX</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Using AI and blockchain technology to authenticate medications, 
            track their journey, and protect patients from counterfeit pharmaceuticals.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Link to="/scan">
                <Button size="lg" className="w-full px-8 py-6 text-lg bg-unisafe-blue hover:bg-unisafe-darkBlue">
                  Scan Medicine
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/explorer">
                <Button variant="outline" size="lg" className="w-full px-8 py-6 text-lg">
                  View Blockchain
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation elements */}
      <div className="absolute top-1/4 -left-16 w-64 h-64 bg-unisafe-lightBlue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-1/3 -right-16 w-64 h-64 bg-unisafe-green rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-unisafe-orange rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default Hero;
