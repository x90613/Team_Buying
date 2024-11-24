package com.example.back_end.model;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Integer id;
    private String username;
    private String email;
    private Integer phoneNumber;
    private LocalDateTime createdAt;
}