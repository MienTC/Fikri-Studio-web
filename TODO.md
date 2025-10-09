# TODO: Thêm kiểm tra vai trò cho MEMBER
## Các bước cần thực hiện:
- [ ] Cập nhật src/components/Ticket.tsx: Thêm import useAuth, kiểm tra user.role === "MEMBER", vô hiệu hóa hoặc ẩn nút Update và Delete cho vai trò MEMBER.
- [ ] Cập nhật src/components/UpdateTicket.tsx: Thêm import useAuth, kiểm tra user.role === "MEMBER", vô hiệu hóa nút "Save Changes" và hiển thị thông báo không đủ quyền.
- [ ] Cải thiện xử lý lỗi trong src/services/ticketService.ts cho mã trạng thái 403 để cung cấp thông báo rõ ràng hơn (ví dụ: "Bạn không có quyền thực hiện hành động này").

## Các bước theo dõi:
- [ ] Kiểm tra thay đổi bằng cách đăng nhập với vai trò MEMBER và ADMIN để xác minh hạn chế UI.
- [ ] Chạy ứng dụng để đảm bảo không có lỗi hồi quy.
