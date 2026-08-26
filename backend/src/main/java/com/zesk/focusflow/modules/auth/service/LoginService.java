package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.RegisterException;
import com.zesk.focusflow.common.exception.UnauthorizeException;
import com.zesk.focusflow.database.entity.RefreshToken;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.repository.RefreshTokenRepository;
import com.zesk.focusflow.database.repository.UserHobbiesRepository;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.enums.LoginStatus;
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
public class LoginService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final RefreshTokenRepository refreshTokenRepository;
  private final Function<String, String> hashRefreshToken;
  private final UserHobbiesRepository userHobbiesRepository;

  @Value("${jwt.refresh-expiration}")
  private Long refreshExpiration;

  private record TokenPair(String accessToken, String refreshToken) {}

  private User authenticate(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
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

    if (!user.isVerified()) {
      throw new RegisterException(
        LoginStatus.NOT_VERIFIED.getCode(),
        LoginStatus.NOT_VERIFIED.getMessage()
      );
    }
    return user;
  }

  private TokenPair spawnToken(User user) {
    refreshTokenRepository.deleteByUserUserId(user.getUserId());
    String accessToken = jwtService.generateAccessToken(user.getEmail());
    String refreshToken = jwtService.generateRefreshToken(user.getEmail());
    refreshTokenRepository.save(new RefreshToken(
      hashRefreshToken.apply(refreshToken),
      user,
      LocalDateTime.now().plusDays(refreshExpiration)
    ));
    return new TokenPair(accessToken, refreshToken);
  }

  private LoginServiceResult buildLoginResult(TokenPair tokenPair, User user) {
    List<String> hobbies = userHobbiesRepository.findHobbynamesByUserId(user.getUserId());
    return new LoginServiceResult(
      tokenPair.accessToken(), tokenPair.refreshToken(), user.getUserId(), user.getUsername(),
      user.getEmail(), user.getAvatarUrl(), user.getJoinedAt(), user.getBirthdate(), hobbies
    );
  }

  @Transactional
  public LoginServiceResult login(LoginRequest request) {
    User user = authenticate(request);
    return buildLoginResult(spawnToken(user), user);
  }
}
