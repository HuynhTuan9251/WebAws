import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

const ProtocolPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/protocols');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching protocol data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow h-[400px] xl:h-full">
      <h3 className="text-xl font-bold text-white mb-2">Protocol Distribution</h3>
      <p className="text-sm text-slate-400 mb-6">Application layer traffic breakdown</p>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={100} 
              paddingAngle={5} 
              dataKey="value" 
              stroke="none"
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="drop-shadow-md hover:opacity-80 transition-opacity" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ color: '#f8fafc', fontWeight: 600 }}
              formatter={(value, name) => [`${value} Requests`, name]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProtocolPieChart;
