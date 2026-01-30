
import React, { useState } from 'react';
import { 
  Calculator, DollarSign, Download, Plus, Search, Printer, 
  FileSpreadsheet, Upload, Edit, Trash2, Eye, X, Check,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { Transaction } from '../types';

const mockTransactions: Transaction[] = [
  { id: 'T-24-001', refId: 'INV-422', type: 'Income', category: 'Sales', amount: 14500, date: '2024-03-14', description: 'Thanh toán từ TechCore US - WO-24001' },
  { id: 'T-24-002', refId: 'PO-24001', type: 'Expense', category: 'Material', amount: 8200, date: '2024-03-12', description: 'Hóa đơn linh kiện từ DigiKey' },
  { id: 'T-24-003', refId: 'UTIL-03', type: 'Expense', category: 'Service', amount: 1450, date: '2024-03-10', description: 'Tiền điện nhà máy FAB-9 Tháng 02' },
];

const AccountingPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTx, setCurrentTx] = useState<Partial<Transaction> | null>(null);

  const handleAdd = () => {
    setCurrentTx({ 
      id: `T-${new Date().getFullYear()}-${Math.floor(Math.random()*1000)}`, 
      date: new Date().toISOString().split('T')[0], 
      type: 'Income', 
      category: 'Sales',
      amount: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (tx: Transaction) => {
    setCurrentTx({...tx});
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa giao dịch tài chính này?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const saveTx = (e: React.FormEvent) => {
    e.preventDefault();
    const txData = currentTx as Transaction;
    if (transactions.find(t => t.id === txData.id)) {
      setTransactions(transactions.map(t => t.id === txData.id ? txData : t));
    } else {
      setTransactions([txData, ...transactions]);
    }
    setIsModalOpen(false);
  };

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Accounting & Finance</h2>
          <p className="text-slate-500 text-sm">Quản lý dòng tiền, hạch toán chi phí sản xuất & Công nợ</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"><Printer size={16} /> In Báo Cáo</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"><FileSpreadsheet size={16} className="text-emerald-600" /> Xuất Excel</button>
          <button onClick={handleAdd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-slate-800 active:scale-95 transition-all">
            <Plus size={18} /> GHI NHẬN GIAO DỊCH
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-emerald-300 transition-all">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng Thu (Tháng này)</p><p className="text-xl font-black text-slate-800">${totalIncome.toLocaleString()}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-red-300 transition-all">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:scale-110 transition-transform"><TrendingDown size={24} /></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng Chi (Tháng này)</p><p className="text-xl font-black text-slate-800">${totalExpense.toLocaleString()}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-blue-300 transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform"><DollarSign size={24} /></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lợi nhuận ròng</p><p className="text-xl font-black text-slate-800">${(totalIncome - totalExpense).toLocaleString()}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative">
            <input type="text" placeholder="Tìm kiếm theo mô tả, hóa đơn..." className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-80 focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={search} onChange={e => setSearch(e.target.value)} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">TX ID</th>
                <th className="px-6 py-4">Phân loại</th>
                <th className="px-6 py-4">Ngày giao dịch</th>
                <th className="px-6 py-4">Số tiền</th>
                <th className="px-6 py-4">Mô tả chi tiết</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.filter(t => t.description.toLowerCase().includes(search.toLowerCase())).map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{tx.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] uppercase">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs italic">{tx.date}</td>
                  <td className={`px-6 py-4 font-black ${tx.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs max-w-xs truncate font-medium">{tx.description}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(tx)} className="p-1.5 hover:text-amber-600 transition-colors"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(tx.id)} className="p-1.5 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && currentTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Chi tiết Giao dịch Tài chính</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={saveTx} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Loại giao dịch</label>
                  <select className="w-full border p-3 rounded-xl text-sm font-bold bg-white" value={currentTx.type} onChange={e => setCurrentTx({...currentTx, type: e.target.value as any})}>
                    <option value="Income">Thu nhập (Income +)</option>
                    <option value="Expense">Chi phí (Expense -)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Hạng mục</label>
                  <select className="w-full border p-3 rounded-xl text-sm font-bold bg-white" value={currentTx.category} onChange={e => setCurrentTx({...currentTx, category: e.target.value as any})}>
                    <option value="Sales">Doanh thu bán hàng</option>
                    <option value="Material">Chi phí Vật tư</option>
                    <option value="Salary">Lương nhân viên</option>
                    <option value="Service">Dịch vụ (Điện/Nước/IT)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Số tiền ($)</label>
                <input placeholder="0.00" type="number" className="w-full border p-3 rounded-xl text-sm font-black focus:ring-2 ring-blue-500 outline-none" required value={currentTx.amount} onChange={e => setCurrentTx({...currentTx, amount: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Mã tham chiếu (PO/WO/INV)</label>
                <input placeholder="VD: WO-24001" className="w-full border p-3 rounded-xl text-sm font-mono" value={currentTx.refId} onChange={e => setCurrentTx({...currentTx, refId: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Mô tả giao dịch</label>
                <textarea placeholder="Nhập chi tiết về khoản thu/chi..." className="w-full border p-3 rounded-xl text-sm h-24 focus:ring-2 ring-blue-500 outline-none" required value={currentTx.description} onChange={e => setCurrentTx({...currentTx, description: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold uppercase text-xs tracking-widest">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl text-xs flex items-center justify-center gap-2">
                  <Check size={18} /> HOÀN TẤT GHI SỔ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingPage;
