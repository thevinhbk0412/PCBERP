
import React, { useState } from 'react';
import { 
  Settings, Database, Server, Shield, Globe, Terminal, 
  RefreshCw, Save, Download, Trash2, Printer, Plus, Edit,
  Users, Key, Activity, Info, AlertCircle, X, Check
} from 'lucide-react';
import { SystemLog } from '../types';

const mockLogs: SystemLog[] = [
  { id: '1', user: 'Admin', action: 'User Login', module: 'Auth', timestamp: '2024-03-20 14:20', severity: 'Info' },
  { id: '2', user: 'MES-Sync', action: 'Data Update', module: 'Production', timestamp: '2024-03-20 14:18', severity: 'Info' },
  { id: '3', user: 'DB-Admin', action: 'Table Drop Attempt', module: 'Database', timestamp: '2024-03-20 14:15', severity: 'Warning' },
];

const SettingsPage: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [search, setSearch] = useState('');

  const clearLogs = () => {
    if(window.confirm('Wipe system history?')) setLogs([]);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">IT Infrastructure & Settings</h2>
          <p className="text-slate-500 text-sm">Quản lý SQL Server, Tích hợp MES/PLM & Phân quyền truy cập</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={16}/> Access Log</button>
           <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Download size={16}/> Backup DB</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2"><Server size={18} className="text-blue-500" /> MES & SQL Configuration</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary SQL Host</label>
                <div className="flex gap-2">
                  <input type="text" value="mes-db.factory-fab9.vn" className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-mono text-slate-600 outline-none" readOnly />
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-blue-600 hover:bg-slate-50"><RefreshCw size={18} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-black text-emerald-800">SQL STATUS: ONLINE</span>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <Activity size={16} className="text-blue-500" />
                  <span className="text-xs font-black text-blue-800">LATENCY: 12ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2"><Terminal size={18} className="text-slate-400" /> System Activity Logs</h3>
                <button onClick={clearLogs} className="text-[10px] font-black text-red-500 hover:underline uppercase tracking-widest">Clear Logs</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                   <tr>
                     <th className="px-6 py-3">Timestamp</th>
                     <th className="px-6 py-3">User</th>
                     <th className="px-6 py-3">Module</th>
                     <th className="px-6 py-3">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 text-[11px] font-mono">
                   {logs.map(log => (
                     <tr key={log.id} className="hover:bg-slate-50">
                       <td className="px-6 py-3 text-slate-400">{log.timestamp}</td>
                       <td className="px-6 py-3 font-bold text-slate-700">{log.user}</td>
                       <td className="px-6 py-3 text-blue-600 font-bold">{log.module}</td>
                       <td className="px-6 py-3 text-slate-500">{log.action}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl space-y-6">
              <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2"><Shield size={18} className="text-blue-400" /> Security Policies</h3>
              <div className="space-y-4">
                {[
                  { label: 'Multi-Factor Auth', active: true },
                  { label: 'MES API Access', active: true },
                  { label: 'SQL Row Encryption', active: false },
                  { label: 'Station Lock (SMEMA)', active: true },
                ].map((policy, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
                    <span className="text-xs font-bold text-slate-400">{policy.label}</span>
                    <div className={`w-8 h-4 rounded-full relative ${policy.active ? 'bg-blue-500' : 'bg-slate-700'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${policy.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Audit Security</button>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2"><Globe size={18} className="text-slate-400" /> Multi-Site Sync</h3>
              <div className="space-y-4">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div><p className="text-xs font-black text-slate-800">FAB-9 VN</p><p className="text-[10px] text-slate-400">Main Site</p></div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">MASTER</span>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between opacity-60">
                    <div><p className="text-xs font-black text-slate-800">FAB-9 US</p><p className="text-[10px] text-slate-400">Last Sync: 2h ago</p></div>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-black uppercase">SYNCING</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
