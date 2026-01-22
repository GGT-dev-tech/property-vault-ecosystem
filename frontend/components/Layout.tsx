import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = api.auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    api.auth.logout();
    onNavigate('login');
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white dark:bg-[#1a2133] border-r border-[#e7ebf3] dark:border-[#2d364d] flex flex-col fixed h-full z-20 hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">domain</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none tracking-tight">PropertyVault</h1>
              <p className="text-[#4d6599] text-[10px] font-bold mt-1 uppercase tracking-wider">Management Console</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            <NavItem
              icon="dashboard"
              label="Dashboard"
              active={activePage === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
            />
            <NavItem
              icon="inventory_2"
              label="Inventory"
              active={activePage === 'inventory' || activePage === 'detail'}
              onClick={() => onNavigate('inventory')}
            />
            <div className="group">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer mb-1 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">map</span>
                  <span className="text-sm font-semibold">Territories</span>
                </div>
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </div>
            </div>
            <NavItem
              icon="analytics"
              label="Reports & Valuation"
              active={activePage === 'reports'}
              onClick={() => { }}
            />
            <NavItem
              icon="credit_card"
              label="Subscription"
              active={activePage === 'billing'}
              onClick={() => onNavigate('billing')}
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#e7ebf3] dark:border-[#2d364d]">
          <button
            onClick={() => onNavigate('add-property')}
            className="w-full bg-primary hover:bg-blue-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-sm">Add Property</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 dark:bg-[#1a2133]/80 backdrop-blur-md border-b border-[#e7ebf3] dark:border-[#2d364d] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <div className="lg:hidden">
              {/* Mobile Menu Trigger Placeholder */}
              <span className="material-symbols-outlined">menu</span>
            </div>
            <div className="hidden md:flex flex-1 max-w-md relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4d6599] group-focus-within:text-primary transition-colors">search</span>
              <input
                className="w-full bg-[#f6f6f8] dark:bg-[#111621] border-none rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                placeholder="Search tags (e.g. CA-LA-0003)..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="size-10 flex items-center justify-center rounded-xl bg-[#f6f6f8] dark:bg-[#111621] text-[#4d6599] hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-3 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2133]"></span>
            </button>
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="size-10 flex items-center justify-center rounded-xl bg-[#f6f6f8] dark:bg-[#111621] text-[#4d6599] hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <div className="h-8 w-px bg-[#e7ebf3] dark:bg-[#2d364d] mx-1 md:mx-2"></div>

            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold leading-none">{user.name}</p>
                  <p className="text-xs text-[#4d6599] mt-1 font-medium">{user.email}</p>
                </div>
                <div
                  className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg"
                >
                  {user.name.charAt(0)}
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${active
        ? 'bg-primary text-white shadow-lg shadow-primary/25 font-semibold'
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
      }`}
  >
    <span className={`material-symbols-outlined ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);
