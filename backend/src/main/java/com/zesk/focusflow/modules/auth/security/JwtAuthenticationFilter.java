package com.zesk.focusflow.modules.auth.security;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.zesk.focusflow.common.util.ApiErrorWriter;
import com.zesk.focusflow.modules.auth.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.List;
import io.jsonwebtoken.JwtException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
  private final JwtService jwtService;
  private final ApiErrorWriter apiErrorWriter;
  
  public JwtAuthenticationFilter(JwtService jwtService, ApiErrorWriter apiErrorWriter) {
    this.jwtService = jwtService;
    this.apiErrorWriter = apiErrorWriter;
  }

  // This method will be called for every incoming request to check for a valid JWT token
  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    // Get the Authorization header from the request
    String authHeader = request.getHeader("Authorization");
    if(authHeader == null || !authHeader.startsWith("Bearer ")){
      filterChain.doFilter(request, response);
      return;
    }

    // Extract the token from the header
    String token = authHeader.substring(7);

    try{
      Claims claims = jwtService.parseToken(token);
      String tokenType = claims.get("type", String.class);
      if(!"access_token".equals(tokenType)){
        filterChain.doFilter(request, response);
        return;
      }

      String email = claims.getSubject();

      // If there is no authentication in the security context, set the authentication based on the token
      if(
        email != null &&
        SecurityContextHolder.getContext().getAuthentication() == null
      ){
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
          email,
          null,
          List.of()
        );

        authentication.setDetails(
          new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch(ExpiredJwtException exception){
      apiErrorWriter.write(
        response,
        HttpServletResponse.SC_UNAUTHORIZED,
        "AUTH_TOKEN_EXPIRED",
        "Token Expired"
      );
      return;
    } catch(JwtException exception){
      apiErrorWriter.write(
        response,
        HttpServletResponse.SC_UNAUTHORIZED,
        "AUTH_INVALID_TOKEN",
        "Invalid Token"
      );
      return;
    }
    filterChain.doFilter(request, response);
  }
}
