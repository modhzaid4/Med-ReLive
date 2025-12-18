
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  MessageSquare, 
  Navigation,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Package
} from 'lucide-react';
import { MOCK_STORES, MOCK_MEDICINES } from '../constants';
import { StockStatus } from '../types';

const StoreDetail: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('highlight');
  
  const store = MOCK_STORES.find(s => s.id === id);

  if (!store) return <div className="p-20 text-center">Store not found</div>;

  const getStatusIcon = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK: return <CheckCircle2 size={16} className="text-emerald-500" />;
      case StockStatus.LOW_STOCK: return <AlertTriangle size={16} className="text-amber-500" />;
      case StockStatus.OUT_OF_STOCK: return <XCircle size={16} className="text-rose-500" />;
      default: return null;
    }
  };

  const getStatusTextClass = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK: return 'text-emerald-700 font-bold';
      case StockStatus.LOW_STOCK: return 'text-amber-700 font-bold';
      case StockStatus.OUT_OF_STOCK: return 'text-rose-700 font-bold';
      default: return 'text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Cover / Header */}
      <div className="bg-blue-600 pt-12 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-blue-100 mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to results
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-black">{store.name}</h1>
                {store.isVerified && <ShieldCheck size={28} className="text-blue-200" fill="currentColor" fillOpacity={0.2} />}
              </div>
              <div className="flex items-center gap-4 text-blue-100 text-sm">
                <p className="flex items-center gap-1"><MapPin size={16} /> {store.address}</p>
                <p className="flex items-center gap-1 font-bold"><Clock size={16} /> {store.hours}</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                <Phone size={18} />
                Call Store
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors">
                <Navigation size={18} />
                Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inventory Section */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package size={20} className="text-blue-600" />
                Available Medicines
              </h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{store.inventory.length} Items</span>
            </div>
            <div className="divide-y divide-slate-100">
              {store.inventory.map((item) => {
                const med = MOCK_MEDICINES.find(m => m.id === item.medicineId);
                const isHighlighted = highlightedId === item.medicineId;
                
                return (
                  <div 
                    key={item.medicineId} 
                    className={`p-5 flex items-center justify-between transition-colors hover:bg-slate-50 ${isHighlighted ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''}`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{med?.name}</h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-500">{med?.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400">Updated {item.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm ${getStatusTextClass(item.status)} flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-100`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600" />
                Quick Message
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Need to confirm stock or ask about delivery? Send a quick query to the pharmacist.
              </p>
              <textarea 
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none h-24 mb-3"
                placeholder="Type your message..."
              ></textarea>
              <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
                Send Inquiry
              </button>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                Verified Partner
              </h3>
              <p className="text-sm text-emerald-800 leading-relaxed">
                This pharmacy follows Med-ReLive's daily stock update protocols. We recommend calling to reserve critical medications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
