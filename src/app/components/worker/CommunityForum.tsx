import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Search,
  Plus,
  TrendingUp,
  CheckCircle2,
  User,
  Clock,
  Tag,
  Star,
  Filter,
  Award,
  Eye
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

interface CommunityForumProps {
  onBack: () => void;
}

interface Question {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  };
  category: string;
  date: string;
  views: number;
  likes: number;
  answers: number;
  tags: string[];
  status: 'open' | 'answered' | 'solved';
  bestAnswer?: {
    author: string;
    content: string;
    likes: number;
  };
}

const mockQuestions: Question[] = [
  {
    id: 1,
    title: 'Công ty chậm trả lương thì phải làm sao?',
    content: 'Mình làm việc được 2 tháng rồi nhưng công ty vẫn chưa trả lương tháng đầu. Mình nên làm gì?',
    author: {
      name: 'Nguyễn Văn A',
      avatar: 'NVA',
      reputation: 120,
      verified: true
    },
    category: 'salary',
    date: '2025-12-23',
    views: 245,
    likes: 18,
    answers: 5,
    tags: ['Lương', 'Hợp đồng', 'Quyền lợi'],
    status: 'solved',
    bestAnswer: {
      author: 'Chuyên gia FlashJob',
      content: 'Theo Bộ luật Lao động 2019, người sử dụng lao động phải trả lương đầy đủ, đúng hạn. Bạn nên: 1) Gửi văn bản yêu cầu trả lương, 2) Liên hệ FlashJob để được hỗ trợ, 3) Nếu không được giải quyết, có thể khiếu nại lên Sở Lao động.',
      likes: 42
    }
  },
  {
    id: 2,
    title: 'Làm thế nào để tìm việc tốt hơn trên FlashJob?',
    content: 'Mình mới dùng app, muốn biết tips để tìm được việc lương cao hơn',
    author: {
      name: 'Trần Thị B',
      avatar: 'TTB',
      reputation: 85,
      verified: false
    },
    category: 'tips',
    date: '2025-12-22',
    views: 156,
    likes: 12,
    answers: 8,
    tags: ['Tìm việc', 'Tips', 'Lương'],
    status: 'answered'
  },
  {
    id: 3,
    title: 'Công ty yêu cầu làm thêm giờ không trả công, có đúng luật không?',
    content: 'Sếp bắt làm thêm 2-3 tiếng mỗi ngày nhưng không trả lương OT. Vậy có vi phạm không?',
    author: {
      name: 'Lê Văn C',
      avatar: 'LVC',
      reputation: 200,
      verified: true
    },
    category: 'labor_law',
    date: '2025-12-21',
    views: 389,
    likes: 34,
    answers: 12,
    tags: ['Luật lao động', 'Làm thêm giờ', 'Quyền lợi'],
    status: 'solved'
  },
  {
    id: 4,
    title: 'Chia sẻ kinh nghiệm làm việc tại nhà máy may',
    content: 'Mình làm công nhân may được 5 năm, có kinh nghiệm muốn chia sẻ cho ae mới vào nghề',
    author: {
      name: 'Phạm Thị D',
      avatar: 'PTD',
      reputation: 450,
      verified: true
    },
    category: 'experience',
    date: '2025-12-20',
    views: 512,
    likes: 67,
    answers: 23,
    tags: ['May mặc', 'Kinh nghiệm', 'Kỹ năng'],
    status: 'answered'
  }
];

const categories = [
  { value: 'all', label: '📋 Tất cả', count: 156 },
  { value: 'salary', label: '💰 Lương & Phúc lợi', count: 42 },
  { value: 'labor_law', label: '⚖️ Luật lao động', count: 38 },
  { value: 'tips', label: '💡 Mẹo tìm việc', count: 24 },
  { value: 'experience', label: '📖 Kinh nghiệm', count: 31 },
  { value: 'safety', label: '⚠️ An toàn lao động', count: 15 },
  { value: 'other', label: '📝 Khác', count: 6 }
];

