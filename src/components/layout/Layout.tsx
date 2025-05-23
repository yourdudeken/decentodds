import /*React,*/ { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-50 flex flex-col bg-crypto-pattern">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 pt-16 relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : ''
        }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <MobileMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Footer />
    </div>
  );
};

export default Layout;
