import React, { useState } from 'react';
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  Zap,
  Star,
  ChevronRight,
  Briefcase,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Crown,
  Shield,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import jobsData from '../../../data/jobs.json';

interface JobListingsProps {
  onViewJobDetail: (jobId: number) => void;
  onNavigate: (screen: any) => void;
  onLogout?: () => void;
  onSetWorkerView?: (view: 'dashboard' | 'training' | 'withdraw' | 'protection' | 'community') => void;
}

export function JobListings({ onViewJobDetail, onNavigate, onLogout, onSetWorkerView }: JobListingsProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('luong-cao');
  const [filters, setFilters] = useState({
    duration: 'all',
    distance: 'all',
    shiftTime: 'all',
    minWage: '',
    maxWage: '',
  });

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType);
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const getCompanyLogo = (company: string) => {
    const logoMap: { [key: string]: string } = {
      'VINMART': '/src/assets/images/topEmployer/winmart.jpg',
      'GRAB VIỆT NAM': '/src/assets/images/topEmployer/grab.jpg',
      'LOTTE MART': '/src/assets/images/topEmployer/lotte.jpg',
      'SHOPEE VIỆT NAM': '/src/assets/images/topEmployer/shopee.jpg',
      'LAZADA VIỆT NAM': '/src/assets/images/topEmployer/lazada.jpg',
      'LOTTERIA VIỆT NAM': '/src/assets/images/topEmployer/lotte.jpg',
      'RICONS': '/src/assets/images/topEmployer/ricons.jpg',
      'GARMENT 10 CORPORATION': '/src/assets/images/topEmployer/may10.jpg',
      'NHÀ HÀNG KFC': '/src/assets/images/topEmployer/kfc.jpg',
      'SAMSUNG ELECTRONICS VN': '/src/assets/images/topEmployer/samsung.jpg',
      'VIET UC GROUP': '/src/assets/images/topEmployer/viet_uc_group.jpg',
      'SPX EXPRESS VIỆT NAM': '/src/assets/images/topEmployer/spx.jpg',
      'VIETTEL POST': '/src/assets/images/topEmployer/viettelpost.jpg'
    };
    return logoMap[company] || '/src/assets/images/topEmployer/winmart.jpg';
  };

  const jobs = jobsData.jobs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-green-600 hover:opacity-80 cursor-pointer"
              >
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                <h1>FlashJob</h1>
              </button>
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => onNavigate('landing')}
                  className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors"
                >
                  Việc làm
                </button>
                <button
                  onClick={() => {
                    onSetWorkerView?.('training');
                    onNavigate('dashboard');
                  }}
                  className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <GraduationCap className="w-4 h-4" />
                  Đào tạo nghề
                </button>
                <button
                  onClick={() => {
                    onSetWorkerView?.('protection');
                    onNavigate('dashboard');
                  }}
                  className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Bảo vệ & Hỗ trợ
                </button>
                <button
                  onClick={() => {
                    onSetWorkerView?.('community');
                    onNavigate('dashboard');
                  }}
                  className="text-gray-700 hover:text-purple-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  Cộng đồng
                </button>
                <button
                  onClick={() => onNavigate('utilities')}
                  className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
                >
                  Tiện ích/Cẩm nang
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Thông báo
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                      NVA
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">Nguyễn Văn An</span>
                      <span className="text-xs text-gray-500 font-normal">nguyenvanan@email.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    onSetWorkerView?.('dashboard');
                    onNavigate('dashboard');
                  }} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-gray-600">
            <button onClick={() => onNavigate('landing')} className="hover:text-green-600 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Việc làm nổi bật</span>
          </div>
        </div>
      </div>

      {/* Page Title & Filters Toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Việc làm nổi bật</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFilterClick('viec-moi')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeFilter === 'viec-moi'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Việc làm mới
                </button>
                <button
                  onClick={() => handleFilterClick('gan-day')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeFilter === 'gan-day'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Gần đây
                </button>
                <button
                  onClick={() => handleFilterClick('luong-cao')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${activeFilter === 'luong-cao'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Lương cao
                </button>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-900 mb-3 block">
                        <Filter className="w-4 h-4 inline mr-2" />
                        Thời gian làm việc
                      </label>
                      <select
                        value={filters.duration}
                        onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer"
                      >
                        <option value="all">Tất cả</option>
                        <option value="7">7 ngày</option>
                        <option value="14">14 ngày</option>
                        <option value="30">1 tháng</option>
                        <option value="60">1-2 tháng</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-900 mb-3 block">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Khoảng cách
                      </label>
                      <select
                        value={filters.distance}
                        onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer"
                      >
                        <option value="all">Tất cả khoảng cách</option>
                        <option value="5">Trong vòng 5 km</option>
                        <option value="10">Trong vòng 10 km</option>
                        <option value="20">Trong vòng 20 km</option>
                        <option value="50">Trong vòng 50 km</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-900 mb-3 block">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Ca làm việc
                      </label>
                      <select
                        value={filters.shiftTime}
                        onChange={(e) => setFilters({ ...filters, shiftTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer"
                      >
                        <option value="all">Tất cả ca</option>
                        <option value="morning">Ca sáng (6h - 12h)</option>
                        <option value="noon">Ca trưa (12h - 18h)</option>
                        <option value="evening">Ca tối (đêm) (18h - 24h)</option>
                        <option value="night">Ca đêm (0h - 6h)</option>
                        <option value="full">Toàn thời gian (8h)</option>
                        <option value="flexible">Linh hoạt</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-900 mb-3 block">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Mức lương theo giờ
                      </label>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Min (VND)"
                          value={filters.minWage}
                          onChange={(e) => setFilters({ ...filters, minWage: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Max (VND)"
                          value={filters.maxWage}
                          onChange={(e) => setFilters({ ...filters, maxWage: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setIsRefreshing(true);
                        setTimeout(() => setIsRefreshing(false), 500);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      Áp dụng bộ lọc
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Job Listings */}
          <div className={`flex-1 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
            <div className="mb-4 text-gray-600">
              Showing {jobs.length} jobs
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onViewJobDetail(job.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Company Logo */}
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src={getCompanyLogo(job.company)} alt={job.company} className="w-full h-full object-contain p-2" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {job.badge && (
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                  {job.badge}
                                </Badge>
                              )}
                              <h3 className="text-gray-900 hover:text-green-600 transition-colors">
                                {job.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-600">{job.company}</p>
                              {job.companyTier === 'pro' && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded font-medium cursor-pointer">
                                        Pro
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Nhà tuyển dụng là Pro Company</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{job.duration}</span>
                          </div>
                          {job.instantPay && (
                            <div className="flex items-center gap-2 text-green-600">
                              <Zap className="w-4 h-4" />
                              <span>Thanh toán nhanh</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-gray-500">{job.postedTime}</p>
                          <Button
                            className="bg-green-600 hover:bg-green-700 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewJobDetail(job.id);
                            }}
                          >
                            Nộp đơn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" className="cursor-pointer">Trước</Button>
              <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">1</Button>
              <Button variant="outline" className="cursor-pointer">2</Button>
              <Button variant="outline" className="cursor-pointer">3</Button>
              <Button variant="outline" className="cursor-pointer">Sau</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
