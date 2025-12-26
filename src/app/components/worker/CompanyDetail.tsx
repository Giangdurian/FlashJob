import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Building2,
  Calendar,
  Globe,
  Mail,
  Phone,
  Shield,
  Award,
  TrendingUp,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Briefcase,
  Clock,
  DollarSign,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
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

interface CompanyDetailProps {
  companyName: string;
  onBack: () => void;
  onViewJobDetail: (jobId: number) => void;
  onNavigate?: (screen: any) => void;
  onLogout?: () => void;
  onSetWorkerView?: (view: 'dashboard' | 'training' | 'withdraw' | 'protection' | 'community') => void;
  isAuthenticated?: boolean;
  onNavigateToLogin?: (role: 'worker' | 'employer') => void;
}

export function CompanyDetail({
  companyName,
  onBack,
  onViewJobDetail,
  onNavigate,
  onLogout,
  onSetWorkerView,
  isAuthenticated = false,
  onNavigateToLogin
}: CompanyDetailProps) {
  // Filter jobs by company
  const companyJobs = jobsData.jobs.filter(job => job.company === companyName);

  // Get company info from first job (assuming all jobs have same company info)
  const companyInfo = companyJobs[0];

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
      'VIETTEL POST': '/src/assets/images/topEmployer/viettelpost.jpg',
      'SHOPEE EXPRESS': '/src/assets/images/topEmployer/shopee.jpg'
    };
    return logoMap[company] || '/src/assets/images/topEmployer/winmart.jpg';
  };

  const getCompanyDescription = (company: string) => {
    const descriptions: { [key: string]: string } = {
      'VINMART': 'VinMart là hệ thống siêu thị hàng đầu Việt Nam, cung cấp đa dạng sản phẩm chất lượng cao với giá cả hợp lý. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.',
      'GRAB VIỆT NAM': 'Grab là nền tảng công nghệ hàng đầu Đông Nam Á, cung cấp dịch vụ giao thông, giao hàng và thanh toán kỹ thuật số. Chúng tôi tạo cơ hội việc làm linh hoạt cho hàng triệu người.',
      'LOTTE MART': 'Lotte Mart là chuỗi siêu thị lớn thuộc Tập đoàn Lotte, cam kết cung cấp sản phẩm chất lượng và dịch vụ tốt nhất cho khách hàng Việt Nam.',
      'SHOPEE EXPRESS': 'Shopee Express là đơn vị giao vận hàng đầu, đảm bảo giao hàng nhanh chóng và an toàn cho khách hàng trên toàn quốc.',
      'LOTTERIA VIỆT NAM': 'Lotteria là chuỗi nhà hàng thức ăn nhanh nổi tiếng, phục vụ món ăn ngon và dịch vụ chuyên nghiệp.'
    };
    return descriptions[company] || 'Công ty uy tín với nhiều năm kinh nghiệm trong ngành.';
  };

  if (!companyInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy công ty</h2>
          <Button onClick={onBack}>Quay lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Quay lại</span>
            </button>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
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
                        onNavigate?.('dashboard');
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
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigateToLogin?.('worker')}
                    className="text-gray-700 hover:text-green-600 cursor-pointer"
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    onClick={() => onNavigateToLogin?.('worker')}
                    className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  >
                    Đăng ký
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Company Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xl">
              <img
                src={getCompanyLogo(companyName)}
                alt={companyName}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-white">{companyName}</h1>
                {companyInfo.companyTier === 'pro' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 cursor-pointer">
                          <Award className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nhà tuyển dụng là Pro Company</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <p className="text-white/90 text-lg mb-6 max-w-3xl">
                {companyInfo.companyDescription || getCompanyDescription(companyName)}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold">{companyInfo.companyRating}</span>
                  <span className="text-white/80">({companyInfo.companyReviews} đánh giá)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-white/80" />
                  <span className="text-white/90">{companyJobs.length} việc làm đang tuyển</span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white/90">Đã xác thực</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Việc làm đang tuyển ({companyJobs.length})
          </h2>
          <p className="text-gray-600">
            Tất cả các vị trí đang tuyển dụng tại {companyName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => onViewJobDetail(job.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {job.urgent && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 mb-2">
                        CẦN GẤP
                      </Badge>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.duration}</span>
                  </div>

                  {job.instantPay && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Thanh toán ngay</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {job.applied} người đã ứng tuyển
                    </span>
                    <span className="text-green-600 font-medium">
                      {job.openings} vị trí
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {companyJobs.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có việc làm nào
            </h3>
            <p className="text-gray-600">
              Công ty này hiện chưa đăng tuyển vị trí nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
