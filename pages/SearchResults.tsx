
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  LayoutGrid, 
  Map as MapIcon,
  Search as SearchIcon,
  Info
} from 'lucide-react';
import { MOCK_STORES, MOCK_MEDICINES } from '../constants';
import { StockStatus } from '../types';
import { getHealthTip } from '../geminiService';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [healthTip, setHealthTip] = useState('');
  const [isMapView, setIsMapView] = useState(false);

  // Find medicine ID from name
  const medicine = MOCK_MEDICINES.find(m => m.name.toLowerCase().includes(query.toLowerCase()));
  
  // Filter stores that carry this medicine
  const filteredStores = MOCK_STORES.map(store => {
    const item = store.inventory.find(inv => inv.medicineId === medicine?.id);
    return { ...store, targetItem: item };
  }).filter(store => !!store.targetItem);

  useEffect(() => {
    if (query) {
      getHealthTip(query).then(setHealthTip);
    }
  }, [query]);

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case StockStatus.LOW_STOCK: return 'bg-amber-100 text-amber-700 border-amber-200';
      case StockStatus.OUT_OF_STOCK: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <SearchIcon size={16} className="text-slate-400 shrink-0" />
            <h2 className="text-sm font-medium text-slate-700 truncate">
              Showing results for <span className="text-blue-600 font-bold">"{query}"</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMapView(!isMapView)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              {isMapView ? <LayoutGrid size={14} /> : <MapIcon size={14} />}
              {isMapView ? 'List View' : 'Map View'}
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold hover:bg-slate-50 transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Gemini Health Tip Overlay */}
        {healthTip && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
            <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-blue-800 leading-relaxed italic">
                "{healthTip}"
              </p>
              <p className="text-[10px] text-blue-400 mt-1 uppercase tracking-wider font-bold">AI Health Assistant</p>
            </div>
          </div>
        )}

        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStores.map((store) => (
              <Link 
                key={store.id} 
                to={`/store/${store.id}?highlight=${medicine?.id}`}
                className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {store.name}
                        </h3>
                        {store.isVerified && (
                          <CheckCircle2 size={18} className="text-blue-500" fill="currentColor" fillOpacity={0.1} />
                        )}
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin size={14} /> {store.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end text-amber-500 gap-1 font-bold">
                        <Star size={14} fill="currentColor" />
                        {store.rating}
                      </div>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">{store.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Availability</span>
                      <span className="text-sm font-semibold text-slate-700">{query}</span>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full border text-xs font-bold ${getStatusColor(store.targetItem!.status)}`}>
                      {store.targetItem!.status}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-sm">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {store.hours}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">
                      View Details
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-2 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] text-slate-400 font-medium">Last updated: {store.targetItem!.lastUpdated}</span>
                   <Phone size={14} className="text-slate-300" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No availability found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              We couldn't find {query} in any nearby stores. Try checking for common alternatives or expand your search area.
            </p>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Try Another Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
