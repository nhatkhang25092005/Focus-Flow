package com.zesk.focusflow.common.config;

import com.zesk.focusflow.common.util.ApiErrorWriter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.function.Function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.zesk.focusflow.modules.auth.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {
  
  private final ApiErrorWriter apiErrorWriter;

  SecurityConfig(ApiErrorWriter apiErrorWriter) {
    this.apiErrorWriter = apiErrorWriter;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public Function<String, String> hashRefreshToken(){
    return refreshToken -> {
      try{
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(refreshToken.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(hash);
      } catch (NoSuchAlgorithmException e){
        throw new IllegalStateException("SHA-256 algorithm not available", e);
      }
    };
  }

  @Bean
  public SecurityFilterChain securityFilterChain(
    HttpSecurity http,
    JwtAuthenticationFilter jwtAuthenticationFilter
  ) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(
          "/api/auth/logout"
        ).authenticated()
        .requestMatchers(
          "/api/auth/login",
          "/api/auth/refresh-token",
          "/api/auth/register",
          "/api/auth/forgot-password-request",
          "/api/auth/forgot-password-verify"
        ).permitAll()
        .anyRequest().authenticated()
      )
      .exceptionHandling(ex -> ex
        .authenticationEntryPoint((request, response, authException)->
          apiErrorWriter.write(
            response,
            HttpServletResponse.SC_UNAUTHORIZED,
            "AUTH_UNAUTHORIZED",
            "Missing or invalid access_token"
          )
        )
      )
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
