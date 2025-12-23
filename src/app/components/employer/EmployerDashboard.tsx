import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  Plus,
  Search,
  Filter,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  Calendar,
  Settings,
  LogOut,
  User,
  Bell,
  ArrowLeft,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Activity,
  Crown,
  Check,
  X,
  Zap
} from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface EmployerDashboardProps {
  onNavigate: (screen: any) => void;
  onViewJobDetail?: (jobId: number) => void;
  onViewJobStatus?: (jobId: number) => void;
  onLogout?: () => void;
}

export function EmployerDashboard({ onNavigate, onViewJobDetail, onViewJobStatus, onLogout }: EmployerDashboardProps) {
  const [showPostJobDialog, setShowPostJobDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPlan, setCurrentPlan] = useState('free');

  // Job posting form state
  const [jobForm, setJobForm] = useState({
    title: '',
    quantity: '',
    location: '',
    wage: '',
    skills: '',
    urgent: false,
    description: '',
    shiftTime: '',
    duration: '',
    customShiftTime: ''
  });

  const stats = [
    {
      label: 'Công việc đang tuyển',
      value: '8',
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
      trend: '+2 hôm nay'
    },
    {
      label: 'Tổng số công nhân',
      value: '145',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      trend: '92% điểm danh'
    },
    {
      label: 'Tỷ lệ lấp đầy',
      value: '94%',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      trend: '+5% tuần này'
    },
    {
      label: 'Chi phí tháng này',
      value: '₫42.5M',
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-600',
      trend: 'Trong ngân sách'
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Nhân viên kho - Ca sáng',
      status: 'active',
      workers: { filled: 45, needed: 50 },
      location: 'Khu công nghiệp Thăng Long',
      wage: '30,000 VNĐ/giờ',
      shift: '6:00 AM - 2:00 PM',
      urgent: false,
      checkedIn: 42,
      posted: '2 ngày trước'
    },
    {
      id: 2,
      title: 'Nhân viên đóng gói',
      status: 'active',
      workers: { filled: 30, needed: 30 },
      location: 'Nhà máy Bắc Ninh',
      wage: '28,000 VNĐ/giờ',
      shift: '8:00 AM - 5:00 PM',
      urgent: false,
      checkedIn: 30,
      posted: '5 ngày trước'
    },
  ];

  const matchedWorkers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      rating: 4.8,
      completedJobs: 47,
      attendance: 96,
      verified: true,
      skills: ['Giao tiếp tốt', 'Nhanh nhẹn', 'Kinh nghiệm kho'],
      lastWorked: '3 ngày trước',
      status: 'available',
      avatar: 'NVA'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      rating: 4.9,
      completedJobs: 62,
      attendance: 98,
      verified: true,
      skills: ['Chăm chỉ', 'Đúng giờ', 'Làm việc nhóm'],
      lastWorked: '1 ngày trước',
      status: 'available',
      avatar: 'TTB'
    },
    {
      id: 3,
      name: 'Lê Văn Công',
      rating: 4.5,
      completedJobs: 28,
      attendance: 92,
      verified: true,
      skills: ['Nhanh nhẹn', 'Sức khỏe tốt'],
      lastWorked: '5 ngày trước',
      status: 'available',
      avatar: 'LVC'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      rating: 4.7,
      completedJobs: 35,
      attendance: 94,
      verified: false,
      skills: ['Giao tiếp tốt', 'Cẩn thận'],
      lastWorked: '2 ngày trước',
      status: 'available',
      avatar: 'PTD'
    },
  ];

  const workersToRate = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      job: 'Nhân viên kho - Ca sáng',
      completedDate: '2025-12-20',
      hours: 8,
      avatar: 'NVA'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      job: 'Nhân viên đóng gói',
      completedDate: '2025-12-19',
      hours: 8,
      avatar: 'TTB'
    },
  ];

  const handlePostJob = () => {
    // Just close dialog for demo
    setShowPostJobDialog(false);
    setJobForm({
      title: '',
      quantity: '',
      location: '',
      wage: '',
      skills: '',
      urgent: false,
      description: '',
      shiftTime: '',
      duration: ''
    });
  };

  const handleRateWorker = (worker: any) => {
    setSelectedWorker(worker);
    setRatingValue(0);
    setRatingFeedback('');
    setShowRatingDialog(true);
  };

  const handleSubmitRating = () => {
    setShowRatingDialog(false);
    setSelectedWorker(null);
    setRatingValue(0);
    setRatingFeedback('');
  };

  const getFillRate = (filled: number, needed: number) => {
    return Math.round((filled / needed) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Quay lại</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                <h1 className="text-blue-600 text-xl font-semibold">FlashJob Business</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowPricingDialog(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white cursor-pointer"
              >
                <Crown className="w-4 h-4 mr-2" />
                Nâng cấp Pro
              </Button>
              <button className="relative text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                      CT
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">Công ty ABC</span>
                      <span className="text-xs text-gray-500 font-normal">abc@company.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ công ty
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-xs text-green-600">{stat.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Tìm kiếm công việc, công nhân..."
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" className="cursor-pointer">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
          <Button
            onClick={() => setShowPostJobDialog(true)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Đăng tin tuyển dụng
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="cursor-pointer">Công việc hiện tại</TabsTrigger>
            <TabsTrigger value="jobs" className="cursor-pointer">Công việc đang tuyển</TabsTrigger>
            <TabsTrigger value="rating" className="cursor-pointer">Đánh giá công nhân</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Trạng thái điểm danh thời gian thực
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => onViewJobStatus?.(job.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-900 font-medium">{job.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{job.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            Đã điểm danh: {job.checkedIn}/{job.workers.filled}
                          </p>
                          <p className="text-xs text-gray-500">{job.shift}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(job.checkedIn / job.workers.filled) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {Math.round((job.checkedIn / job.workers.filled) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            {activeJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onViewJobDetail?.(job.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900 text-lg font-semibold">{job.title}</h3>
                        <Badge
                          className={
                            job.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }
                        >
                          {job.status === 'active' ? 'Đang hoạt động' : 'Đã đóng'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.shift}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.wage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Đăng {job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Tiến độ tuyển dụng</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getFillRate(job.workers.filled, job.workers.needed) >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${getFillRate(job.workers.filled, job.workers.needed)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {job.workers.filled}/{job.workers.needed}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {getFillRate(job.workers.filled, job.workers.needed)}%
                      </p>
                      <p className="text-xs text-gray-600">Tỷ lệ lấp đầy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Rating Tab */}
          <TabsContent value="rating" className="space-y-4">
            {workersToRate.length > 0 ? (
              <div className="space-y-4">
                {workersToRate.map((worker) => (
                  <Card key={worker.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {worker.avatar}
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-medium">{worker.name}</h4>
                            <p className="text-sm text-gray-600">{worker.job}</p>
                            <p className="text-xs text-gray-500">
                              {worker.completedDate} • {worker.hours} giờ
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRateWorker(worker)}
                          className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Đánh giá
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Không có công nhân nào cần đánh giá</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Job Dialog */}
      <Dialog open={showPostJobDialog} onOpenChange={setShowPostJobDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đăng tin tuyển dụng mới</DialogTitle>
            <DialogDescription>
              Điền thông tin công việc để tìm công nhân phù hợp
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tiêu đề công việc *
              </label>
              <Input
                placeholder="VD: Nhân viên kho - Ca sáng"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Số lượng cần tuyển *
                </label>
                <Input
                  type="number"
                  placeholder="VD: 50"
                  value={jobForm.quantity}
                  onChange={(e) => setJobForm({ ...jobForm, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mức lương (VNĐ/giờ) *
                </label>
                <Input
                  placeholder="VD: 30,000"
                  value={jobForm.wage}
                  onChange={(e) => setJobForm({ ...jobForm, wage: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Địa điểm *
              </label>
              <Input
                placeholder="VD: Khu công nghiệp Thăng Long, Hà Nội"
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ca làm việc *
                </label>
                <Select value={jobForm.shiftTime} onValueChange={(value) => setJobForm({ ...jobForm, shiftTime: value, customShiftTime: value !== 'flexible' ? '' : jobForm.customShiftTime })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Ca sáng (6h - 12h)</SelectItem>
                    <SelectItem value="noon">Ca trưa (12h - 18h)</SelectItem>
                    <SelectItem value="evening">Ca tối (đêm) (18h - 24h)</SelectItem>
                    <SelectItem value="night">Ca đêm (0h - 6h)</SelectItem>
                    <SelectItem value="full">Toàn thời gian (8h)</SelectItem>
                    <SelectItem value="flexible">Linh hoạt</SelectItem>
                  </SelectContent>
                </Select>
                {jobForm.shiftTime === 'flexible' && (
                  <Input
                    placeholder="VD: 8h - 16h hoặc theo ca xoay"
                    value={jobForm.customShiftTime}
                    onChange={(e) => setJobForm({ ...jobForm, customShiftTime: e.target.value })}
                    className="mt-2"
                  />
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Thời hạn *
                </label>
                <Select value={jobForm.duration} onValueChange={(value) => setJobForm({ ...jobForm, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời hạn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 ngày</SelectItem>
                    <SelectItem value="1week">1 tuần</SelectItem>
                    <SelectItem value="2weeks">2 tuần</SelectItem>
                    <SelectItem value="1month">1 tháng</SelectItem>
                    <SelectItem value="3months">3 tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Kỹ năng yêu cầu
              </label>
              <Input
                placeholder="VD: Giao tiếp tốt, Nhanh nhẹn, Kinh nghiệm kho"
                value={jobForm.skills}
                onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả công việc
              </label>
              <Textarea
                placeholder="Mô tả chi tiết về công việc, yêu cầu..."
                rows={4}
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg">
              <input
                type="checkbox"
                id="urgent"
                checked={jobForm.urgent}
                onChange={(e) => setJobForm({ ...jobForm, urgent: e.target.checked })}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <label htmlFor="urgent" className="text-sm text-gray-700 cursor-pointer">
                Đánh dấu là <strong>CẦN GẤP</strong> (Ưu tiên hiển thị và tăng tỷ lệ tìm được ứng viên)
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPostJobDialog(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handlePostJob}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Đăng tin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đánh giá công nhân</DialogTitle>
            <DialogDescription>
              {selectedWorker?.name} - {selectedWorker?.job}
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
                Nhận xét
              </label>
              <Textarea
                placeholder="Nhận xét về công nhân..."
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRatingDialog(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmitRating}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Gửi đánh giá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pricing Dialog */}
      <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Nâng cấp tài khoản FlashJob Business
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Chọn gói phù hợp để tối ưu hiệu quả tuyển dụng của bạn
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
            {/* Free Plan */}
            <div className={`border-2 rounded-lg p-6 ${currentPlan === 'free' ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Miễn phí</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">0đ</div>
                <p className="text-gray-600">Dùng thử cơ bản</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Không ưu tiên hiển thị</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Giới hạn 5 tin tuyển dụng/tháng</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý ứng viên cơ bản</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo thống kê đơn giản</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Không hỗ trợ khẩn cấp</span>
                </div>
              </div>
              
              <Button
                disabled={currentPlan === 'free'}
                onClick={() => setCurrentPlan('free')}
                variant="outline"
                className="w-full cursor-pointer"
              >
                {currentPlan === 'free' ? 'Gói hiện tại' : 'Chọn gói này'}
              </Button>
            </div>

            {/* Basic Plan */}
            <div className={`border-2 rounded-lg p-6 ${currentPlan === 'basic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} relative`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Phổ biến
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">300,000đ</div>
                <p className="text-gray-600">Mỗi tháng</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Ưu tiên hiển thị tin tuyển dụng</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Đăng 20 tin tuyển dụng/tháng</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Badge "Nhà tuyển dụng uy tín"</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý ứng viên nâng cao</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo phân tích chi tiết</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ qua email</span>
                </div>
              </div>
              
              <Button
                disabled={currentPlan === 'basic'}
                onClick={() => setCurrentPlan('basic')}
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                {currentPlan === 'basic' ? 'Gói hiện tại' : 'Nâng cấp ngay'}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className={`border-2 rounded-lg p-6 ${currentPlan === 'pro' ? 'border-yellow-500 bg-gradient-to-b from-yellow-50 to-orange-50' : 'border-gray-200'} relative`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                Premium
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">800,000đ</div>
                <p className="text-gray-600">Mỗi tháng</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Ưu tiên tiếp cận người lao động phù hợp</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Đăng bài không giới hạn</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Hỗ trợ chấm công tự động trên app</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Badge "Đối tác Premium"</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">AI gợi ý ứng viên phù hợp</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quản lý thanh toán tự động</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Báo cáo chuyên sâu & dự báo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Hỗ trợ ưu tiên 24/7</span>
                </div>
              </div>
              
              <Button
                disabled={currentPlan === 'pro'}
                onClick={() => setCurrentPlan('pro')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 cursor-pointer"
              >
                {currentPlan === 'pro' ? 'Gói hiện tại' : 'Nâng cấp ngay'}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-gray-700">
              <strong>Lưu ý:</strong> Mọi thay đổi gói sẽ có hiệu lực ngay lập tức. 
              Bạn có thể hủy hoặc nâng cấp bất cứ lúc nào.
            </p>
          </div>

          <DialogFooter className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Cần tư vấn? Liên hệ: <span className="text-blue-600 font-semibold">1900-xxxx</span>
            </p>
            <Button
              variant="outline"
              onClick={() => setShowPricingDialog(false)}
              className="cursor-pointer"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
