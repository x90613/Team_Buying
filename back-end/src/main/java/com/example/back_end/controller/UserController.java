package com.example.back_end.controller;

import com.example.back_end.dto.UserHistory;
import com.example.back_end.dto.UserInfo;
import com.example.back_end.service.UserService;
import java.util.List;
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
  public ResponseEntity<?> getHistoryList(@PathVariable int userId) {
    // 假設 userService 有一個方法可以獲取使用者的歷史記錄
    List<UserHistory.HostHistory> hostHistory = userService.getHostHistoryByUserId(userId);
    List<UserHistory.ParticipantHistory> participantHistory =
        userService.getParticipantHistoryByUserId(userId);

    if (hostHistory != null || participantHistory != null) {
      UserHistory response = new UserHistory();
      response.setHost(hostHistory);
      response.setParticipant(participantHistory);
      return ResponseEntity.ok(response); // 返回 JSON 格式的歷史記錄
    } else {
      return ResponseEntity.status(404).body("History not found for user with ID: " + userId);
    }
  }

  @GetMapping("/nowhosting/{userId}")
  public ResponseEntity<List<UserHistory.HostHistory>> getNowHosting(@PathVariable int userId) {
    List<UserHistory.HostHistory> nowHosting = userService.getNowHostingByUserId(userId);
    return ResponseEntity.ok(nowHosting);
  }

  @GetMapping("/nowbuying/{userId}")
  public ResponseEntity<List<UserHistory.ParticipantHistory>> getNowBuying(
      @PathVariable int userId) {
    List<UserHistory.ParticipantHistory> nowBuying = userService.getNowBuyingByUserId(userId);
    return ResponseEntity.ok(nowBuying);
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
