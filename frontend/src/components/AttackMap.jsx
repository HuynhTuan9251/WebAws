import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// URL của bản đồ địa lý thế giới
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const AttackMap = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/map');
        const data = response.data.map(alert => ({
          name: alert.source_ip,
          coordinates: [alert.geo_location.lng, alert.geo_location.lat],
          severity: alert.severity,
          country: alert.geo_location.country
        }));
        setMarkers(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-7 rounded-3xl glass-panel hover-glow h-[500px] relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="absolute top-7 left-7 z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Global Threat Map
        </h3>
        <p className="text-sm text-slate-400 mt-1">Real-time geographic distribution of attacks</p>
      </div>

      <div className="w-full h-full pt-10">
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} className="w-full h-full opacity-90">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill="#1e293b" 
                  stroke="#334155" 
                  strokeWidth={0.5} 
                  style={{ 
                    default: { outline: "none" }, 
                    hover: { fill: "#475569", outline: "none", transition: "all 0.3s" }, 
                    pressed: { outline: "none" } 
                  }} 
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, severity, country }, index) => (
            <Marker key={index} coordinates={coordinates}>
              {/* Radar pulse effect */}
              <circle r={14} fill={severity === 'High' ? "#ef4444" : "#eab308"} opacity={0.3} className="animate-ping" />
              <circle r={6} fill={severity === 'High' ? "#ef4444" : "#eab308"} className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <text textAnchor="middle" y={-15} style={{ fontFamily: "Outfit", fill: "#cbd5e1", fontSize: "10px", fontWeight: 500 }}>
                {country}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default AttackMap;
