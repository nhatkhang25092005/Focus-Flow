package com.zesk.focusflow.common.util;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import com.zesk.focusflow.common.ApiErrorResponse;

import tools.jackson.databind.json.JsonMapper;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class ApiErrorWriter {
  private final JsonMapper jsonMapper;
  public ApiErrorWriter(JsonMapper jsonMapper) {
    this.jsonMapper = jsonMapper;
  }

  public void write(
    HttpServletResponse response,
    int status,
    String code,
    String message
  ) throws IOException{
    response.setStatus(status);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);

    ApiErrorResponse body = new ApiErrorResponse(
      false,
      code,
      message,
      null
    );

    response.getWriter().write(jsonMapper.writeValueAsString(body));
  }
}
