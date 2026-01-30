
import React, { useState } from 'react';
import { 
  Plus, Download, Filter, FileText, ChevronRight, Printer, 
  Edit, Trash2, Eye, FileSpreadsheet, Search, Upload, 
  Zap, X, Check, AlertCircle 
} from 'lucide-react';
import { WOStatus, WorkOrder } from '../types';

const mockWOs: WorkOrder[] = [
  { id: 'WO-24001', customer: 'TechCore US', partNumber: 'PCBA-A12-PRO', quantity: 500, status: WOStatus.PRODUCTION, createdAt: '2024-03-01', dueDate: '2024-03-25', traveler: ['Sấy bo', 'In chì', 'Pick & Place', 'Oven', 'AOI'] },
  { id: 'WO-24005', customer: 'VietMobile', partNumber: 'CABLE-C-TO-C', quantity: 2000, status: WOStatus.RELEASED, createdAt: '2024-03-05', dueDate: '2024-04-10', traveler: ['Cắt dây', 'Tuốt vỏ', 'Hàn', 'Đúc', 'Test'] }
];

const PlanningPage: React.FC = () => {
  const [wos, setWos] = useState<WorkOrder[]>(mockWOs);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWO, setEditingWO] = useState<WorkOrder | null>(null);
  const [viewingWO, setViewingWO] = useState<WorkOrder | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    id: '',
    customer: '',
    partNumber: '',
    quantity: 0,
    status: WOStatus.CREATED,
    dueDate: '',
    traveler: []
  });

  const handleOpenCreate = () => {
    setEditingWO(null);
    setFormData({
      id: `WO-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      customer: '',
      partNumber: '',
      quantity: 100,
      status: WOStatus.CREATED,
      dueDate: new Date().toISOString().split('T')[0],
      traveler: ['Sấy bo', 'In chì', 'Pick & Place', 'Oven', 'AOI']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (wo: WorkOrder) => {
    setEditingWO(wo);
    setFormData({ ...wo });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer || !formData.partNumber || !formData.id) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    if (editingWO) {
      setWos(wos.map(wo => wo.id === editingWO.id ? (formData as WorkOrder) : wo));
    } else {
      const newWO: WorkOrder = {
        ...formData as WorkOrder,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setWos([newWO, ...wos]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(window.confirm('Xác nhận xóa lệnh sản xuất này?')) {
      setWos(wos.filter(wo => wo.id !== id));
    }
  };

  const filteredWOs = wos.filter(wo => 
    wo.id.toLowerCase().includes(search.toLowerCase()) || 
    wo.customer.toLowerCase().includes(search.toLowerCase()) ||
    wo.partNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Quản lý Lệnh Sản Xuất (WO)</h2>
          <p className="text-slate-500 text-sm">Sale & Planning Department</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm transition-all">
            <Printer size={16} /> In
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm transition-all">
            <Upload size={16} className="text-blue-600" /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold shadow-sm transition-all">
            <FileSpreadsheet size={16} className="text-emerald-600" /> Export
          </button>
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-xs font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus size={18} /> TẠO WO MỚI
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng WO', val: wos.length, color: 'blue' },
          { label: 'Đang Sản Xuất', val: wos.filter(w => w.status === WOStatus.PRODUCTION).length, color: 'amber' },
          { label: 'Đã Hoàn Thành', val: wos.filter(w => w.status === WOStatus.COMPLETED).length, color: 'emerald' },
          { label: 'Lệnh Mới', val: wos.filter(w => w.status === WOStatus.CREATED).length, color: 'slate' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            <p className="text-xl font-black text-slate-800 mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm WO, Khách hàng, PN..." 
              className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-80 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400"><Filter size={16} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Mã WO</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Part Number</th>
                <th className="px-6 py-4">Số lượng</th>
                <th className="px-6 py-4">Ngày hết hạn</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredWOs.map((wo) => (
                <tr key={wo.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-blue-600">{wo.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{wo.customer}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{wo.partNumber}</td>
                  <td className="px-6 py-4 font-black">{wo.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500 italic text-xs">{wo.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      wo.status === WOStatus.PRODUCTION ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                      wo.status === WOStatus.COMPLETED ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>
                      {wo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingWO(wo)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Eye size={14} /></button>
                      <button onClick={() => handleOpenEdit(wo)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-amber-600 transition-colors"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(wo.id)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredWOs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">Không tìm thấy lệnh sản xuất nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                  {editingWO ? 'CẬP NHẬT LỆNH SẢN XUẤT' : 'TẠO LỆNH SẢN XUẤT MỚI'}
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">Sale & Plan Dept</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã WO (Tự động)</label>
                  <input 
                    type="text" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: WO-2024-001"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as WOStatus})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {Object.values(WOStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách Hàng</label>
                  <input 
                    type="text" 
                    value={formData.customer}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Tên công ty khách hàng"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Part Number (Mã SP)</label>
                  <input 
                    type="text" 
                    value={formData.partNumber}
                    onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: PCBA-V12"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Số Lượng</label>
                  <input 
                    type="number" 
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-black focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày Hết Hạn</label>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lộ trình Sản xuất (Traveler)</label>
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {formData.traveler?.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 shadow-sm group">
                      {step}
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, traveler: formData.traveler?.filter((_, i) => i !== idx)})}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => {
                      const newStep = prompt("Nhập công đoạn mới:");
                      if(newStep) setFormData({...formData, traveler: [...(formData.traveler || []), newStep]});
                    }}
                    className="px-3 py-1.5 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all text-xs font-bold"
                  >
                    + Thêm Bước
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-6 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Check size={18} /> {editingWO ? 'Lưu Thay Đổi' : 'Tạo Lệnh Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      {viewingWO && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{viewingWO.id}</h3>
                  <p className="text-blue-600 font-bold text-sm tracking-tight">{viewingWO.customer}</p>
                </div>
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  viewingWO.status === WOStatus.PRODUCTION ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}>
                  {viewingWO.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Part Number</span>
                  <p className="font-mono font-bold text-slate-700">{viewingWO.partNumber}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Số Lượng</span>
                  <p className="font-black text-slate-800 text-xl">{viewingWO.quantity.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Ngày Tạo</span>
                  <p className="font-bold text-slate-500">{viewingWO.createdAt}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Deadline</span>
                  <p className="font-bold text-red-500">{viewingWO.dueDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Quy Trình Sản Xuất (Routing)</span>
                <div className="flex flex-col gap-2 relative">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  {viewingWO.traveler.map((step, i) => (
                    <div key={i} className="flex items-center gap-4 relative z-10 pl-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                      <span className="text-xs font-bold text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setViewingWO(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all"
              >
                Đóng Chi Tiết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningPage;
