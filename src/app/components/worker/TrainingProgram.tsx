import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  MapPin,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  ArrowLeft,
  Search,
  Filter,
  GraduationCap,
  Star,
  Building2,
  Phone,
  Mail,
  AlertCircle
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

interface TrainingProgramProps {
  onBack: () => void;
}

interface Course {
  id: number;
  title: string;
  school: string;
  schoolLogo: string;
  duration: string;
  schedule: string;
  location: string;
  fee: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  rating: number;
  reviews: number;
  level: 'basic' | 'intermediate' | 'advanced';
  category: string;
  description: string;
  skills: string[];
  benefits: string[];
  requirements: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

const trainingCourses: Course[] = [
  {
    id: 1,
    title: 'Kỹ năng may vá cơ bản đến nâng cao',
    school: 'Trung tâm Dạy nghề May Hà Nội',
    schoolLogo: '🧵',
    duration: '3 tuần',
    schedule: 'Thứ 2, 4, 6 (18:00 - 21:00)',
    location: 'Số 123 Đường Láng, Đống Đa, Hà Nội',
    fee: 'Miễn phí',
    startDate: '2026-01-15',
    endDate: '2026-02-05',
    capacity: 30,
    enrolled: 18,
    rating: 4.8,
    reviews: 124,
    level: 'basic',
    category: 'Kỹ năng thủ công',
    description: 'Khóa học từ cơ bản đến nâng cao về may vá, sửa chữa quần áo, vận hành máy may công nghiệp. Phù hợp cho người muốn làm việc tại xưởng may hoặc tự kinh doanh.',
    skills: ['Vận hành máy may', 'Đọc bản vẽ mẫu', 'Cắt may cơ bản', 'Sửa chữa quần áo'],
    benefits: [
      'Cấp chứng chỉ nghề may',
      'Giới thiệu việc làm tại các xưởng may',
      'Được thực hành với máy móc hiện đại',
      'Miễn phí tài liệu và vật tư thực hành'
    ],
    requirements: ['Khéo tay', 'Tỉ mỉ, cẩn thận', 'Không cần kinh nghiệm'],
    contact: {
      phone: '024 3733 xxxx',
      email: 'daotao@may-hanoi.edu.vn',
      address: 'Số 123 Đường Láng, Đống Đa, Hà Nội'
    }
  },
  {
    id: 2,
    title: 'Lái xe nâng & Vận hành máy móc',
    school: 'Trung tâm Đào tạo Kỹ thuật',
    schoolLogo: '🚜',
    duration: '4 tuần',
    schedule: 'Thứ 2-6 (13:00 - 16:00)',
    location: 'Khu công nghiệp Thăng Long, Hà Nội',
    fee: '1,500,000 VNĐ',
    startDate: '2026-01-08',
    endDate: '2026-02-05',
    capacity: 15,
    enrolled: 12,
    rating: 4.9,
    reviews: 156,
    level: 'intermediate',
    category: 'Kỹ thuật - Vận hành',
    description: 'Đào tạo vận hành xe nâng, xe đẩy điện, máy móc kho bãi. Bao gồm cả phần lý thuyết và thực hành tại kho thực tế.',
    skills: ['Lái xe nâng', 'Vận hành máy móc', 'Bảo trì cơ bản', 'An toàn lao động'],
    benefits: [
      'Cấp giấy phép lái xe nâng',
      'Cam kết việc làm lương 8-12 triệu/tháng',
      'Bảo hiểm trong quá trình học',
      'Hỗ trợ trả góp học phí'
    ],
    requirements: ['Có GPLX hạng B1', 'Sức khỏe tốt', 'Không sợ độ cao'],
    contact: {
      phone: '024 3888 xxxx',
      email: 'lienhe@technical-training.vn',
      address: 'Khu công nghiệp Thăng Long, Hà Nội'
    }
  },
  {
    id: 3,
    title: 'Kỹ năng hàn cắt kim loại chuyên nghiệp',
    school: 'Trung tâm Đào tạo Kỹ thuật Công nghiệp',
    schoolLogo: '🔧',
    duration: '5 tuần',
    schedule: 'Thứ 2-6 (08:00 - 12:00)',
    location: 'Khu công nghiệp Bắc Ninh',
    fee: '2,000,000 VNĐ',
    startDate: '2026-01-10',
    endDate: '2026-02-14',
    capacity: 20,
    enrolled: 15,
    rating: 4.7,
    reviews: 89,
    level: 'intermediate',
    category: 'Kỹ thuật',
    description: 'Khóa học đào tạo kỹ năng hàn điện, hàn khí, hàn CO2, cắt kim loại. Phù hợp cho người muốn làm việc tại nhà máy, xưởng cơ khí.',
    skills: ['Hàn điện', 'Hàn khí', 'Hàn CO2', 'Cắt kim loại', 'Đọc bản vẽ kỹ thuật'],
    benefits: [
      'Cấp chứng chỉ thợ hàn quốc gia',
      'Cam kết việc làm lương 10-15 triệu/tháng',
      'Thực hành với thiết bị hiện đại',
      'Hỗ trợ trả góp học phí 0% lãi suất'
    ],
    requirements: ['Sức khỏe tốt', 'Không sợ nhiệt độ cao', 'Có khả năng làm việc độc lập'],
    contact: {
      phone: '024 3555 xxxx',
      email: 'daotao@industrial-tech.vn',
      address: 'Khu công nghiệp Bắc Ninh'
    }
  },
  {
    id: 4,
    title: 'Thợ điện công nghiệp & Bảo trì',
    school: 'Trường Cao đẳng Công nghệ',
    schoolLogo: '⚡',
    duration: '6 tuần',
    schedule: 'Thứ 3, 5, 7 (14:00 - 17:00)',
    location: 'Số 456 Giải Phóng, Hai Bà Trưng, Hà Nội',
    fee: '2,500,000 VNĐ',
    startDate: '2026-01-20',
    endDate: '2026-03-03',
    capacity: 18,
    enrolled: 14,
    rating: 4.9,
    reviews: 112,
    level: 'intermediate',
    category: 'Kỹ thuật điện',
    description: 'Đào tạo kiến thức và kỹ năng thực hành về điện công nghiệp, lắp đặt hệ thống điện, bảo trì và sửa chữa thiết bị điện.',
    skills: ['Đọc sơ đồ điện', 'Lắp đặt hệ thống điện', 'Bảo trì thiết bị', 'An toàn điện', 'Xử lý sự cố'],
    benefits: [
      'Cấp chứng chỉ thợ điện công nghiệp',
      'Cam kết việc làm lương 12-18 triệu/tháng',
      'Được thực hành tại nhà máy thực tế',
      'Tặng bộ dụng cụ điện cơ bản'
    ],
    requirements: ['Tốt nghiệp THPT', 'Biết cơ bản về điện', 'Cẩn thận, tuân thủ quy định'],
    contact: {
      phone: '024 3974 xxxx',
      email: 'tuyensinh@tech-college.edu.vn',
      address: 'Số 456 Giải Phóng, Hai Bà Trưng, Hà Nội'
    }
  },
  {
    id: 5,
    title: 'Thợ mộc & Thi công nội thất',
    school: 'Trung tâm Dạy nghề Mộc Việt',
    schoolLogo: '🪚',
    duration: '4 tuần',
    schedule: 'Cuối tuần (09:00 - 16:00)',
    location: 'Số 321 Cầu Giấy, Hà Nội',
    fee: '1,800,000 VNĐ',
    startDate: '2026-01-18',
    endDate: '2026-02-15',
    capacity: 25,
    enrolled: 18,
    rating: 4.8,
    reviews: 78,
    level: 'basic',
    category: 'Thủ công - Xây dựng',
    description: 'Đào tạo kỹ năng đóng đồ gỗ, thi công nội thất, sơn PU, đọc bản vẽ thi công. Phù hợp cho người muốn làm việc tại xưởng mộc hoặc tự kinh doanh.',
    skills: ['Đóng đồ gỗ', 'Thi công nội thất', 'Sơn PU', 'Đọc bản vẽ', 'Lắp đặt đồ gỗ'],
    benefits: [
      'Cấp chứng chỉ thợ mộc',
      'Giới thiệu việc làm lương 10-15 triệu/tháng',
      'Thực hành với dụng cụ chuyên nghiệp',
      'Hỗ trợ vốn khởi nghiệp cho học viên xuất sắc'
    ],
    requirements: ['Khéo tay', 'Sức khỏe tốt', 'Ham học hỏi'],
    contact: {
      phone: '1900 xxxx',
      email: 'daotao@mocviet.vn',
      address: 'Số 321 Cầu Giấy, Hà Nội'
    }
  }
];

export function TrainingProgram({ onBack }: TrainingProgramProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = trainingCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.school.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollDialog(true);
  };

