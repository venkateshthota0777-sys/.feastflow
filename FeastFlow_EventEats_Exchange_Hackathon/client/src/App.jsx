import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import EventSelectionPage from './pages/EventSelectionPage';
import MenuBuilderPage from './pages/MenuBuilderPage';
import QuoteCalculatorPage from './pages/QuoteCalculatorPage';
import LoginModal from './components/common/LoginModal';
import { FeastProvider } from './context/FeastContext';

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <FeastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-orange-200 selection:text-orange-900">
          {/* Navigation Bar */}
          <Navbar 
            onOpenLogin={() => setLoginModalOpen(true)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          {/* Main Content Pages */}
          <main className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={<HomePage onOpenLogin={() => setLoginModalOpen(true)} />} 
              />
              <Route 
                path="/select-event" 
                element={<EventSelectionPage />} 
              />
              <Route 
                path="/menu-builder" 
                element={<MenuBuilderPage />} 
              />
              <Route 
                path="/quote-calculator" 
                element={<QuoteCalculatorPage />} 
              />
              {/* Fallback to HomePage */}
              <Route 
                path="*" 
                element={<HomePage onOpenLogin={() => setLoginModalOpen(true)} />} 
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Login & Registration Modal */}
          <LoginModal 
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </Router>
    </FeastProvider>
  );
}

export default App;
