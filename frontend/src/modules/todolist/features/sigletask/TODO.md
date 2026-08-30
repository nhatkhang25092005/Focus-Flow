# TODO: Single Task & Task List

Danh sách các công việc cần tiếp tục triển khai và tối ưu cho tính năng Quản lý Task:

## 1. Tối ưu Kiến trúc & Mã nguồn (Refactor)
- [x] **Gộp Props cập nhật**: Hợp nhất `updateTaskTitle`, `updateTaskDescription`, `updateStatus` trong `TaskList.tsx` thành một hàm duy nhất (ví dụ: `onUpdateTask(id, payload)`) để giảm tải (prop drilling).
- [x] **Tối ưu Re-render**: Bọc component `Task.tsx` bằng `React.memo` (cùng với việc dùng `useCallback` cho các hàm truyền xuống) để tránh việc toàn bộ list bị render lại khi chỉ 1 task thay đổi.

## 2. Hoàn thiện Tính năng (Features)
- [x] **Chức năng "Ghim" (Pin)**: Thêm trường `isPinned` vào cấu trúc dữ liệu và xử lý logic đưa task lên đầu danh sách khi được ghim.
- [ ] **Chức năng "Thêm vào nhóm"**: Bổ sung `groupId` để gom nhóm các task. Liên kết sự kiện click ở menu 3 chấm để hiển thị danh sách nhóm cho người dùng chọn.
- [ ] **Chức năng "Chỉnh sửa" (3 chấm)**: Làm rõ logic khi click "Chỉnh sửa" ở dropdown menu (vd: tự động focus vào ô tiêu đề hoặc mở 1 modal chi tiết task).

## 3. Quản lý State & Tích hợp API (Sắp tới)
- [ ] **Đưa State lên Global**: Khi có API, thay thế `useState` trong `TaskList.tsx` bằng các công cụ quản lý state mạnh hơn như Redux Toolkit hoặc React Query.
- [ ] **Mở rộng dữ liệu Task**: Bổ sung thêm các trường thời gian (`createdAt`, `updatedAt`) và thứ tự (`order`/`position`) để hỗ trợ kéo thả (drag & drop).
