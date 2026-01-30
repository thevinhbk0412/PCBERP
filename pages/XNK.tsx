
import React, { useState } from 'react';
import { 
  Globe, ShieldCheck, AlertCircle, Search, Printer, 
  FileSpreadsheet, Upload, Plus, Edit, Trash2, Eye, X, Check,
  FileText, Shield, Info, Filter
} from 'lucide-react';
import { CustomsRecord } from '../types';

const mockDeclarations: CustomsRecord[] = [
  { id: 'TK-24001', type: 'Export', hsCode: '8534.00.90', origin: 'Vietnam', quantity: 500, valueUSD: 12400, taxRate: 0, status: 'Cleared', declarationDate: '2024-03-20' },
  { id: 'TK-24002', type: 'Import', hsCode: '8542.31.00', origin: 'USA', quantity: 1000, valueUSD: 45000, taxRate: 5, status: 'Processing', declarationDate: '2024-03-22' },
];

const XNKPage: React.FC = () => {
  const [declarations, setDeclarations] = useState<CustomsRecord[]>(mockDeclarations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDec, setCurrentDec] = useState<Partial<CustomsRecord> | null>(null);

  const handleAdd = () => {
    setCurrentDec({ id: `TK-${Date.now()}`, status: 'Processing', type: 'Export', declarationDate: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const saveDec = (e: React.FormEvent) => {
    e.preventDefault();
    setDeclarations([...declarations, currentDec as CustomsRecord]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">XNK & Customs</h2>
          <p className="text-slate-500 text-sm">Quản lý tờ khai hải quan, HS Code & Thuế xuất nhập khẩu</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={16} /> Print Declaration</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><FileSpreadsheet size={16} className="text-emerald-600" /> Export Customs</button>
          <button onClick={handleAdd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-slate-800 active:scale-95 transition-all">
            <Plus size={18} /> NEW DECLARATION
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2"><Globe size={18} className="text-blue-500" /> Official Declarations Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">HS Code</th>
                <th className="px-6 py-4">Origin</th>
                <th className="px-6 py-4">Value (USD)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {declarations.map(dec => (
                <tr key={dec.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-mono text-xs font-black text-slate-700">{dec.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${dec.type === 'Export' ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50'}`}>{dec.type}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{dec.hsCode}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{dec.origin}</td>
                  <td className="px-6 py-4 font-black text-emerald-700">${dec.valueUSD.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${dec.status === 'Cleared' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>{dec.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
                      <button className="p-1.5 hover:text-blue-600"><Eye size={14} /></button>
                      <button className="p-1.5 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentDec && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Declaration Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={saveDec} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select className="border p-3 rounded-xl text-sm font-bold" value={currentDec.type} onChange={e => setCurrentDec({...currentDec, type: e.target.value as any})}>
                  <option value="Export">Export (Xuất)</option>
                  <option value="Import">Import (Nhập)</option>
                </select>
                <input placeholder="HS Code (e.g. 8534.00.90)" className="border p-3 rounded-xl text-sm" required onChange={e => setCurrentDec({...currentDec, hsCode: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Origin (COO)" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentDec({...currentDec, origin: e.target.value})} />
                <input placeholder="Value USD" type="number" className="border p-3 rounded-xl text-sm font-black" onChange={e => setCurrentDec({...currentDec, valueUSD: parseFloat(e.target.value)})} />
              </div>
              <input placeholder="Declaration Date" type="date" className="w-full border p-3 rounded-xl text-sm" value={currentDec.declarationDate} onChange={e => setCurrentDec({...currentDec, declarationDate: e.target.value})} />
              <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest shadow-xl">SUBMIT TO CUSTOMS</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XNKPage;
