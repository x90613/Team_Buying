package com.example.back_end.controller;

import com.example.back_end.service.NotifyService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotifyController {

  private final NotifyService notifyService;

  public NotifyController(NotifyService notifyService) {
    this.notifyService = notifyService;
  }

  @PostMapping("/{hostFormId}")
  public ResponseEntity<String> notifyHost(
      @PathVariable Integer hostFormId, @RequestBody Map<String, Object> requestBody) {

    if (!requestBody.containsKey("userId") || !requestBody.containsKey("userName")) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId & userName are required");
    }

    int userId = (int) requestBody.get("userId");
    String userName = (String) requestBody.get("userName");

    Integer hostId = notifyService.getHostId(hostFormId);
    if (hostId == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("Host not found for hostFormId: " + hostFormId);
    }

    String message = String.format("使用者【%d:%s】通知您他已經付款", userId, userName);
    notifyService.notifyHost(hostId, message);
    return ResponseEntity.ok("Notification sent to host ID: " + hostId);
  }
}
