import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
import { BrainCircuit } from 'lucide-react';

const AIAnomalyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/anomaly');
        const formattedData = response.data.map(d => ({
          ...d,
          anomalyPoint: d.isAnomaly ? d.actual : null
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching anomaly data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow h-full">
      <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
        <BrainCircuit className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
        AI Anomaly Detection
      </h3>
      <p className="text-sm text-slate-400 mb-6">AWS Lookout for Metrics (Actual vs Forecast)</p>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
            <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
            />
            <Line type="monotone" dataKey="forecast" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} name="Forecast" dot={false} />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual" dot={false} />
            <Scatter dataKey="anomalyPoint" fill="#ef4444" name="Anomaly Detected" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AIAnomalyChart;
