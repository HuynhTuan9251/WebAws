import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, ShieldAlert, AlertTriangle } from 'lucide-react';

const KPICards = () => {
  const [data, setData] = useState({ totalTrafficGb: 0, guardDutyAlerts: 0, lookoutAnomalies: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/overview');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="p-6 rounded-3xl glass-panel hover-glow flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-colors"></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-sm font-medium mb-2 tracking-wide uppercase">Total Traffic</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">{data.totalTrafficGb} <span className="text-xl text-slate-500 font-medium">GB</span></h3>
        </div>
        <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-300">
          <Activity className="w-8 h-8" />
        </div>
      </div>
      
      {/* Card 2 */}
      <div className="p-6 rounded-3xl glass-panel hover-glow flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] group-hover:bg-red-500/20 transition-colors"></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-sm font-medium mb-2 tracking-wide uppercase">GuardDuty Threats</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">{data.guardDutyAlerts}</h3>
        </div>
        <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/5 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform duration-300">
          <ShieldAlert className="w-8 h-8" />
        </div>
      </div>

      {/* Card 3 */}
      <div className="p-6 rounded-3xl glass-panel hover-glow flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] group-hover:bg-yellow-500/20 transition-colors"></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-sm font-medium mb-2 tracking-wide uppercase">AI Anomalies</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">{data.lookoutAnomalies}</h3>
        </div>
        <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/5 text-yellow-400 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.15)] group-hover:scale-110 transition-transform duration-300">
          <AlertTriangle className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default KPICards;
