import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  XCircle,
  UserX,
  Star,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Bell,
  MoreVertical,
  RefreshCw,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface JobDetailManagementProps {
  jobId: number;
  onBack: () => void;
  onNavigate: (screen: any) => void;
  onLogout?: () => void;
}

export function JobDetailManagement({ jobId, onBack, onNavigate, onLogout }: JobDetailManagementProps) {
  const [timeRemaining, setTimeRemaining] = useState('5:42:15');
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [replaceReason, setReplaceReason] = useState('');
  const [replaceNote, setReplaceNote] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock job data
  const jobInfo = {
    id: jobId,
    title: 'Nhân viên kho - Ca sáng',
    location: 'Highland Coffee Cầu Giấy, Hà Nội',
    date: '25/12/2025',
    shift: '6:00 AM - 2:00 PM',
    wage: '30,000 VNĐ/giờ',
    status: 'in-progress',
    workers: { filled: 45, needed: 50, checkedIn: 42 }
  };

  // Mock workers data with more detailed stats
  const workers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      avatar: 'NVA',
      verified: true,
      checkInTime: '5:55 AM',
      checkOutTime: '-',
      status: 'working',
      rating: 4.8,
      phone: '0912345678',
      completedJobs: 47,
      onTime: true,
      daysWorked: 45,
      daysAbsent: 2,
      daysLate: 3,
      attendanceRate: 96,
      totalHours: 352
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      avatar: 'TTB',
      verified: true,
      checkInTime: '6:05 AM',
      checkOutTime: '-',
      status: 'working',
      rating: 4.9,
      phone: '0923456789',
      completedJobs: 62,
      onTime: false,
      daysWorked: 58,
      daysAbsent: 1,
      daysLate: 4,
      attendanceRate: 98,
      totalHours: 456
    },
    {
      id: 3,
      name: 'Lê Văn Công',
      avatar: 'LVC',
      verified: true,
      checkInTime: '6:10 AM',
      checkOutTime: '-',
      status: 'working',
      rating: 4.5,
      phone: '0934567890',
      completedJobs: 28,
      onTime: false,
      daysWorked: 26,
      daysAbsent: 3,
      daysLate: 2,
      attendanceRate: 92,
      totalHours: 208
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      avatar: 'PTD',
      verified: false,
      checkInTime: '6:25 AM',
      checkOutTime: '-',
      status: 'late',
      rating: 4.7,
      phone: '0945678901',
      completedJobs: 35,
      onTime: false,
      daysWorked: 32,
      daysAbsent: 2,
      daysLate: 5,
      attendanceRate: 94,
      totalHours: 256
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      avatar: 'HVE',
      verified: true,
      checkInTime: '-',
      checkOutTime: '-',
      status: 'no-show',
      rating: 4.2,
      phone: '0956789012',
      completedJobs: 15,
      onTime: false,
      daysWorked: 14,
      daysAbsent: 4,
      daysLate: 1,
      attendanceRate: 87,
      totalHours: 112
    },
  ];

  // Simulate countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timer logic here
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReplaceWorker = (worker: any) => {
    setSelectedWorker(worker);
    setReplaceReason('');
    setReplaceNote('');
    setShowReplaceDialog(true);
  };

  const handleConfirmReplace = () => {
    // Trigger backup force protocol
    setShowReplaceDialog(false);
    setSelectedWorker(null);
    setReplaceReason('');
    setReplaceNote('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'working':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Đang làm việc</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Trễ</Badge>;
      case 'no-show':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Vắng mặt</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Chưa xác định</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'late':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
      case 'no-show':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const filteredWorkers = filterStatus === 'all'
    ? workers
    : workers.filter(w => w.status === filterStatus);

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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{jobInfo.title}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span>{jobInfo.location}</span>
                <span>•</span>
                <span>{jobInfo.date}</span>
                <span>•</span>
                <span>{jobInfo.shift}</span>
              </div>
            </div>
            <Badge className={
              jobInfo.status === 'in-progress'
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 text-lg px-4 py-2'
                : 'bg-green-100 text-green-700 hover:bg-green-100 text-lg px-4 py-2'
            }>
              {jobInfo.status === 'in-progress' ? 'Đang diễn ra' : 'Hoàn thành'}
            </Badge>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ điểm danh</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.round((jobInfo.workers.checkedIn / jobInfo.workers.filled) * 100)}%
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {jobInfo.workers.checkedIn}/{jobInfo.workers.filled} công nhân
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(jobInfo.workers.checkedIn / jobInfo.workers.filled) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ lấp đầy</p>
                    <p className="text-3xl font-bold text-green-600">
                      {Math.round((jobInfo.workers.filled / jobInfo.workers.needed) * 100)}%
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {jobInfo.workers.filled}/{jobInfo.workers.needed} vị trí
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(jobInfo.workers.filled / jobInfo.workers.needed) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Thời gian còn lại</p>
                    <p className="text-3xl font-bold text-orange-600">{timeRemaining}</p>
                    <p className="text-sm text-gray-500 mt-1">Kết thúc ca làm việc</p>
                  </div>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Làm mới dữ liệu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Worker Roster */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Danh sách công nhân ({filteredWorkers.length})
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm công nhân..."
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 cursor-pointer">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Lọc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="working">Đang làm việc</SelectItem>
                    <SelectItem value="late">Trễ</SelectItem>
                    <SelectItem value="no-show">Vắng mặt</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Table Layout */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Công nhân</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Check-in</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Check-out</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Trạng thái</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Ngày đi làm</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Ngày nghỉ</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Đi muộn</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Điểm danh</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Tổng giờ</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWorkers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50">
                      {/* Worker Info */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {worker.avatar}
                            </div>
                            <div className="absolute -top-1 -right-1">
                              {getStatusIcon(worker.status)}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{worker.name}</p>
                              {worker.verified && (
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">{worker.rating}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Check-in */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-medium text-gray-900">{worker.checkInTime}</span>
                          {worker.onTime && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                              Đúng giờ
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* Check-out */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-900">{worker.checkOutTime}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(worker.status)}
                      </td>

                      {/* Days Worked */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-green-600">{worker.daysWorked}</span>
                          <span className="text-xs text-gray-500">ngày</span>
                        </div>
                      </td>

                      {/* Days Absent */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-red-600">{worker.daysAbsent}</span>
                          <span className="text-xs text-gray-500">ngày</span>
                        </div>
                      </td>

                      {/* Days Late */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-yellow-600">{worker.daysLate}</span>
                          <span className="text-xs text-gray-500">lần</span>
                        </div>
                      </td>

                      {/* Attendance Rate */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-blue-600">{worker.attendanceRate}%</span>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${worker.attendanceRate}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Total Hours */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-gray-900">{worker.totalHours}h</span>
                          <span className="text-xs text-gray-500">{worker.completedJobs} jobs</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {worker.status === 'no-show' || worker.status === 'late' ? (
                            <Button
                              size="sm"
                              onClick={() => handleReplaceWorker(worker)}
                              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Thay thế
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => window.open(`tel:${worker.phone}`)}
                            >
                              Liên hệ
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="cursor-pointer">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                Gửi tin nhắn
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 cursor-pointer">
                                Báo cáo vấn đề
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

            {/* Summary Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng số</p>
                  <p className="text-2xl font-bold text-gray-900">{workers.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Đang làm việc</p>
                  <p className="text-2xl font-bold text-green-600">
                    {workers.filter(w => w.status === 'working').length}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Trễ</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {workers.filter(w => w.status === 'late').length}
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Vắng mặt</p>
                  <p className="text-2xl font-bold text-red-600">
                    {workers.filter(w => w.status === 'no-show').length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Replace Worker Dialog */}
      <Dialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Thay thế công nhân
            </DialogTitle>
            <DialogDescription>
              Bạn đang yêu cầu thay thế: <strong>{selectedWorker?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Lý do thay thế *
              </label>
              <Select value={replaceReason} onValueChange={setReplaceReason}>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Chọn lý do" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-show">Vắng mặt không báo</SelectItem>
                  <SelectItem value="late">Đến trễ quá 30 phút</SelectItem>
                  <SelectItem value="poor-performance">Hiệu suất kém</SelectItem>
                  <SelectItem value="behavior">Hành vi không phù hợp</SelectItem>
                  <SelectItem value="other">Lý do khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Ghi chú (tùy chọn)
              </label>
              <Textarea
                placeholder="Mô tả chi tiết vấn đề..."
                value={replaceNote}
                onChange={(e) => setReplaceNote(e.target.value)}
                rows={3}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Quy trình dự phòng:</strong> Sau khi xác nhận, hệ thống sẽ tự động tìm và gửi yêu cầu đến công nhân thay thế phù hợp ngay lập tức.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReplaceDialog(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmReplace}
              disabled={!replaceReason}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              <UserX className="w-4 h-4 mr-2" />
              Xác nhận thay thế
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
