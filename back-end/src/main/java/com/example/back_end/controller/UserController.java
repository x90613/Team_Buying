package com.example.back_end.controller;

import com.example.back_end.dto.ReviewListDto;
import com.example.back_end.dto.UserHistoryDto;
import com.example.back_end.dto.UserInfoDto;
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
    UserInfoDto userInfo = userService.getUserInfoById(userId); // 假設返回 UserInfo
    if (userInfo != null) {
      return ResponseEntity.ok(userInfo); // 返回 UserInfo
    } else {
      return ResponseEntity.status(404).body("User information not found.");
    }
  }

  @PutMapping("/userinfo/{userId}")
  public ResponseEntity<String> updateUserInfo(
      @PathVariable int userId, @RequestBody UserInfoDto userInfo) {
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
    List<UserHistoryDto.HostHistory> hostHistory = userService.getHostHistoryByUserId(userId);
    List<UserHistoryDto.ParticipantHistory> participantHistory =
        userService.getParticipantHistoryByUserId(userId);

    if (hostHistory != null || participantHistory != null) {
      UserHistoryDto response = new UserHistoryDto();
      response.setHost(hostHistory);
      response.setParticipant(participantHistory);
      return ResponseEntity.ok(response); // 返回 JSON 格式的歷史記錄
    } else {
      return ResponseEntity.status(404).body("History not found for user with ID: " + userId);
    }
  }

  @GetMapping("/nowhosting/{userId}")
  public ResponseEntity<List<UserHistoryDto.HostHistory>> getNowHosting(@PathVariable int userId) {
    List<UserHistoryDto.HostHistory> nowHosting = userService.getNowHostingByUserId(userId);
    return ResponseEntity.ok(nowHosting);
  }

  @GetMapping("/nowbuying/{userId}")
  public ResponseEntity<List<UserHistoryDto.ParticipantHistory>> getNowBuying(
      @PathVariable int userId) {
    List<UserHistoryDto.ParticipantHistory> nowBuying = userService.getNowBuyingByUserId(userId);
    return ResponseEntity.ok(nowBuying);
  }

  @GetMapping("/reviewlist/{userId}")
  public List<ReviewListDto> getReviewList(@PathVariable("userId") int userId) {
    List<ReviewListDto> reviews = userService.getReviewListByUserId(userId);
    return reviews;
  }

  @GetMapping("/reviewlist/review/{hostFromId}")
  public String getReviews(@PathVariable int hostFromId) {

    return "123";
  }
}
