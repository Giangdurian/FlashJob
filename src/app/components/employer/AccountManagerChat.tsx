import React, { useState } from 'react';
import { X, Send, MessageCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'manager';
  timestamp: Date;
}

interface AccountManagerChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountManagerChat({ isOpen, onClose }: AccountManagerChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là Account Manager của bạn. Tôi có thể giúp gì cho bạn?',
      sender: 'manager',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Auto-reply from manager after 1 second
    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        text: 'Cảm ơn bạn đã liên hệ! Tôi đã ghi nhận yêu cầu của bạn và sẽ phản hồi trong thời gian sớm nhất.',
        sender: 'manager',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Account Manager</h3>
            <p className="text-xs text-blue-100">Hỗ trợ doanh nghiệp</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
                }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
              >
                {message.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex items-center gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Thời gian phản hồi: Trong 24h
        </p>
      </div>
    </div>
  );
}

// Chat Button Component
export function AccountManagerChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-40"
      title="Chat với Account Manager"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
