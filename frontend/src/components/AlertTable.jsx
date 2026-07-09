import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AlertTable = () => {
  const [alerts, setAlerts] = useState([]);
  const { user } = useAuth();
  
  const canModifyAlert = user?.role === 'SecOps' || user?.role === 'SystemAdmin';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/security/alerts');
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts data:", error);
      }
    };
    fetchData();
  }, []);

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'High':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.2)]"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></span> High</span>;
      case 'Medium':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]"></span> Medium</span>;
      case 'Low':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></span> Low</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/30 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> {severity}</span>;
    }
  }

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" /> 
            Recent Security Incidents
          </h3>
          <p className="text-sm text-slate-400 mt-1 ml-8">AI-curated threats from AWS GuardDuty</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700/60 bg-white/[0.02]">
              <th className="py-4 px-4 font-semibold rounded-tl-lg">Timestamp</th>
              <th className="py-4 px-4 font-semibold">Alert Type</th>
              <th className="py-4 px-4 font-semibold">Severity</th>
              <th className="py-4 px-4 font-semibold">Message</th>
              <th className="py-4 px-4 font-semibold rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {alerts.map((alert) => {
              const date = new Date(alert.timestamp);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              return (
                <tr key={alert.id} className="border-b border-slate-700/30 hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-4 text-slate-300">
                    <span className="font-medium text-slate-200">{formattedDate}</span> <span className="text-slate-500 ml-1">{formattedTime}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-white drop-shadow-sm">{alert.alert_type}</td>
                  <td className="py-4 px-4">{getSeverityBadge(alert.severity)}</td>
                  <td className="py-4 px-4 text-slate-400 group-hover:text-slate-300 transition-colors max-w-xs truncate" title={alert.message}>{alert.message}</td>
                  <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <select 
                      disabled={!canModifyAlert}
                      className="bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded p-1 outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      defaultValue={alert.status || 'New'}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="False Positive">False Positive</option>
                    </select>
                    <button 
                      disabled={!canModifyAlert}
                      className="bg-slate-700 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cập nhật
                    </button>
                  </div>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
            <p>No threats detected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertTable;
