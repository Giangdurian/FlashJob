import React, { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  AlertCircle,
  UserX,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  TrendingUp,
  Calendar,
  Building2,
  MessageSquare,
  Star,
  Info
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface WorkerReplacementGuaranteeProps {
  onBack: () => void;
}

interface ActiveWorker {
  id: number;
  name: string;
  jobTitle: string;
  startDate: string;
  hoursWorked: number;
  rating: number;
  avatar: string;
  status: 'working' | 'issue_reported' | 'replaced';
  attendanceRate: number;
  lastShift: string;
}

interface ReplacementRequest {
  id: number;
  workerId: number;
  workerName: string;
  jobTitle: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  replacementWorker?: {
    name: string;
    rating: number;
    avatar: string;
  };
  estimatedTime: string;
}

const mockActiveWorkers: ActiveWorker[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    jobTitle: 'Nhân viên kho - Ca sáng',
    startDate: '2025-12-15',
    hoursWorked: 64,
    rating: 4.8,
    avatar: 'NVA',
    status: 'working',
    attendanceRate: 98,
    lastShift: '2025-12-23'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    jobTitle: 'Nhân viên đóng gói',
    startDate: '2025-12-10',
    hoursWorked: 48,
    rating: 4.5,
    avatar: 'TTB',
    status: 'issue_reported',
    attendanceRate: 85,
    lastShift: '2025-12-22'
  },
  {
    id: 3,
    name: 'Lê Văn Công',
    jobTitle: 'Nhân viên kho - Ca chiều',
    startDate: '2025-12-18',
    hoursWorked: 40,
    rating: 4.9,
    avatar: 'LVC',
    status: 'working',
    attendanceRate: 100,
    lastShift: '2025-12-23'
  }
];

const mockReplacementHistory: ReplacementRequest[] = [
  {
    id: 1,
    workerId: 4,
    workerName: 'Phạm Văn Dũng',
    jobTitle: 'Nhân viên bốc xếp',
    reason: 'Tự ý nghỉ việc không báo trước',
    requestDate: '2025-12-18',
    status: 'completed',
    replacementWorker: {
      name: 'Hoàng Văn Em',
      rating: 4.7,
      avatar: 'HVE'
    },
    estimatedTime: '4 giờ'
  },
  {
    id: 2,
    workerId: 2,
    workerName: 'Trần Thị Bình',
    jobTitle: 'Nhân viên đóng gói',
    reason: 'Hiệu suất làm việc không đạt yêu cầu',
    requestDate: '2025-12-22',
    status: 'processing',
    estimatedTime: '2 giờ'
  }
];

