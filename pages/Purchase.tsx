
import React, { useState } from 'react';
import { 
  ShoppingBag, Printer, FileSpreadsheet, Upload, 
  Plus, Edit, Trash2, Eye, Search, Filter, X, Check,
  DollarSign, Package, Clock
} from 'lucide-react';
import { PurchaseOrder } from '../types';

const mockPOs: PurchaseOrder[] = [
  { 
    id: 'PO-24001', vendor: 'DigiKey US', orderDate: '2024-03-10', deliveryDate: '2024-03-25', 
    totalAmount: 12450, currency: 'USD', status: 'Sent',
    items: [{ pn: 'MCU-STM32F4', description: 'Microcontroller', qty: 500, price: 20 }]
  },
  { 
    id: 'PO-24015', vendor: 'Future Electronics', orderDate: '2024-03-12', deliveryDate: '2024-04-05', 
    totalAmount: 4200, currency: 'USD', status: 'Draft',
    items: [{ pn: 'CAP-10UF-0603', description: 'Capacitor', qty: 20000, price: 0.1 }]
  },
];

const PurchasePage: React.FC = () => {
  const [pos, setPos] = useState<PurchaseOrder[]>(mockPOs);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPO, setCurrentPO] = useState<Partial<PurchaseOrder> | null>(null);

  const handleAdd = () => {
    setCurrentPO({ 
      id: `PO-${new Date().getFullYear()}-${Math.floor(Math.random()*1000)}`, 
      items: [], 
      status: 'Draft', 
      orderDate: new Date().toISOString().split('T')[0],
      currency: 'USD'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (po: PurchaseOrder) => {
    setCurrentPO({...po});
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa Đơn mua hàng (PO) này?')) {
      setPos(pos.filter(p => p.id !== id));
    }
  };

  const savePO = (e: React.FormEvent) => {
    e.preventDefault();
    const poData = currentPO as PurchaseOrder;
    if (pos.find(p => p.id === poData.id)) {
      setPos(pos.map(p => p.id === poData.id ? poData : p));
    } else {
      setPos([poData, ...pos]);
    }
    setIsModalOpen(false);
  };

  const filteredPOs = pos.filter(p => 
    p.id.toLowerCase().includes(search.toLowerCase()) || 
    p.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Purchase & BOM Management</h2>
          <p className="text-slate-500 text-sm">Quản lý cung ứng vật tư & Định mức nguyên vật liệu</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Printer size={16} /> In PO</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><Upload size={16} className="text-blue-600" /> Import BOM</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm"><FileSpreadsheet size={16} className="text-emerald-600" /> Export Excel</button>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all">
            <Plus size={18} /> TẠO ĐƠN MUA HÀNG (PO)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm PO, Nhà cung cấp..." 
              className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-80 focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">PO ID</th>
                <th className="px-6 py-4">Nhà cung cấp</th>
                <th className="px-6 py-4">Ngày đặt</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{po.id}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">{po.vendor}</td>
                  <td className="px-6 py-4 text-slate-500 italic">{po.orderDate}</td>
                  <td className="px-6 py-4 font-black">{po.totalAmount.toLocaleString()} {po.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      po.status === 'Received' ? 'text-emerald-600 bg-emerald-50' : 
                      po.status === 'Draft' ? 'text-slate-500 bg-slate-50' : 'text-blue-600 bg-blue-50'
                    }`}>{po.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-blue-600"><Eye size={14} /></button>
                      <button onClick={() => handleEdit(po)} className="p-2 hover:text-amber-600"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(po.id)} className="p-2 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentPO && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800 uppercase">Chi tiết Đơn mua hàng (PO)</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={savePO} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhà cung cấp</label>
                  <input type="text" value={currentPO.vendor || ''} onChange={e => setCurrentPO({...currentPO, vendor: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</label>
                  <select value={currentPO.status} onChange={e => setCurrentPO({...currentPO, status: e.target.value as any})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Received">Received</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày giao dự kiến</label>
                  <input type="date" value={currentPO.deliveryDate || ''} onChange={e => setCurrentPO({...currentPO, deliveryDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng tiền</label>
                  <div className="flex gap-2">
                    <input type="number" value={currentPO.totalAmount || 0} onChange={e => setCurrentPO({...currentPO, totalAmount: parseFloat(e.target.value)})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-black" />
                    <select className="bg-slate-100 border border-slate-200 rounded-xl px-4 text-xs font-bold outline-none" value={currentPO.currency} onChange={e => setCurrentPO({...currentPO, currency: e.target.value as any})}>
                      <option value="USD">USD</option>
                      <option value="VND">VND</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">Hủy</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <Check size={18} /> LƯU ĐƠN HÀNG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;
