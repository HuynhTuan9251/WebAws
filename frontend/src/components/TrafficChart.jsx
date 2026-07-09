import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/traffic');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Network Flow Analytics
          </h3>
          <p className="text-sm text-slate-400 mt-1">Bandwidth utilization across regions (MB)</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            <span className="text-slate-300">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-slate-300">Received</span>
          </div>
        </div>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
            <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSent)" name="Sent (MB)" activeDot={{r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2}} />
            <Area type="monotone" dataKey="received" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReceived)" name="Received (MB)" activeDot={{r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2}} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
