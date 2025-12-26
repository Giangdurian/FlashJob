import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  Search,
  RefreshCw,
  Star,
  MoreVertical,
  Shield,
  UserX,
  XCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface JobDetailStatusProps {
  jobId: number;
  onBack: () => void;
}

interface Worker {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  checkIn: string;
  checkOut: string;
  status: 'working' | 'checked_in' | 'late' | 'absent' | 'issue_reported';
  daysWorked: number;
  daysOff: number;
  lateTimes: number;
  attendanceRate: number;
  totalHours: string;
  totalJobs: number;
  verified: boolean;
}

const mockWorkers: Worker[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    avatar: 'NVA',
    rating: 4.8,
    checkIn: '5:55 AM',
    checkOut: '-',
    status: 'working',
    daysWorked: 45,
    daysOff: 2,
    lateTimes: 3,
    attendanceRate: 96,
    totalHours: '352h',
    totalJobs: 47,
    verified: true
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    avatar: 'TTB',
    rating: 4.9,
    checkIn: '6:05 AM',
    checkOut: '-',
    status: 'working',
    daysWorked: 58,
    daysOff: 1,
    lateTimes: 4,
    attendanceRate: 98,
    totalHours: '456h',
    totalJobs: 62,
    verified: true
  },
  {
    id: 3,
    name: 'Lê Văn Công',
    avatar: 'LVC',
    rating: 4.6,
    checkIn: '6:15 AM',
    checkOut: '-',
    status: 'late',
    daysWorked: 32,
    daysOff: 3,
    lateTimes: 8,
    attendanceRate: 92,
    totalHours: '248h',
    totalJobs: 35,
    verified: true
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    avatar: 'PTD',
    rating: 4.7,
    checkIn: '5:50 AM',
    checkOut: '-',
    status: 'working',
    daysWorked: 40,
    daysOff: 2,
    lateTimes: 5,
    attendanceRate: 94,
    totalHours: '312h',
    totalJobs: 42,
    verified: false
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    avatar: 'HVE',
    rating: 4.5,
    checkIn: '-',
    checkOut: '-',
    status: 'absent',
    daysWorked: 28,
    daysOff: 5,
    lateTimes: 6,
    attendanceRate: 88,
    totalHours: '216h',
    totalJobs: 30,
    verified: true
  }
];

