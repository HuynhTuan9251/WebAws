import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Filter } from 'lucide-react';

const TopIPConsole = () => {
  const [data, setData] = useState([]);
  const [protocol, setProtocol] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/traffic/top-ips?protocol=${protocol}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching top IPs:", error);
      }
    };
    fetchData();
  }, [protocol]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 z-10">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Top Bandwidth Consumers
          </h3>
          <p className="text-sm text-slate-400 mt-1">Real-time Athena Data Analytics</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/50 shadow-inner">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          <select 
            value={protocol} 
            onChange={(e) => setProtocol(e.target.value)}
            className="bg-transparent text-slate-200 text-sm font-medium border-none focus:ring-0 outline-none pr-8 cursor-pointer"
          >
            <option value="ALL">All Protocols</option>
            <option value="TCP">TCP (Transmission Control)</option>
            <option value="UDP">UDP (User Datagram)</option>
            <option value="HTTP">HTTP (Web)</option>
            <option value="HTTPS">HTTPS (Secure Web)</option>
            <option value="ICMP">ICMP (Ping)</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-auto pr-2 custom-scrollbar z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider bg-slate-800/20 sticky top-0 backdrop-blur-sm">
              <th className="py-4 pl-4 font-semibold rounded-tl-lg">Rank</th>
              <th className="py-4 font-semibold">Source IP Address</th>
              <th className="py-4 text-right font-semibold">Total Bandwidth</th>
              <th className="py-4 text-right font-semibold pr-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-all duration-200 group">
                <td className="py-4 pl-4 text-slate-500 font-mono text-sm group-hover:text-blue-400 transition-colors">#{index + 1}</td>
                <td className="py-4 text-slate-200 font-mono text-sm tracking-wide">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    {item.ip}
                  </div>
                </td>
                <td className="py-4 text-right text-emerald-400 font-semibold font-mono tracking-tight">
                  {formatBytes(item.bytes * 1024 * 1024)} {/* Fake multiplier for visual effect */}
                </td>
                <td className="py-4 text-right pr-4">
                  <button className="text-xs bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40 text-slate-400 px-4 py-1.5 rounded-lg border border-slate-700 transition-all opacity-40 group-hover:opacity-100">
                    Block IP
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Activity className="w-8 h-8 text-slate-600 opacity-50" />
                    <span>No traffic data available for this protocol</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TopIPConsole;