export function CommunityForum({ onBack }: CommunityForumProps) {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAskDialog, setShowAskDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { label: 'Chưa trả lời', color: 'bg-gray-100 text-gray-700' },
      answered: { label: 'Đã trả lời', color: 'bg-blue-100 text-blue-700' },
      solved: { label: 'Đã giải quyết', color: 'bg-green-100 text-green-700' }
    };
    return badges[status as keyof typeof badges];
  };

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find(c => c.value === categoryValue);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskQuestion = () => {
    const question: Question = {
      id: questions.length + 1,
      title: newQuestion.title,
      content: newQuestion.content,
      author: {
        name: 'Bạn',
        avatar: 'YOU',
        reputation: 10,
        verified: false
      },
      category: newQuestion.category,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      answers: 0,
      tags: newQuestion.tags.split(',').map(t => t.trim()),
      status: 'open'
    };

    setQuestions([question, ...questions]);
    setShowAskDialog(false);
    setNewQuestion({ title: '', content: '', category: '', tags: '' });
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
            <span>Quay lại</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Cộng đồng & Hỏi đáp</h1>
          </div>
          <p className="text-blue-100">
            Chia sẻ kinh nghiệm - Học hỏi từ cộng đồng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Câu hỏi</span>
                  <span className="font-bold text-xl">{questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thành viên</span>
                  <span className="font-bold text-xl">2,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chuyên gia</span>
                  <span className="font-bold text-xl">38</span>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Danh mục
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${selectedCategory === cat.value
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.label}</span>
                      <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Đóng góp nhiều nhất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Nguyễn Văn Expert', points: 1250, badge: '🥇' },
                  { name: 'Trần Thị Helper', points: 980, badge: '🥈' },
                  { name: 'Lê Văn Pro', points: 750, badge: '🥉' }
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xl">{user.badge}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.points} điểm</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Action Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm câu hỏi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={() => setShowAskDialog(true)}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Đặt câu hỏi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => {
                const statusBadge = getStatusBadge(question.status);
                const categoryInfo = getCategoryInfo(question.category);

                return (
                  <Card key={question.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {/* Stats Column */}
                        <div className="flex flex-col items-center gap-2 min-w-[80px]">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">{question.views}</span>
                            </div>
                            <p className="text-xs text-gray-500">lượt xem</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-blue-600">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm font-medium">{question.likes}</span>
                            </div>
                            <p className="text-xs text-gray-500">thích</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-green-600">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">{question.answers}</span>
                            </div>
                            <p className="text-xs text-gray-500">trả lời</p>
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge className={statusBadge.color}>
                              {statusBadge.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {categoryInfo?.label}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                            {question.title}
                          </h3>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {question.content}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Best Answer Preview */}
                          {question.bestAnswer && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-medium text-green-700">
                                  Câu trả lời hay nhất từ {question.bestAnswer.author}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {question.bestAnswer.content}
                              </p>
                              <div className="flex items-center gap-1 mt-2 text-green-600">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{question.bestAnswer.likes} người thấy hữu ích</span>
                              </div>
                            </div>
                          )}

                          {/* Author Info */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                                {question.author.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium text-gray-900">{question.author.name}</span>
                                  {question.author.verified && (
                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{question.author.reputation} điểm</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">
                                {new Date(question.date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredQuestions.length === 0 && (
                <Card>
                  <CardContent className="pt-12 pb-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Không tìm thấy câu hỏi nào</p>
                    <p className="text-sm text-gray-500">
                      Hãy thử tìm kiếm với từ khóa khác hoặc đặt câu hỏi mới
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Dialog */}
      <Dialog open={showAskDialog} onOpenChange={setShowAskDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Đặt câu hỏi mới
            </DialogTitle>
            <DialogDescription>
              Mô tả vấn đề của bạn để cộng đồng có thể hỗ trợ tốt nhất
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tiêu đề câu hỏi *
              </label>
              <Input
                placeholder="Vấn đề của bạn là gì?"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Nên bắt đầu bằng "Làm thế nào...", "Tại sao...", "Có phải..."
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Danh mục *
              </label>
              <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.value !== 'all').map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Nội dung chi tiết *
              </label>
              <Textarea
                placeholder="Mô tả chi tiết vấn đề của bạn: Tình huống như thế nào? Bạn đã thử gì? Bạn mong muốn điều gì?..."
                value={newQuestion.content}
                onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                rows={8}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tags (tách nhau bằng dấu phẩy)
              </label>
              <Input
                placeholder="VD: Lương, Hợp đồng, Quyền lợi"
                value={newQuestion.tags}
                onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Thêm tối đa 5 tags để người khác dễ tìm câu hỏi của bạn
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Tips để có câu trả lời tốt:</p>
                  <ul className="space-y-1 text-xs list-disc list-inside">
                    <li>Viết tiêu đề rõ ràng, dễ hiểu</li>
                    <li>Mô tả chi tiết tình huống</li>
                    <li>Nêu rõ những gì bạn đã thử</li>
                    <li>Tôn trọng và lịch sự với mọi người</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAskDialog(false)}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              onClick={handleAskQuestion}
              disabled={!newQuestion.title || !newQuestion.content || !newQuestion.category}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Đăng câu hỏi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
