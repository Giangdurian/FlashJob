import React, { useState, useEffect } from 'react';
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Users,
  Star,
  Shield,
  Zap,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  AlertCircle,
  Calendar,
  TrendingUp,
  ChevronDown,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import jobsData from '../../../data/jobs.json';

interface JobDetailProps {
  jobId: number | null;
  onBack: () => void;
  onNavigate?: (screen: any) => void;
  onLogout?: () => void;
  onSetWorkerView?: (view: 'dashboard' | 'training' | 'withdraw' | 'protection' | 'community') => void;
  isAuthenticated?: boolean;
  onNavigateToLogin?: (role: 'worker' | 'employer') => void;
  onViewCompany?: (companyName: string) => void;
}

export function JobDetail({ jobId, onBack, onNavigate, onLogout, onSetWorkerView, isAuthenticated = false, onNavigateToLogin, onViewCompany }: JobDetailProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

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

  // Get job data from JSON
  const job = jobsData.jobs.find(j => j.id === jobId) || jobsData.jobs[0];

  const workerReviews = [
    {
      id: 1,
      workerName: 'Trần Minh H.',
      rating: 5,
      date: '10/12/2025',
      comment: 'Môi trường làm việc tốt. Quản lý hỗ trợ nhiệt tình và lương trả đúng hạn. Rất đáng làm!',
      verified: true,
    },
    {
      id: 2,
      workerName: 'Nguyễn Thu T.',
      rating: 4,
      date: '05/12/2025',
      comment: 'Lương cao và giờ giấc linh hoạt. Công việc hơi nặng vào mùa cao điểm nhưng nhìn chung tốt.',
      verified: true,
    },
    {
      id: 3,
      workerName: 'Lê Văn K.',
      rating: 5,
      date: '28/11/2025',
      comment: 'Đội ngũ chuyên nghiệp, hướng dẫn rõ ràng và lương công bằng. Sẽ làm lại!',
      verified: true,
    },
  ];

  const handleApply = () => {
    if (!applicationData.name || !applicationData.email || !applicationData.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    toast.success('Nộp đơn thành công!');
    setShowApplyModal(false);
    setApplicationData({ name: '', email: '', phone: '', coverLetter: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                  Việc làm
                </a>
                <button
                  onClick={() => onNavigate?.('utilities')}
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
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách việc làm
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={getCompanyLogo(job.company)} alt={job.company} className="w-full h-full object-contain p-2" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {job.urgent && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              CẦN GẤP
                            </Badge>
                          )}
                          {job.instantPay && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Thanh toán ngay
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-gray-900 mb-2">{job.title}</h2>
                        <button
                          onClick={() => onViewCompany?.(job.company)}
                          className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer font-medium text-left"
                        >
                          {job.company}
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-xs">Lương</div>
                          <div className="text-gray-900">{job.salary}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <div>
                          <div className="text-xs">Địa điểm</div>
                          <div className="text-gray-900">Hà Nội</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-5 h-5" />
                        <div>
                          <div className="text-xs">Thời gian làm việc</div>
                          <div className="text-gray-900">{job.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5" />
                        <div>
                          <div className="text-xs">Số lượng</div>
                          <div className="text-gray-900">{job.openings} vị trí</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả công việc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-gray-900 mb-3">Nhiệm vụ chính</h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-3">Yêu cầu</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-3">Quyền lợi</h4>
                  <ul className="space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Available Shifts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Ca làm việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {job.shifts.map((shift, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-gray-900">{shift.time}</div>
                        <div className="text-gray-600">{shift.hours}</div>
                      </div>
                      <div className="text-green-600">{shift.rate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Địa điểm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-900">{job.location}</p>
                <p className="text-gray-600 mt-1">Cách bạn 5.2 km</p>
              </CardContent>
            </Card>

            {/* Company Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Đánh giá từ người lao động
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(job.companyRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-900">{job.companyRating}</span>
                    <span className="text-gray-600">({job.companyReviews} đánh giá)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workerReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            {review.workerName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-900">{review.workerName}</span>
                              {review.verified && (
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className="text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Apply Section */}
          <div className="space-y-6">
            {/* Sticky Apply Card */}
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2 text-blue-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Ứng tuyển nhanh</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Đăng nhập hoặc đăng ký để ứng tuyển ngay
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (isAuthenticated) {
                        setShowApplyModal(true);
                      } else {
                        onNavigateToLogin?.('worker');
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                    size="lg"
                  >
                    Ứng tuyển ngay
                  </Button>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Đăng ngày:</span>
                      <span className="text-gray-900">{job.postedDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Hết hạn:</span>
                      <span className="text-gray-900">{job.expiryDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Đã ứng tuyển:</span>
                      <span className="text-gray-900">{job.applied} người</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <Shield className="w-5 h-5" />
                      <span>Nhà tuyển dụng đã xác thực</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <Zap className="w-5 h-5" />
                      <span>Thanh toán ngay lập tức</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>Về công ty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.companyDescription}</p>
                <Button variant="outline" className="w-full cursor-pointer">
                  Xem trang công ty
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ứng tuyển: {job.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-gray-900 mb-2 block">Họ và tên *</label>
              <Input
                placeholder="Nhập họ tên của bạn"
                value={applicationData.name}
                onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-900 mb-2 block">Email *</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={applicationData.email}
                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-900 mb-2 block">Số điện thoại *</label>
              <Input
                type="tel"
                placeholder="0123 456 789"
                value={applicationData.phone}
                onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleApply} className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer">
                Gửi đơn ứng tuyển
              </Button>
              <Button variant="outline" onClick={() => setShowApplyModal(false)} className="cursor-pointer">
                Hủy
              </Button>
            </div>
            <p className="text-gray-500 text-center">
              Chưa có tài khoản? <a href="#" className="text-green-600 hover:underline cursor-pointer">Đăng ký</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Sticky Apply Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <Button
          onClick={() => setShowApplyModal(true)}
          className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
          size="lg"
        >
          Ứng tuyển ngay
        </Button>
      </div>
    </div>
  );
}
