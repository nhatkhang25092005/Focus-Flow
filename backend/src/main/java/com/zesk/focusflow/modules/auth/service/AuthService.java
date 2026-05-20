package com.zesk.focusflow.modules.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.zesk.focusflow.database.entity.RefreshToken;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.repository.RefreshTokenRepository;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.UserHobbiesRepository;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.enums.LoginStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;

import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import com.zesk.focusflow.common.exception.UnauthorizeException;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final RefreshTokenRepository refreshTokenRepository;
  private final Function<String, String> hashRefreshToken;
  private final UserHobbiesRepository userHobbiesRepository;

  @Value("${jwt.refresh-expiration}")
  private Long refreshExpiration;

  private UnauthorizeException unauthorizeException = new UnauthorizeException(
    LoginStatus.INVALID_CREDENTIALS.getCode(),
    LoginStatus.INVALID_CREDENTIALS.getMessage()
  );

  public AuthService(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    JwtService jwtService,
    RefreshTokenRepository refreshTokenRepository,
    Function<String, String> hashRefreshToken,
    UserHobbiesRepository userHobbiesRepository
  ){
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.hashRefreshToken = hashRefreshToken;
    this.userHobbiesRepository = userHobbiesRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  public LoginServiceResult login(LoginRequest request) {
    User user = userRepository
      .findByEmail(request.getEmail())
      .orElseThrow(() -> unauthorizeException);

    boolean isPasswordMatch = passwordEncoder.matches(
      request.getPassword(),
      user.getPasswordHash()
    );

    if(!isPasswordMatch) {
      throw unauthorizeException;
    }
    
    // Invalidate old refresh tokens when user logs in again to prevent abuse if refresh token is leaked
    refreshTokenRepository.deleteByUserUserId(user.getUserId());

    String accessToken = jwtService.generateAccessToken(request.getEmail());
    String refreshToken = jwtService.generateRefreshToken(request.getEmail());

    refreshTokenRepository.save(
      new RefreshToken(
        hashRefreshToken.apply(refreshToken),
        user,
        LocalDateTime.now().plusDays(refreshExpiration)
      )
    );

    List<String> hobbies = userHobbiesRepository.findHobbynamesByUserId(user.getUserId());
    return new LoginServiceResult(
      accessToken,
      refreshToken,
      user.getUserId(),
      user.getUsername(),
      user.getEmail(),
      user.getAvatarUrl(),
      user.getJoinedAt(),
      user.getBirthdate(),
      hobbies
    );
  }
  
}
