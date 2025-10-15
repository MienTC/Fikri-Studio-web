# TODO: Phát triển tính năng quản lý User

## Các bước cần thực hiện:

### 1. Tạo useUsers hook với React Query
- [ ] Tạo src/hooks/useUsers.ts với các hooks: useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser
- [ ] Import từ userServices.ts và setup React Query patterns

### 2. Cập nhật User interface
- [ ] Cập nhật src/types/authTypes.ts để match với UserData từ userServices.ts
- [ ] Thêm các interface cần thiết cho user management

### 3. Tạo UserManagement component
- [ ] Tạo src/components/UserManagement.tsx với table hiển thị danh sách users
- [ ] Thêm role checking: chỉ ADMIN mới thấy component này
- [ ] Implement loading và error states

### 4. Tạo form CreateUser và UpdateUser
- [ ] Tạo src/components/CreateUser.tsx với form tạo user mới
- [ ] Tạo src/components/UpdateUser.tsx với form cập nhật user
- [ ] Thêm validation cho email, password, role

### 5. Cập nhật routing và navigation
- [ ] Thêm route /users vào src/App.tsx
- [ ] Update Sidebar link "Customer" thành "Users" và link tới /users
- [ ] Thêm sub-routes cho create và update user

### 6. Testing
- [ ] Test với ADMIN role: verify tất cả CRUD operations
- [ ] Test với MEMBER role: verify không có quyền truy cập
- [ ] Check error handling và validation