  const confirmEnroll = () => {
    if (selectedCourse) {
      setEnrolledCourses([...enrolledCourses, selectedCourse.id]);
      setShowEnrollDialog(false);
      setSelectedCourse(null);
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      basic: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      advanced: 'bg-purple-100 text-purple-700'
    };
    const labels = {
      basic: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao'
    };
    return { color: colors[level as keyof typeof colors], label: labels[level as keyof typeof labels] };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-100 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại Dashboard</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Chương trình Đào tạo Nghề</h1>
          </div>
          <p className="text-blue-100">
            Nâng cao kỹ năng, mở rộng cơ hội việc làm với các khóa học chất lượng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Tìm kiếm khóa học, trường học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* My Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                Khóa học đã đăng ký ({enrolledCourses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingCourses
                  .filter(course => enrolledCourses.includes(course.id))
                  .map((course) => (
                    <div key={course.id} className="bg-white rounded-lg p-4 border-2 border-green-300">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{course.schoolLogo}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{course.school}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Bắt đầu: {new Date(course.startDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{course.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">{course.location}</span>
                            </div>
                          </div>
                          <Badge className="mt-2 bg-green-600">Đã đăng ký</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const levelBadge = getLevelBadge(course.level);
            const isEnrolled = enrolledCourses.includes(course.id);
            const spotsLeft = course.capacity - course.enrolled;

            return (
              <Card key={course.id} className={`hover:shadow-lg transition-shadow ${isEnrolled ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{course.schoolLogo}</div>
                      <div>
                        <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {course.school}
                        </p>
                      </div>
                    </div>
                    <Badge className={levelBadge.color}>{levelBadge.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-500">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolled}/{course.capacity}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Thời lượng:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span><strong>Lịch học:</strong> {course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="line-clamp-1"><strong>Địa điểm:</strong> {course.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{course.fee}</p>
                      {spotsLeft <= 5 && spotsLeft > 0 && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Chỉ còn {spotsLeft} chỗ
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleEnroll(course)}
                      disabled={isEnrolled || spotsLeft === 0}
                      className={`cursor-pointer ${isEnrolled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {isEnrolled ? 'Đã đăng ký' : spotsLeft === 0 ? 'Hết chỗ' : 'Đăng ký ngay'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Không tìm thấy khóa học phù hợp</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enroll Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Xác nhận đăng ký khóa học</DialogTitle>
            <DialogDescription>
              Vui lòng xem kỹ thông tin khóa học trước khi đăng ký
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-5xl">{selectedCourse.schoolLogo}</div>
                <div>
                  <h3 className="font-bold text-lg">{selectedCourse.title}</h3>
                  <p className="text-gray-600">{selectedCourse.school}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thời lượng</p>
                  <p className="font-medium">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Học phí</p>
                  <p className="font-medium text-blue-600">{selectedCourse.fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ngày bắt đầu</p>
                  <p className="font-medium">{new Date(selectedCourse.startDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ngày kết thúc</p>
                  <p className="font-medium">{new Date(selectedCourse.endDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Lịch học</p>
                <p className="font-medium">{selectedCourse.schedule}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Địa điểm</p>
                <p className="font-medium">{selectedCourse.location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Kỹ năng đạt được</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Quyền lợi</p>
                <ul className="space-y-1">
                  {selectedCourse.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Yêu cầu</p>
                <ul className="space-y-1">
                  {selectedCourse.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Thông tin liên hệ</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span>{selectedCourse.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span>{selectedCourse.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span>{selectedCourse.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnrollDialog(false)} className="cursor-pointer">
              Hủy
            </Button>
            <Button onClick={confirmEnroll} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              Xác nhận đăng ký
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
