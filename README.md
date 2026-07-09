# 🚀 AWS Observability & Security Dashboard

Hệ thống Giám sát Hạ tầng và Cảnh báo An ninh (Security Operation Center - SOC) giả lập các dịch vụ của AWS, cung cấp bảng điều khiển Đa màn hình với chức năng phát hiện bất thường bằng AI (Anomaly Detection), Bản đồ Tấn công (Threat Map) và Phân quyền thao tác (RBAC).

---

## 🛠 Ngôn Ngữ & Công Nghệ (Tech Stack)

### 1. Frontend (Giao diện người dùng)
* **Framework:** ReactJS (Khởi tạo bằng Vite cho tốc độ build siêu tốc).
* **Styling:** TailwindCSS (Hỗ trợ thiết kế Glassmorphism và Dark Mode).
* **Biểu đồ (Charts):** Recharts (Vẽ biểu đồ lưu lượng và dự báo AI).
* **Bản đồ (Maps):** React-Simple-Maps (Vẽ bản đồ định vị IP tấn công).
* **Icon:** Lucide-React.
* **Routing & Auth:** React-Router-DOM và Context API.

### 2. Backend (Máy chủ API)
* **Môi trường:** Node.js (Version >= 18).
* **Framework:** Express.js (Xử lý API Gateway).
* **Bảo mật:** `jsonwebtoken` (JWT) để cấp quyền truy cập, `bcryptjs` để mã hóa mật khẩu.
* **Cơ sở dữ liệu (Database):** MongoDB (Mongoose ORM).

---

## 💻 Yêu Cầu Cài Đặt (Prerequisites)

Trước khi tải dự án, máy tính của bạn cần cài đặt sẵn:
1. [Node.js](https://nodejs.org/en) (Phiên bản v18 trở lên).
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Hoặc sử dụng MongoDB Compass để quản lý cục bộ). Đảm bảo dịch vụ MongoDB đang chạy ở cổng mặc định `27017`.
3. [Git](https://git-scm.com/) (Để tải mã nguồn).

---

## ⚙️ Hướng Dẫn Cài Đặt & Khởi Chạy (Setup Guide)

### Bước 1: Clone Mã Nguồn
Mở Terminal (Command Prompt / PowerShell) và gõ lệnh:
```bash
git clone https://github.com/HuynhTuan9251/WebAws.git
cd WebAws
```

### Bước 2: Cài Đặt và Chạy Backend
Mở một tab Terminal mới:
```bash
cd backend
npm install
npm start
```
*Ghi chú: Nếu thành công, bạn sẽ thấy dòng chữ `🚀 Đã kết nối MongoDB thành công!` và hệ thống sẽ tự động sinh ra Cơ sở dữ liệu tên là `aws_monitor` với hàng trăm bản ghi mẫu.*

### Bước 3: Cài Đặt và Chạy Frontend
Mở một tab Terminal khác (giữ nguyên tab Backend):
```bash
cd frontend
npm install
npm run dev
```
*Ghi chú: Ứng dụng React sẽ khởi chạy tại địa chỉ `http://localhost:5173/`.*

---

## 🔐 Cơ Sở Dữ Liệu & Tài Khoản Đăng Nhập

Hệ thống được thiết kế theo chuẩn bảo mật đa phân quyền (RBAC). CSDL MongoDB khi khởi chạy lần đầu đã **tự động tạo (Seeding)** 4 tài khoản mặc định.

Bạn có thể truy cập `http://localhost:5173/`, sử dụng mật khẩu chung là **`123456`** cho các tài khoản sau:

| Tên Đăng Nhập | Vai trò (Role) | Chức năng (Permissions) |
| :--- | :--- | :--- |
| **`netadmin`** | **Network Admin** | Chỉ xem Tổng quan và Nhật ký lưu lượng (Filter Protocols). Bị khóa quyền sửa cảnh báo. |
| **`secops`** | **Security Operator** | Xem Tổng quan và Cảnh báo an ninh. **Được phép** thay đổi trạng thái sự cố. |
| **`manager`** | **Project Manager** | Giám sát toàn bộ các trang nhưng **chỉ được Đọc (Read-only)**. Mọi nút bấm bị vô hiệu hóa. |
| **`admin`** | **System Admin** | Toàn quyền kiểm soát hệ thống. |

---

## 🎯 Tính Năng Cốt Lõi Của Đồ Án
1. **Infrastructure Health**: Giả lập thông số CPU, RAM thay đổi theo thời gian thực như CloudWatch.
2. **AI Anomaly Detection**: Giả lập thuật toán phát hiện bất thường của AWS Lookout for Metrics.
3. **Network Traffic Console**: Bảng xếp hạng Top IPs ngốn băng thông, lọc chi tiết theo giao thức TCP/UDP/HTTP.
4. **JWT Authentication & UI Protection**: Ngăn chặn tuyệt đối việc xâm nhập từ URL nếu không có khóa Token.
