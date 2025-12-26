import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Building2,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  LogOut,
  Menu,
  ArrowUpDown,
  CreditCard,
  Wallet,
  Receipt,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';

interface AdminRevenueProps {
  onNavigate: (page: 'businesses' | 'revenue' | 'dashboard') => void;
  onLogout: () => void;
}

// Demo data for transactions (20 items)
const transactionsData = [
  {
    id: 'TXN-001',
    business: 'VINMART',
    type: 'subscription',
    plan: 'Premium',
    amount: 45000000,
    status: 'completed',
    date: '2024-01-15',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-001',
  },
  {
    id: 'TXN-002',
    business: 'GRAB VIỆT NAM',
    type: 'subscription',
    plan: 'Premium',
    amount: 45000000,
    status: 'completed',
    date: '2024-01-14',
    paymentMethod: 'Credit Card',
    invoice: 'INV-2024-002',
  },
  {
    id: 'TXN-003',
    business: 'SHOPEE EXPRESS',
    type: 'subscription',
    plan: 'Pro',
    amount: 15000000,
    status: 'completed',
    date: '2024-01-14',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-003',
  },
  {
    id: 'TXN-004',
    business: 'LOTTE MART',
    type: 'upgrade',
    plan: 'Premium',
    amount: 25000000,
    status: 'completed',
    date: '2024-01-13',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-004',
  },
  {
    id: 'TXN-005',
    business: 'LAZADA VIỆT NAM',
    type: 'job_posting',
    plan: null,
    amount: 2500000,
    status: 'pending',
    date: '2024-01-13',
    paymentMethod: 'E-Wallet',
    invoice: 'INV-2024-005',
  },
  {
    id: 'TXN-006',
    business: 'THE COFFEE HOUSE',
    type: 'subscription',
    plan: 'Pro',
    amount: 15000000,
    status: 'completed',
    date: '2024-01-12',
    paymentMethod: 'Credit Card',
    invoice: 'INV-2024-006',
  },
  {
    id: 'TXN-007',
    business: 'GHN EXPRESS',
    type: 'job_posting',
    plan: null,
    amount: 1800000,
    status: 'completed',
    date: '2024-01-12',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-007',
  },
  {
    id: 'TXN-008',
    business: 'CIRCLE K',
    type: 'subscription',
    plan: 'Basic',
    amount: 5000000,
    status: 'failed',
    date: '2024-01-11',
    paymentMethod: 'Credit Card',
    invoice: null,
  },
  {
    id: 'TXN-009',
    business: 'HIGHLANDS COFFEE',
    type: 'subscription',
    plan: 'Basic',
    amount: 5000000,
    status: 'completed',
    date: '2024-01-11',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-008',
  },
  {
    id: 'TXN-010',
    business: 'SAMSUNG ELECTRONICS VN',
    type: 'subscription',
    plan: 'Premium',
    amount: 45000000,
    status: 'completed',
    date: '2024-01-10',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-009',
  },
  {
    id: 'TXN-011',
    business: 'VIETTEL POST',
    type: 'upgrade',
    plan: 'Pro',
    amount: 10000000,
    status: 'completed',
    date: '2024-01-10',
    paymentMethod: 'E-Wallet',
    invoice: 'INV-2024-010',
  },
  {
    id: 'TXN-012',
    business: 'LOTTERIA VIỆT NAM',
    type: 'subscription',
    plan: 'Basic',
    amount: 5000000,
    status: 'pending',
    date: '2024-01-09',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-011',
  },
  {
    id: 'TXN-013',
    business: 'VINMART',
    type: 'job_posting',
    plan: null,
    amount: 3500000,
    status: 'completed',
    date: '2024-01-09',
    paymentMethod: 'Credit Card',
    invoice: 'INV-2024-012',
  },
  {
    id: 'TXN-014',
    business: 'GARMENT 10 CORPORATION',
    type: 'subscription',
    plan: 'Basic',
    amount: 5000000,
    status: 'completed',
    date: '2024-01-08',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-013',
  },
  {
    id: 'TXN-015',
    business: 'GRAB VIỆT NAM',
    type: 'job_posting',
    plan: null,
    amount: 4200000,
    status: 'completed',
    date: '2024-01-08',
    paymentMethod: 'E-Wallet',
    invoice: 'INV-2024-014',
  },
  {
    id: 'TXN-016',
    business: 'SPX EXPRESS VIỆT NAM',
    type: 'subscription',
    plan: 'Pro',
    amount: 15000000,
    status: 'refunded',
    date: '2024-01-07',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-015',
  },
  {
    id: 'TXN-017',
    business: 'RICONS',
    type: 'subscription',
    plan: 'Basic',
    amount: 5000000,
    status: 'completed',
    date: '2024-01-07',
    paymentMethod: 'Credit Card',
    invoice: 'INV-2024-016',
  },
  {
    id: 'TXN-018',
    business: 'THE COFFEE HOUSE',
    type: 'job_posting',
    plan: null,
    amount: 2100000,
    status: 'completed',
    date: '2024-01-06',
    paymentMethod: 'E-Wallet',
    invoice: 'INV-2024-017',
  },
  {
    id: 'TXN-019',
    business: 'LOTTE MART',
    type: 'job_posting',
    plan: null,
    amount: 2800000,
    status: 'completed',
    date: '2024-01-06',
    paymentMethod: 'Bank Transfer',
    invoice: 'INV-2024-018',
  },
  {
    id: 'TXN-020',
    business: 'SHOPEE EXPRESS',
    type: 'upgrade',
    plan: 'Pro',
    amount: 10000000,
    status: 'completed',
    date: '2024-01-05',
    paymentMethod: 'Credit Card',
    invoice: 'INV-2024-019',
  },
];

