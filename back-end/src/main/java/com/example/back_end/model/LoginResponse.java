package com.example.back_end.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
  private String token;
  private String userName;
  private int userId;
}
