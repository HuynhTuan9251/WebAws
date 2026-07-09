import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

import Sidebar from './components/Sidebar';
import KPICards from './components/KPICards';
import TrafficChart from './components/TrafficChart';
import AlertTable from './components/AlertTable';
import AttackMap from './components/AttackMap';
import ProtocolPieChart from './components/ProtocolPieChart';
import InfraHealth from './components/InfraHealth';
import AIAnomalyChart from './components/AIAnomalyChart';
import TopIPConsole from './components/TopIPConsole';
import { Activity, ShieldAlert } from 'lucide-react';

// Thành phần bảo vệ (Middleware) trên Frontend
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Vỏ bọc giao diện chính
const DashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto relative z-10 scroll-smooth">
        
        {/* ======================= TAB 1: DASHBOARD ======================= */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  LIVE SYSTEM
                </div>
                <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                  Current Role: <span className="text-emerald-400">{user?.role}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-2">AWS Operations Center</h2>
            </header>
            
            <div className="max-w-[1600px] mx-auto space-y-6">
              <KPICards />
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                  <TrafficChart />
                </div>
                <div className="xl:col-span-1">
                  <InfraHealth />
                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[400px]">
                <AIAnomalyChart />
                <ProtocolPieChart />
              </div>
              <div className="grid grid-cols-1 gap-6 pt-4">
                <AttackMap />
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: SECURITY ALERTS ======================= */}
        {activeTab === 'security' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <ShieldAlert className="text-rose-500 w-8 h-8" />
                Security Incidents 
              </h2>
            </header>
            <div className="mt-8">
              <AlertTable />
            </div>
          </div>
        )}

        {/* ======================= TAB 3: TRAFFIC LOGS ======================= */}
        {activeTab === 'traffic' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto h-[calc(100vh-120px)] flex flex-col">
            <header className="mb-8 flex-shrink-0">
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <Activity className="text-blue-400 w-8 h-8" /> Network Traffic Logs
              </h2>
            </header>
            <div className="flex-1 min-h-0">
              <TopIPConsole />
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardContainer />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
