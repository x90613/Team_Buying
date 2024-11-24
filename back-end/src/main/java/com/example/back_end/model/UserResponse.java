package com.example.back_end.model;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
  private Integer id;
  private String username;
  private String email;
  private Integer phoneNumber;
  private LocalDateTime createdAt;
}