export function WorkerReplacementGuarantee({ onBack }: WorkerReplacementGuaranteeProps) {
  const [activeWorkers] = useState<ActiveWorker[]>(mockActiveWorkers);
  const [replacementHistory] = useState<ReplacementRequest[]>(mockReplacementHistory);
  const [selectedWorker, setSelectedWorker] = useState<ActiveWorker | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleReportIssue = (worker: ActiveWorker) => {
    setSelectedWorker(worker);
    setShowReportDialog(true);
  };

  const submitReport = () => {
    setShowReportDialog(false);
    setShowSuccessDialog(true);
    setReportReason('');
    setReportDetails('');
    setSelectedWorker(null);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      working: { label: 'Đang làm việc', color: 'bg-green-100 text-green-700' },
      issue_reported: { label: 'Đã báo vấn đề', color: 'bg-yellow-100 text-yellow-700' },
      replaced: { label: 'Đã thay thế', color: 'bg-gray-100 text-gray-700' }
    };
    return badges[status as keyof typeof badges];
  };

  const getRequestStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
      completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
      cancelled: { label: 'Đã hủy', color: 'bg-gray-100 text-gray-700', icon: XCircle }
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-orange-100 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại Dashboard</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Đảm bảo thay thế lao động</h1>
          </div>
          <p className="text-orange-100">
            Xử lý bồi ngạng - Điều phối nhân sự dự phòng tự động
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info & Stats */}
          <div className="space-y-6">
            {/* Guarantee Info */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Shield className="w-5 h-5" />
                  Chính sách đảm bảo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Thay thế miễn phí</p>
                    <p className="text-gray-600 text-xs">Nếu công nhân bỏ việc hoặc không đạt yêu cầu</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phản hồi nhanh</p>
                    <p className="text-gray-600 text-xs">Thời gian xử lý trung bình 2-4 giờ</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Nhân sự dự phòng</p>
                    <p className="text-gray-600 text-xs">Mạng lưới hơn 1,000 công nhân sẵn sàng</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Không tính phí bổ sung</p>
                    <p className="text-gray-600 text-xs">Dịch vụ miễn phí cho gói Pro</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Thống kê
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng yêu cầu</span>
                  <span className="font-bold text-2xl text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hoàn thành</span>
                  <span className="font-bold text-2xl text-green-600">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Đang xử lý</span>
                  <span className="font-bold text-2xl text-blue-600">2</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Thời gian TB</span>
                  <span className="font-bold text-lg text-orange-600">3.2 giờ</span>
                </div>
              </CardContent>
            </Card>

            {/* How to Report */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="w-5 h-5" />
                  Cách báo vấn đề
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-900 space-y-2">
                <p><strong>1.</strong> Chọn công nhân có vấn đề</p>
                <p><strong>2.</strong> Nhấn "Báo vấn đề"</p>
                <p><strong>3.</strong> Chọn lý do và mô tả chi tiết</p>
                <p><strong>4.</strong> Hệ thống sẽ tự động tìm người thay thế</p>
                <p className="pt-2 text-xs text-blue-700">
                  💡 Tip: Càng mô tả chi tiết, quá trình xử lý càng nhanh!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Workers & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Workers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Công nhân đang làm việc ({activeWorkers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeWorkers.map((worker) => {
                    const statusBadge = getStatusBadge(worker.status);
                    return (
                      <div
                        key={worker.id}
                        className={`p-4 rounded-lg border-2 transition-all ${worker.status === 'issue_reported'
                            ? 'bg-yellow-50 border-yellow-300'
                            : 'bg-white border-gray-200 hover:border-orange-300'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                              {worker.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{worker.name}</h4>
                              <p className="text-sm text-gray-600">{worker.jobTitle}</p>
                            </div>
                          </div>
                          <Badge className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Ngày bắt đầu</p>
                            <p className="font-medium">{new Date(worker.startDate).toLocaleDateString('vi-VN')}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Giờ làm</p>
                            <p className="font-medium">{worker.hoursWorked}h</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Đánh giá</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <p className="font-medium">{worker.rating}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Điểm danh</p>
                            <p className="font-medium text-green-600">{worker.attendanceRate}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>Ca làm cuối: {new Date(worker.lastShift).toLocaleDateString('vi-VN')}</span>
                        </div>

                        {worker.status === 'working' ? (
                          <Button
                            onClick={() => handleReportIssue(worker)}
                            variant="outline"
                            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 cursor-pointer"
                            size="sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Báo vấn đề
                          </Button>
                        ) : worker.status === 'issue_reported' ? (
                          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm">
                            <div className="flex items-center gap-2 text-yellow-800 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">Đang tìm người thay thế...</span>
                            </div>
                            <p className="text-xs text-yellow-700">
                              Ước tính: 2 giờ nữa sẽ có nhân sự mới
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Replacement History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Lịch sử thay thế ({replacementHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {replacementHistory.length > 0 ? (
                  <div className="space-y-4">
                    {replacementHistory.map((request) => {
                      const statusBadge = getRequestStatusBadge(request.status);
                      const StatusIcon = statusBadge.icon;

                      return (
                        <div key={request.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{request.workerName}</h4>
                                <Badge className={statusBadge.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusBadge.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{request.jobTitle}</p>
                            </div>
                          </div>

                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                            <p className="text-xs text-gray-500 mb-1">Lý do:</p>
                            <p className="text-sm text-red-900 font-medium">{request.reason}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                            <div>
                              <p className="text-gray-500 text-xs">Ngày yêu cầu</p>
                              <p className="font-medium">{new Date(request.requestDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Thời gian xử lý</p>
                              <p className="font-medium">{request.estimatedTime}</p>
                            </div>
                          </div>

                          {request.replacementWorker && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-2">Người thay thế:</p>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                                  {request.replacementWorker.avatar}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{request.replacementWorker.name}</p>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span>{request.replacementWorker.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có yêu cầu thay thế nào</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Report Issue Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Báo vấn đề với công nhân</DialogTitle>
            <DialogDescription>
              Mô tả chi tiết vấn đề để chúng tôi có thể xử lý nhanh chóng
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                  {selectedWorker.avatar}
                </div>
                <div>
                  <p className="font-semibold">{selectedWorker.name}</p>
                  <p className="text-sm text-gray-600">{selectedWorker.jobTitle}</p>
                </div>
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
                  placeholder="Vui lòng mô tả cụ thể vấn đề xảy ra..."
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
                    <p className="font-medium mb-1">Lưu ý:</p>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li>Chúng tôi sẽ xác minh thông tin với công nhân</li>
                      <li>Thời gian tìm người thay thế: 2-4 giờ</li>
                      <li>Người thay thế sẽ có kỹ năng tương đương hoặc tốt hơn</li>
                      <li>Không phát sinh chi phí bổ sung</li>
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
              Chúng tôi đang tìm người thay thế phù hợp cho bạn
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <p className="text-sm text-gray-600 mb-1">Thời gian ước tính</p>
              <p className="text-3xl font-bold text-blue-600">2-4 giờ</p>
              <p className="text-xs text-gray-500 mt-2">
                Bạn sẽ nhận được thông báo khi có người thay thế
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
