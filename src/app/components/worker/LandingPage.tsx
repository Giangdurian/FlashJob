import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Package,
  ShoppingBag,
  PartyPopper,
  Truck,
  CheckCircle2,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Building2,
  Briefcase,
  DollarSign,
  Filter,
  Users,
  ChevronDown,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { UtilitiesGuide } from './UtilitiesGuide';
import jobsData from '../../../data/jobs.json';

interface LandingPageProps {
  onViewJobs: (searchQuery?: string) => void;
  onNavigate?: (screen: any) => void;
  onLogout?: () => void;
  onViewJobDetail?: (jobId: number) => void;
  onNavigateToLogin?: (role: 'worker' | 'employer') => void;
}

export function LandingPage({ onViewJobs, onNavigate, onLogout, onViewJobDetail, onNavigateToLogin }: LandingPageProps) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [showUtilities, setShowUtilities] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced filters
  const [salary, setSalary] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [skills, setSkills] = useState('');

  const locations = [
    'Hà Nội',
    'Hải Phòng',
    'Hải Dương',
    'Bắc Ninh',
    'Hưng Yên',
    'Thái Nguyên',
    'Vĩnh Phúc',
    'Phú Thọ',
    'Quảng Ninh',
    'Bắc Giang'
  ];

  const industries = [
    'Kho vận - Logistics',
    'Bán hàng - Siêu thị',
    'Phục vụ nhà hàng',
    'Giao hàng - Shipper',
    'Tổ chức sự kiện',
    'Bảo vệ - An ninh',
    'Vệ sinh - Dọn dẹp',
    'Đóng gói hàng hóa',
    'Phụ bếp',
    'Nhân viên spa',
    'Lễ tân - Tiếp thị',
    'Phát tờ rơi'
  ];

  const salaryRanges = [
    'Tất cả mức lương',
    '15,000 - 20,000 VNĐ/giờ',
    '20,000 - 25,000 VNĐ/giờ',
    '25,000 - 30,000 VNĐ/giờ',
    '30,000 - 40,000 VNĐ/giờ',
    'Trên 40,000 VNĐ/giờ',
  ];

  const workTimes = [
    'Ca sáng (6h - 12h)',
    'Ca trưa (12h - 18h)',
    'Ca tối (đêm) (18h - 24h)',
    'Ca đêm (0h - 6h)',
    'Toàn thời gian (8h)',
    'Linh hoạt'
  ];

  const skillOptions = [
    'Không yêu cầu',
    'Giao tiếp tốt',
    'Sức khỏe thể chất tốt',
    'Biết lái xe',
    'Sử dụng máy tính cơ bản',
    'Chăm chỉ, cẩn thận',
    'Nhanh nhẹn, linh hoạt'
  ];

  const categories = [
    { icon: Package, label: 'Kho vận', color: 'bg-blue-100 text-blue-600' },
    { icon: ShoppingBag, label: 'Bán hàng', color: 'bg-purple-100 text-purple-600' },
    { icon: PartyPopper, label: 'Sự kiện', color: 'bg-pink-100 text-pink-600' },
    { icon: Truck, label: 'Giao hàng', color: 'bg-orange-100 text-orange-600' },
  ];

  const trustSignals = [
    { icon: Shield, label: 'Công việc xác thực', description: 'Tất cả nhà tuyển dụng đã được xác minh' },
    { icon: Zap, label: 'Thanh toán nhanh', description: 'Nhận lương ngay sau ca làm' },
    { icon: CheckCircle2, label: 'Nền tảng an toàn', description: 'Thông tin của bạn được bảo mật' },
  ];

  const stats = [
    { value: '15,000+', label: 'Công việc đang tuyển' },
    { value: '8,500+', label: 'Người lao động' },
    { value: '1,200+', label: 'Doanh nghiệp đã xác thực' },
  ];

  // Helper functions for icons and colors
  function getJobIcon(id: number) {
    const icons = [Package, ShoppingBag, PartyPopper, Truck, Package, ShoppingBag, PartyPopper, Truck, Package, ShoppingBag, Truck, Package];
    return icons[id - 1] || Package;
  }

  function getJobColor(id: number) {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-orange-100 text-orange-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600',
      'bg-indigo-100 text-indigo-600',
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
      'bg-blue-100 text-blue-600'
    ];
    return colors[id - 1] || 'bg-blue-100 text-blue-600';
  }

  function getCompanyLogo(company: string) {
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
  }

  // Get first 12 jobs from JSON and map to featured format
  const featuredJobs = jobsData.jobs.slice(0, 12).map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    duration: job.duration,
    icon: getJobIcon(job.id),
    color: getJobColor(job.id),
    urgent: job.urgent,
    logo: getCompanyLogo(job.company)
  }));

  const handleSearch = () => {
    onViewJobs(keyword);
  };

  if (showUtilities) {
    return <UtilitiesGuide onBack={() => setShowUtilities(false)} onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate?.('landing')} className="flex items-center gap-2 text-green-600 hover:opacity-80 cursor-pointer">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                <h1>FlashJob</h1>
              </button>
              <nav className="hidden md:flex items-center gap-6">
                <button className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                  Việc làm
                </button>
                <button
                  onClick={() => setShowUtilities(true)}
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
                  <DropdownMenuItem onClick={() => onNavigate?.('dashboard')} className="cursor-pointer">
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        {/* 3D Isometric Graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-white/30 text-9xl">🏢</div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            {/* Stats Display */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-white/80">CÓ</span>
              <span className="text-green-400">+15,000</span>
              <span className="text-white">CÔNG VIỆC ĐANG TUYỂN</span>
            </div>

            <h2 className="text-white text-5xl lg:text-6xl mb-4">
              Tìm việc linh hoạt,
              <br />
              Nhận lương hàng ngày
            </h2>

            <p className="text-white/90 text-lg mb-8">
              Job Search Engine Hàu Tiên Do Người Việt Phát Triển
            </p>

            {/* Search Bar */}
            <div className="space-y-3">
              <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Input
                    placeholder="Từ khóa, chức danh hoặc công ty"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="pl-10 border-0 focus-visible:ring-0 h-12"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  className="bg-green-600 hover:bg-green-700 cursor-pointer px-8 h-12"
                >
                  TÌM VIỆC
                </Button>
              </div>

              {/* Filter Row */}
              <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="pl-9 h-10 text-sm">
                        <SelectValue placeholder="Địa điểm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả địa điểm</SelectItem>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="pl-9 h-10 text-sm">
                        <SelectValue placeholder="Ngành nghề" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                    <Select value={salary} onValueChange={setSalary}>
                      <SelectTrigger className="pl-9 h-10 text-sm">
                        <SelectValue placeholder="Mức lương" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả mức lương</SelectItem>
                        {salaryRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="h-10 text-sm bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Filter className="w-4 h-4 mr-2 " />
                    Lọc nâng cao
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                      <Select value={workTime} onValueChange={setWorkTime}>
                        <SelectTrigger className="pl-9 h-10 text-sm">
                          <SelectValue placeholder="Thời gian làm việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả thời gian</SelectItem>
                          {workTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                      <Select value={skills} onValueChange={setSkills}>
                        <SelectTrigger className="pl-9 h-10 text-sm">
                          <SelectValue placeholder="Kỹ năng cần có" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả kỹ năng</SelectItem>
                          {skillOptions.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Search Link */}
            <div className="mt-4 flex items-center gap-2">
              <button className="text-white/90 hover:text-white flex items-center gap-2 transition-colors text-sm cursor-pointer">
                💡 Gợi ý: Thử tìm "nhân viên kho" hoặc "shipper"
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-xl p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-white">Tải App để chấm công & rút lương</h3>
                <p className="text-white/90">Nhận tiền ngay sau khi hoàn thành công việc</p>
              </div>
            </div>
            <Button className="bg-white text-green-600 hover:bg-gray-100 cursor-pointer">
              Tải ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Employer Recruitment Banner */}
      <section className="py-6 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold">Bạn là nhà tuyển dụng?</h3>
                <p className="text-gray-600 text-sm">Tìm người lao động nhanh chóng và dễ dàng</p>
              </div>
            </div>
            <Button
              onClick={() => onNavigateToLogin?.('employer')}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              Đăng tuyển ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-green-600" />
              <h3 className="text-gray-900 text-2xl">Việc làm nổi bật</h3>
            </div>
            <Button
              variant="outline"
              onClick={() => onViewJobs()}
              className="flex items-center gap-2 cursor-pointer"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => {
              const Icon = job.icon;
              return (
                <div
                  key={job.id}
                  onClick={() => onViewJobDetail?.(job.id)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="h-6 mb-3 flex items-center">
                    {job.urgent && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">Cần gấp</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-2">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Building2 className="w-4 h-4" />
                        <span className="truncate">{job.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {job.duration}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 cursor-pointer"
                    >
                      Ứng tuyển
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => onViewJobs()}
              className="bg-green-600 hover:bg-green-700 cursor-pointer px-8"
            >
              Xem thêm 15,000 việc làm
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Industries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-green-600 text-2xl mb-8">Top ngành nghề nổi bật</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Kho vận - Logistics', jobs: '12,450', icon: '📦', color: 'bg-blue-50' },
              { name: 'Bán hàng - Siêu thị', jobs: '8,320', icon: '🛒', color: 'bg-green-50' },
              { name: 'Giao hàng - Shipper', jobs: '6,780', icon: '🚚', color: 'bg-orange-50' },
              { name: 'Phục vụ nhà hàng', jobs: '5,940', icon: '🍽️', color: 'bg-yellow-50' },
              { name: 'Bảo vệ - An ninh', jobs: '3,560', icon: '🛡️', color: 'bg-red-50' },
              { name: 'Tổ chức sự kiện', jobs: '2,890', icon: '🎉', color: 'bg-pink-50' },
              { name: 'Vệ sinh - Dọn dẹp', jobs: '4,120', icon: '🧹', color: 'bg-teal-50' },
              { name: 'Đóng gói hàng hóa', jobs: '7,650', icon: '📋', color: 'bg-purple-50' }
            ].map((industry, idx) => (
              <div
                key={idx}
                onClick={() => onViewJobs(industry.name)}
                className={`${industry.color} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
              >
                <div className="text-5xl mb-4 text-center">{industry.icon}</div>
                <h4 className="text-gray-900 text-center mb-2 group-hover:text-green-600 transition-colors">
                  {industry.name}
                </h4>
                <p className="text-green-600 text-center text-sm font-medium">
                  {industry.jobs} việc làm
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Employers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-green-600 text-2xl mb-8">Nhà tuyển dụng nổi bật</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'VinMart', image: '/src/assets/images/topEmployer/winmart.jpg', badge: true },
              { name: 'SPX Express', image: '/src/assets/images/topEmployer/spx.jpg', badge: true },
              { name: 'Grab', image: '/src/assets/images/topEmployer/grab.jpg', badge: true },
              { name: 'Shopee', image: '/src/assets/images/topEmployer/shopee.jpg', badge: true },
              { name: 'Lazada', image: '/src/assets/images/topEmployer/lazada.jpg', badge: true },
              { name: 'Lotte Mart', image: '/src/assets/images/topEmployer/lotte.jpg', badge: false },
              { name: 'The Coffee House', image: '/src/assets/images/topEmployer/coffee_house.jpg', badge: false },
              { name: 'Circle K', image: '/src/assets/images/topEmployer/circleK.jpg', badge: false },
              { name: 'Highlands Coffee', image: '/src/assets/images/topEmployer/highlands.jpg', badge: false },
              { name: 'GHN Express', image: '/src/assets/images/topEmployer/ghn.jpg', badge: false }
            ].map((employer, idx) => (
              <div
                key={idx}
                className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 hover:shadow-lg transition-all cursor-pointer group"
              >
                {employer.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      ✓ TOP
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={employer.image} alt={employer.name} className="w-20 h-20 object-contain mb-3" />
                  <h4 className="text-gray-900 text-center text-sm group-hover:text-green-600 transition-colors">
                    {employer.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-blue-600" />
            <h3 className="text-gray-900">Doanh nghiệp TOP đầu</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => onViewJobs(category.label)}
                  className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-green-600 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-gray-900 group-hover:text-green-600 transition-colors">
                    {category.label}
                  </p>
                  <p className="text-gray-500 mt-1">500+ việc làm</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-gray-900 mb-2">Tại sao chọn FlashJob?</h3>
            <p className="text-gray-600">Đối tác tin cậy cho công việc linh hoạt của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustSignals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h4 className="text-gray-900 mb-2">{signal.label}</h4>
                  <p className="text-gray-600">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-green-400 mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-green-400 mb-4">FlashJob</h4>
              <p className="text-gray-400">
                Tìm việc linh hoạt và nhận lương hàng ngày. Sự nghiệp của bạn bắt đầu từ đây.
              </p>
            </div>
            <div>
              <h5 className="mb-4">Dành cho người lao động</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tìm việc làm</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Bảng điều khiển</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tải ứng dụng</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Dành cho nhà tuyển dụng</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Đăng tin tuyển dụng</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tìm người lao động</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Bảng giá</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Hỗ trợ</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Trung tâm hỗ trợ</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Liên hệ</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 FlashJob. Bản quyền thuộc về FlashJob.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
