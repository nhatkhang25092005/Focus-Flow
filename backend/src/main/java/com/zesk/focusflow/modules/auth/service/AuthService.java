package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.RegisterException;
import com.zesk.focusflow.common.exception.UnauthorizeException;
import com.zesk.focusflow.common.exception.UserExistedException;
import com.zesk.focusflow.common.util.CodeGenerator;
import com.zesk.focusflow.database.entity.RefreshToken;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.RefreshTokenRepository;
import com.zesk.focusflow.database.repository.UserHobbiesRepository;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.dto.request.RegisterRequest;
import com.zesk.focusflow.modules.auth.enums.LoginStatus;
import com.zesk.focusflow.modules.auth.enums.RegisterStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class AuthService {

  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final RefreshTokenRepository refreshTokenRepository;
  private final Function<String, String> hashRefreshToken;
  private final UserHobbiesRepository userHobbiesRepository;
  private final EmailService emailService;
  private record TokenPair(
    String accessToken,
    String refreshToken
  ){}

  // Login Businesses
  private User authenticate(LoginRequest request){
    User user = userRepository
      .findByEmail(request.getEmail())
      .orElseThrow(() -> new UnauthorizeException(
        LoginStatus.INVALID_CREDENTIALS.getCode(),
        LoginStatus.INVALID_CREDENTIALS.getMessage()
      ));

    if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
      throw new UnauthorizeException(
        LoginStatus.INVALID_CREDENTIALS.getCode(),
        LoginStatus.INVALID_CREDENTIALS.getMessage()
      );
    }

    if (!user.isVerified()) throw new RegisterException(
      LoginStatus.NOT_VERIFIED.getCode(),
      LoginStatus.NOT_VERIFIED.getMessage()
    );

    return user;
  }
  private TokenPair spawnToken(User user){
    refreshTokenRepository.deleteByUserUserId(user.getUserId());

    String accessToken = jwtService.generateAccessToken(user.getEmail());
    String refreshToken = jwtService.generateRefreshToken(user.getEmail());

    refreshTokenRepository.save(
      new RefreshToken(
        hashRefreshToken.apply(refreshToken),
        user,
        LocalDateTime.now().plusDays(refreshExpiration)
      )
    );

    return new TokenPair(accessToken, refreshToken);
  }
  private LoginServiceResult buildLoginResult(TokenPair tokenPair, User user){
    List<String> hobbies = userHobbiesRepository.findHobbynamesByUserId(user.getUserId());
    return new LoginServiceResult(
      tokenPair.accessToken,
      tokenPair.refreshToken,
      user.getUserId(),
      user.getUsername(),
      user.getEmail(),
      user.getAvatarUrl(),
      user.getJoinedAt(),
      user.getBirthdate(),
      hobbies
    );
  }

  // Register businesses
  private User registerDraftUser(RegisterRequest request) {
    User user = userRepository.findByEmail(request.getEmail()).orElse(null);
    if (user != null)
      throw user.isVerified()
        // if user has verified
        ? new UserExistedException(
        RegisterStatus.USER_ALREADY_EXISTS.getCode(),
        RegisterStatus.USER_ALREADY_EXISTS.getMessage())
        // if user hasn't verified
        : new RegisterException(
        RegisterStatus.USER_NOT_VERIFY.getCode(),
        RegisterStatus.USER_NOT_VERIFY.getMessage());

    // create user with {verified = false}
    User newUser = User.builder()
      .username(request.getUsername())
      .email(request.getEmail())
      .passwordHash(passwordEncoder.encode(request.getPassword()))
      .build();

    userRepository.save(newUser);
    return newUser;
  }
  private void sendVerificationEmail(User newUser, String code) {
    VerificationCode verificationCode = new VerificationCode();
    verificationCode.setUser(newUser);
    verificationCode.setCode(code);
    verificationCode.setExpiredAt(LocalDateTime.now().plusSeconds(600000L));
    verificationCodeRepository.save(verificationCode);
    emailService.sendVerificationCode(newUser.getEmail(), code);
  }


  @Value("${jwt.refresh-expiration}")
  private Long refreshExpiration;

  @Transactional
  public LoginServiceResult login(LoginRequest request) {
    User user = authenticate(request);
    // Invalidate old refresh tokens when user logs in again to prevent abuse if refresh token is leaked
    TokenPair tokenPair = spawnToken(user);
    return buildLoginResult(tokenPair, user);
  }

  @Transactional(rollbackOn = Exception.class)
  public void register(RegisterRequest request) {
    User newUser = registerDraftUser(request);
    String code = CodeGenerator.generate();
    sendVerificationEmail(newUser, code);
  }
}
