
import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  LogOut,
  Calendar,
  Settings
} from 'lucide-react';
import { MOCK_STORES, MOCK_MEDICINES } from '../constants';
import { StockStatus } from '../types';

const Dashboard: React.FC = () => {
  const store = MOCK_STORES[0]; // Simulation for the first store
  const [inventory, setInventory] = useState(store.inventory);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const updateStatus = (medicineId: string, newStatus: StockStatus) => {
    setInventory(prev => prev.map(item => 
      item.medicineId === medicineId 
        ? { ...item, status: newStatus, lastUpdated: 'Just now' }
        : item
    ));
  };

  const handleGlobalUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert('Stock synchronization successful!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900">{store.name}</h1>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">Administrator</span>
            </div>
            <p className="text-slate-500">Managing real-time stock for your community.</p>
          </div>
          <div className="flex gap-3">
             <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
               <Settings size={20} />
             </button>
             <button className="px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors flex items-center gap-2">
               <LogOut size={18} />
               Logout
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Medicines', value: '1,248', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'In Stock Items', value: '1,102', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Critical/Low Stock', value: '24', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Daily Search Views', value: '456', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl w-fit mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Inventory Control */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Inventory Management</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                <Calendar size={12} />
                Last Update: {new Date().toLocaleDateString()} at 09:45 AM
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter inventory..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGlobalUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 whitespace-nowrap"
              >
                {isUpdating ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                Sync Stock
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Medicine Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Last Sync</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Stock Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory
                  .filter(item => {
                    const med = MOCK_MEDICINES.find(m => m.id === item.medicineId);
                    return med?.name.toLowerCase().includes(filterQuery.toLowerCase());
                  })
                  .map((item) => {
                    const med = MOCK_MEDICINES.find(m => m.id === item.medicineId);
                    return (
                      <tr key={item.medicineId} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <span className="font-bold text-slate-900">{med?.name}</span>
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">ID: {item.medicineId}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase tracking-tight">{med?.category}</span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">
                          {item.lastUpdated}
                        </td>
                        <td className="px-6 py-5">
                          <select 
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none appearance-none transition-all cursor-pointer ${
                              item.status === StockStatus.IN_STOCK ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              item.status === StockStatus.LOW_STOCK ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                            value={item.status}
                            onChange={(e) => updateStatus(item.medicineId, e.target.value as StockStatus)}
                          >
                            <option value={StockStatus.IN_STOCK}>In Stock</option>
                            <option value={StockStatus.LOW_STOCK}>Low Stock</option>
                            <option value={StockStatus.OUT_OF_STOCK}>Out of Stock</option>
                          </select>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                            <Plus size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              <Plus size={18} />
              Add New Medicine to Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
