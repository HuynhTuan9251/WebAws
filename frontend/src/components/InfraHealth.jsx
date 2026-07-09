import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Server, Cpu, HardDrive } from 'lucide-react';

const InfraHealth = () => {
  const [health, setHealth] = useState({ cpu_usage: 0, mem_usage: 0, disk_usage: 0, status: 'Loading' });

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/infrastructure/health');
        setHealth(response.data);
      } catch (error) {
        console.error("Error fetching infra health:", error);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (usage) => {
    if (usage > 80) return 'bg-red-500';
    if (usage > 60) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="p-6 rounded-3xl glass-panel hover-glow flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-400" /> Infra Health
        </h3>
        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
          {health.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400 flex items-center gap-1"><Cpu className="w-4 h-4"/> CPU Usage</span>
            <span className="text-slate-200 font-medium">{health.cpu_usage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(health.cpu_usage)}`} style={{ width: `${health.cpu_usage}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400 flex items-center gap-1"><Server className="w-4 h-4"/> Memory</span>
            <span className="text-slate-200 font-medium">{health.mem_usage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(health.mem_usage)}`} style={{ width: `${health.mem_usage}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400 flex items-center gap-1"><HardDrive className="w-4 h-4"/> Disk I/O</span>
            <span className="text-slate-200 font-medium">{health.disk_usage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(health.disk_usage)}`} style={{ width: `${health.disk_usage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfraHealth;
