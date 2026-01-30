
import React, { useState } from 'react';
import { 
  Truck, Printer, FileSpreadsheet, Upload, Plus, Edit, Trash2, 
  Eye, Search, Filter, Clock, ShieldCheck, X, Check, MapPin, Package
} from 'lucide-react';
import { ShippingRecord } from '../types';

const mockShipping: ShippingRecord[] = [
  { id: 'SHIP-001', woId: 'WO-24001', customer: 'TechCore US', trackingNumber: 'UPS-1Z999', carrier: 'UPS', weight: 45.2, dimensions: '40x40x30cm', status: 'Shipped', shipDate: '2024-03-20' },
  { id: 'SHIP-002', woId: 'WO-24005', customer: 'VietMobile', trackingNumber: 'PENDING', carrier: 'DHL', weight: 12.0, dimensions: '20x20x20cm', status: 'Pending', shipDate: '2024-03-25' },
];

const ShippingPage: React.FC = () => {
  const [shippingList, setShippingList] = useState<ShippingRecord[]>(mockShipping);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShip, setCurrentShip] = useState<Partial<ShippingRecord> | null>(null);

  const handleAdd = () => {
    setCurrentShip({ id: `SHIP-${Date.now()}`, status: 'Pending', shipDate: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const saveShip = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingList([...shippingList, currentShip as ShippingRecord]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Shipping & Logistics</h2>
          <p className="text-slate-500 text-sm">Quản lý đóng gói, Vận đơn & Lịch trình xuất hàng toàn cầu</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={16} /> Packing List</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><FileSpreadsheet size={16} className="text-emerald-600" /> Export List</button>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all">
            <Plus size={18} /> CREATE SHIPMENT
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2"><Truck size={18} className="text-blue-500" /> Shipment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Ship ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Tracking</th>
                <th className="px-6 py-4">Carrier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {shippingList.map(ship => (
                <tr key={ship.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-blue-600">{ship.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{ship.customer}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{ship.trackingNumber}</td>
                  <td className="px-6 py-4 font-black">{ship.carrier}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      ship.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 
                      ship.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>{ship.status}</span>
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

      {isModalOpen && currentShip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Shipment Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={saveShip} className="p-8 space-y-4">
              <input placeholder="Customer" className="w-full border p-3 rounded-xl text-sm" required onChange={e => setCurrentShip({...currentShip, customer: e.target.value})} />
              <input placeholder="Work Order ID" className="w-full border p-3 rounded-xl text-sm" onChange={e => setCurrentShip({...currentShip, woId: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Carrier (DHL, UPS...)" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentShip({...currentShip, carrier: e.target.value})} />
                <input placeholder="Tracking Number" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentShip({...currentShip, trackingNumber: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Weight (kg)" type="number" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentShip({...currentShip, weight: parseFloat(e.target.value)})} />
                <input placeholder="Dimensions (LxWxH)" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentShip({...currentShip, dimensions: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-xl">INITIATE SHIPMENT</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingPage;
