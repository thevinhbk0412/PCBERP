
import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Search, Printer, FileSpreadsheet, 
  Upload, Plus, Edit, Trash2, Eye, X, Check, Activity,
  Camera, Sparkles, Filter, Info
} from 'lucide-react';
import { DefectRecord } from '../types';

const mockDefects: DefectRecord[] = [
  { id: 'D-001', sn: 'SN29482', defectCode: 'SH-01', location: 'C21', severity: 'Major', mrbAction: 'Rework', inspector: 'QC-01', timestamp: '2024-03-20 12:45' },
  { id: 'D-002', sn: 'SN29485', defectCode: 'MC-04', location: 'R4', severity: 'Critical', mrbAction: 'Scrap', inspector: 'QC-02', timestamp: '2024-03-20 12:48' },
];

const QualityPage: React.FC = () => {
  const [defects, setDefects] = useState<DefectRecord[]>(mockDefects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDefect, setCurrentDefect] = useState<Partial<DefectRecord> | null>(null);

  const handleAdd = () => {
    setCurrentDefect({ id: `D-${Date.now()}`, timestamp: new Date().toISOString(), severity: 'Major', mrbAction: 'Rework' });
    setIsModalOpen(true);
  };

  const saveDefect = (e: React.FormEvent) => {
    e.preventDefault();
    const d = currentDefect as DefectRecord;
    setDefects([...defects, d]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Quality Control & IPQC</h2>
          <p className="text-slate-500 text-sm">Quản lý lỗi IPQC, phê duyệt MRB & Truy xuất nguyên nhân</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={16} /> QC Report</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><FileSpreadsheet size={16} className="text-emerald-600" /> Export Defects</button>
          <button onClick={handleAdd} className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-red-700 active:scale-95 transition-all">
            <AlertTriangle size={18} /> LOG DEFECT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2"><Sparkles size={18} className="text-blue-500"/> AI Vision Inspection</h3>
            <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Camera size={32} className="text-slate-300 group-hover:text-blue-500" />
               </div>
               <span className="text-xs font-bold uppercase tracking-widest">Upload or Capture PCB Image</span>
               <p className="text-[10px] mt-1 opacity-60 italic">Supports AOI, X-Ray and Visual images</p>
            </div>
         </div>

         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500"/> Defect & MRB Log</h3>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400"><Filter size={14} /></button>
                 <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400"><Search size={14} /></button>
              </div>
           </div>
           <div className="flex-1 overflow-auto max-h-[300px]">
             <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-[9px] font-black uppercase sticky top-0 border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-3">SN</th>
                   <th className="px-6 py-3">Defect</th>
                   <th className="px-6 py-3">Action</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-xs">
                 {defects.map(d => (
                   <tr key={d.id} className="hover:bg-slate-50 group">
                     <td className="px-6 py-3 font-bold">{d.sn}</td>
                     <td className="px-6 py-3">
                       <p className="text-red-600 font-bold">{d.defectCode}</p>
                       <p className="text-[10px] text-slate-400">Loc: {d.location}</p>
                     </td>
                     <td className="px-6 py-3">
                       <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-black text-[9px] uppercase">{d.mrbAction}</span>
                     </td>
                     <td className="px-6 py-3 text-right">
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
      </div>

      {isModalOpen && currentDefect && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase">Log Defect Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={saveDefect} className="p-8 space-y-4">
              <input placeholder="Serial Number" className="w-full border p-3 rounded-xl text-sm" required onChange={e => setCurrentDefect({...currentDefect, sn: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Defect Code (e.g. SH-01)" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentDefect({...currentDefect, defectCode: e.target.value})} />
                <input placeholder="Location (e.g. C12)" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentDefect({...currentDefect, location: e.target.value})} />
              </div>
              <select className="w-full border p-3 rounded-xl text-sm" onChange={e => setCurrentDefect({...currentDefect, severity: e.target.value as any})}>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
                <option value="Critical">Critical</option>
              </select>
              <select className="w-full border p-3 rounded-xl text-sm" onChange={e => setCurrentDefect({...currentDefect, mrbAction: e.target.value as any})}>
                <option value="Rework">Rework</option>
                <option value="Scrap">Scrap</option>
                <option value="RTV">RTV (Return to Vendor)</option>
              </select>
              <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg">LOG QC DEFECT</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityPage;
