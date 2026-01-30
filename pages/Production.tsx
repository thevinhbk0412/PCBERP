
import React, { useState } from 'react';
import { 
  History, Play, Terminal, Barcode, ArrowRight, Layers, 
  Search, Printer, FileSpreadsheet, Plus, Edit, Trash2, 
  // Add missing Upload icon import
  Eye, X, Check, Activity, Clock, Settings, Upload
} from 'lucide-react';
import { ProductionLog } from '../types';

const mockLogs: ProductionLog[] = [
  { id: '1', sn: 'SN2401-001', woId: 'WO-24001', station: 'SMT Printer', operator: 'Nguyen Van A', timestamp: '2024-03-20 10:15', status: 'PASS', programName: 'PROG-PCBA-V1' },
  { id: '2', sn: 'SN2401-002', woId: 'WO-24001', station: 'Pick & Place', operator: 'Nguyen Van A', timestamp: '2024-03-20 10:18', status: 'PASS', machineId: 'M-PNP-01' },
];

const ProductionPage: React.FC = () => {
  const [logs, setLogs] = useState<ProductionLog[]>(mockLogs);
  const [search, setSearch] = useState('');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState<'SMT' | 'CABLE' | 'BOX'>('SMT');

  const handleDelete = (id: string) => {
    if (window.confirm('Hủy bản ghi sản xuất này?')) setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Production Line Operations</h2>
          <p className="text-slate-500 text-sm">Theo dõi thời gian thực & Kiểm soát quy trình SMT/Box/Cable</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Printer size={16} /> Print Route</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Upload size={16} className="text-blue-600" /> Import Logs</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><FileSpreadsheet size={16} className="text-emerald-600" /> Export WIP</button>
        </div>
      </div>

      <div className="flex gap-4 p-1 bg-white p-2 rounded-2xl border border-slate-200 w-fit shadow-sm">
        {['SMT', 'CABLE', 'BOX'].map(b => (
          <button key={b} onClick={() => setActiveBranch(b as any)} className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${activeBranch === b ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            BRANCH {b}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Activity size={14} className="text-blue-500"/> Station Status</h3>
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <p className="text-[10px] font-bold text-emerald-600 uppercase">RUNNING</p>
                <p className="text-lg font-black text-emerald-900">LINE-01-SMT</p>
              </div>
              <div className="flex justify-between items-center text-xs font-bold px-2">
                <span className="text-slate-500">OEE Today</span>
                <span className="text-blue-600">89.2%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold px-2">
                <span className="text-slate-500">Units/Hour</span>
                <span className="text-slate-800">450</span>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
            <Settings size={18} /> STATION CONFIG
          </button>
        </div>

        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-12 shadow-sm flex flex-col items-center justify-center space-y-8">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-inner">
            <Barcode size={48} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Ready for Scan</h2>
            <p className="text-slate-400 font-medium">Please scan Serial Number or Work Order to proceed</p>
          </div>
          <div className="w-full max-w-md relative group">
            <input type="text" placeholder="Scan SN / WO Barcode..." className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-5 px-8 text-2xl font-mono text-center focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-50 text-blue-500 rounded-lg group-focus-within:bg-blue-600 group-focus-within:text-white transition-all"><ArrowRight size={20} /></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2"><History size={18} className="text-slate-400" /> Production Log History</h3>
          <div className="relative">
            <input type="text" placeholder="Search SN, Station..." className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-64 focus:ring-2 focus:ring-blue-500 outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">SN</th>
                <th className="px-6 py-4">Station</th>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {logs.filter(l => l.sn.includes(search)).map(log => (
                <tr key={log.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-slate-700">{log.sn}</td>
                  <td className="px-6 py-4 font-medium">{log.station}</td>
                  <td className="px-6 py-4 text-slate-500">{log.operator}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="px-6 py-4 italic text-slate-500">{log.programName || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-black text-[9px] uppercase border border-emerald-100">{log.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
                      <button className="p-1.5 hover:text-blue-600"><Eye size={14} /></button>
                      <button onClick={() => handleDelete(log.id)} className="p-1.5 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionPage;
