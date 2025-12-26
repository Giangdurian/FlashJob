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
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Star,
  MapPin,
  FileText,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

interface AdminDashboardProps {
  onNavigate: (page: 'businesses' | 'revenue' | 'dashboard') => void;
  onLogout: () => void;
}

// Demo data for dashboard statistics
const dashboardStats = {
  totalBusinesses: 156,
  totalWorkers: 12847,
  totalJobs: 3542,
  totalRevenue: 2847500000, // VND
  monthlyGrowth: {
    businesses: 12.5,
    workers: 8.3,
    jobs: 15.2,
    revenue: 23.1,
  },
};

// Demo data for recent activities (12 items)
const recentActivities = [
  { id: 1, type: 'new_business', title: 'CIRCLE K đăng ký gói Pro', time: '5 phút trước', amount: 15000000 },
  { id: 2, type: 'job_posted', title: 'VINMART đăng 5 tin tuyển dụng mới', time: '15 phút trước', amount: null },
  { id: 3, type: 'payment', title: 'Thanh toán từ THE COFFEE HOUSE', time: '1 giờ trước', amount: 8500000 },
  { id: 4, type: 'new_worker', title: '45 worker mới đăng ký', time: '2 giờ trước', amount: null },
  { id: 5, type: 'upgrade', title: 'LOTTE MART nâng cấp lên Premium', time: '3 giờ trước', amount: 25000000 },
  { id: 6, type: 'payment', title: 'Thanh toán từ GRAB VIỆT NAM', time: '4 giờ trước', amount: 45000000 },
  { id: 7, type: 'job_completed', title: '128 jobs hoàn thành hôm nay', time: '5 giờ trước', amount: null },
  { id: 8, type: 'new_business', title: 'HIGHLANDS COFFEE đăng ký Basic', time: '6 giờ trước', amount: 5000000 },
  { id: 9, type: 'payment', title: 'Thanh toán từ SHOPEE EXPRESS', time: '8 giờ trước', amount: 32000000 },
  { id: 10, type: 'upgrade', title: 'GHN EXPRESS nâng cấp lên Pro', time: '10 giờ trước', amount: 15000000 },
  { id: 11, type: 'new_worker', title: '78 worker mới đăng ký', time: '12 giờ trước', amount: null },
  { id: 12, type: 'payment', title: 'Thanh toán từ LAZADA VIỆT NAM', time: '1 ngày trước', amount: 52000000 },
];

// Demo data for top businesses (10 items)
const topBusinesses = [
  { id: 1, name: 'VINMART', tier: 'premium', jobs: 234, workers: 1245, revenue: 458000000 },
  { id: 2, name: 'GRAB VIỆT NAM', tier: 'premium', jobs: 189, workers: 987, revenue: 392000000 },
  { id: 3, name: 'SHOPEE EXPRESS', tier: 'pro', jobs: 156, workers: 856, revenue: 312000000 },
  { id: 4, name: 'LOTTE MART', tier: 'premium', jobs: 145, workers: 743, revenue: 287000000 },
  { id: 5, name: 'LAZADA VIỆT NAM', tier: 'pro', jobs: 132, workers: 654, revenue: 245000000 },
  { id: 6, name: 'THE COFFEE HOUSE', tier: 'pro', jobs: 98, workers: 432, revenue: 178000000 },
  { id: 7, name: 'GHN EXPRESS', tier: 'pro', jobs: 87, workers: 398, revenue: 156000000 },
  { id: 8, name: 'CIRCLE K', tier: 'basic', jobs: 76, workers: 287, revenue: 98000000 },
  { id: 9, name: 'HIGHLANDS COFFEE', tier: 'basic', jobs: 65, workers: 234, revenue: 87000000 },
  { id: 10, name: 'LOTTERIA VIỆT NAM', tier: 'basic', jobs: 54, workers: 198, revenue: 76000000 },
];

