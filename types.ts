
export enum Department {
  ADMIN = 'Admin',
  SALE_PLAN = 'Sale/Plan',
  PURCHASE = 'Purchase',
  IQC = 'IQC',
  WAREHOUSE = 'Warehouse',
  PRODUCTION = 'Production',
  QC = 'QC',
  TEST = 'Test',
  SHIPPING = 'Shipping',
  IT = 'IT',
  ACCOUNTING = 'Accounting',
  HR = 'HR',
  XNK = 'XNK'
}

export enum WOStatus {
  CREATED = 'Đã tạo',
  RELEASED = 'Đã phát hành',
  PRODUCTION = 'Đang sản xuất',
  COMPLETED = 'Đã hoàn thành',
  CLOSED = 'Đã đóng'
}

export interface WorkOrder {
  id: string;
  customer: string;
  partNumber: string;
  quantity: number;
  status: WOStatus;
  createdAt: string;
  dueDate: string;
  traveler: string[];
}

export interface PurchaseOrder {
  id: string;
  vendor: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  currency: 'USD' | 'VND';
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  items: { pn: string; description: string; qty: number; price: number }[];
}

export interface Material {
  id: string;
  pn: string;
  lotNumber: string;
  quantity: number;
  location: string;
  expiryDate: string;
  mslLevel: string; // Moisture Sensitivity Level
  supplier: string;
  status: 'Available' | 'Low' | 'Expired' | 'Reserved';
}

export interface ProductionLog {
  id: string;
  sn: string;
  woId: string;
  station: string;
  operator: string;
  timestamp: string;
  status: 'PASS' | 'FAIL';
  machineId?: string;
  programName?: string;
}

export interface DefectRecord {
  id: string;
  sn: string;
  defectCode: string;
  location: string; // e.g., C12, R4 (RefDes)
  severity: 'Critical' | 'Major' | 'Minor';
  mrbAction: 'Rework' | 'RTV' | 'Scrap' | 'UseAsIs';
  inspector: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  refId: string; // PO or WO or Shipping ID
  type: 'Income' | 'Expense';
  category: 'Material' | 'Service' | 'Salary' | 'Sales';
  amount: number;
  date: string;
  description: string;
}

export interface ShippingRecord {
  id: string;
  woId: string;
  customer: string;
  trackingNumber: string;
  carrier: string;
  weight: number;
  dimensions: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  shipDate: string;
}

export interface CustomsRecord {
  id: string; // Tờ khai number
  type: 'Import' | 'Export';
  hsCode: string;
  origin: string;
  quantity: number;
  valueUSD: number;
  taxRate: number;
  status: 'Processing' | 'Cleared' | 'Rejected';
  declarationDate: string;
}

export interface Employee {
  id: string;
  name: string;
  department: Department;
  position: string;
  certifications: string[];
  status: 'Active' | 'OnLeave' | 'Terminated';
  joinDate: string;
}

export interface SystemLog {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  severity: 'Info' | 'Warning' | 'Error';
}
