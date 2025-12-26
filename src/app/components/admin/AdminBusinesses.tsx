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
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  ArrowUpDown,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AdminBusinessesProps {
  onNavigate: (page: 'businesses' | 'revenue' | 'dashboard') => void;
  onLogout: () => void;
}

// Demo data for businesses (15 items)
const businessesData = [
  {
    id: 1,
    name: 'VINMART',
    logo: 'VM',
    tier: 'premium',
    status: 'active',
    location: 'Hà Nội',
    industry: 'Bán lẻ',
    totalJobs: 234,
    activeJobs: 45,
    totalWorkers: 1245,
    monthlyRevenue: 458000000,
    rating: 4.8,
    reviews: 523,
    joinDate: '2023-01-15',
    contactPerson: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'contact@vinmart.vn',
    website: 'vinmart.vn',
  },
  {
    id: 2,
    name: 'GRAB VIỆT NAM',
    logo: 'GR',
    tier: 'premium',
    status: 'active',
    location: 'TP.HCM',
    industry: 'Giao hàng',
    totalJobs: 189,
    activeJobs: 38,
    totalWorkers: 987,
    monthlyRevenue: 392000000,
    rating: 4.6,
    reviews: 412,
    joinDate: '2023-02-20',
    contactPerson: 'Trần Thị B',
    phone: '0923456789',
    email: 'contact@grab.vn',
    website: 'grab.com/vn',
  },
  {
    id: 3,
    name: 'SHOPEE EXPRESS',
    logo: 'SE',
    tier: 'pro',
    status: 'active',
    location: 'TP.HCM',
    industry: 'Giao hàng',
    totalJobs: 156,
    activeJobs: 32,
    totalWorkers: 856,
    monthlyRevenue: 312000000,
    rating: 4.5,
    reviews: 356,
    joinDate: '2023-03-10',
    contactPerson: 'Lê Văn C',
    phone: '0934567890',
    email: 'contact@shopee.vn',
    website: 'shopee.vn',
  },
  {
    id: 4,
    name: 'LOTTE MART',
    logo: 'LM',
    tier: 'premium',
    status: 'active',
    location: 'Hà Nội',
    industry: 'Bán lẻ',
    totalJobs: 145,
    activeJobs: 28,
    totalWorkers: 743,
    monthlyRevenue: 287000000,
    rating: 4.7,
    reviews: 298,
    joinDate: '2023-01-25',
    contactPerson: 'Phạm Thị D',
    phone: '0945678901',
    email: 'contact@lottemart.vn',
    website: 'lottemart.vn',
  },
  {
    id: 5,
    name: 'LAZADA VIỆT NAM',
    logo: 'LZ',
    tier: 'pro',
    status: 'active',
    location: 'TP.HCM',
    industry: 'E-commerce',
    totalJobs: 132,
    activeJobs: 25,
    totalWorkers: 654,
    monthlyRevenue: 245000000,
    rating: 4.4,
    reviews: 267,
    joinDate: '2023-04-05',
    contactPerson: 'Hoàng Văn E',
    phone: '0956789012',
    email: 'contact@lazada.vn',
    website: 'lazada.vn',
  },
  {
    id: 6,
    name: 'THE COFFEE HOUSE',
    logo: 'TC',
    tier: 'pro',
    status: 'active',
    location: 'TP.HCM',
    industry: 'F&B',
    totalJobs: 98,
    activeJobs: 18,
    totalWorkers: 432,
    monthlyRevenue: 178000000,
    rating: 4.6,
    reviews: 234,
    joinDate: '2023-05-12',
    contactPerson: 'Nguyễn Thị F',
    phone: '0967890123',
    email: 'hr@thecoffeehouse.vn',
    website: 'thecoffeehouse.com',
  },
  {
    id: 7,
    name: 'GHN EXPRESS',
    logo: 'GH',
    tier: 'pro',
    status: 'active',
    location: 'TP.HCM',
    industry: 'Giao hàng',
    totalJobs: 87,
    activeJobs: 15,
    totalWorkers: 398,
    monthlyRevenue: 156000000,
    rating: 4.3,
    reviews: 189,
    joinDate: '2023-06-20',
    contactPerson: 'Trần Văn G',
    phone: '0978901234',
    email: 'contact@ghn.vn',
    website: 'ghn.vn',
  },
  {
    id: 8,
    name: 'CIRCLE K',
    logo: 'CK',
    tier: 'basic',
    status: 'active',
    location: 'Hà Nội',
    industry: 'Bán lẻ',
    totalJobs: 76,
    activeJobs: 12,
    totalWorkers: 287,
    monthlyRevenue: 98000000,
    rating: 4.2,
    reviews: 156,
    joinDate: '2023-07-15',
    contactPerson: 'Lê Thị H',
    phone: '0989012345',
    email: 'hr@circlek.vn',
    website: 'circlek.vn',
  },
  {
    id: 9,
    name: 'HIGHLANDS COFFEE',
    logo: 'HL',
    tier: 'basic',
    status: 'active',
    location: 'Đà Nẵng',
    industry: 'F&B',
    totalJobs: 65,
    activeJobs: 10,
    totalWorkers: 234,
    monthlyRevenue: 87000000,
    rating: 4.5,
    reviews: 145,
    joinDate: '2023-08-01',
    contactPerson: 'Phạm Văn I',
    phone: '0990123456',
    email: 'hr@highlands.vn',
    website: 'highlandscoffee.com.vn',
  },
  {
    id: 10,
    name: 'LOTTERIA VIỆT NAM',
    logo: 'LT',
    tier: 'basic',
    status: 'active',
    location: 'TP.HCM',
    industry: 'F&B',
    totalJobs: 54,
    activeJobs: 8,
    totalWorkers: 198,
    monthlyRevenue: 76000000,
    rating: 4.1,
    reviews: 123,
    joinDate: '2023-08-15',
    contactPerson: 'Hoàng Thị K',
    phone: '0901234567',
    email: 'hr@lotteria.vn',
    website: 'lotteria.vn',
  },
  {
    id: 11,
    name: 'SAMSUNG ELECTRONICS VN',
    logo: 'SS',
    tier: 'premium',
    status: 'active',
    location: 'Bắc Ninh',
    industry: 'Sản xuất',
    totalJobs: 178,
    activeJobs: 35,
    totalWorkers: 2345,
    monthlyRevenue: 520000000,
    rating: 4.9,
    reviews: 678,
    joinDate: '2022-11-20',
    contactPerson: 'Kim Min Ho',
    phone: '0912345000',
    email: 'hr@samsung.vn',
    website: 'samsung.com/vn',
  },
  {
    id: 12,
    name: 'VIETTEL POST',
    logo: 'VP',
    tier: 'pro',
    status: 'active',
    location: 'Hà Nội',
    industry: 'Giao hàng',
    totalJobs: 143,
    activeJobs: 28,
    totalWorkers: 876,
    monthlyRevenue: 234000000,
    rating: 4.4,
    reviews: 289,
    joinDate: '2023-02-10',
    contactPerson: 'Nguyễn Minh L',
    phone: '0923456000',
    email: 'hr@viettelpost.vn',
    website: 'viettelpost.vn',
  },
  {
    id: 13,
    name: 'SPX EXPRESS VIỆT NAM',
    logo: 'SP',
    tier: 'pro',
    status: 'pending',
    location: 'TP.HCM',
    industry: 'Giao hàng',
    totalJobs: 112,
    activeJobs: 0,
    totalWorkers: 543,
    monthlyRevenue: 0,
    rating: 4.3,
    reviews: 167,
    joinDate: '2024-01-05',
    contactPerson: 'Trần Hoàng M',
    phone: '0934567000',
    email: 'contact@spx.vn',
    website: 'spx.vn',
  },
  {
    id: 14,
    name: 'RICONS',
    logo: 'RC',
    tier: 'basic',
    status: 'inactive',
    location: 'TP.HCM',
    industry: 'Xây dựng',
    totalJobs: 45,
    activeJobs: 0,
    totalWorkers: 234,
    monthlyRevenue: 0,
    rating: 4.0,
    reviews: 89,
    joinDate: '2023-09-01',
    contactPerson: 'Lê Văn N',
    phone: '0945678000',
    email: 'hr@ricons.vn',
    website: 'ricons.vn',
  },
  {
    id: 15,
    name: 'GARMENT 10 CORPORATION',
    logo: 'G10',
    tier: 'basic',
    status: 'active',
    location: 'Hà Nội',
    industry: 'Dệt may',
    totalJobs: 67,
    activeJobs: 12,
    totalWorkers: 345,
    monthlyRevenue: 89000000,
    rating: 4.2,
    reviews: 134,
    joinDate: '2023-07-20',
    contactPerson: 'Phạm Thị O',
    phone: '0956789000',
    email: 'hr@garment10.vn',
    website: 'garment10.vn',
  },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B VNĐ`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}M VNĐ`;
  }
  if (amount === 0) return '0 VNĐ';
  return `${amount.toLocaleString()} VNĐ`;
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case 'inactive':
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Đang hoạt động';
    case 'pending':
      return 'Chờ duyệt';
    case 'inactive':
      return 'Ngừng hoạt động';
    default:
      return status;
  }
};