// Demo data for monthly revenue chart (12 months)
const monthlyRevenue = [
  { month: 'T1', revenue: 1850000000 },
  { month: 'T2', revenue: 1920000000 },
  { month: 'T3', revenue: 2100000000 },
  { month: 'T4', revenue: 2050000000 },
  { month: 'T5', revenue: 2280000000 },
  { month: 'T6', revenue: 2450000000 },
  { month: 'T7', revenue: 2380000000 },
  { month: 'T8', revenue: 2520000000 },
  { month: 'T9', revenue: 2680000000 },
  { month: 'T10', revenue: 2750000000 },
  { month: 'T11', revenue: 2890000000 },
  { month: 'T12', revenue: 2847500000 },
];

// Demo data for job categories (10 items)
const jobCategories = [
  { name: 'Bán lẻ', count: 856, percentage: 24 },
  { name: 'Giao hàng', count: 743, percentage: 21 },
  { name: 'F&B', count: 612, percentage: 17 },
  { name: 'Kho bãi', count: 498, percentage: 14 },
  { name: 'Bảo vệ', count: 287, percentage: 8 },
  { name: 'Vệ sinh', count: 234, percentage: 7 },
  { name: 'Sự kiện', count: 156, percentage: 4 },
  { name: 'Văn phòng', count: 89, percentage: 3 },
  { name: 'IT', count: 45, percentage: 1 },
  { name: 'Khác', count: 22, percentage: 1 },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B VNĐ`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}M VNĐ`;
  }
  return `${amount.toLocaleString()} VNĐ`;
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
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

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'new_business':
      return <Building2 className="w-4 h-4 text-blue-500" />;
    case 'job_posted':
      return <Briefcase className="w-4 h-4 text-green-500" />;
    case 'payment':
      return <DollarSign className="w-4 h-4 text-emerald-500" />;
    case 'new_worker':
      return <Users className="w-4 h-4 text-purple-500" />;
    case 'upgrade':
      return <TrendingUp className="w-4 h-4 text-orange-500" />;
    case 'job_completed':
      return <Activity className="w-4 h-4 text-cyan-500" />;
    default:
      return <Bell className="w-4 h-4 text-gray-500" />;
  }
};

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

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
            className={`w-full justify-start gap-3 text-white bg-white/10 hover:bg-white/20 ${!sidebarOpen && 'justify-center'}`}
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
            <h1 className="text-2xl font-bold text-[#0A2647]">Dashboard</h1>
            <p className="text-gray-500 text-sm">Tổng quan hệ thống FlashJob</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                5
              </span>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{dashboardStats.monthlyGrowth.businesses}%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Doanh nghiệp</p>
                <p className="text-3xl font-bold">{dashboardStats.totalBusinesses}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{dashboardStats.monthlyGrowth.workers}%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Workers</p>
                <p className="text-3xl font-bold">{formatNumber(dashboardStats.totalWorkers)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{dashboardStats.monthlyGrowth.jobs}%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Việc làm</p>
                <p className="text-3xl font-bold">{formatNumber(dashboardStats.totalJobs)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{dashboardStats.monthlyGrowth.revenue}%</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm">Doanh thu tháng</p>
                <p className="text-3xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2E86AB]" />
                  Doanh thu theo tháng
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => onNavigate('revenue')}>
                  Xem chi tiết
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-64 gap-2 px-2">
                  {monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#2E86AB] to-[#4DA8DA] rounded-t transition-all hover:opacity-80"
                        style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}
                      />
                      <span className="text-xs text-gray-500">{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Categories */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#2E86AB]" />
                  Phân loại việc làm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {jobCategories.slice(0, 6).map((category, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-gray-500">{category.count} jobs</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <span className="text-sm text-gray-500">+{jobCategories.length - 6} loại khác</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Businesses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Top doanh nghiệp
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => onNavigate('businesses')}>
                  Xem tất cả
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topBusinesses.slice(0, 5).map((business, index) => (
                    <div
                      key={business.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="w-6 text-center font-bold text-gray-400">#{index + 1}</span>
                      <div className="w-10 h-10 bg-[#2E86AB] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {business.name.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{business.name}</p>
                        <p className="text-xs text-gray-500">{business.jobs} jobs • {business.workers} workers</p>
                      </div>
                      <Badge className={getTierColor(business.tier)}>{business.tier}</Badge>
                      <div className="text-right">
                        <p className="font-semibold text-[#2E86AB]">{formatCurrency(business.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#2E86AB]" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-emerald-600">
                          +{formatCurrency(activity.amount)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