// Demo data for revenue breakdown by source (6 items)
const revenueBySource = [
  { source: 'Gói Premium', amount: 225000000, percentage: 45, color: 'bg-amber-500' },
  { source: 'Gói Pro', amount: 125000000, percentage: 25, color: 'bg-blue-500' },
  { source: 'Gói Basic', amount: 50000000, percentage: 10, color: 'bg-gray-500' },
  { source: 'Đăng tin tuyển dụng', amount: 45000000, percentage: 9, color: 'bg-green-500' },
  { source: 'Nâng cấp gói', amount: 35000000, percentage: 7, color: 'bg-purple-500' },
  { source: 'Dịch vụ khác', amount: 20000000, percentage: 4, color: 'bg-cyan-500' },
];

// Demo data for monthly revenue (12 months)
const monthlyRevenue = [
  { month: 'T1/23', revenue: 1850000000, growth: null },
  { month: 'T2/23', revenue: 1920000000, growth: 3.8 },
  { month: 'T3/23', revenue: 2100000000, growth: 9.4 },
  { month: 'T4/23', revenue: 2050000000, growth: -2.4 },
  { month: 'T5/23', revenue: 2280000000, growth: 11.2 },
  { month: 'T6/23', revenue: 2450000000, growth: 7.5 },
  { month: 'T7/23', revenue: 2380000000, growth: -2.9 },
  { month: 'T8/23', revenue: 2520000000, growth: 5.9 },
  { month: 'T9/23', revenue: 2680000000, growth: 6.3 },
  { month: 'T10/23', revenue: 2750000000, growth: 2.6 },
  { month: 'T11/23', revenue: 2890000000, growth: 5.1 },
  { month: 'T12/23', revenue: 2847500000, growth: -1.5 },
];

