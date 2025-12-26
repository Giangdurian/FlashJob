import React, { useState } from 'react';
import {
  DollarSign,
  ArrowLeft,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  CreditCard,
  Building2,
  Info,
  History
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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

interface EarlyWithdrawProps {
  onBack: () => void;
}

interface WorkSession {
  id: number;
  jobTitle: string;
  company: string;
  date: string;
  hoursWorked: number;
  hourlyRate: number;
  totalEarned: number;
  status: 'pending' | 'available' | 'withdrawn';
}

interface WithdrawHistory {
  id: number;
  amount: number;
  fee: number;
  totalReceived: number;
  date: string;
  status: 'completed' | 'processing';
  bankAccount: string;
}

const mockWorkSessions: WorkSession[] = [
  {
    id: 1,
    jobTitle: 'Nhân viên kho - Ca sáng',
    company: 'VINMART',
    date: '2025-12-23',
    hoursWorked: 8,
    hourlyRate: 35000,
    totalEarned: 280000,
    status: 'available'
  },
  {
    id: 2,
    jobTitle: 'Nhân viên kho - Ca chiều',
    company: 'VINMART',
    date: '2025-12-22',
    hoursWorked: 8,
    hourlyRate: 35000,
    totalEarned: 280000,
    status: 'available'
  },
  {
    id: 3,
    jobTitle: 'Nhân viên đóng gói',
    company: 'GRAB VIỆT NAM',
    date: '2025-12-21',
    hoursWorked: 6,
    hourlyRate: 30000,
    totalEarned: 180000,
    status: 'available'
  },
  {
    id: 4,
    jobTitle: 'Nhân viên kho - Ca sáng',
    company: 'VINMART',
    date: '2025-12-20',
    hoursWorked: 8,
    hourlyRate: 35000,
    totalEarned: 280000,
    status: 'withdrawn'
  }
];

const mockWithdrawHistory: WithdrawHistory[] = [
  {
    id: 1,
    amount: 500000,
    fee: 7500,
    totalReceived: 492500,
    date: '2025-12-20',
    status: 'completed',
    bankAccount: '**** 1234'
  },
  {
    id: 2,
    amount: 300000,
    fee: 4500,
    totalReceived: 295500,
    date: '2025-12-15',
    status: 'completed',
    bankAccount: '**** 1234'
  }
];

export function EarlyWithdraw({ onBack }: EarlyWithdrawProps) {
  const [workSessions] = useState<WorkSession[]>(mockWorkSessions);
  const [withdrawHistory] = useState<WithdrawHistory[]>(mockWithdrawHistory);
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const EWA_FEE_PERCENTAGE = 1.5;
  const MIN_WITHDRAW = 100000; // 100k VND
  const MAX_WITHDRAW = 5000000; // 5M VND

  // Calculate available balance
  const availableSessions = workSessions.filter(s => s.status === 'available');
  const totalAvailable = availableSessions.reduce((sum, session) => sum + session.totalEarned, 0);

  const handleSessionToggle = (sessionId: number) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const selectedTotal = workSessions
    .filter(s => selectedSessions.includes(s.id))
    .reduce((sum, session) => sum + session.totalEarned, 0);

  const calculateFee = (amount: number) => {
    return Math.round(amount * (EWA_FEE_PERCENTAGE / 100));
  };

  const handleWithdrawRequest = () => {
    const amount = parseInt(withdrawAmount) || 0;
    if (amount < MIN_WITHDRAW) {
      alert(`Số tiền rút tối thiểu là ${MIN_WITHDRAW.toLocaleString('vi-VN')} VNĐ`);
      return;
    }
    if (amount > totalAvailable) {
      alert('Số tiền rút vượt quá số dư khả dụng');
      return;
    }
    if (amount > MAX_WITHDRAW) {
      alert(`Số tiền rút tối đa là ${MAX_WITHDRAW.toLocaleString('vi-VN')} VNĐ mỗi lần`);
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmWithdraw = () => {
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    setWithdrawAmount('');
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
  };

  const currentWithdrawAmount = parseInt(withdrawAmount) || 0;
  const currentFee = calculateFee(currentWithdrawAmount);
  const receivedAmount = currentWithdrawAmount - currentFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-green-100 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại Dashboard</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Rút lương sớm (EWA)</h1>
          </div>
          <p className="text-green-100">
            Earned Wage Access - Rút tiền công đã làm việc ngay lập tức
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Withdraw Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Balance */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Số dư khả dụng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatCurrency(totalAvailable)}
                </div>
                <p className="text-sm text-gray-600">
                  Từ {availableSessions.length} ca làm việc đã hoàn thành
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Phí dịch vụ EWA: {EWA_FEE_PERCENTAGE}%</p>
                      <p className="text-xs">
                        Bạn sẽ nhận được tiền trong vòng 1-3 giờ sau khi yêu cầu được xác nhận
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Withdraw Form */}
            <Card>
              <CardHeader>
                <CardTitle>Tạo yêu cầu rút tiền</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Số tiền muốn rút
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      type="number"
                      placeholder="Nhập số tiền"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-10"
                      min={MIN_WITHDRAW}
                      max={totalAvailable}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tối thiểu: {formatCurrency(MIN_WITHDRAW)} | Tối đa: {formatCurrency(Math.min(totalAvailable, MAX_WITHDRAW))}
                  </p>
                </div>

                {currentWithdrawAmount > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Số tiền rút</span>
                      <span className="font-medium">{formatCurrency(currentWithdrawAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí dịch vụ ({EWA_FEE_PERCENTAGE}%)</span>
                      <span className="font-medium text-red-600">-{formatCurrency(currentFee)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between">
                      <span className="font-semibold">Bạn sẽ nhận được</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(receivedAmount)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setWithdrawAmount((totalAvailable * 0.5).toString())}
                    className="flex-1 cursor-pointer"
                  >
                    50%
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setWithdrawAmount((totalAvailable * 0.75).toString())}
                    className="flex-1 cursor-pointer"
                  >
                    75%
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setWithdrawAmount(totalAvailable.toString())}
                    className="flex-1 cursor-pointer"
                  >
                    100%
                  </Button>
                </div>

                <Button
                  onClick={handleWithdrawRequest}
                  disabled={currentWithdrawAmount < MIN_WITHDRAW || currentWithdrawAmount > totalAvailable}
                  className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Rút tiền ngay
                </Button>

                <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li>Phí dịch vụ {EWA_FEE_PERCENTAGE}% sẽ được trừ trực tiếp vào số tiền rút</li>
                      <li>Tiền sẽ chuyển vào tài khoản ngân hàng đã đăng ký trong 1-3 giờ</li>
                      <li>Mỗi lần rút tối đa {formatCurrency(MAX_WITHDRAW)}</li>
                      <li>Chỉ rút được tiền từ các ca làm đã hoàn thành và được xác nhận</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Ca làm việc ({availableSessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-4 rounded-lg border-2 transition-all ${session.status === 'withdrawn'
                          ? 'bg-gray-50 border-gray-200 opacity-60'
                          : 'bg-white border-gray-200 hover:border-green-300'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{session.jobTitle}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Building2 className="w-4 h-4" />
                            <span>{session.company}</span>
                          </div>
                        </div>
                        <Badge
                          className={
                            session.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {session.status === 'available' ? 'Khả dụng' : 'Đã rút'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{session.hoursWorked} giờ</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tiền công</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(session.totalEarned)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Lịch sử rút tiền
                </CardTitle>
              </CardHeader>
              <CardContent>
                {withdrawHistory.length > 0 ? (
                  <div className="space-y-3">
                    {withdrawHistory.map((item) => (
                      <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            className={
                              item.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {item.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số tiền rút</span>
                            <span className="font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phí ({EWA_FEE_PERCENTAGE}%)</span>
                            <span className="text-red-600">-{formatCurrency(item.fee)}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-300">
                            <span className="font-medium">Đã nhận</span>
                            <span className="font-bold text-green-600">
                              {formatCurrency(item.totalReceived)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                            <CreditCard className="w-3 h-3" />
                            <span>Tài khoản: {item.bankAccount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Chưa có lịch sử rút tiền</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="w-5 h-5" />
                  Về dịch vụ EWA
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-900 space-y-2">
                <p>
                  <strong>Earned Wage Access (EWA)</strong> là dịch vụ cho phép bạn rút trước một phần
                  tiền lương đã làm việc, trước ngày nhận lương chính thức.
                </p>
                <ul className="space-y-1 list-disc list-inside text-xs">
                  <li>Phí dịch vụ {EWA_FEE_PERCENTAGE}% trên số tiền rút</li>
                  <li>Nhận tiền trong vòng 1-3 giờ</li>
                  <li>Không ảnh hưởng đến tín dụng</li>
                  <li>An toàn và bảo mật 100%</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận rút tiền</DialogTitle>
            <DialogDescription>
              Vui lòng kiểm tra kỹ thông tin trước khi xác nhận
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Số tiền rút</span>
                <span className="font-medium">{formatCurrency(currentWithdrawAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí dịch vụ ({EWA_FEE_PERCENTAGE}%)</span>
                <span className="font-medium text-red-600">-{formatCurrency(currentFee)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="font-semibold text-lg">Bạn sẽ nhận được</span>
                <span className="font-bold text-green-600 text-xl">
                  {formatCurrency(receivedAmount)}
                </span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <CreditCard className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Tài khoản nhận</p>
                  <p className="text-xs mt-1">Ngân hàng Vietcombank - **** 1234</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="cursor-pointer">
              Hủy
            </Button>
            <Button onClick={confirmWithdraw} className="bg-green-600 hover:bg-green-700 cursor-pointer">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Xác nhận rút tiền
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
            <DialogTitle className="text-center">Yêu cầu rút tiền thành công!</DialogTitle>
            <DialogDescription className="text-center">
              Tiền sẽ được chuyển vào tài khoản của bạn trong vòng 1-3 giờ
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-sm text-gray-600 mb-1">Số tiền sẽ nhận được</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(receivedAmount)}
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
