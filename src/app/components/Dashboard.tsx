import React from 'react';
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function Dashboard() {
  const stats = [
    {
      title: 'Việc làm đang tuyển',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Người lao động đang làm',
      value: '187',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tỷ lệ lấp đầy',
      value: '94.2%',
      change: '+2.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Tổng chi phí (tháng này)',
      value: '1,2 tỷ VND',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const activeWorkers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      job: 'Nhân viên kho',
      location: 'Kho VinMart Long Biên',
      status: 'checked-in',
      checkInTime: '08:00',
      avatar: 'NVA',
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      job: 'Giao hàng',
      location: 'SPX Express Hà Đông',
      status: 'checked-in',
      checkInTime: '07:45',
      avatar: 'TTB',
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      job: 'Đóng gói hàng',
      location: 'Shopee Bắc Ninh',
      status: 'checked-in',
      checkInTime: '08:15',
      avatar: 'LVC',
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      job: 'Bán hàng',
      location: 'Lotte Mart Đống Đa',
      status: 'checked-out',
      checkInTime: '17:00',
      avatar: 'PTD',
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      job: 'Bảo vệ',
      location: 'Tòa nhà FPT Tower',
      status: 'checked-in',
      checkInTime: '09:00',
      avatar: 'HVE',
    },
    {
      id: 6,
      name: 'Vũ Thị Phương',
      job: 'Phục vụ nhà hàng',
      location: 'Lotteria Hoàn Kiếm',
      status: 'late',
      checkInTime: 'Dự kiến 08:00',
      avatar: 'VTP',
    },
  ];

  const upcomingShifts = [
    {
      id: 1,
      job: 'Nhân viên kho',
      workers: 25,
      filled: 23,
      date: 'Ngày mai, 23/12',
      time: '8:00 - 16:00',
      location: 'Kho VinMart Long Biên',
    },
    {
      id: 2,
      job: 'Giao hàng',
      workers: 10,
      filled: 10,
      date: 'Ngày mai, 23/12',
      time: '7:00 - 15:00',
      location: 'Grab Cầu Giấy',
    },
    {
      id: 3,
      job: 'Đóng gói hàng',
      workers: 40,
      filled: 35,
      date: '24/12/2025',
      time: '9:00 - 17:00',
      location: 'Shopee Bắc Ninh',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600">{stat.title}</p>
                    <p className="text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-green-600">{stat.change}</span>
                      <span className="text-gray-500">so với tháng trước</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Worker Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Trạng thái người lao động</CardTitle>
            <p className="text-gray-600">Trạng thái check-in/out trực tiếp</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      {worker.avatar}
                    </div>
                    <div>
                      <div className="text-gray-900">{worker.name}</div>
                      <div className="text-gray-600">{worker.job}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{worker.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{worker.checkInTime}</span>
                      </div>
                    </div>

                    {worker.status === 'checked-in' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Đang làm
                      </Badge>
                    )}
                    {worker.status === 'checked-out' && (
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        Đã về
                      </Badge>
                    )}
                    {worker.status === 'late' && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Trễ
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Shifts */}
        <Card>
          <CardHeader>
            <CardTitle>Ca làm sắp tới</CardTitle>
            <p className="text-gray-600">48 giờ tới</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-2"
                >
                  <div className="text-gray-900">{shift.job}</div>
                  <div className="text-gray-600">{shift.time}</div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{shift.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-600">
                      {shift.filled}/{shift.workers} người
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${shift.filled === shift.workers
                            ? 'bg-green-600'
                            : 'bg-blue-600'
                          }`}
                        style={{
                          width: `${(shift.filled / shift.workers) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
