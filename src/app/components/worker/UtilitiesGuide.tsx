import React from 'react';
import {
  FileText,
  BookOpen,
  Video,
  MessageCircle,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Target,
  ArrowLeft,
  Download,
  Star,
  ChevronDown,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UtilitiesGuideProps {
  onBack: () => void;
  onNavigate?: (screen: any) => void;
  onLogout?: () => void;
}

export function UtilitiesGuide({ onBack, onNavigate, onLogout }: UtilitiesGuideProps) {
  const guides = [
    {
      category: 'Hướng dẫn làm việc',
      icon: Target,
      color: 'bg-blue-100 text-blue-600',
      items: [
        { title: 'Cách đăng ký và tìm việc nhanh', icon: FileText, popular: true },
        { title: 'Quy trình nhận việc và làm việc', icon: CheckCircle2, popular: true },
        { title: 'Cách chấm công và xác nhận công việc', icon: Clock, popular: false },
        { title: 'Lưu ý khi làm việc tại các địa điểm', icon: AlertCircle, popular: false }
      ]
    },
    {
      category: 'Lương thưởng & Thanh toán',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      items: [
        { title: 'Cách tính lương theo giờ/ca', icon: Clock, popular: true },
        { title: 'Rút tiền ngay sau ca làm', icon: DollarSign, popular: true },
        { title: 'Các khoản phụ cấp và thưởng', icon: TrendingUp, popular: false },
        { title: 'Giải quyết vấn đề về lương', icon: Shield, popular: false }
      ]
    },
    {
      category: 'Kỹ năng & An toàn',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
      items: [
        { title: 'An toàn lao động cơ bản', icon: Shield, popular: true },
        { title: 'Giao tiếp hiệu quả với quản lý', icon: MessageCircle, popular: false },
        { title: 'Làm việc nhóm hiệu quả', icon: Users, popular: false },
        { title: 'Xử lý tình huống khẩn cấp', icon: AlertCircle, popular: true }
      ]
    }
  ];

  const videos = [
    {
      title: 'Hướng dẫn sử dụng app FlashJob',
      duration: '5:30',
      views: '12K',
      thumbnail: '📱'
    },
    {
      title: 'Cách nhận việc và chấm công',
      duration: '4:15',
      views: '25K',
      thumbnail: '⏰'
    },
    {
      title: 'Rút tiền nhanh sau ca làm',
      duration: '3:20',
      views: '18K',
      thumbnail: '💰'
    },
    {
      title: 'An toàn khi làm việc kho vận',
      duration: '6:45',
      views: '15K',
      thumbnail: '🛡️'
    }
  ];

  const faqs = [
    {
      question: 'Tôi không có kinh nghiệm, có thể làm được không?',
      answer: 'Hoàn toàn có thể! Hầu hết công việc trên FlashJob không yêu cầu kinh nghiệm. Các công ty sẽ hướng dẫn bạn cách làm việc khi bắt đầu ca.'
    },
    {
      question: 'Lương được trả như thế nào?',
      answer: 'Lương được tính theo giờ hoặc theo ca. Bạn có thể rút tiền ngay sau khi hoàn thành ca làm và được xác nhận bởi công ty, tối đa 24 giờ.'
    },
    {
      question: 'Tôi có thể làm việc vào cuối tuần không?',
      answer: 'Có, có rất nhiều công việc vào cuối tuần và ngày lễ. Lương vào những ngày này thường cao hơn ngày thường 1.5-2 lần.'
    },
    {
      question: 'Nếu tôi hủy ca làm thì sao?',
      answer: 'Bạn có thể hủy ca làm trước 24 giờ không bị phạt. Nếu hủy trong vòng 24 giờ hoặc không đến sẽ ảnh hưởng đến uy tín và khả năng nhận việc sau này.'
    },
    {
      question: 'Tôi cần chuẩn bị gì khi đi làm?',
      answer: 'Chỉ cần CMND/CCCD, điện thoại có app FlashJob và trang phục gọn gàng, lịch sự. Một số công việc có thể yêu cầu giày bảo hộ hoặc đồng phục (công ty sẽ cung cấp).'
    },
    {
      question: 'Có bảo hiểm khi làm việc không?',
      answer: 'Tất cả người lao động trên FlashJob đều được bảo hiểm tai nạn trong suốt ca làm việc. Chi tiết bảo hiểm sẽ hiển thị trong thông tin công việc.'
    }
  ];

  const downloadResources = [
    {
      title: 'Hướng dẫn sử dụng FlashJob',
      type: 'PDF',
      size: '2.1 MB',
      downloads: '8.5K'
    },
    {
      title: 'Checklist chuẩn bị đi làm',
      type: 'PDF',
      size: '1.2 MB',
      downloads: '6.2K'
    },
    {
      title: 'Quy định an toàn lao động',
      type: 'PDF',
      size: '3.5 MB',
      downloads: '4.8K'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              <button onClick={() => onNavigate?.('landing')} className="flex items-center gap-2 text-green-600 text-xl font-semibold hover:opacity-80 cursor-pointer">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-8 h-8" />
                FlashJob
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Thông báo
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                      NVA
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">Nguyễn Văn An</span>
                      <span className="text-xs text-gray-500 font-normal">nguyenvanan@email.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate?.('dashboard')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onLogout?.()} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl mb-4">
              Tiện ích & Cẩm nang
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Hướng dẫn đầy đủ cho việc làm ngắn hạn, dễ dàng kiếm tiền mỗi ngày
            </p>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-gray-900">Hướng dẫn cho người lao động</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, idx) => {
              const CategoryIcon = guide.icon;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className={`w-12 h-12 ${guide.color} rounded-lg flex items-center justify-center mb-4`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-4 text-gray-900">{guide.category}</h3>
                  <ul className="space-y-3">
                    {guide.items.map((item, itemIdx) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={itemIdx}>
                          <a
                            href="#"
                            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors group cursor-pointer"
                          >
                            <ItemIcon className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                            <span>{item.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-gray-900">Video hướng dẫn</h2>
            <Button variant="outline">
              Xem tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {video.duration}
                    </span>
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-center text-gray-900">Câu hỏi thường gặp</h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                <summary className="cursor-pointer text-lg text-gray-900 flex items-center justify-between">
                  <span>{faq.question}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-gray-900">Tài liệu tải về</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadResources.map((resource, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg mb-2 text-gray-900">{resource.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Bạn cần hỗ trợ thêm?</h2>
          <p className="text-xl text-white/90 mb-8">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat với chúng tôi
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Gọi hotline: 1900 xxxx
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-green-400 mb-4">FlashJob</h4>
              <p className="text-gray-400">
                Tìm việc linh hoạt và nhận lương hàng ngày. Sự nghiệp của bạn bắt đầu từ đây.
              </p>
            </div>
            <div>
              <h5 className="mb-4">Dành cho người lao động</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tìm việc làm</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Bảng điều khiển</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tải ứng dụng</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Dành cho nhà tuyển dụng</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Đăng tin tuyển dụng</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Tìm người lao động</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Bảng giá</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Hỗ trợ</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Trung tâm hỗ trợ</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Liên hệ</a></li>
                <li><a href="#" className="hover:text-green-400 cursor-pointer">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 FlashJob. Bản quyền thuộc về FlashJob.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