export default function AdminBusinesses({ onNavigate, onLogout }: AdminBusinessesProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businessesData[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 10;

  const industries = [...new Set(businessesData.map((b) => b.industry))];

  const filteredBusinesses = businessesData.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'all' || business.tier === filterTier;
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus;
    const matchesIndustry = filterIndustry === 'all' || business.industry === filterIndustry;
    return matchesSearch && matchesTier && matchesStatus && matchesIndustry;
  });

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const paginatedBusinesses = filteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: businessesData.length,
    active: businessesData.filter((b) => b.status === 'active').length,
    premium: businessesData.filter((b) => b.tier === 'premium').length,
    totalRevenue: businessesData.reduce((sum, b) => sum + b.monthlyRevenue, 0),
  };

  const openBusinessDetail = (business: typeof businessesData[0]) => {
    setSelectedBusiness(business);
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
            className={`w-full justify-start gap-3 text-white bg-white/10 hover:bg-white/20 ${!sidebarOpen && 'justify-center'}`}
            onClick={() => onNavigate('businesses')}
          >
            <Building2 className="w-5 h-5" />
            {sidebarOpen && <span>Doanh nghiệp</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 ${!sidebarOpen && 'justify-center'}`}
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
            <h1 className="text-2xl font-bold text-[#0A2647]">Quản lý Doanh nghiệp</h1>
            <p className="text-gray-500 text-sm">Quản lý và theo dõi các doanh nghiệp đối tác</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất Excel
            </Button>
            <Button className="gap-2 bg-[#2E86AB] hover:bg-[#1e6a8a]">
              <Plus className="w-4 h-4" />
              Thêm doanh nghiệp
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
            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng doanh nghiệp</p>
                  <p className="text-2xl font-bold text-[#0A2647]">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-[#0A2647]">{stats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Premium</p>
                  <p className="text-2xl font-bold text-[#0A2647]">{stats.premium}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-[#0A2647]">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm doanh nghiệp..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterTier} onValueChange={setFilterTier}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Gói dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả gói</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngành</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                          Doanh nghiệp
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gói</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngành</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                          Jobs
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Workers</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                          Doanh thu/tháng
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedBusinesses.map((business) => (
                      <tr key={business.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2E86AB] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {business.logo}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{business.name}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {business.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getTierColor(business.tier)}>{business.tier}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(business.status)}
                            <span className={`text-sm px-2 py-0.5 rounded ${getStatusColor(business.status)}`}>
                              {getStatusText(business.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{business.industry}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <span className="font-medium">{business.activeJobs}</span>
                            <span className="text-gray-400">/{business.totalJobs}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{business.totalWorkers}</td>
                        <td className="px-4 py-3 text-sm font-medium text-[#2E86AB]">
                          {formatCurrency(business.monthlyRevenue)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium">{business.rating}</span>
                            <span className="text-xs text-gray-400">({business.reviews})</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openBusinessDetail(business)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                  {Math.min(currentPage * itemsPerPage, filteredBusinesses.length)} trong{' '}
                  {filteredBusinesses.length} doanh nghiệp
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
        </div>
      </main>

      {/* Business Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#2E86AB] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedBusiness.logo}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedBusiness.name}</DialogTitle>
                    <DialogDescription className="flex items-center gap-3 mt-1">
                      <Badge className={getTierColor(selectedBusiness.tier)}>{selectedBusiness.tier}</Badge>
                      <span className={`text-sm px-2 py-0.5 rounded ${getStatusColor(selectedBusiness.status)}`}>
                        {getStatusText(selectedBusiness.status)}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Thông tin liên hệ</p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.contactPerson}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.email}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.website}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Thông tin khác</p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.location}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        {selectedBusiness.industry}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Tham gia: {new Date(selectedBusiness.joinDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-blue-50">
                      <CardContent className="p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedBusiness.totalJobs}</p>
                        <p className="text-xs text-gray-500">Tổng jobs</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50">
                      <CardContent className="p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedBusiness.activeJobs}</p>
                        <p className="text-xs text-gray-500">Đang tuyển</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50">
                      <CardContent className="p-3 text-center">
                        <p className="text-2xl font-bold text-purple-600">{selectedBusiness.totalWorkers}</p>
                        <p className="text-xs text-gray-500">Workers</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          <p className="text-2xl font-bold text-amber-600">{selectedBusiness.rating}</p>
                        </div>
                        <p className="text-xs text-gray-500">{selectedBusiness.reviews} đánh giá</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-[#0A2647]">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-white/70">Doanh thu tháng này</p>
                      <p className="text-3xl font-bold text-white">
                        {formatCurrency(selectedBusiness.monthlyRevenue)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Đóng
                </Button>
                <Button className="bg-[#2E86AB] hover:bg-[#1e6a8a]">
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
