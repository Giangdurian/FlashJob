import React, { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  FileText,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Upload,
  Camera,
  MessageSquare,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Info,
  Scale,
  Heart,
  Briefcase
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

interface WorkerProtectionProps {
  onBack: () => void;
}

interface Report {
  id: number;
  type: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'processing' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  company: string;
  responseTime?: string;
  resolution?: string;
}

const mockReports: Report[] = [
  {
    id: 1,
    type: 'salary',
    title: 'Công ty chưa trả lương tháng 11',
    description: 'Đã làm việc đủ 20 ngày tháng 11 nhưng đến nay chưa nhận được lương...',
    date: '2025-12-20',
    status: 'processing',
    priority: 'high',
    location: 'KCN Thăng Long, Hà Nội',
    company: 'Công ty TNHH ABC',
    responseTime: '2 giờ'
  },
  {
    id: 2,
    type: 'safety',
    title: 'Thiếu trang bị bảo hộ lao động',
    description: 'Công ty không cung cấp đầy đủ găng tay, khẩu trang khi làm việc với hóa chất',
    date: '2025-12-15',
    status: 'resolved',
    priority: 'high',
    location: 'KCN Tân Bình, TP.HCM',
    company: 'Công ty TNHH XYZ',
    responseTime: '4 giờ',
    resolution: 'Công ty đã cam kết cung cấp đầy đủ bảo hộ lao động. FlashJob đã kiểm tra và xác nhận.'
  }
];

export function WorkerProtection({ onBack }: WorkerProtectionProps) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [reportCompany, setReportCompany] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const reportTypes = [
    { value: 'accident', label: '🚑 Tai nạn lao động', color: 'bg-red-100 text-red-700' },
    { value: 'salary', label: '💰 Vấn đề lương thưởng', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'harassment', label: '🚫 Quấy rối, bạo lực', color: 'bg-purple-100 text-purple-700' },
    { value: 'safety', label: '⚠️ An toàn lao động', color: 'bg-orange-100 text-orange-700' },
    { value: 'discrimination', label: '⚖️ Phân biệt đối xử', color: 'bg-pink-100 text-pink-700' },
    { value: 'working_conditions', label: '🏭 Điều kiện làm việc', color: 'bg-blue-100 text-blue-700' },
    { value: 'contract', label: '📄 Vi phạm hợp đồng', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'other', label: '📝 Vấn đề khác', color: 'bg-gray-100 text-gray-700' }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
      resolved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
      rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700', icon: XCircle }
    };
    return badges[status as keyof typeof badges];
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: { label: 'Thấp', color: 'bg-gray-100 text-gray-700' },
      medium: { label: 'Trung bình', color: 'bg-blue-100 text-blue-700' },
      high: { label: 'Cao', color: 'bg-orange-100 text-orange-700' },
      urgent: { label: 'Khẩn cấp', color: 'bg-red-100 text-red-700' }
    };
    return badges[priority as keyof typeof badges];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const submitReport = () => {
    const newReport: Report = {
      id: reports.length + 1,
      type: reportType,
      title: reportTitle,
      description: reportDescription,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      priority: reportType === 'accident' || reportType === 'harassment' ? 'urgent' : 'high',
      location: reportLocation,
      company: reportCompany
    };

    setReports([newReport, ...reports]);
    setShowReportDialog(false);
    setShowSuccessDialog(true);

    // Reset form
    setReportType('');
    setReportTitle('');
    setReportDescription('');
    setReportLocation('');
    setReportCompany('');
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-red-100 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Bảo vệ & Hỗ trợ hiện trường</h1>
          </div>
          <p className="text-red-100">
            Báo cáo sự việc - Chúng tôi bảo vệ quyền lợi của bạn
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info & Hotline */}
          <div className="space-y-6">
            {/* Emergency Hotline */}
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <Phone className="w-5 h-5" />
                  Hotline khẩn cấp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                  <p className="text-xs text-gray-600 mb-1">Hỗ trợ 24/7</p>
                  <a href="tel:1900xxxx" className="text-3xl font-bold text-red-600 cursor-pointer hover:text-red-700">
                    1900 xxxx
                  </a>
                </div>
                <p className="text-xs text-gray-600">
                  ☎️ Gọi ngay khi gặp tình huống khẩn cấp: tai nạn, quấy rối, bị đe dọa
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer">
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi ngay
                </Button>
              </CardContent>
            </Card>

            {/* Worker Rights Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Quyền lợi người lao động
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Được trả lương đầy đủ, đúng hạn theo hợp đồng</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Được cung cấp đầy đủ bảo hộ lao động</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Môi trường làm việc an toàn, không bạo lực</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Được nghỉ ngơi, ăn uống hợp lý</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Không bị phân biệt đối xử</p>
                </div>
              </CardContent>
            </Card>

            {/* Report Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Thống kê báo cáo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng báo cáo</span>
                  <span className="font-bold text-2xl">{reports.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Đang xử lý</span>
                  <span className="font-bold text-2xl text-blue-600">
                    {reports.filter(r => r.status === 'processing').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Đã giải quyết</span>
                  <span className="font-bold text-2xl text-green-600">
                    {reports.filter(r => r.status === 'resolved').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* How to Report */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="w-5 h-5" />
                  Cách báo cáo hiệu quả
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-900 space-y-2">
                <p><strong>1.</strong> Mô tả rõ ràng, chi tiết sự việc</p>
                <p><strong>2.</strong> Ghi nhận thời gian, địa điểm cụ thể</p>
                <p><strong>3.</strong> Chụp ảnh/video bằng chứng nếu có</p>
                <p><strong>4.</strong> Ghi tên người liên quan (nếu biết)</p>
                <p><strong>5.</strong> Báo cáo càng sớm càng tốt</p>
                <p className="pt-2 text-xs text-blue-700">
                  💡 Mọi thông tin được bảo mật tuyệt đối
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reports & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Button */}
            <Card className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gặp vấn đề khi làm việc?
                    </h3>
                    <p className="text-gray-600">
                      Báo cáo ngay để được hỗ trợ và bảo vệ quyền lợi
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowReportDialog(true)}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer"
                    size="lg"
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Báo cáo sự việc
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Lịch sử báo cáo ({reports.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.map((report) => {
                      const statusBadge = getStatusBadge(report.status);
                      const priorityBadge = getPriorityBadge(report.priority);
                      const StatusIcon = statusBadge.icon;
                      const reportTypeInfo = reportTypes.find(t => t.value === report.type);

                      return (
                        <div key={report.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={reportTypeInfo?.color || 'bg-gray-100 text-gray-700'}>
                                  {reportTypeInfo?.label}
                                </Badge>
                                <Badge className={statusBadge.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusBadge.label}
                                </Badge>
                                <Badge className={priorityBadge.color}>
                                  {priorityBadge.label}
                                </Badge>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                              <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(report.date).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              <span>{report.company}</span>
                            </div>
                            {report.responseTime && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>Phản hồi sau {report.responseTime}</span>
                              </div>
                            )}
                          </div>

                          {report.resolution && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Kết quả xử lý:</p>
                              <p className="text-sm text-green-900">{report.resolution}</p>
                            </div>
                          )}

                          {report.status === 'processing' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 text-blue-800">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Đang được xem xét và xử lý...</span>
                              </div>
                              <p className="text-xs text-blue-700 mt-1">
                                Chúng tôi sẽ liên hệ với bạn và doanh nghiệp để xác minh thông tin
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chưa có báo cáo nào</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Nếu gặp vấn đề, hãy báo cáo để được hỗ trợ
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Báo cáo sự việc
            </DialogTitle>
            <DialogDescription>
              Vui lòng cung cấp thông tin chi tiết để chúng tôi có thể hỗ trợ bạn tốt nhất
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Loại vấn đề *
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại vấn đề..." />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tiêu đề *
              </label>
              <Input
                placeholder="Tóm tắt ngắn gọn vấn đề..."
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Công ty/Doanh nghiệp *
                </label>
                <Input
                  placeholder="Tên công ty..."
                  value={reportCompany}
                  onChange={(e) => setReportCompany(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Địa điểm *
                </label>
                <Input
                  placeholder="Nơi xảy ra sự việc..."
                  value={reportLocation}
                  onChange={(e) => setReportLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả chi tiết *
              </label>
              <Textarea
                placeholder="Mô tả cụ thể sự việc: Điều gì xảy ra? Khi nào? Ai liên quan? Hậu quả?..."
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Càng chi tiết càng giúp chúng tôi xử lý nhanh và chính xác hơn
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Bằng chứng (ảnh/video)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click để tải ảnh/video lên</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 (tối đa 10MB)</p>
                </label>
                {selectedFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-green-600">
                      ✓ Đã chọn {selectedFiles.length} file
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-900">
                  <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                  <ul className="space-y-1 text-xs list-disc list-inside">
                    <li>Thông tin của bạn được bảo mật tuyệt đối</li>
                    <li>FlashJob sẽ liên hệ với bạn trong vòng 2 giờ</li>
                    <li>Chúng tôi sẽ làm việc với doanh nghiệp để giải quyết</li>
                    <li>Nếu khẩn cấp, gọi hotline: 1900 xxxx</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

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
              disabled={!reportType || !reportTitle || !reportDescription || !reportLocation || !reportCompany}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Gửi báo cáo
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
            <DialogTitle className="text-center">Đã nhận báo cáo!</DialogTitle>
            <DialogDescription className="text-center">
              Chúng tôi đã ghi nhận và sẽ xử lý báo cáo của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <p className="text-sm text-gray-600 mb-1">Thời gian phản hồi</p>
              <p className="text-3xl font-bold text-blue-600">2 giờ</p>
              <p className="text-xs text-gray-500 mt-2">
                Chúng tôi sẽ liên hệ qua số điện thoại đã đăng ký
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
              <p className="font-medium text-gray-900">Quy trình xử lý:</p>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</div>
                <span>Xác minh thông tin</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                <span>Liên hệ doanh nghiệp</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">3</div>
                <span>Giám sát & giải quyết</span>
              </div>
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
