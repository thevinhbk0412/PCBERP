
import React, { useState } from 'react';
import { 
  Users, Award, BookOpen, GraduationCap, Plus, Edit, Trash2, 
  Eye, Search, Filter, Mail, Phone, Upload, Printer, FileSpreadsheet, X, Check,
  Briefcase, Calendar, ShieldCheck
} from 'lucide-react';
import { Employee, Department } from '../types';

const mockEmployees: Employee[] = [
  { id: 'FE-001', name: 'Nguyễn Văn A', department: Department.PRODUCTION, position: 'SMT Operator', certifications: ['IPC-A-610', 'ESD Safety'], status: 'Active', joinDate: '2022-01-15' },
  { id: 'FE-042', name: 'Trần Thị B', department: Department.QC, position: 'QC Inspector', certifications: ['ISO 9001', 'IPC-A-600'], status: 'Active', joinDate: '2023-05-10' },
];

const HRPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmp, setCurrentEmp] = useState<Partial<Employee> | null>(null);

  const handleAdd = () => {
    setCurrentEmp({ id: `FE-${Date.now()}`, department: Department.PRODUCTION, status: 'Active', certifications: [], joinDate: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const saveEmp = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees([...employees, currentEmp as Employee]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">HR & Training Management</h2>
          <p className="text-slate-500 text-sm">Quản lý hồ sơ nhân sự, Chứng chỉ chuyên môn & Kế hoạch đào tạo</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><Printer size={16} /> Print Cert</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2"><FileSpreadsheet size={16} className="text-emerald-600" /> Export Employees</button>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all">
            <Plus size={18} /> ADD EMPLOYEE
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2"><Users size={18} className="text-blue-500" /> Factory Staff Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Dept</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Certifications</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-slate-500">{emp.id}</td>
                  <td className="px-6 py-4 font-black text-slate-800">{emp.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{emp.department}</td>
                  <td className="px-6 py-4 text-slate-500 italic">{emp.position}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {emp.certifications.map(c => (
                        <span key={c} className="bg-blue-50 text-blue-600 text-[8px] font-black px-2 py-0.5 rounded border border-blue-100">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">{emp.status}</span>
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

      {isModalOpen && currentEmp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Employee Profile</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={saveEmp} className="p-8 space-y-4">
              <input placeholder="Full Name" className="w-full border p-3 rounded-xl text-sm" required onChange={e => setCurrentEmp({...currentEmp, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select className="border p-3 rounded-xl text-sm" onChange={e => setCurrentEmp({...currentEmp, department: e.target.value as any})}>
                  {Object.values(Department).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input placeholder="Position" className="border p-3 rounded-xl text-sm" onChange={e => setCurrentEmp({...currentEmp, position: e.target.value})} />
              </div>
              <input placeholder="Join Date" type="date" className="w-full border p-3 rounded-xl text-sm" value={currentEmp.joinDate} onChange={e => setCurrentEmp({...currentEmp, joinDate: e.target.value})} />
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-xl">SAVE EMPLOYEE</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRPage;
