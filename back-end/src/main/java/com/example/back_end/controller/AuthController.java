package com.example.back_end.controller;

import com.example.back_end.model.LoginRequest;
import com.example.back_end.model.LoginResponse;
import com.example.back_end.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

  private static final Logger log = LoggerFactory.getLogger(AuthController.class);
  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
      log.info("Received login request for user: {}", request.getUserName());
      LoginResponse response = authService.login(request);

      log.info("Login successful for user: {}", request.getUserName());
      return ResponseEntity.ok(response);

    } catch (Exception e) {
      log.error("Login failed for user: {}", request.getUserName(), e);
      return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
    }
  }

  @GetMapping("/test")
  public ResponseEntity<String> test() {
    return ResponseEntity.ok("API is working!");
  }
}
