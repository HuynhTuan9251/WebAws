# Hướng Dẫn Sử Dụng & Kiểm Thử Website (Walkthrough)

Chào mừng bạn đến với Hệ thống Giám sát Hạ tầng AWS (AWS Operations Center). Tài liệu này sẽ hướng dẫn bạn cách thức website hoạt động, cũng như từng bước để kiểm thử (test) mọi chức năng đã được xây dựng.

## 1. Thông Tin Đăng Nhập & Phân Quyền (RBAC)

Để bắt đầu, bạn cần truy cập vào địa chỉ `http://localhost:5173/`. Hệ thống sẽ chặn bạn ở Màn hình Đăng nhập.
Tất cả các tài khoản demo dưới đây đều có chung một Mật khẩu (Password) là: **`123456`**

* **`netadmin`** (Network Admin): Chỉ vào được Tổng quan và Lưu lượng mạng.
* **`secops`** (Security Operator): Chỉ vào được Tổng quan và Cảnh báo an ninh. Có quyền sửa cảnh báo.
* **`manager`** (Project Manager): Vào được mọi trang để giám sát, nhưng các nút thao tác đều bị mờ (disabled).
* **`admin`** (System Admin): Toàn quyền.

> [!TIP]
> **Cách test Phân quyền:** Hãy thử đăng nhập bằng `netadmin` rồi đăng xuất (bấm Đăng xuất ở góc dưới bên trái thanh menu), sau đó đăng nhập bằng `secops` để thấy sự thay đổi xuất hiện và biến mất của các menu trên thanh Sidebar.

---

## 2. Các Chức Năng Cốt Lõi Trên Từng Tab

### 🖥 Tab 1: Tổng Quan Hệ Thống (Dashboard)
Đây là màn hình bao quát dành cho mọi người dùng, tổng hợp các bảng biểu phân tích dữ liệu chuyên sâu.

1. **Infra Health (Sức khỏe Server)**: Kiểm tra các thanh trạng thái CPU, Memory, Disk. *Cách test: Cứ mỗi 5 giây, các thanh CPU/Memory sẽ tự động nhích lên hoặc tụt xuống nhờ dữ liệu real-time được giả lập cập nhật tự động.*
2. **AI Anomaly Detection (Phát hiện bất thường)**: Xem biểu đồ đường so sánh "Forecast" (Dự báo - Nét đứt) và "Actual" (Thực tế - Nét liền). *Cách test: Tìm mốc thời gian có chấm tròn màu đỏ rực rỡ - đó là thời điểm hệ thống AI phát hiện dữ liệu thực tế vượt ngưỡng dự báo và đánh dấu là Bất thường (Anomaly).*
3. **Protocol Pie Chart (Giao thức mạng)**: Biểu đồ phân bổ HTTP/HTTPS/TCP/UDP. *Cách test: Trỏ chuột vào từng mảnh hoặc chú thích bên dưới để thấy tooltip nổi lên.*
4. **Global Threat Map (Bản đồ Tấn công)**: Bản đồ thế giới. *Cách test: Bạn sẽ thấy các chấm đỏ nhấp nháy (Radar pulse). Di chuột vào từng vùng đất để thấy hiệu ứng làm sáng, các chấm đỏ chính là tọa độ giả lập của các IP đang tấn công được quét từ MongoDB.*

### 🛡 Tab 2: Cảnh Báo An Ninh (Security Incidents)
Đây là nơi để đội bảo mật xử lý các lỗ hổng. (Tài khoản `netadmin` sẽ không thấy màn hình này).

1. *Cách test Thao tác*: Hãy đăng nhập bằng tài khoản `secops`. Chú ý ở cột cuối cùng "Action", bạn xổ danh sách Dropdown (đang là chữ New) thành "In Progress", sau đó bấm nút **"Cập nhật"**. 
2. *Cách test Khóa quyền*: Hãy Đăng xuất và đăng nhập lại bằng tài khoản `manager`. Khi vào tab này, bạn sẽ thấy cả ô Dropdown và nút Cập nhật đều bị đóng băng mờ đi (Disabled), bạn chỉ có quyền đọc (Read-only) chứ không thể thao tác!

### 📈 Tab 3: Nhật Ký Lưu Lượng (Network Traffic Logs)
Đây là nơi dành riêng cho đội Quản trị Mạng (NetAdmin) để tra cứu các IP làm nghẽn cổ chai hệ thống.

1. *Cách test Lọc Dữ liệu*: Ở góc trên cùng bên phải, có một bộ lọc **Filter**. Click vào bộ lọc (mặc định là "All Protocols"), đổi sang "TCP" hoặc "HTTP". Bạn sẽ thấy bảng Top Bandwidth Consumers ở dưới ngay lập tức được làm mới lại mà không cần tải trang, chỉ hiển thị danh sách các IP sử dụng TCP!

---

## 3. Website Này Đang Hoạt Động Kỹ Thuật Như Thế Nào?

Về mặt công nghệ (Architecture Flow), luồng dữ liệu diễn ra như sau:

1. **Khởi tạo dữ liệu (Seeding)**: Khi máy chủ Backend Node.js khởi động, nó đã tự động kết nối vào MongoDB (`mongodb://127.0.0.1:27017/aws_monitor`) và sinh ra hơn 200 dữ liệu Log và Cảnh báo (kèm tọa độ địa lý ngẫu nhiên) để cung cấp cho các biểu đồ.
2. **Xác thực (JWT Token)**: Khi bạn điền `netadmin` và `123456`, ReactJS gửi lệnh POST tới Backend. Backend đối chiếu với MongoDB. Nếu đúng mật khẩu (đã được mã hóa bằng thuật toán Bcrypt), Backend tạo ra một mã hóa bảo mật gọi là JWT Token và gửi về Frontend.
3. **Bảo mật truy cập**: Frontend lưu trữ Token này. Mỗi khi bạn mở một trang hay xem Bản đồ, ReactJS gọi API gửi kèm Token. Backend sẽ dùng Middleware để kiểm tra (Verify) Token; nếu token hợp lệ và Role (Quyền) đủ điều kiện, Backend mới cho phép trích xuất dữ liệu trong MongoDB trả về. Nếu bạn cố tình xóa Token hoặc nhập URL ẩn, bạn lập tức bị văng ra trang Login!
