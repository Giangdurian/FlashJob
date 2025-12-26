import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Target,
  Download,
  Filter,
  ArrowLeft,
  Activity,
  AlertCircle,
  CheckCircle2,
  Zap,
  PieChart
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AdvancedReportsProps {
  onBack: () => void;
}

export function AdvancedReports({ onBack }: AdvancedReportsProps) {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for reports
  const forecastData = {
    nextMonth: {
      expectedWorkers: 165,
      expectedCost: 48.5,
      trend: '+13.8%',
      confidence: 87
    },
    recommendations: [
      {
        id: 1,
        type: 'cost',
        title: 'Tối ưu chi phí nhân sự',
        description: 'Chuyển 20% ca chiều sang ca sáng để giảm 12% chi phí',
        impact: 'Tiết kiệm ~5.8M VNĐ/tháng',
        status: 'high'
      },
      {
        id: 2,
        type: 'staffing',
        title: 'Chuẩn bị nhân sự Tết',
        description: 'Dự kiến tăng 35% nhu cầu trong 2 tuần tới',
        impact: 'Cần thêm 58 công nhân',
        status: 'urgent'
      },
      {
        id: 3,
        type: 'quality',
        title: 'Cải thiện tỷ lệ hoàn thành',
        description: 'Đào tạo thêm kỹ năng cho 15 công nhân hiệu suất thấp',
        impact: 'Tăng 8% năng suất',
        status: 'medium'
      }
    ]
  };

  const performanceMetrics = {
    thisMonth: {
      totalWorkers: 145,
      avgAttendance: 92,
      avgRating: 4.6,
      completionRate: 94,
      turnoverRate: 8
    },
    lastMonth: {
      totalWorkers: 138,
      avgAttendance: 89,
      avgRating: 4.4,
      completionRate: 91,
      turnoverRate: 12
    }
  };

  const costBreakdown = [
    { category: 'Lương ca sáng', amount: 18.5, percent: 44, trend: '+3%' },
    { category: 'Lương ca chiều', amount: 15.2, percent: 36, trend: '+5%' },
    { category: 'Lương ca đêm', amount: 6.8, percent: 16, trend: '-2%' },
    { category: 'Thưởng & phụ cấp', amount: 2.0, percent: 4, trend: '+8%' }
  ];

  const topPerformers = [
    { name: 'Nguyễn Văn An', rating: 4.9, jobs: 47, attendance: 98, efficiency: 96 },
    { name: 'Trần Thị Bình', rating: 4.8, jobs: 52, attendance: 96, efficiency: 94 },
    { name: 'Lê Văn Công', rating: 4.7, jobs: 38, attendance: 94, efficiency: 92 },
    { name: 'Phạm Thị Dung', rating: 4.6, jobs: 41, attendance: 93, efficiency: 90 },
    { name: 'Hoàng Văn Em', rating: 4.5, jobs: 35, attendance: 92, efficiency: 88 }
  ];

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous * 100).toFixed(1);
    return parseFloat(change);
  };

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
                <span className="font-semibold">Quay lại Dashboard</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Báo cáo chuyên sâu & Dự báo</h1>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600">
                  Pro
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">7 ngày qua</SelectItem>
                  <SelectItem value="month">30 ngày qua</SelectItem>
                  <SelectItem value="quarter">90 ngày qua</SelectItem>
                  <SelectItem value="year">12 tháng qua</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Forecast Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900">Dự báo AI cho tháng tới</h2>
            <Badge variant="outline" className="ml-2">
              Độ tin cậy: {forecastData.nextMonth.confidence}%
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-900">{forecastData.nextMonth.expectedWorkers}</p>
                    <Badge className="mt-1 bg-blue-200 text-blue-800">
                      {forecastData.nextMonth.trend}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-blue-700 font-medium">Dự kiến số công nhân</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-900">₫{forecastData.nextMonth.expectedCost}M</p>
                    <Badge className="mt-1 bg-green-200 text-green-800">
                      {forecastData.nextMonth.trend}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-green-700 font-medium">Dự kiến chi phí</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-purple-600" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-900">{forecastData.nextMonth.confidence}%</p>
                    <Badge className="mt-1 bg-purple-200 text-purple-800">
                      Độ chính xác cao
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-purple-700 font-medium">Độ tin cậy dự báo</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Đề xuất từ AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecastData.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-lg border-2 ${rec.status === 'urgent'
                      ? 'bg-red-50 border-red-200'
                      : rec.status === 'high'
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-blue-50 border-blue-200'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {rec.status === 'urgent' ? (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        ) : rec.status === 'high' ? (
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      </div>
                      <Badge
                        className={`${rec.status === 'urgent'
                          ? 'bg-red-200 text-red-800'
                          : rec.status === 'high'
                            ? 'bg-orange-200 text-orange-800'
                            : 'bg-blue-200 text-blue-800'
                          }`}
                      >
                        {rec.status === 'urgent' ? 'Khẩn cấp' : rec.status === 'high' ? 'Cao' : 'Trung bình'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      {rec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="cursor-pointer">Tổng quan</TabsTrigger>
            <TabsTrigger value="costs" className="cursor-pointer">Chi phí</TabsTrigger>
            <TabsTrigger value="performance" className="cursor-pointer">Hiệu suất</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    So sánh hiệu suất
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Số lượng công nhân</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{performanceMetrics.thisMonth.totalWorkers}</span>
                          <Badge className="bg-green-100 text-green-700">
                            +{performanceMetrics.thisMonth.totalWorkers - performanceMetrics.lastMonth.totalWorkers}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(performanceMetrics.thisMonth.totalWorkers / 200) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tỷ lệ điểm danh</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{performanceMetrics.thisMonth.avgAttendance}%</span>
                          <Badge className="bg-green-100 text-green-700">
                            +{performanceMetrics.thisMonth.avgAttendance - performanceMetrics.lastMonth.avgAttendance}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${performanceMetrics.thisMonth.avgAttendance}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{performanceMetrics.thisMonth.completionRate}%</span>
                          <Badge className="bg-green-100 text-green-700">
                            +{performanceMetrics.thisMonth.completionRate - performanceMetrics.lastMonth.completionRate}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${performanceMetrics.thisMonth.completionRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tỷ lệ nghỉ việc</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{performanceMetrics.thisMonth.turnoverRate}%</span>
                          <Badge className="bg-green-100 text-green-700">
                            -{performanceMetrics.lastMonth.turnoverRate - performanceMetrics.thisMonth.turnoverRate}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${performanceMetrics.thisMonth.turnoverRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Top 5 công nhân xuất sắc
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((worker, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{worker.name}</p>
                            <p className="text-xs text-gray-600">{worker.jobs} việc • {worker.attendance}% điểm danh</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-600">
                            <span className="font-semibold">{worker.rating}</span>
                            <span className="text-sm">⭐</span>
                          </div>
                          <p className="text-xs text-gray-600">{worker.efficiency}% hiệu suất</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Phân tích chi phí chi tiết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">₫{item.amount}M</span>
                          <Badge className={`${item.trend.startsWith('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                              }`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        <span className="absolute right-2 top-0 text-xs font-medium text-gray-700">
                          {item.percent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">Tổng chi phí</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₫{costBreakdown.reduce((sum, item) => sum + item.amount, 0).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng điểm danh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Trung bình tháng này</p>
                        <p className="text-3xl font-bold text-green-700">92%</p>
                      </div>
                      <TrendingUp className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Tăng 3% so với tháng trước. Xu hướng tích cực, duy trì tốt.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Đánh giá trung bình</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Điểm trung bình</p>
                        <p className="text-3xl font-bold text-yellow-700">{performanceMetrics.thisMonth.avgRating} ⭐</p>
                      </div>
                      <TrendingUp className="w-12 h-12 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Tăng 0.2 điểm so với tháng trước. Chất lượng công nhân đang được cải thiện.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
