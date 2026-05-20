package com.zesk.focusflow.modules.auth.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;

@ConfigurationProperties(prefix = "jwt")
record JwtProperties(
  String secret,
  long accessExpiration,
  long refreshExpiration
) {}

@Service
public class JwtService {

  private final SecretKey key;
  private final long accessTokenExpiration;
  private final long refreshTokenExpiration;

  public JwtService(JwtProperties properties){
    this.key = Keys.hmacShaKeyFor(properties.secret().getBytes(StandardCharsets.UTF_8));
    this.accessTokenExpiration = properties.accessExpiration();
    this.refreshTokenExpiration = properties.refreshExpiration();
  }
  /**
   * Generate JWT token with email and token version as claims
   * Using token version to invalidate old tokens when user logs out or changes password
   * @param email
   * @param tokenVersion
   * @return
   */
  public String generateAccessToken(String email) {
    return Jwts.builder()
      .subject(email)
      .claim("type","access_token")
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
      .signWith(key)
      .compact();
  }

  public String generateRefreshToken(String email) {
    return Jwts.builder()
      .subject(email)
      .claim("type","refresh_token")
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiration)) // 1 day
      .signWith(key)
      .compact();
  }

  public String extractEmail(String token){
    Claims claims = Jwts.parser()
      .verifyWith(key) // check signature and throw exception if invalid
      .build()
      .parseSignedClaims(token) // parse claims without checking expiration
      .getPayload();
    return claims.getSubject();
  }

  public boolean isTokenValid(String token, String email){
    String extractedEmail = extractEmail(token);
    return extractedEmail.equals(email);
  }

  public Claims parseToken(String token){
    return Jwts.parser()
      .verifyWith(key)
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }
}
