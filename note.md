Findings
High: Access token được tạo nhưng chưa được dùng để authenticate request. SecurityConfig.java (line 21) chưa có JWT filter đọc Authorization: Bearer ..., nên token từ AuthController.java (line 35) hiện gần như “phát ra rồi để đó”.
High: Login sai email/password đang ném RuntimeException, nhiều khả năng trả 500 và còn leak “email not found” vs “invalid password”. Nên trả 401 cùng message chung qua @ControllerAdvice. Xem AuthService.java (line 50) và AuthService.java (line 59).
High: Secret và credential đang hard-code: JWT secret trong JwtService.java (line 16), DB password trong application.properties (line 4). Nên đưa sang env/config riêng, có profile dev/prod.
Medium: Refresh token lưu raw token trong DB và cột chỉ dài 255; JWT có email dài có thể vượt quá 255 ký tự. Nên lưu hash token hoặc jti, tăng độ dài/TEXT nếu vẫn lưu token. Xem RefreshToken.java (line 26).
Medium: RefreshTokenRepository.findByRefreshTokenId(String tokenId) sai ý nghĩa/kiểu dữ liệu. Nếu tìm theo token thì nên là findByToken(String token), nếu tìm theo id thì tham số phải là Long. Xem RefreshTokenRepository.java (line 7).
Medium: CookieService.getRefreshTokenCookie() sẽ lỗi NullPointerException khi request không có cookie vì request.getCookies() có thể trả null. Xem CookieService.java (line 31).
Medium: PomodoroStatus đang được JPA lưu theo ordinal vì thiếu @Enumerated(EnumType.STRING). Đổi thứ tự enum sau này sẽ làm sai dữ liệu cũ. Xem PomodoroSession.java (line 37).
Medium: API contract và code đang lệch: contract dùng /auth/login, response có message/data/user; code dùng /api/auth/login và chỉ trả { "access_token": ... }. Xem AuthController.java (line 17) và AuthModel.java (line 11).





Điểm ổn
Package theo layer khá rõ: controller, service, repository, entity, dto, enums, config. Với scope hiện tại như auth/task/pomodoro thì cách này dễ đọc.
Dùng constructor injection trong AuthService.java (line 21) và AuthController.java (line 22) là pattern tốt.
Tách JwtService, CookieService, AuthService là hợp lý: controller mỏng, logic chính nằm ở service.
Entity đặt annotation JPA khá trực tiếp, dễ hiểu với giai đoạn đầu.
LoginRequest nằm trong dto/request là hướng tốt để tách request body khỏi entity.
Nên chỉnh về pattern
Package models hơi mơ hồ. AuthModel.java (line 4) thực chất là response DTO, nên đổi về kiểu:
dto/response/AuthResponse.java
hoặc dto/response/LoginResponse.java

AuthService.LoginServiceResult là inner class dùng được, nhưng về lâu dài nên tách ra thành DTO/service result riêng hoặc dùng record:
java



public record LoginResult(String accessToken, String refreshToken) {}

Nhìn sạch hơn và tránh service bị phình.

Repository method nên đặt đúng domain language. Trong RefreshTokenRepository.java (line 7), nếu muốn tìm token thì nên là findByToken(String token), không nên gọi findByRefreshTokenId(String tokenId) vì refreshTokenId là id DB.

Entity hiện hơi thiếu getter/setter/constructor có chủ đích. Với JPA thì no-args constructor là đúng, nhưng nên thống nhất pattern:
Entity có constructor cho required fields.
Không expose setter bừa bãi nếu không cần.
Có method domain như revoke() thay vì setIsRevoked(true).

Các field timestamp như createdAt, updatedAt, joinedAt đang set bằng LocalDateTime.now() trực tiếp. Pattern tốt hơn là dùng JPA lifecycle:
java



@PrePersist
void onCreate() { ... }

@PreUpdate
void onUpdate() { ... }

Hoặc sau này tạo BaseEntity.

@ManyToOne mặc định là EAGER. Với Task, TaskGroup, RefreshToken, sau này list nhiều record sẽ dễ kéo theo user/group không cần thiết. Nên cân nhắc:
java



@ManyToOne(fetch = FetchType.LAZY)


Gợi ý cấu trúc khi project lớn hơn
Hiện tại package theo layer ổn. Nhưng khi thêm nhiều feature, bạn có thể chuyển dần sang package theo domain:
text



com.zesk.focusflow
  auth
    AuthController
    AuthService
    JwtService
    CookieService
    dto
  user
    User
    UserRepository
  task
    Task
    TaskGroup
    TaskStatus
  pomodoro
    PomodoroSession
    PomodoroStatus
  config

Cách này thường dễ maintain hơn khi feature nhiều lên, vì mọi thứ liên quan đến auth nằm cạnh nhau.
Tóm lại: cấu trúc hiện tại ổn cho phase đầu, chưa bị rối. Việc nên làm sớm nhất về pattern là đổi models thành dto/response, chuẩn hóa DTO/service result, chỉnh naming repository, và thống nhất style entity.