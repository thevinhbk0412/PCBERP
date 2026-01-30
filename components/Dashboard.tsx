
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, 
  LineChart, Line 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, 
  Zap, Activity, Layers, X, Maximize2, ExternalLink, ChevronRight,
  Filter, Search, Printer, FileSpreadsheet
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

const yieldData = [
  { name: 'Mon', fpy: 98.2, loss: 1.8, target: 99.0 },
  { name: 'Tue', fpy: 97.5, loss: 2.5, target: 99.0 },
  { name: 'Wed', fpy: 99.1, loss: 0.9, target: 99.0 },
  { name: 'Thu', fpy: 96.8, loss: 3.2, target: 99.0 },
  { name: 'Fri', fpy: 98.4, loss: 1.6, target: 99.0 },
  { name: 'Sat', fpy: 99.0, loss: 1.0, target: 99.0 },
  { name: 'Sun', fpy: 98.7, loss: 1.3, target: 99.0 },
];

const oeeData = [
  { name: 'Line A', value: 85, availability: 92, performance: 95, quality: 98 },
  { name: 'Line B', value: 78, availability: 85, performance: 88, quality: 97 },
  { name: 'Line C', value: 92, availability: 94, performance: 98, quality: 99 },
  { name: 'Line D', value: 88, availability: 90, performance: 92, quality: 98 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string>("Đang phân tích dữ liệu...");
  const [detailView, setDetailView] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const insight = await geminiService.getAiAnalytics(yieldData);
      setAiInsights(insight);
    };
    fetchInsights();
  }, []);

  const closeDetail = () => setDetailView(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'production', label: 'Sản lượng Hôm nay', value: '4,285', sub: '+12%', icon: Zap, color: 'blue' },
          { id: 'yield', label: 'Tỷ lệ FPY (Yield)', value: '98.4%', sub: '-0.2%', icon: CheckCircle, color: 'emerald' },
          { id: 'defects', label: 'Lỗi phát hiện', value: '14', sub: 'Critical', icon: AlertCircle, color: 'red' },
          { id: 'oee', label: 'Chỉ số OEE', value: '86.5%', sub: '+4.1%', icon: Activity, color: 'amber' }
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => setDetailView(stat.id)}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-${stat.color === 'red' ? 'red' : 'green'}-50 text-${stat.color === 'red' ? 'red' : 'green'}-600 uppercase`}>
                  {stat.sub}
                </span>
                <Maximize2 size={12} className="text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                HIỆU SUẤT YIELD (FPY)
                <button onClick={() => setDetailView('yield')} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-500 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </h2>
              <p className="text-sm text-slate-500">Tỷ lệ đạt chất lượng từ lần đầu tiên (First Pass Yield)</p>
            </div>
            <div className="flex gap-2">
              <select className="bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase rounded-xl px-4 py-2 focus:ring-blue-500 outline-none">
                <option>7 Ngày qua</option>
                <option>30 Ngày qua</option>
              </select>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="colorFpy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="fpy" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorFpy)" />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" dot={false} strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div 
          onClick={() => setDetailView('ai')}
          className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden cursor-pointer group hover:ring-4 ring-blue-500/20 transition-all"
        >
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-blue-400">
                <Zap size={24} fill="currentColor" className="animate-pulse" />
                <h3 className="font-black tracking-widest text-xs uppercase">GEMINI AI INSIGHTS</h3>
              </div>
              <ChevronRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex-1">
              <div className="prose prose-invert prose-sm">
                <p className="leading-relaxed text-slate-300 italic text-base">
                  "{aiInsights}"
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Sync: 2m ago</span>
              <span className="text-blue-400">View Deep Analysis</span>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Work Order Status */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">Trạng thái Work Order (WO)</h2>
            <button onClick={() => setDetailView('wo')} className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              Tất cả WO <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-6">
            {[
              { label: 'WO-2024-001', pn: 'PCBA-MCU-V2', progress: 100, status: 'Completed', color: 'emerald' },
              { label: 'WO-2024-042', pn: 'PCBA-PWR-04', progress: 65, status: 'Production', color: 'blue' },
              { label: 'WO-2024-058', pn: 'CABLE-USB-A', progress: 12, status: 'Released', color: 'amber' },
              { label: 'WO-2024-061', pn: 'BOX-IOT-01', progress: 0, status: 'Created', color: 'slate' },
            ].map((wo, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-800">{wo.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{wo.pn}</span>
                  </div>
                  <span className={`text-[10px] font-black text-${wo.color}-600 uppercase`}>{wo.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 bg-${wo.color}-500 shadow-lg`}
                    style={{width: `${wo.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OEE Efficiency Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">Hiệu Suất Thiết Bị (OEE)</h2>
            <button onClick={() => setDetailView('oee')} className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
              Báo cáo OEE <ChevronRight size={14} />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oeeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                  {oeeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DETAIL MODALS */}
      {detailView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-5xl h-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                  {detailView === 'yield' && 'CHI TIẾT HIỆU SUẤT YIELD'}
                  {detailView === 'oee' && 'CHI TIẾT HIỆU SUẤT THIẾT BỊ (OEE)'}
                  {detailView === 'wo' && 'DANH SÁCH WORK ORDERS'}
                  {detailView === 'defects' && 'NHẬT KÝ LỖI PHÁT HIỆN'}
                  {detailView === 'ai' && 'PHÂN TÍCH CHUYÊN SÂU GEMINI AI'}
                  {detailView === 'production' && 'THỐNG KÊ SẢN LƯỢNG HẰNG NGÀY'}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Dữ liệu thời gian thực • FAB-9 VN System</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-600 transition-all"><Printer size={20}/></button>
                <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-emerald-600 transition-all"><FileSpreadsheet size={20}/></button>
                <button onClick={closeDetail} className="p-3 bg-red-50 hover:bg-red-100 rounded-2xl text-red-500 transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
              {detailView === 'yield' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FPY Trung Bình</p>
                      <p className="text-3xl font-black text-blue-600">98.4%</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tỷ lệ Phế phẩm</p>
                      <p className="text-3xl font-black text-red-500">1.6%</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mục tiêu (Target)</p>
                      <p className="text-3xl font-black text-slate-800">99.0%</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Thống kê theo Line</h4>
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <tr>
                          <th className="px-6 py-4">Chuyền sản xuất</th>
                          <th className="px-6 py-4">Đầu vào (Input)</th>
                          <th className="px-6 py-4">Đạt (Pass)</th>
                          <th className="px-6 py-4">Lỗi (Fail)</th>
                          <th className="px-6 py-4">Yield (%)</th>
                          <th className="px-6 py-4 text-right">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {['Line 1-SMT', 'Line 2-SMT', 'Line 3-Box', 'Line 4-Cable'].map((line, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-black text-slate-800">{line}</td>
                            <td className="px-6 py-4 text-slate-500">1,200</td>
                            <td className="px-6 py-4 text-emerald-600 font-bold">1,185</td>
                            <td className="px-6 py-4 text-red-500 font-bold">15</td>
                            <td className="px-6 py-4 font-black">98.75%</td>
                            <td className="px-6 py-4 text-right">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">GOOD</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {detailView === 'oee' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {['Availability', 'Performance', 'Quality', 'OEE Total'].map((m, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m}</p>
                        <p className={`text-3xl font-black ${i === 3 ? 'text-blue-600' : 'text-slate-800'}`}>
                          {i === 0 ? '92%' : i === 1 ? '88%' : i === 2 ? '99%' : '80.2%'}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="h-96 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                     <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Biểu đồ so sánh Availability & Performance</h4>
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={oeeData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          <YAxis domain={[70, 100]} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Line type="monotone" dataKey="availability" stroke="#3b82f6" strokeWidth={3} dot={{r: 6}} />
                          <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} dot={{r: 6}} />
                          <Line type="monotone" dataKey="quality" stroke="#f59e0b" strokeWidth={3} dot={{r: 6}} />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
                </div>
              )}

              {detailView === 'wo' && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div className="relative">
                        <input type="text" placeholder="Tìm WO, Khách hàng..." className="bg-white border border-slate-200 rounded-xl py-2 px-4 pl-10 text-xs w-80 outline-none focus:ring-2 ring-blue-500" />
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all">
                        <Filter size={14} /> Lọc trạng thái
                      </button>
                   </div>
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <tr>
                          <th className="px-6 py-4">Work Order</th>
                          <th className="px-6 py-4">Part Number</th>
                          <th className="px-6 py-4">Khách hàng</th>
                          <th className="px-6 py-4">Số lượng</th>
                          <th className="px-6 py-4">Tiến độ</th>
                          <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-black text-blue-600">WO-240{i}</td>
                            <td className="px-6 py-4 font-mono text-xs text-slate-500">PCBA-CORE-V2</td>
                            <td className="px-6 py-4 font-bold">TechCore US</td>
                            <td className="px-6 py-4 font-black">2,500</td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{width: '75%'}}></div>
                                  </div>
                                  <span className="text-[10px] font-black">75%</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button className="p-2 hover:bg-white rounded-lg text-blue-600 shadow-sm"><Maximize2 size={14}/></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              )}

              {detailView === 'defects' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Top 5 Lỗi Phổ Biến (Pareto)</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Short Circuit', count: 42, color: 'bg-red-500' },
                          { label: 'Missing Comp', count: 28, color: 'bg-amber-500' },
                          { label: 'Solder Bridge', count: 21, color: 'bg-blue-500' },
                          { label: 'Wrong Polarity', count: 12, color: 'bg-indigo-500' },
                          { label: 'Insuff Solder', count: 8, color: 'bg-slate-500' },
                        ].map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span>{item.label}</span>
                              <span className="text-slate-400">{item.count} defects</span>
                            </div>
                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{width: `${(item.count/42)*100}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                       <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                          <AlertCircle size={40} />
                       </div>
                       <h4 className="text-xl font-black text-slate-800 mb-2">CRITICAL DEFECT ALERT</h4>
                       <p className="text-slate-500 text-sm max-w-xs mb-6">Cảnh báo: Tỷ lệ lỗi Short Circuit tại Line 1-SMT tăng 15% trong 2 giờ qua. Cần kiểm tra SPI và Printer.</p>
                       <button className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                          XỬ LÝ NGAY
                       </button>
                    </div>
                  </div>
                </div>
              )}

              {detailView === 'ai' && (
                <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-4 text-blue-400">
                          <Zap size={32} fill="currentColor" />
                          <h4 className="text-2xl font-black tracking-tight">AI DEEP ANALYSIS REPORT</h4>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                             <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h5 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">Dự báo Nhu cầu NVL</h5>
                                <p className="text-slate-300 text-sm leading-relaxed">Dựa trên dữ liệu lịch sử và PO hiện tại, Gemini dự báo nhu cầu Chip MCU sẽ tăng 40% vào tháng tới. Đề xuất: Đặt hàng bổ sung 5,000 units ngay hôm nay để tránh đứt gãy.</p>
                             </div>
                             <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h5 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-2">Tối ưu Kế hoạch</h5>
                                <p className="text-slate-300 text-sm leading-relaxed">Line 2 đang có thời gian chờ (Idletime) cao nhất. Chuyển đổi WO-24042 sang Line 2 sẽ giúp rút ngắn Cycle Time tổng thể thêm 4.5h.</p>
                             </div>
                          </div>
                          <div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex flex-col justify-between">
                             <h5 className="text-blue-300 font-black text-xs uppercase tracking-widest mb-4">Quality Risk Prediction</h5>
                             <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                   <span className="text-slate-400 text-xs">Rủi ro lỗi tại Oven-01</span>
                                   <span className="text-amber-400 font-black">HIGH (82%)</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-amber-400" style={{width: '82%'}}></div>
                                </div>
                                <p className="text-[11px] text-slate-400 italic">Lưu ý: Profile nhiệt độ tại trạm 3 có dấu hiệu dao động vượt ngưỡng ±5°C trong 45 phút qua.</p>
                             </div>
                             <button className="mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20">XUẤT BÁO CÁO CHI TIẾT</button>
                          </div>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-10 py-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2024 PCBA ERP PRO • CONFIDENTIAL</span>
              <button onClick={closeDetail} className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">ĐÓNG CHI TIẾT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
