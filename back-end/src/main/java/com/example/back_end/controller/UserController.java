package com.example.back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @GetMapping("/api/user/userinfo/{userId}")
  public String getUserInfo(@PathVariable int userId) {

    return "123";
  }

  @PutMapping("/api/user/userinfo/{userId}")
  public String updateUserInfo(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/api/user/historylist/{userId}")
  public String getHistoryList(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/api/user/nowhosting/{userId}")
  public String getNowHosting(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/api/user/nowbuyinging/{userId}")
  public String getNowBuying(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/api/user/reviewlist/{userId}")
  public String getReviewList(@PathVariable int userId) {

    return "123";
  }

  @GetMapping("/api/user/reviewlist/review/{hostFromId}")
  public String getReviews(@PathVariable int hostFromId) {

    return "123";
  }
}
