import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  X,
  Star,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Bell,
  MapPin,
  Clock,
  Briefcase,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
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

interface CandidateSelectionProps {
  jobId: number;
  onBack: () => void;
  onNavigate: (screen: any) => void;
  onLogout?: () => void;
}

export function CandidateSelection({ jobId, onBack, onNavigate, onLogout }: CandidateSelectionProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);

  // Mock job data
  const jobInfo = {
    id: jobId,
    title: 'Nhân viên pha chế',
    location: 'Highland Coffee Cầu Giấy, Hà Nội',
    wage: '30,000 VNĐ/giờ',
    shift: '6:00 AM - 2:00 PM',
    workers: { needed: 50, filled: 45 },
    date: '25/12/2025'
  };

  // Mock candidates data
  const candidates = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      avatar: 'NVA',
      verified: true,
      rating: 4.8,
      completedJobs: 47,
      attendance: 96,
      skills: ['Giao tiếp tốt', 'Nhanh nhẹn', 'Kinh nghiệm kho'],
      lastWorked: '3 ngày trước',
      phone: '0912345678',
      email: 'nguyenvanan@email.com',
      address: 'Hà Nội',
      experience: '2 năm kinh nghiệm làm việc tại kho',
      status: 'available',
      distance: '5 km'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      avatar: 'TTB',
      verified: true,
      rating: 4.9,
      completedJobs: 62,
      attendance: 98,
      skills: ['Chăm chỉ', 'Đúng giờ', 'Làm việc nhóm'],
      lastWorked: '1 ngày trước',
      phone: '0923456789',
      email: 'tranthib@email.com',
      address: 'Hà Nội',
      experience: '3 năm kinh nghiệm tại các khu công nghiệp',
      status: 'available',
      distance: '3 km'
    },
    {
      id: 3,
      name: 'Lê Văn Công',
      avatar: 'LVC',
      verified: true,
      rating: 4.5,
      completedJobs: 28,
      attendance: 92,
      skills: ['Nhanh nhẹn', 'Sức khỏe tốt'],
      lastWorked: '5 ngày trước',
      phone: '0934567890',
      email: 'levancong@email.com',
      address: 'Bắc Ninh',
      experience: '1 năm kinh nghiệm',
      status: 'available',
      distance: '8 km'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      avatar: 'PTD',
      verified: false,
      rating: 4.7,
      completedJobs: 35,
      attendance: 94,
      skills: ['Giao tiếp tốt', 'Cẩn thận'],
      lastWorked: '2 ngày trước',
      phone: '0945678901',
      email: 'phamthidung@email.com',
      address: 'Hà Nội',
      experience: '1.5 năm kinh nghiệm',
      status: 'available',
      distance: '6 km'
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      avatar: 'HVE',
      verified: true,
      rating: 4.6,
      completedJobs: 41,
      attendance: 95,
      skills: ['Trách nhiệm', 'Kinh nghiệm tốt'],
      lastWorked: '4 ngày trước',
      phone: '0956789012',
      email: 'hoangvanem@email.com',
      address: 'Hà Nội',
      experience: '2.5 năm kinh nghiệm kho vận',
      status: 'available',
      distance: '4 km'
    },
    {
      id: 6,
      name: 'Đỗ Thị Lan',
      avatar: 'DTL',
      verified: true,
      rating: 4.8,
      completedJobs: 55,
      attendance: 97,
      skills: ['Cẩn thận', 'Làm việc nhóm', 'Chăm chỉ'],
      lastWorked: '2 ngày trước',
      phone: '0967890123',
      email: 'dothilan@email.com',
      address: 'Hà Nội',
      experience: '3 năm kinh nghiệm đóng gói và kho',
      status: 'available',
      distance: '5 km'
    },
  ];

  const handleViewCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateDetail(true);
  };

  const handleAcceptCandidate = () => {
    // Handle accept logic
    setShowCandidateDetail(false);
    setSelectedCandidate(null);
  };

  const handleRejectCandidate = () => {
    // Handle reject logic
    setShowCandidateDetail(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
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
        {/* Job Info Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{jobInfo.title}</h2>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{jobInfo.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{jobInfo.shift}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>{jobInfo.wage}</span>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tiến độ tuyển dụng</span>
              <span className="text-sm font-medium text-gray-900">
                {jobInfo.workers.filled}/{jobInfo.workers.needed} vị trí
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(jobInfo.workers.filled / jobInfo.workers.needed) * 100}%` }}
                />
              </div>
              <span className="text-lg font-bold text-blue-600">
                {Math.round((jobInfo.workers.filled / jobInfo.workers.needed) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Ứng viên tiềm năng ({candidates.length})
            </h3>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              {candidates.length} người phù hợp
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewCandidate(candidate)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-semibold">
                      {candidate.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900 font-semibold">{candidate.name}</h4>
                        {candidate.verified && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{candidate.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{candidate.completedJobs} công việc</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Điểm danh</span>
                      <span className="font-medium text-gray-900">{candidate.attendance}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Khoảng cách</span>
                      <span className="font-medium text-gray-900">{candidate.distance}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Kỹ năng:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Làm việc lần cuối: {candidate.lastWorked}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCandidate(candidate);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Detail Dialog */}
      <Dialog open={showCandidateDetail} onOpenChange={setShowCandidateDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {selectedCandidate?.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span>{selectedCandidate?.name}</span>
                  {selectedCandidate?.verified && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-normal">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{selectedCandidate?.rating}</span>
                  <span>•</span>
                  <span>{selectedCandidate?.completedJobs} công việc hoàn thành</span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Thông tin liên hệ</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{selectedCandidate?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{selectedCandidate?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{selectedCandidate?.address} • {selectedCandidate?.distance}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Thống kê</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{selectedCandidate?.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Đánh giá TB</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{selectedCandidate?.attendance}%</span>
                  </div>
                  <p className="text-xs text-gray-600">Điểm danh</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-600">{selectedCandidate?.completedJobs}</span>
                  </div>
                  <p className="text-xs text-gray-600">Công việc</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Kỹ năng</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate?.skills.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Kinh nghiệm</h4>
              <p className="text-sm text-gray-600">{selectedCandidate?.experience}</p>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Hoạt động gần đây</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Làm việc lần cuối: {selectedCandidate?.lastWorked}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRejectCandidate}
              className="flex-1 cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" />
              Loại bỏ
            </Button>
            <Button
              onClick={handleAcceptCandidate}
              className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Chấp nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