export function JobDetailStatus({ jobId, onBack }: JobDetailStatusProps) {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('5:42:15');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      // Demo countdown
      setTimeRemaining((prev) => {
        const [h, m, s] = prev.split(':').map(Number);
        let totalSeconds = h * 3600 + m * 60 + s - 1;
        if (totalSeconds < 0) totalSeconds = 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const jobInfo = {
    title: 'Nhân viên pha chế',
    location: 'Highland Coffee Cầu Giấy, Hà Nội',
    date: '25/12/2025',
    time: '6:00 AM - 2:00 PM',
    totalNeeded: 50,
    totalFilled: 45,
    checkedIn: 42
  };

  const attendanceRate = Math.round((jobInfo.checkedIn / jobInfo.totalFilled) * 100);
  const fillRate = Math.round((jobInfo.totalFilled / jobInfo.totalNeeded) * 100);

  const getStatusBadge = (status: string) => {
    const badges = {
      working: { label: 'Đang làm việc', color: 'bg-green-100 text-green-700' },
      checked_in: { label: 'Đã check-in', color: 'bg-blue-100 text-blue-700' },
      late: { label: 'Đi muộn', color: 'bg-yellow-100 text-yellow-700' },
      absent: { label: 'Vắng mặt', color: 'bg-red-100 text-red-700' },
      issue_reported: { label: 'Đã báo vấn đề', color: 'bg-orange-100 text-orange-700' }
    };
    return badges[status as keyof typeof badges];
  };

  const handleReportIssue = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowReportDialog(true);
  };

  const submitReport = () => {
    if (selectedWorker) {
      setWorkers(prev =>
        prev.map(w =>
          w.id === selectedWorker.id
            ? { ...w, status: 'issue_reported' as const }
            : w
        )
      );
    }
    setShowReportDialog(false);
    setShowSuccessDialog(true);
    setReportReason('');
    setReportDetails('');
    setSelectedWorker(null);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
            <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Đang diễn ra
            </Badge>
          </div>
        </div>
      </div>

      {/* Job Info Section */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{jobInfo.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{jobInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{jobInfo.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{jobInfo.time}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ điểm danh</p>
                    <p className="text-3xl font-bold text-blue-600">{attendanceRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">{jobInfo.checkedIn}/{jobInfo.totalFilled} công nhân</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${attendanceRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ lắp đầy</p>
                    <p className="text-3xl font-bold text-green-600">{fillRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">{jobInfo.totalFilled}/{jobInfo.totalNeeded} vị trí</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${fillRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Thời gian còn lại</p>
                    <p className="text-3xl font-bold text-orange-600">{timeRemaining}</p>
                    <p className="text-xs text-gray-500 mt-1">Kết thúc ca làm việc</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 cursor-pointer"
                  onClick={() => setTimeRemaining('5:42:15')}
                >
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Làm mới dữ liệu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Danh sách công nhân ({filteredWorkers.length})
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Tìm công nhân..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Filter className="w-4 h-4 mr-2" />
                  Tất cả
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất Excel
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-visible">
              <table className="w-full relative">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Công nhân</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Check-in</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Check-out</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trạng thái</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Ngày đi làm</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Ngày nghỉ</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Đi muộn</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Điểm danh</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Tổng giờ</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((worker) => {
                    const statusBadge = getStatusBadge(worker.status);
                    return (
                      <tr key={worker.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {worker.verified && (
                              <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                {worker.avatar}
                              </div>
                              {worker.verified && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{worker.name}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-gray-600">{worker.rating}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{worker.checkIn}</p>
                            {worker.checkIn !== '-' && (
                              <p className="text-xs text-green-600">Đúng giờ</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">{worker.checkOut}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-gray-900">{worker.daysWorked}</p>
                            <p className="text-xs text-gray-500">ngày</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-red-600">{worker.daysOff}</p>
                            <p className="text-xs text-gray-500">ngày</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-yellow-600">{worker.lateTimes}</p>
                            <p className="text-xs text-gray-500">lần</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-blue-600">{worker.attendanceRate}%</p>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div
                                className="bg-blue-600 h-1 rounded-full"
                                style={{ width: `${worker.attendanceRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{worker.totalHours}</p>
                            <p className="text-xs text-gray-500">{worker.totalJobs} jobs</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => setOpenMenuId(openMenuId === worker.id ? null : worker.id)}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>

                            {openMenuId === worker.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-40"
                                  onClick={() => setOpenMenuId(null)}
                                />
                                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
                                  <button
                                    onClick={() => {
                                      setOpenMenuId(null);
                                      // Handle view profile
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Users className="w-4 h-4" />
                                    Xem hồ sơ
                                  </button>

                                  {worker.status !== 'issue_reported' && worker.status !== 'absent' && (
                                    <button
                                      onClick={() => {
                                        setOpenMenuId(null);
                                        handleReportIssue(worker);
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-orange-600 cursor-pointer"
                                    >
                                      <Shield className="w-4 h-4" />
                                      Báo vấn đề & Thay thế
                                    </button>
                                  )}

                                  {worker.status === 'issue_reported' && (
                                    <button
                                      onClick={() => {
                                        setOpenMenuId(null);
                                        // Handle view progress
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-blue-600 cursor-pointer"
                                    >
                                      <RefreshCw className="w-4 h-4" />
                                      Xem tiến độ thay thế
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Không tìm thấy công nhân</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Issue Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" />
              Báo vấn đề & Yêu cầu thay thế
            </DialogTitle>
            <DialogDescription>
              Mô tả chi tiết vấn đề để chúng tôi có thể tìm người thay thế phù hợp
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {selectedWorker.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{selectedWorker.name}</p>
                  <p className="text-sm text-gray-600">
                    <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" /> {selectedWorker.rating} •
                    Điểm danh: {selectedWorker.attendanceRate}%
                  </p>
                </div>
                <Badge className={getStatusBadge(selectedWorker.status).color}>
                  {getStatusBadge(selectedWorker.status).label}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Lý do báo vấn đề *
                </label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lý do..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="absent">Nghỉ việc không báo trước</SelectItem>
                    <SelectItem value="late">Đi muộn thường xuyên</SelectItem>
                    <SelectItem value="performance">Hiệu suất không đạt yêu cầu</SelectItem>
                    <SelectItem value="attitude">Thái độ làm việc không tốt</SelectItem>
                    <SelectItem value="safety">Vi phạm quy định an toàn</SelectItem>
                    <SelectItem value="other">Lý do khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mô tả chi tiết *
                </label>
                <Textarea
                  placeholder="Vui lòng mô tả cụ thể vấn đề xảy ra, thời gian, tình huống..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Thông tin chi tiết giúp chúng tôi tìm người thay thế phù hợp hơn
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-900">
                    <p className="font-medium mb-1">Cam kết dịch vụ:</p>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li>Xác minh thông tin với công nhân trong vòng 30 phút</li>
                      <li>Tìm người thay thế phù hợp trong 2-4 giờ</li>
                      <li>Người thay thế có kỹ năng tương đương hoặc tốt hơn</li>
                      <li>Không phát sinh chi phí bổ sung (miễn phí cho gói Pro)</li>
                      <li>Bồi thường nếu không tìm được người thay thế kịp thời</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReportDialog(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={submitReport}
              disabled={!reportReason || !reportDetails}
              className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
            >
              <UserX className="w-4 h-4 mr-2" />
              Gửi yêu cầu thay thế
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-center">Yêu cầu đã được ghi nhận!</DialogTitle>
            <DialogDescription className="text-center">
              Chúng tôi đang xử lý và tìm người thay thế cho bạn
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <p className="text-sm text-gray-600 mb-1">Thời gian ước tính</p>
              <p className="text-3xl font-bold text-blue-600">2-4 giờ</p>
              <p className="text-xs text-gray-500 mt-2">
                Bạn sẽ nhận được thông báo khi có người thay thế
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                📱 Chúng tôi sẽ gửi thông báo qua SMS và email khi có cập nhật
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full cursor-pointer">
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
