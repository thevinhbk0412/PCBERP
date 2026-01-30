
import React, { useState } from 'react';
import { 
  Search, MapPin, Package, Cpu, ShieldCheck, 
  Truck, ChevronRight, Activity, Printer, FileSpreadsheet 
} from 'lucide-react';

const TraceabilityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm) return;
    setIsSearching(true);
    // Simulate lookup
    setTimeout(() => {
      setResult({
        sn: searchTerm.toUpperCase(),
        wo: 'WO-24001',
        customer: 'TechCore US',
        pn: 'PCBA-A12-PRO',
        lot: 'LOT-2024-MAR-01',
        history: [
          { step: 'Kitting', op: 'Warehouse A', date: '2024-03-01 08:30', result: 'PASS' },
          { step: 'Sấy bo', op: 'Operator 04', date: '2024-03-01 10:15', result: 'PASS' },
          { step: 'In chì', op: 'Line 1 SMT', date: '2024-03-01 10:45', result: 'PASS' },
          { step: 'Pick & Place', op: 'Line 1 SMT', date: '2024-03-01 11:30', result: 'PASS' },
          { step: 'Oven', op: 'Oven 1', date: '2024-03-01 13:00', result: 'PASS' },
          { step: 'AOI', op: 'AOI Station', date: '2024-03-01 14:20', result: 'FAIL', details: 'Short C12' },
          { step: 'Rework', op: 'Repair X', date: '2024-03-01 15:00', result: 'PASS' },
          { step: 'Visual QC', op: 'QC 02', date: '2024-03-01 16:15', result: 'PASS' },
          { step: 'Test FCT', op: 'Test Station 1', date: '2024-03-02 09:00', result: 'PASS' },
        ]
      });
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-700 pb-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Truy xuất Nguồn gốc</h2>
            <p className="text-slate-500">Tra cứu toàn bộ lịch sử sản xuất của một Serial Number (SN)</p>
          </div>
          {result && (
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm">
                <Printer size={16} /> In Báo Cáo
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm">
                <FileSpreadsheet size={16} className="text-emerald-600" /> Xuất Excel
              </button>
            </div>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Nhập Serial Number..."
            className="w-full bg-white border-2 border-slate-200 rounded-3xl py-6 pl-16 pr-40 text-2xl font-mono shadow-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold py-3 px-8 rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            {isSearching ? 'ĐANG TRA CỨU...' : 'TRA CỨU'}
          </button>
        </div>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Sản phẩm', value: result.pn, icon: Cpu },
                { label: 'Lệnh Sản Xuất', value: result.wo, icon: Package },
                { label: 'Lô Linh kiện', value: result.lot, icon: MapPin },
                { label: 'Khách hàng', value: result.customer, icon: ShieldCheck }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <item.icon size={18} className="text-blue-500 mb-3" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <p className="text-sm font-black text-slate-700 mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10">
              <h3 className="text-lg font-bold text-slate-800 mb-10 flex items-center gap-2 uppercase tracking-tight">
                <Activity className="text-blue-500" size={20} />
                Lịch sử Quy trình (Traceability Log)
              </h3>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>

                <div className="space-y-8">
                  {result.history.map((step: any, i: number) => (
                    <div key={i} className="relative pl-12">
                      {/* Timeline Dot */}
                      <div className={`absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full border-4 border-white shadow-sm -translate-x-1/2 ${
                        step.result === 'PASS' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}></div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-800">{step.step}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                              step.result === 'PASS' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {step.result}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1 font-medium italic">
                              {step.date}
                            </span>
                            <span className="font-medium">• {step.op}</span>
                          </div>
                          {step.details && (
                            <div className="mt-2 text-[11px] font-bold text-red-500 uppercase">
                              Ghi chú: {step.details}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="text-slate-200 group-hover:text-blue-400 transition-colors hidden md:block" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Trạng thái cuối cùng</h4>
                <p className="text-2xl font-black text-emerald-400 tracking-tight">SẴN SÀNG XUẤT HÀNG</p>
              </div>
              <button className="relative z-10 flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm transition-all border border-white/10 uppercase tracking-widest">
                <Truck size={20} />
                In Packing List
              </button>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraceabilityPage;