// Demo data for top paying customers (10 items)
const topCustomers = [
  { rank: 1, name: 'SAMSUNG ELECTRONICS VN', totalPaid: 520000000, transactions: 12, plan: 'premium' },
  { rank: 2, name: 'VINMART', totalPaid: 458000000, transactions: 18, plan: 'premium' },
  { rank: 3, name: 'GRAB VIỆT NAM', totalPaid: 392000000, transactions: 15, plan: 'premium' },
  { rank: 4, name: 'SHOPEE EXPRESS', totalPaid: 312000000, transactions: 14, plan: 'pro' },
  { rank: 5, name: 'LOTTE MART', totalPaid: 287000000, transactions: 11, plan: 'premium' },
  { rank: 6, name: 'LAZADA VIỆT NAM', totalPaid: 245000000, transactions: 13, plan: 'pro' },
  { rank: 7, name: 'VIETTEL POST', totalPaid: 234000000, transactions: 10, plan: 'pro' },
  { rank: 8, name: 'THE COFFEE HOUSE', totalPaid: 178000000, transactions: 8, plan: 'pro' },
  { rank: 9, name: 'GHN EXPRESS', totalPaid: 156000000, transactions: 9, plan: 'pro' },
  { rank: 10, name: 'CIRCLE K', totalPaid: 98000000, transactions: 7, plan: 'basic' },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(2)}B VNĐ`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M VNĐ`;
  }
  if (amount === 0) return '0 VNĐ';
  return `${amount.toLocaleString()} VNĐ`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-600" />;
    case 'refunded':
      return <RefreshCw className="w-4 h-4 text-purple-600" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'pending':
      return 'Chờ xử lý';
    case 'failed':
      return 'Thất bại';
    case 'refunded':
      return 'Hoàn tiền';
    default:
      return status;
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case 'subscription':
      return 'Đăng ký gói';
    case 'upgrade':
      return 'Nâng cấp';
    case 'job_posting':
      return 'Đăng tin';
    default:
      return type;
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'premium':
      return 'bg-amber-100 text-amber-800';
    case 'pro':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminRevenue({ onNavigate, onLogout }: AdminRevenueProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactionsData[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredTransactions = transactionsData.filter((tx) => {
    const matchesSearch = tx.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    totalRevenue: transactionsData
      .filter((tx) => tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0),
    pendingRevenue: transactionsData
      .filter((tx) => tx.status === 'pending')
      .reduce((sum, tx) => sum + tx.amount, 0),
    completedCount: transactionsData.filter((tx) => tx.status === 'completed').length,
    failedCount: transactionsData.filter((tx) => tx.status === 'failed').length,
  };

  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  const openTransactionDetail = (transaction: typeof transactionsData[0]) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0A2647] text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2E86AB] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FJ</span>
              </div>
              <span className="font-bold text-lg">FlashJob Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 ${!sidebarOpen && 'justify-center'}`}
            onClick={() => onNavigate('dashboard')}
          >
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 ${!sidebarOpen && 'justify-center'}`}
            onClick={() => onNavigate('businesses')}
          >
            <Building2 className="w-5 h-5" />
            {sidebarOpen && <span>Doanh nghiệp</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-white bg-white/10 hover:bg-white/20 ${!sidebarOpen && 'justify-center'}`}
            onClick={() => onNavigate('revenue')}
          >
            <DollarSign className="w-5 h-5" />
            {sidebarOpen && <span>Doanh thu</span>}
          </Button>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 ${!sidebarOpen && 'justify-center'}`}
              >
                <div className="w-8 h-8 bg-[#2E86AB] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                {sidebarOpen && (
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Admin</p>
                    <p className="text-xs text-white/50">Super Admin</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2647]">Quản lý Doanh thu</h1>
            <p className="text-gray-500 text-sm">Theo dõi và phân tích doanh thu hệ thống</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thời gian</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất báo cáo
            </Button>
            <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23.1%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Tổng doanh thu</p>
                <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-white/80 text-sm">Chờ xử lý</p>
                <p className="text-3xl font-bold">{formatCurrency(stats.pendingRevenue)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-white/80 text-sm">Giao dịch thành công</p>
                <p className="text-3xl font-bold">{stats.completedCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-white/80 text-sm">Giao dịch thất bại</p>
                <p className="text-3xl font-bold">{stats.failedCount}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2E86AB]" />
                  Biểu đồ doanh thu theo tháng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-64 gap-2 px-2">
                  {monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full">
                        <div
                          className="w-full bg-gradient-to-t from-[#2E86AB] to-[#4DA8DA] rounded-t transition-all group-hover:opacity-80 cursor-pointer"
                          style={{ height: `${(item.revenue / maxMonthlyRevenue) * 180}px` }}
                        />
                        {/* Tooltip on hover */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {formatCurrency(item.revenue)}
                          {item.growth !== null && (
                            <span className={item.growth >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {' '}({item.growth >= 0 ? '+' : ''}{item.growth}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Source */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#2E86AB]" />
                  Nguồn doanh thu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBySource.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-gray-700">{item.source}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transactions Table */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#2E86AB]" />
                    Lịch sử giao dịch
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 p-4 border-b">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Tìm kiếm giao dịch..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="failed">Thất bại</SelectItem>
                      <SelectItem value="refunded">Hoàn tiền</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="subscription">Đăng ký gói</SelectItem>
                      <SelectItem value="upgrade">Nâng cấp</SelectItem>
                      <SelectItem value="job_posting">Đăng tin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mã GD</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Doanh nghiệp</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Loại</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Số tiền</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-gray-600">{tx.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{tx.business}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-600">{getTypeText(tx.type)}</span>
                            {tx.plan && (
                              <Badge className={`ml-2 ${getTierColor(tx.plan.toLowerCase())}`}>{tx.plan}</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-[#2E86AB]">
                            {formatCurrency(tx.amount)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(tx.status)}
                              <span className={`text-sm px-2 py-0.5 rounded ${getStatusColor(tx.status)}`}>
                                {getStatusText(tx.status)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(tx.date).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openTransactionDetail(tx)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{' '}
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} trong{' '}
                    {filteredTransactions.length} giao dịch
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'bg-[#2E86AB]' : ''}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#2E86AB]" />
                  Top khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topCustomers.slice(0, 8).map((customer) => (
                  <div
                    key={customer.rank}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${customer.rank <= 3
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {customer.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.transactions} giao dịch</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#2E86AB]">
                        {formatCurrency(customer.totalPaid)}
                      </p>
                      <Badge className={`text-[10px] ${getTierColor(customer.plan)}`}>
                        {customer.plan}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Transaction Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#2E86AB]" />
                  Chi tiết giao dịch
                </DialogTitle>
                <DialogDescription>
                  Mã giao dịch: {selectedTransaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Doanh nghiệp</span>
                  <span className="font-medium">{selectedTransaction.business}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Loại giao dịch</span>
                  <span className="font-medium">{getTypeText(selectedTransaction.type)}</span>
                </div>
                {selectedTransaction.plan && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-500">Gói dịch vụ</span>
                    <Badge className={getTierColor(selectedTransaction.plan.toLowerCase())}>
                      {selectedTransaction.plan}
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Số tiền</span>
                  <span className="font-bold text-lg text-[#2E86AB]">
                    {formatCurrency(selectedTransaction.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Phương thức</span>
                  <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Ngày giao dịch</span>
                  <span className="font-medium">
                    {new Date(selectedTransaction.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-500">Trạng thái</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedTransaction.status)}
                    <span className={`px-2 py-0.5 rounded ${getStatusColor(selectedTransaction.status)}`}>
                      {getStatusText(selectedTransaction.status)}
                    </span>
                  </div>
                </div>
                {selectedTransaction.invoice && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500">Hóa đơn</span>
                    <span className="font-mono text-sm text-blue-600 cursor-pointer hover:underline">
                      {selectedTransaction.invoice}
                    </span>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Đóng
                </Button>
                {selectedTransaction.invoice && (
                  <Button className="bg-[#2E86AB] hover:bg-[#1e6a8a]">
                    <FileText className="w-4 h-4 mr-2" />
                    Tải hóa đơn
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
