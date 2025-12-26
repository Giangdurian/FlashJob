import React, { useState } from 'react';
import {
  User,
  Briefcase,
  DollarSign,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  TrendingUp,
  Download,
  AlertCircle,
  MapPin,
  Calendar,
  Star,
  Award,
  Edit,
  ChevronDown,
  LogOut,
  Settings,
  GraduationCap,
  Zap,
  MessageSquare
} from 'lucide-react';
import { TrainingProgram } from './TrainingProgram';
import { EarlyWithdraw } from './EarlyWithdraw';
import { WorkerProtection } from './WorkerProtection';
import { CommunityForum } from './CommunityForum';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface WorkerDashboardProps {
  onNavigate: (screen: any) => void;
  onLogout?: () => void;
  initialView?: 'dashboard' | 'training' | 'withdraw' | 'protection' | 'community';
  returnScreen?: 'landing' | 'dashboard';
}

export function WorkerDashboard({ onNavigate, onLogout, initialView = 'dashboard', returnScreen = 'dashboard' }: WorkerDashboardProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'training' | 'withdraw' | 'protection' | 'community'>(initialView);

  const handleBack = () => {
    if (returnScreen === 'landing') {
      onNavigate('landing');
    } else {
      setCurrentView('dashboard');
    }
  };

  // Show Training Program
  if (currentView === 'training') {
    return <TrainingProgram onBack={handleBack} />;
  }

  // Show Early Withdraw
  if (currentView === 'withdraw') {
    return <EarlyWithdraw onBack={handleBack} />;
  }

  // Show Worker Protection
  if (currentView === 'protection') {
    return <WorkerProtection onBack={handleBack} />;
  }

  // Show Community Forum
  if (currentView === 'community') {
    return <CommunityForum onBack={handleBack} />;
  }

  const handleRateJob = (job: any) => {
    setSelectedJob(job);
    setRatingValue(0);
    setFeedback('');
    setShowRatingDialog(true);
  };

  const handleSubmitRating = () => {
    setShowRatingDialog(false);
    setSelectedJob(null);
    setRatingValue(0);
    setFeedback('');
  };

  const handleCancelRating = () => {
    setShowRatingDialog(false);
    setSelectedJob(null);
    setRatingValue(0);
    setFeedback('');
  };

  const profile = {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0123 456 789',
    location: 'Hà Nội, Việt Nam',
    avatar: 'NVA',
    verified: true,
    rating: 4.8,
    completedJobs: 47,
    skills: ['Giao tiếp tốt', 'Nhanh nhẹn', 'Trung thực', 'Chịu khó'],
    experience: '3 years in logistics and warehouse operations',
  };

  const appliedJobs = [
    {
      id: 1,
      title: 'Warehouse Associate',
      company: 'ABC Logistics',
      location: 'Hà Nội',
      salary: '15-18 triệu VND',
      appliedDate: '2025-12-18',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Forklift Operator',
      company: 'XYZ Distribution',
      location: 'Hà Nội',
      salary: '20-25 triệu VND',
      appliedDate: '2025-12-17',
      status: 'reviewing',
    },
  ];

  const upcomingJobs = [
    {
      id: 1,
      title: 'Nhân viên đóng gói - Mùa lễ',
      company: 'FastShip Co.',
      location: 'Trung tâm phân phối A',
      date: '2025-12-22',
      time: '8:00 AM - 4:00 PM',
      wage: '50,000 VND/hour',
    },
    {
      id: 2,
      title: 'Nhân viên bốc xếp',
      company: 'QuickMove Logistics',
      location: 'Kho phía Bắc',
      date: '2025-12-24',
      time: '6:00 AM - 2:00 PM',
      wage: '55,000 VND/hour',
    },
  ];

  const completedJobs = [
    {
      id: 1,
      title: 'Nhân viên kho',
      company: 'Kho MegaStore',
      completedDate: '2025-12-15',
      hours: 8,
      earned: 400000,
      rating: 5,
    },
    {
      id: 2,
      title: 'Nhân viên kiểm tra chất lượng',
      company: 'Premium Products',
      completedDate: '2025-12-10',
      hours: 8,
      earned: 480000,
      rating: 5,
    },
    {
      id: 3,
      title: 'Nhân viên đóng gói',
      company: 'Trung tâm thương mại điện tử',
      completedDate: '2025-12-05',
      hours: 6,
      earned: 300000,
      rating: null,
    },
  ];

  const earningsData = [
    { month: 'Jul', amount: 6000000 },
    { month: 'Aug', amount: 6500000 },
    { month: 'Sep', amount: 6200000 },
    { month: 'Oct', amount: 7400000 },
    { month: 'Nov', amount: 7900000 },
    { month: 'Dec', amount: 9000000 },
  ];

  const totalEarnings = earningsData.reduce((sum, item) => sum + item.amount, 0);
  const maxEarning = Math.max(...earningsData.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-green-600 hover:opacity-80 cursor-pointer">
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
                  onClick={() => setCurrentView('training')}
                  className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <GraduationCap className="w-4 h-4" />
                  Đào tạo nghề
                </button>
                <button
                  onClick={() => setCurrentView('withdraw')}
                  className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <Zap className="w-4 h-4" />
                  Rút lương sớm
                </button>
                <button
                  onClick={() => setCurrentView('protection')}
                  className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Bảo vệ & Hỗ trợ
                </button>
                <button
                  onClick={() => setCurrentView('community')}
                  className="text-gray-700 hover:text-purple-600 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  Cộng đồng
                </button>
                <button
                  onClick={() => onNavigate('utilities')}
                  className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors"
                >
                  Tiện ích/Cẩm nang
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors">
                Thông báo
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                      {profile.avatar}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{profile.name}</span>
                      <span className="text-xs text-gray-500 font-normal">{profile.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentView('dashboard')} className="cursor-pointer">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {profile.avatar}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-gray-900">{profile.name}</h3>
                    {profile.verified && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{profile.rating}</span>
                    <span className="text-gray-400">({profile.completedJobs} jobs)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">eKYC Verified</span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  variant="outline"
                  className="w-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa hồ sơ
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Kỹ năng & Tính cách
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Thêm kỹ năng
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Tổng thu nhập</p>
                      <p className="text-gray-900 mt-1">{(totalEarnings / 1000000).toFixed(1)}M VND</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Công việc hoàn thành</p>
                      <p className="text-gray-900 mt-1">{profile.completedJobs}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Đánh giá</p>
                      <p className="text-gray-900 mt-1">{profile.rating} / 5.0</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all cursor-pointer" onClick={() => setCurrentView('training')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-blue-900 font-semibold mb-1">Đào tạo nghề</h3>
                      <p className="text-sm text-blue-700">Nâng cao kỹ năng với các khóa học chất lượng</p>
                      <Badge className="mt-2 bg-blue-200 text-blue-800 hover:bg-blue-200">
                        5 khóa học mới
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-lg transition-all cursor-pointer" onClick={() => setCurrentView('withdraw')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-green-900 font-semibold mb-1">Rút lương sớm</h3>
                      <p className="text-sm text-green-700">Rút tiền công đã làm ngay lập tức</p>
                      <Badge className="mt-2 bg-green-200 text-green-800 hover:bg-green-200">
                        Phí 1.5%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Tổng quan thu nhập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {earningsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-12 text-gray-600">{item.month}</span>
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-end px-3"
                          style={{ width: `${(item.amount / maxEarning) * 100}%` }}
                        >
                          <span className="text-white text-sm">
                            {(item.amount / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Số dư có thể rút</p>
                      <p className="text-gray-900">1,720,000 VND</p>
                    </div>
                    <Button disabled>
                      Rút tiền
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Jobs */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="applied">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="applied">Đã nộp ({appliedJobs.length})</TabsTrigger>
                    <TabsTrigger value="upcoming">Sắp tới ({upcomingJobs.length})</TabsTrigger>
                    <TabsTrigger value="completed">Hoàn thành ({completedJobs.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="applied" className="space-y-3 mt-4">
                    {appliedJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-gray-900">{job.title}</h4>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <Badge className={
                            job.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                          }>
                            {job.status === 'pending' ? 'Đang chờ' : 'Đang xem xét'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Đã nộp: {job.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-3 mt-4">
                    {upcomingJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-gray-900">{job.title}</h4>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <Badge className="bg-green-600 text-white hover:bg-green-600">
                            Đã xác nhận
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{job.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">{job.wage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-3 mt-4">
                    {completedJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-gray-900">{job.title}</h4>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          {job.rating === null ? (
                            <Button
                              size="sm"
                              onClick={() => handleRateJob(job)}
                              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                            >
                              Đánh giá ngay
                            </Button>
                          ) : (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < job.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{job.completedDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.hours} giờ</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">
                              {job.earned.toLocaleString()} VND
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đánh giá công việc</DialogTitle>
            <DialogDescription>
              {selectedJob?.title} - {selectedJob?.company}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingValue(star)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${star <= ratingValue
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                      }`}
                  />
                </button>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Nhận xét của bạn
              </label>
              <Textarea
                placeholder="Chia sẻ trải nghiệm của bạn về công việc này..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelRating}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmitRating}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Nộp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
