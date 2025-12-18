
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, User, LayoutDashboard, Search, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Search', path: '/', icon: Search },
    { label: 'Store Login', path: '/login', icon: User },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                <Pill className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-blue-900">
                Med<span className="text-blue-600">-ReLive</span>
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-500 hover:text-slate-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Pill className="text-blue-600 w-6 h-6" />
                <span className="text-xl font-bold text-blue-900">Med-ReLive</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering communities with real-time access to life-saving medicines. Finding health, one search at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/" className="hover:text-blue-600">Find Medicine</Link></li>
                <li><Link to="/login" className="hover:text-blue-600">Medical Store Portal</Link></li>
                <li><a href="#" className="hover:text-blue-600">Emergency Hotlines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Med-ReLive. Designed for a healthier future.
          </div>
        </div>
      </footer>
    </div>
  );
};
