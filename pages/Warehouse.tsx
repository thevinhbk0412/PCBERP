
import React, { useState } from 'react';
import { 
  Boxes, MapPin, Plus, Printer, FileSpreadsheet, Upload, 
  Edit, Trash2, Eye, Search, Filter, QrCode, X, Check,
  AlertTriangle, ShieldCheck, ThermometerSnowflake
} from 'lucide-react';
import { Material } from '../types';

const mockInventory: Material[] = [
  { id: '1', pn: 'CAP-10UF-0603', lotNumber: 'LOT2403-01', quantity: 25000, location: 'A1-R02', mslLevel: 'MSL 3', expiryDate: '2025-12', supplier: 'DigiKey', status: 'Available' },
  { id: '2', pn: 'MCU-STM32F4', lotNumber: 'LOT2403-12', quantity: 540, location: 'B2-S01', mslLevel: 'MSL 1', expiryDate: '2026-06', supplier: 'Future Electronics', status: 'Reserved' },
  { id: '3', pn: 'RES-10K-0402', lotNumber: 'LOT2402-44', quantity: 100000, location: 'A1-R15', mslLevel: 'MSL 1', expiryDate: '2025-08', supplier: 'Local VN', status: 'Available' },
];

const WarehousePage: React.FC = () => {
  const [inventory, setInventory] = useState<Material[]>(mockInventory);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Material> | null>(null);

  const handleAdd = () => {
    setCurrentItem({ id: `${Date.now()}`, quantity: 0, status: 'Available', mslLevel: 'MSL 1' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Material) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa vật tư?')) setInventory(inventory.filter(i => i.id !== id));
  };

  const saveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = currentItem as Material;
    if (inventory.find(i => i.id === itemData.id)) {
      setInventory(inventory.map(i => i.id === itemData.id ? itemData : i));
    } else {
      setInventory([...inventory, itemData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Warehouse & Kitting</h2>
          <p className="text-slate-500 text-sm">Kiểm soát tồn kho thời gian thực & Truy xuất nguồn gốc Lot</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Printer size={16} /> Print Labels</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Upload size={16} className="text-blue-600" /> Import Stock</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><FileSpreadsheet size={16} className="text-emerald-600" /> Export Tồn</button>
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
            <Plus size={18} /> ADD MATERIAL
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Part Number, Lot, Vị trí..." 
              className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-80 focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold">
            <QrCode size={14} /> SCAN QR
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Part Number</th>
                <th className="px-6 py-4">Lot Number</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">MSL</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {inventory.filter(i => i.pn.toLowerCase().includes(search.toLowerCase()) || i.lotNumber.includes(search)).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-700">{item.pn}</td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{item.lotNumber}</td>
                  <td className="px-6 py-4 font-black text-slate-800">{item.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-slate-500 flex items-center gap-2">
                    <MapPin size={12} /> {item.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      <ThermometerSnowflake size={10} /> {item.mslLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'Available' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'
                    }`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleEdit(item)} className="p-2 hover:text-amber-600"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase">Material Detail</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={saveItem} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Part Number" value={currentItem.pn || ''} onChange={e => setCurrentItem({...currentItem, pn: e.target.value})} className="border p-3 rounded-xl text-sm" required />
                <input placeholder="Lot Number" value={currentItem.lotNumber || ''} onChange={e => setCurrentItem({...currentItem, lotNumber: e.target.value})} className="border p-3 rounded-xl text-sm" required />
                <input placeholder="Quantity" type="number" value={currentItem.quantity || 0} onChange={e => setCurrentItem({...currentItem, quantity: parseInt(e.target.value)})} className="border p-3 rounded-xl text-sm" />
                <input placeholder="Location" value={currentItem.location || ''} onChange={e => setCurrentItem({...currentItem, location: e.target.value})} className="border p-3 rounded-xl text-sm" />
                <input placeholder="Expiry Date" type="month" value={currentItem.expiryDate || ''} onChange={e => setCurrentItem({...currentItem, expiryDate: e.target.value})} className="border p-3 rounded-xl text-sm" />
                <select value={currentItem.mslLevel} onChange={e => setCurrentItem({...currentItem, mslLevel: e.target.value})} className="border p-3 rounded-xl text-sm">
                  <option value="MSL 1">MSL 1 (Unlimited)</option>
                  <option value="MSL 3">MSL 3 (168 Hours)</option>
                  <option value="MSL 5">MSL 5 (48 Hours)</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black">SAVE MATERIAL</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehousePage;
