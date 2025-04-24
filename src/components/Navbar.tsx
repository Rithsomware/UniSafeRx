
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scan, Map, History, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-unisafe-blue">
            <span className="text-xl font-bold text-white">UX</span>
          </div>
          <span className="text-xl font-bold">UniSafe RX</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-unisafe-blue font-medium transition-colors">Home</Link>
          <Link to="/scan" className="text-gray-700 hover:text-unisafe-blue font-medium transition-colors">Scan</Link>
          <Link to="/history" className="text-gray-700 hover:text-unisafe-blue font-medium transition-colors">History</Link>
          <Link to="/explorer" className="text-gray-700 hover:text-unisafe-blue font-medium transition-colors">Explorer</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex">Login</Button>
          <Button size="sm" className="hidden md:flex bg-unisafe-blue hover:bg-unisafe-darkBlue">Register</Button>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-4 h-16">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-unisafe-blue">
            <LayoutGrid size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/scan" className="flex flex-col items-center justify-center text-gray-500 hover:text-unisafe-blue">
            <Scan size={20} />
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center justify-center text-gray-500 hover:text-unisafe-blue">
            <History size={20} />
            <span className="text-xs mt-1">History</span>
          </Link>
          <Link to="/explorer" className="flex flex-col items-center justify-center text-gray-500 hover:text-unisafe-blue">
            <Map size={20} />
            <span className="text-xs mt-1">Explorer</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
