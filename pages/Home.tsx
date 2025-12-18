
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2, AlertCircle, ShieldCheck, Clock, Activity } from 'lucide-react';
import { MOCK_MEDICINES } from '../constants';
import { getHealthTip } from '../geminiService';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Current Location');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [healthTip, setHealthTip] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = MOCK_MEDICINES
        .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(m => m.name)
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Simulate lookup and fetch health tip for contextual enrichment
    const tip = await getHealthTip(searchQuery);
    setHealthTip(tip);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }, 600);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <Activity size={16} />
              Emergency Support Available 24/7
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Find Life-Saving Medicines <br />
              <span className="text-blue-600">Available Near You</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Real-time stock availability in nearby medical stores. Verified inventory updates to save you time in emergencies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
              <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100">
                  <Search className="text-slate-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Enter medicine name (e.g. Paracetamol)"
                    className="w-full py-3 bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center px-4 w-full md:w-auto">
                  <MapPin className="text-blue-500 mr-2" size={20} />
                  <span className="text-slate-600 font-medium whitespace-nowrap">{location}</span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Find Medicine'}
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden divide-y divide-slate-50">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSearchQuery(s)}
                      className="w-full text-left px-6 py-3 hover:bg-blue-50 text-slate-700 flex items-center gap-2 transition-colors"
                    >
                      <Search size={14} className="text-slate-300" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </form>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>Popular:</span>
              {['Insulin', 'Asthalin', 'Pan-D', 'Telma-H'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 bg-slate-100 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Verified Pharmacies", desc: "Only licensed medical stores with verified stock data." },
            { icon: Clock, title: "Real-time Updates", desc: "Inventory updated daily to ensure accuracy for emergencies." },
            { icon: AlertCircle, title: "Emergency Priority", desc: "Special indicators for critical and low-stock medications." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-slate-50 transition-transform hover:-translate-y-1">
              <div className="bg-blue-600/10 p-3 rounded-xl">
                <item.icon className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">How Med-ReLive Helps You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Search Medicine", text: "Enter the medicine name and your location to see availability." },
              { step: "02", title: "Check Availability", text: "Browse stores with 'In Stock' or 'Low Stock' real-time status." },
              { step: "03", title: "Visit Store", text: "Contact the pharmacy or navigate to the nearest location instantly." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-black text-blue-600/10 absolute -top-8 left-1/2 -translate-x-1/2 group-hover:text-blue-600/20 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{item.title}</h3>
                <p className="text-slate-600 relative z-10">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
