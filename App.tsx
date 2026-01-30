
import React, { useState } from 'react';
import { 
  LayoutDashboard, ClipboardList, ShoppingBag, Warehouse, Cpu, 
  ShieldCheck, Settings, Search, Menu, X, Bell, Zap, History,
  Truck, Calculator, Users, Globe, FileCheck, PackageSearch
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PlanningPage from './pages/Planning';
import ProductionPage from './pages/Production';
import QualityPage from './pages/Quality';
import TraceabilityPage from './pages/Traceability';
import WarehousePage from './pages/Warehouse';
import PurchasePage from './pages/Purchase';
import AccountingPage from './pages/Accounting';
import ShippingPage from './pages/Shipping';
import XNKPage from './pages/XNK';
import HRPage from './pages/HR';
import SettingsPage from './pages/Settings';

enum ActivePage {
  DASHBOARD = 'Dashboard',
  PLANNING = 'Sale/Plan',
  PURCHASE = 'Purchase',
  WAREHOUSE = 'Warehouse',
  PRODUCTION = 'Production',
  QUALITY = 'Quality & QC',
  TRACEABILITY = 'Traceability',
  ACCOUNTING = 'Accounting',
  SHIPPING = 'Shipping',
  HR = 'HR',
  XNK = 'XNK',
  SETTINGS = 'Settings'
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>(ActivePage.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: ActivePage.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: ActivePage.PLANNING, icon: ClipboardList, label: 'Sale & Planning' },
    { id: ActivePage.PURCHASE, icon: ShoppingBag, label: 'Purchase & BOM' },
    { id: ActivePage.WAREHOUSE, icon: Warehouse, label: 'Warehouse & Kitting' },
    { id: ActivePage.PRODUCTION, icon: Cpu, label: 'Production Line' },
    { id: ActivePage.QUALITY, icon: ShieldCheck, label: 'Quality & QC' },
    { id: ActivePage.TRACEABILITY, icon: History, label: 'Traceability' },
    { id: ActivePage.ACCOUNTING, icon: Calculator, label: 'Accounting & Finance' },
    { id: ActivePage.SHIPPING, icon: Truck, label: 'Shipping & Logistics' },
    { id: ActivePage.XNK, icon: Globe, label: 'XNK & Customs' },
    { id: ActivePage.HR, icon: Users, label: 'HR & Training' },
    { id: ActivePage.SETTINGS, icon: Settings, label: 'IT Settings' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case ActivePage.DASHBOARD: return <Dashboard />;
      case ActivePage.PLANNING: return <PlanningPage />;
      case ActivePage.PRODUCTION: return <ProductionPage />;
      case ActivePage.QUALITY: return <QualityPage />;
      case ActivePage.TRACEABILITY: return <TraceabilityPage />;
      case ActivePage.WAREHOUSE: return <WarehousePage />;
      case ActivePage.PURCHASE: return <PurchasePage />;
      case ActivePage.ACCOUNTING: return <AccountingPage />;
      case ActivePage.SHIPPING: return <ShippingPage />;
      case ActivePage.XNK: return <XNKPage />;
      case ActivePage.HR: return <HRPage />;
      case ActivePage.SETTINGS: return <SettingsPage />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Zap size={48} className="mb-4 opacity-20" />
          <h2 className="text-xl font-medium">Module {activePage} đang phát triển...</h2>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-white flex flex-col z-50`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold italic">E</div>
              <span className="font-bold text-lg tracking-tight">PCBA ERP</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-lg">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 transition-all relative group ${
                activePage === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activePage === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r shadow-[0_0_10px_#3b82f6]"></div>}
              <item.icon size={20} className={activePage === item.id ? 'text-blue-500' : 'group-hover:text-slate-300'} />
              {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">{activePage}</h1>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">FAB-9 VN System</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <input type="text" placeholder="Tra cứu nhanh..." className="bg-slate-100 border-none rounded-xl py-2 px-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl"><Bell size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-xs cursor-pointer">AD</div>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto p-8">{renderContent()}</section>
      </main>
    </div>
  );
};

export default App;
