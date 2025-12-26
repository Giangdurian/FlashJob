import React, { useState } from 'react';
import {
  Crown,
  Check,
  X,
  Zap,
  ArrowLeft,
  ChevronDown,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Briefcase,
  Star,
  BarChart3,
  Headphones,
  Sparkles,
  LogOut,
  User,
  Settings,
  Building2
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface PricingPageProps {
  onNavigate?: (screen: any) => void;
  onLogout?: () => void;
  currentPlan?: 'free' | 'basic' | 'pro';
  userRole?: 'worker' | 'employer';
}

export function PricingPage({ onNavigate, onLogout, currentPlan = 'free', userRole = 'employer' }: PricingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleUpgrade = (plan: 'free' | 'basic' | 'pro') => {
    setSelectedPlan(plan);
    // TODO: Implement payment logic here
    alert(`Đã chọn gói ${plan === 'free' ? 'Miễn phí' : plan === 'basic' ? 'Basic' : 'Pro'}. Chức năng thanh toán sẽ được tích hợp sau.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate?.('employer')}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Quay lại Dashboard</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                <h1 className="text-blue-600 text-xl font-semibold">FlashJob Business</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                      {userRole === 'employer' ? 'CT' : 'NV'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {userRole === 'employer' ? 'Công ty TNHH Tech' : 'Nguyễn Văn A'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal">
                        {userRole === 'employer' ? 'employer@example.com' : 'worker@example.com'}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Thông tin tài khoản
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="text-red-600 cursor-pointer"
                  >
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6">
            <Crown className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-semibold">Nâng cấp tài khoản FlashJob Business</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chọn gói phù hợp để tối ưu<br />hiệu quả tuyển dụng
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tiết kiệm thời gian, tăng hiệu suất tuyển dụng và quản lý nhân sự linh hoạt với các gói nâng cấp của FlashJob
          </p>
          {currentPlan !== 'free' && (
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <Check className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                Gói hiện tại: <strong>{currentPlan === 'basic' ? 'Basic' : 'Pro'}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className={`border-2 rounded-2xl p-8 bg-white shadow-sm hover:shadow-lg transition-all relative flex flex-col ${currentPlan === 'free' ? 'border-gray-400 ring-2 ring-gray-300' : 'border-gray-200'
              }`}>
              {currentPlan === 'free' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Gói hiện tại
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Miễn phí</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gray-900">0đ</span>
                </div>
                <p className="text-gray-600">Dùng thử cơ bản</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Không ưu tiên hiển thị</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Giới hạn <strong>5 tin</strong> tuyển dụng/tháng</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý ứng viên cơ bản</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ điểm danh và chấm công trên app</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo thống kê đơn giản</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Không hỗ trợ khẩn cấp</span>
                </div>
              </div>

              <Button
                disabled={currentPlan === 'free'}
                onClick={() => handleUpgrade('free')}
                variant="outline"
                className="w-full h-12 text-base cursor-pointer"
              >
                {currentPlan === 'free' ? 'Đang sử dụng' : 'Chọn gói miễn phí'}
              </Button>
            </div>

            {/* Basic Plan */}
            <div className={`border-2 rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all relative flex flex-col ${currentPlan === 'basic' ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-200'
              }`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                {currentPlan === 'basic' ? 'Gói hiện tại' : 'Phổ biến nhất'}
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-blue-600">300K</span>
                  <span className="text-gray-600">/tháng</span>
                </div>
                <p className="text-gray-600">Cho doanh nghiệp vừa</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Ưu tiên hiển thị</strong> tin tuyển dụng</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Đăng <strong>20 tin</strong> tuyển dụng/tháng</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý ứng viên nâng cao</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ điểm danh và chấm công trên app</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo phân tích chi tiết</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ qua email</span>
                </div>
              </div>

              <Button
                disabled={currentPlan === 'basic'}
                onClick={() => handleUpgrade('basic')}
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                {currentPlan === 'basic' ? 'Đang sử dụng' : 'Nâng cấp ngay'}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className={`border-2 rounded-2xl p-8 bg-gradient-to-br from-white to-yellow-50 shadow-lg hover:shadow-2xl transition-all relative flex flex-col ${currentPlan === 'pro' ? 'border-yellow-500 ring-4 ring-yellow-100' : 'border-yellow-200'
              }`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4" />
                {currentPlan === 'pro' ? 'Gói hiện tại' : 'Premium'}
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">800K</span>
                  <span className="text-gray-600">/tháng</span>
                </div>
                <p className="text-gray-600">Cho doanh nghiệp lớn</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Ưu tiên tiếp cận</strong> người lao động phù hợp</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Đăng bài không giới hạn</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý ứng viên nâng cao</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"> Hỗ trợ điểm danh và chấm công trên app</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Badge "Pro Comany"</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo chuyên sâu & dự báo</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ ưu tiên 24/7 qua Account Manager hoặc hotline</span>
                </div>
              </div>

              <Button
                disabled={currentPlan === 'pro'}
                onClick={() => handleUpgrade('pro')}
                className="w-full h-12 text-base bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white cursor-pointer"
              >
                {currentPlan === 'pro' ? 'Đang sử dụng' : 'Nâng cấp ngay'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tại sao nên nâng cấp?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tăng tỷ lệ tuyển dụng</h3>
              <p className="text-gray-600">Tin tuyển dụng hiển thị ưu tiên, tiếp cận ứng viên nhanh hơn 3x</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiết kiệm thời gian</h3>
              <p className="text-gray-600">Tự động hóa quy trình chấm công và thanh toán</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Báo cáo chuyên sâu</h3>
              <p className="text-gray-600">Dữ liệu phân tích giúp tối ưu chi phí tuyển dụng</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hỗ trợ tận tâm</h3>
              <p className="text-gray-600">Đội ngũ hỗ trợ 24/7 sẵn sàng giải đáp mọi thắc mắc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Khách hàng nói gì về chúng tôi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "FlashJob giúp công ty tôi tiết kiệm 40% thời gian tuyển dụng. Giao diện đơn giản, ứng viên chất lượng cao."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-1">
                  <img src="/src/assets/images/topEmployer/winmart.jpg" alt="VinMart" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">VinMart</div>
                  <div className="text-sm text-gray-600">Retail</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Tính năng chấm công tự động của gói Pro rất tiện lợi. Thanh toán chính xác, công nhân hài lòng."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-1">
                  <img src="/src/assets/images/topEmployer/grab.jpg" alt="Grab" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Grab Vietnam</div>
                  <div className="text-sm text-gray-600">Logistics</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "AI gợi ý ứng viên rất chính xác. Tôi tìm được đúng người trong vòng 24h. Đáng giá từng đồng!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-1">
                  <img src="/src/assets/images/topEmployer/shopee.jpg" alt="Shopee" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Shopee</div>
                  <div className="text-sm text-gray-600">E-commerce</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Sẵn sàng nâng cấp trải nghiệm tuyển dụng?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Hơn 500+ doanh nghiệp đã tin tưởng và sử dụng FlashJob
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleUpgrade('basic')}
                className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 text-base cursor-pointer"
              >
                Bắt đầu với Basic
              </Button>
              <Button
                onClick={() => handleUpgrade('pro')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 h-12 px-8 text-base cursor-pointer"
              >
                <Crown className="w-5 h-5 mr-2" />
                Dùng thử Pro 7 ngày
              </Button>
            </div>
            <p className="mt-6 text-white/80 text-sm">
              Cần tư vấn? Liên hệ: <strong>1900-xxxx</strong> hoặc <strong>support@flashjob.vn</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                <span className="text-xl font-semibold">FlashJob</span>
              </div>
              <p className="text-gray-400">
                Nền tảng tuyển dụng linh hoạt hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Dành cho nhà tuyển dụng</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Đăng tin tuyển dụng</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Bảng giá</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Hướng dẫn sử dụng</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Dành cho người lao động</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Tìm việc làm</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Tải ứng dụng</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Câu hỏi thường gặp</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Hỗ trợ</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Điều khoản</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 FlashJob. Bản quyền thuộc về FlashJob.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
