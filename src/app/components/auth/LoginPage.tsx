import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'worker' | 'employer') => void;
  defaultRole?: 'worker' | 'employer';
}

export function LoginPage({ onLogin, defaultRole = 'worker' }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'worker' | 'employer'>(defaultRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Green section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-green-600 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <div className="text-8xl">✓</div>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6">Đăng nhập</h2>
          <p className="text-lg text-white/90">
            FlashJob sẽ giúp bạn tìm được nhân sự phù hợp nhanh chóng và hiệu quả. Đăng ký tài khoản ngay để có thể quản lý tin đăng và thông tin ứng tuyển vào các vị trí của bạn.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src="/src/assets/images/logo.png" alt="FlashJob" className="w-10 h-10" />
                <h1 className="text-green-600 text-3xl font-bold">FlashJob</h1>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Điền thông tin đăng nhập</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Bạn là:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('worker')}
                    className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${selectedRole === 'worker'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">👷</span>
                      {selectedRole === 'worker' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">Người tìm việc</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('employer')}
                    className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${selectedRole === 'employer'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">🏢</span>
                      {selectedRole === 'employer' && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">Nhà tuyển dụng</p>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tài khoản hoặc Email đăng nhập:
                </label>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mật khẩu:
                </label>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className={`w-full h-12 text-white text-base font-semibold cursor-pointer ${selectedRole === 'worker'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                ĐĂNG NHẬP
              </Button>

              {/* Links */}
              <div className="space-y-3 text-center">
                <p className="text-sm">
                  Bạn{' '}
                  <button type="button" className="text-green-600 hover:underline cursor-pointer">
                    quên mật khẩu
                  </button>
                  ?
                </p>
                <p className="text-sm">
                  Bạn chưa có tài khoản?{' '}
                  <button type="button" className="text-green-600 hover:underline cursor-pointer">
                    Đăng ký
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
