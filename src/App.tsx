//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { PredictionProvider } from './context/PredictionContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Airdrop from './pages/Airdrop';
import PredictionDetails from './pages/PredictionDetails';

function App() {
  return (
    <WalletProvider>
      <PredictionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/prediction/:id" element={<PredictionDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/airdrop" element={<Airdrop />} />
          </Routes>
        </Layout>
      </PredictionProvider>
    </WalletProvider>
  );
}

export default App;