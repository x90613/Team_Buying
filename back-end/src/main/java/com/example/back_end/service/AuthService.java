package com.example.back_end.service;

import com.example.back_end.dao.UserDAO;
import com.example.back_end.entity.User;
import com.example.back_end.model.LoginRequest;
import com.example.back_end.model.LoginResponse;
import com.example.back_end.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private static final Logger log = LoggerFactory.getLogger(AuthService.class);
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;
  private final UserDAO userDAO;

  public AuthService(JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserDAO userDAO) {
    this.jwtUtil = jwtUtil;
    this.passwordEncoder = passwordEncoder;
    this.userDAO = userDAO;
  }

  @Transactional
  public LoginResponse login(LoginRequest loginRequest) {
    try {
      // 檢查是否為管理員帳號
      if ("admin".equals(loginRequest.getUserName())
          && "password".equals(loginRequest.getPassword())) {

        User adminUser = userDAO.findByUsername("admin");
        if (adminUser == null) {
          // 創建管理員帳號
          adminUser = new User();
          adminUser.setUsername("admin");
          adminUser.setPassword(passwordEncoder.encode("password"));
          userDAO.save(adminUser);
        }

        String token = jwtUtil.generateToken(adminUser.getUsername());
        return LoginResponse.builder().token(token).userName(adminUser.getUsername()).build();
      }

      // 查詢使用者
      User user = userDAO.findByUsername(loginRequest.getUserName());

      // 如果使用者不存在，則建立新使用者
      if (user == null) {
        User newUser = new User();
        newUser.setUsername(loginRequest.getUserName());
        newUser.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        // 其他欄位預設為 null

        userDAO.save(newUser);
        log.info("Created new user: {}", newUser.getUsername());

        String token = jwtUtil.generateToken(newUser.getUsername());
        return LoginResponse.builder().token(token).userName(newUser.getUsername()).build();
      }

      // 驗證密碼
      if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        throw new BadCredentialsException("密碼錯誤");
      }

      String token = jwtUtil.generateToken(user.getUsername());
      return LoginResponse.builder().token(token).userName(user.getUsername()).build();

    } catch (BadCredentialsException e) {
      throw e;
    } catch (Exception e) {
      log.error("Login error", e);
      throw new RuntimeException("登入失敗", e);
    }
  }

  public boolean validateToken(String token) {
    try {
      String username = getUsernameFromToken(token);
      return jwtUtil.validateToken(token, username);
    } catch (Exception e) {
      return false;
    }
  }

  public String getUsernameFromToken(String token) {
    return jwtUtil.extractUsername(token);
  }
}
