package com.example.back_end.controller;

import com.example.back_end.dto.UserInfo;
import com.example.back_end.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired private UserService userService;

  @GetMapping("/userinfo/{userId}")
  public ResponseEntity<?> getUserInfo(@PathVariable int userId) {
    UserInfo userInfo = userService.getUserInfoById(userId); // 假設返回 UserInfo
    if (userInfo != null) {
      return ResponseEntity.ok(userInfo); // 返回 UserInfo
    } else {
      return ResponseEntity.status(404).body("User information not found.");
    }
  }

  @PutMapping("/userinfo/{userId}")
  public ResponseEntity<String> updateUserInfo(
      @PathVariable int userId, @RequestBody UserInfo userInfo) {
    //    System.out.println("=== Received Request ===");
    //    System.out.println("Username: " + userInfo.getUsername());
    //    System.out.println("Email: " + userInfo.getEmail());
    //    System.out.println("Phone: " + userInfo.getPhoneNumber());
    boolean isSuccess = userService.updateUserInfo(userId, userInfo);
    if (isSuccess) {
      return ResponseEntity.ok("User information updated successfully.");
    } else {
      return ResponseEntity.status(400).body("Failed to update user information.");
    }
  }

  @GetMapping("/historylist/{userId}")
  public String getHistoryList(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/nowhosting/{userId}")
  public String getNowHosting(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/nowbuyinging/{userId}")
  public String getNowBuying(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/reviewlist/{userId}")
  public String getReviewList(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/reviewlist/review/{hostFromId}")
  public String getReviews(@PathVariable int hostFromId) {

    return "123";
  }
}
