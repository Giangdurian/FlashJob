# B2B SaaS Staffing Dashboard - Hướng Dẫn Cài Đặt và Chạy Project

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 18.x hoặc cao hơn
- **npm** hoặc **pnpm**: Package manager
- **Git**: Để clone và quản lý source code

## 🚀 Cách Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd "B2B SaaS Staffing Dashboard"
```

### 2. Cài Đặt Dependencies

Sử dụng npm:
```bash
npm install
```

Hoặc sử dụng pnpm (khuyến nghị):
```bash
pnpm install
```

### 3. Cấu Hình Environment Variables (Nếu cần)

Tạo file `.env` trong thư mục root và thêm các biến môi trường cần thiết:
```env
# Thêm các biến môi trường của bạn ở đây
# Ví dụ:
# VITE_API_URL=http://localhost:3000
```

## 💻 Chạy Project

### Development Mode (Chế độ phát triển)

```bash
npm run dev
```

Hoặc với pnpm:
```bash
pnpm dev
```

Project sẽ chạy tại `http://localhost:5173` (hoặc port khác nếu 5173 đang được sử dụng)

### Build Production

Để build project cho production:

```bash
npm run build
```

Hoặc với pnpm:
```bash
pnpm build
```

Các file build sẽ được tạo trong thư mục `dist/`

### Preview Build

Để xem trước bản build production:

```bash
npm run preview
```

## 📁 Cấu Trúc Project

```
B2B SaaS Staffing Dashboard/
├── src/
│   ├── app/
│   │   ├── components/       # Các components chính
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── employer/     # Employer dashboard components
│   │   │   ├── worker/       # Worker dashboard components
│   │   │   └── ui/           # UI components (shadcn/ui)
│   ├── assets/               # Images và assets khác
│   ├── data/                 # Data files (JSON, etc.)
│   └── styles/               # CSS và styling files
├── guidelines/               # Project guidelines
├── index.html               # Entry HTML file
├── package.json             # Dependencies và scripts
├── vite.config.ts           # Vite configuration
└── README.md               # Project documentation
```

## 🛠️ Tech Stack

- **React 18.3.1**: UI Library
- **TypeScript**: Type-safe JavaScript
- **Vite 6.3.5**: Build tool và dev server
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Material-UI**: Component library
- **Recharts**: Charting library
- **React Hook Form**: Form management
- **Lucide React**: Icon library

## 🔧 Scripts Có Sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build project cho production
- `npm run preview` - Preview production build

## ❗ Lưu Ý

- Đảm bảo cài đặt đúng phiên bản Node.js (18.x trở lên)
- Nếu gặp lỗi khi install dependencies, thử xóa `node_modules` và file lock (`package-lock.json` hoặc `pnpm-lock.yaml`) rồi cài lại
- Project sử dụng Vite nên hot reload rất nhanh trong development mode

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi cài đặt hoặc chạy project, vui lòng tạo issue trên GitHub repository.

## 📄 License

[Thêm license information nếu có]
