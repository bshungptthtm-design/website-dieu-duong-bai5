# Website Điều dưỡng học tập — Bài 5

## Có gì trong bộ này?
- `index.html`: Website học tập, bài tóm tắt, quy trình và 20 câu trắc nghiệm.
- `Code.gs`: Backend Google Apps Script để ghi kết quả vào Google Sheets.
- Sinh viên nhập mã sinh viên + mã lớp; sau khi nộp xem điểm, đáp án đúng và giải thích.
- Giảng viên có một dòng dữ liệu cho mỗi lượt nộp; cột JSON chứa đáp án từng câu.

## Phần A — Tạo Google Sheets để nhận kết quả
1. Đăng nhập tài khoản Google của giảng viên.
2. Mở https://sheets.google.com và tạo bảng tính mới, đặt tên `Ket qua trac nghiem Bai 5`.
3. Trong bảng tính chọn **Tiện ích mở rộng (Extensions) → Apps Script**.
4. Xóa đoạn mã mẫu đang có; mở file `Code.gs` trong bộ tải xuống, sao chép toàn bộ và dán vào trình soạn thảo Apps Script.
5. Trong mã, giữ hoặc đổi `CLASS_CODE = 'DDCS1-B5'`. Nếu đổi mã, ghi nhớ mã đó để sửa ở bước C.
6. Nhấn **Lưu** (biểu tượng đĩa mềm), đặt tên dự án ví dụ `Quiz Bai 5`.

## Phần B — Triển khai Apps Script thành web app
1. Nhấn **Triển khai (Deploy) → Lần triển khai mới (New deployment)**.
2. Nhấn biểu tượng bánh răng/chọn loại triển khai **Ứng dụng web (Web app)**.
3. Mô tả: `Quiz Bài 5`.
4. **Thực thi với tư cách (Execute as): Tôi (Me)**.
5. **Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)** nếu tùy chọn này được tài khoản cho phép. Đây là cấu hình để website công khai gửi bài; chỉ chia sẻ mã lớp cho lớp học. Một số tài khoản trường học chặn lựa chọn này.
6. Nhấn **Triển khai (Deploy)** và cấp quyền khi Google yêu cầu.
7. Sao chép URL ứng dụng web kết thúc bằng `/exec`. Không dùng URL `/dev`.

## Phần C — Nối website với Apps Script
1. Mở `index.html` bằng Notepad hoặc trình soạn thảo văn bản.
2. Tìm dòng:
   `endpoint:'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'`
3. Thay phần giữa dấu nháy bằng URL `/exec` vừa sao chép, ví dụ:
   `endpoint:'https://script.google.com/macros/s/ABC123/exec'`
   Không dùng URL ví dụ này; hãy dán URL thực tế của bạn.
4. Nếu bạn đã đổi mã lớp trong `Code.gs`, hãy đổi `classCode:'DDCS1-B5'` ở ngay bên cạnh thành cùng mã.
5. Lưu file `index.html`.

## Phần D — Đăng website lên GitHub Pages
1. Tạo một repository GitHub mới, ví dụ `dieu-duong-bai5`, chọn **Public**.
2. Vào repository → **Add file → Upload files**.
3. Tải lên `index.html` đã cập nhật. Có thể tải thêm `README.md`; không cần tải `Code.gs` lên website để chạy.
4. Nhấn **Commit changes**.
5. Vào **Settings → Pages**.
6. Ở **Build and deployment**, chọn **Deploy from a branch**; branch `main`, folder `/(root)`; nhấn **Save**.
7. Chờ vài phút, mở địa chỉ GitHub Pages mà GitHub cung cấp.

## Phần E — Kiểm tra trước khi gửi cho 40 sinh viên
1. Giảng viên mở Google Sheets; lần đầu có thể chưa có tab `KetQua` — tab sẽ tự tạo khi bài đầu tiên được ghi thành công.
2. Mở website, nhập mã sinh viên thử và mã lớp `DDCS1-B5`, làm thử, nộp bài.
3. Kiểm tra Google Sheets có thêm dòng mới không.
4. Mở lại website, thử trên điện thoại và kiểm tra câu trả lời chưa làm, điểm, phần giải thích.
5. Chỉ gửi cho lớp sau khi kiểm thử thành công. Khuyến nghị giảng viên làm bài thử bằng mã riêng, sau đó xóa dòng thử.
6. Muốn xem đáp án từng câu: trong Google Sheets, cột `Chi tiết đáp án (JSON)` lưu tất cả câu hỏi, lựa chọn sinh viên, đáp án đúng, đúng/sai và giải thích. Có thể dùng dữ liệu này để tổng hợp thêm.

## Lưu ý quan trọng về dữ liệu và bảo mật
- Đây là mẫu thực hành lớp học, không phải hệ thống thi có xác thực mạnh. Mã lớp không ngăn được hoàn toàn việc người ngoài gửi dữ liệu nếu biết URL Apps Script.
- Website công khai có thể bị spam hoặc sinh viên nhập mã giả; giảng viên cần đối chiếu mã sinh viên và kiểm tra dữ liệu bất thường.
- Bản mẫu ghi mỗi lần nộp thành một dòng, vì vậy một sinh viên có thể có nhiều lượt làm. Tổng số lượt nộp khác với số sinh viên duy nhất.
- Apps Script công khai có thể bị giới hạn hoặc chặn bởi chính sách Google Workspace của trường. Nếu không chọn được quyền `Anyone`, cần nhờ quản trị viên trường hỗ trợ hoặc dùng Google Forms.
- Không thu thập thông tin sức khỏe hay thông tin nhận dạng người bệnh.
- Bộ câu hỏi và nội dung học tập dựa trên tài liệu Bài 5 được cung cấp. Hãy đối chiếu với bản giảng chính thức trước khi sử dụng để đánh giá sinh viên.
