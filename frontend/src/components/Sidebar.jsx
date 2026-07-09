import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, ShieldAlert, ActivitySquare, Settings, LogOut, Cloud } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  
  // Danh sách Menu kèm theo Điều kiện Phân quyền (Roles)
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Tổng quan hệ thống', roles: ['NetAdmin', 'SecOps', 'Manager', 'SystemAdmin'] },
    { id: 'security', icon: <ShieldAlert size={20} />, label: 'Cảnh báo an ninh', roles: ['SecOps', 'Manager', 'SystemAdmin'] },
    { id: 'traffic', icon: <ActivitySquare size={20} />, label: 'Nhật ký lưu lượng', roles: ['NetAdmin', 'Manager', 'SystemAdmin'] },
  ];

  // Chỉ hiển thị những Menu mà Role của user được phép truy cập
  const visibleMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="w-72 h-screen glass-panel border-r border-slate-800/50 flex flex-col z-20 sticky top-0">
      <div className="p-8 pb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Cloud className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-tight">AWS Cloud</h1>
          <p className="text-xs text-blue-400 font-medium tracking-wider mt-0.5">OBSERVABILITY</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2 mt-4">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Operations Menu</p>
        {visibleMenu.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${
              activeTab === item.id 
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50 bg-slate-900/20">
        <div className="mb-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold uppercase text-xs">
              {user?.username?.substring(0, 2)}
           </div>
           <div>
             <p className="text-sm font-semibold text-white">{user?.fullName}</p>
             <p className="text-xs text-blue-400 font-mono">{user?.role}</p>
           </div>
        </div>

        <div className="space-y-1">
          {user?.role === 'SystemAdmin' && (
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
              <Settings size={18} /> Cài đặt hệ thống
            </button>
          )}
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
