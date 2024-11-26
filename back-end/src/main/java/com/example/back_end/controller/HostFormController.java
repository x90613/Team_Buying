package com.example.back_end.controller;

import com.example.back_end.dto.CreateHostFormDTO;
import com.example.back_end.entity.HostForm;
import com.example.back_end.service.HostFormService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hostforms")
@Slf4j
public class HostFormController {
  private final HostFormService hostFormService;

  public HostFormController(HostFormService hostFormService) {
    this.hostFormService = hostFormService;
  }

  // 創建團購表單
  @PostMapping
  public ResponseEntity<?> createHostForm(@RequestBody CreateHostFormDTO request) {
    try {
      log.info("Creating new host form with title: {}", request.getTitle());
      HostForm created = hostFormService.createHostForm(request);
      log.info("Successfully created host form with id: {}", created.getId());
      return ResponseEntity.ok(created);
    } catch (IllegalArgumentException e) {
      log.warn("Invalid request: {}", e.getMessage());
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (AccessDeniedException e) {
      log.warn("Access denied: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    } catch (Exception e) {
      log.error("Error creating host form", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("建立團購表單時發生錯誤");
    }
  }

  // 根據ID獲取特定團購表單
  @GetMapping("/{id}")
  public ResponseEntity<?> getHostForm(@PathVariable Integer id) {
    try {
      log.info("Fetching host form with id: {}", id);
      return hostFormService
          .findById(id)
          .map(
              form -> {
                log.info("Successfully fetched host form with id: {}", id);
                return ResponseEntity.ok(form);
              })
          .orElseGet(
              () -> {
                log.warn("Host form not found with id: {}", id);
                return ResponseEntity.notFound().build();
              });
    } catch (AccessDeniedException e) {
      log.warn("Access denied when fetching host form: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    } catch (Exception e) {
      log.error("Error fetching host form with id: {}", id, e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("獲取團購表單時發生錯誤");
    }
  }

  // 獲取特定用戶的所有團購表單
  @GetMapping("/user/{hostId}")
  public ResponseEntity<?> getHostFormsByHostId(@PathVariable Integer hostId) {
    try {
      log.info("Fetching host forms for user id: {}", hostId);
      List<HostForm> forms = hostFormService.findByHostId(hostId);
      log.info("Found {} forms for user id: {}", forms.size(), hostId);
      return ResponseEntity.ok(forms);
    } catch (AccessDeniedException e) {
      log.warn("Access denied when fetching user's host forms: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    } catch (Exception e) {
      log.error("Error fetching host forms for host id: {}", hostId, e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("獲取用戶團購表單列表時發生錯誤");
    }
  }

  // 更新團購表單
  @PutMapping("/{id}")
  public ResponseEntity<?> updateHostForm(
      @PathVariable Integer id, @RequestBody CreateHostFormDTO request) {
    try {
      log.info("Updating host form with id: {}", id);
      HostForm updated = hostFormService.updateHostForm(id, request);
      log.info("Successfully updated host form with id: {}", id);
      return ResponseEntity.ok(updated);
    } catch (IllegalArgumentException e) {
      log.warn("Invalid request when updating host form: {}", e.getMessage());
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (AccessDeniedException e) {
      log.warn("Access denied when updating host form: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    } catch (Exception e) {
      log.error("Error updating host form with id: {}", id, e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新團購表單時發生錯誤");
    }
  }

  // 刪除團購表單
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteHostForm(@PathVariable Integer id) {
    try {
      log.info("Attempting to delete host form with id: {}", id);
      hostFormService.deleteHostForm(id);
      log.info("Successfully deleted host form with id: {}", id);
      return ResponseEntity.ok().body("團購表單已成功刪除");
    } catch (IllegalArgumentException e) {
      log.warn("Host form not found: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (AccessDeniedException e) {
      log.warn("Access denied when deleting host form: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    } catch (Exception e) {
      log.error("Error deleting host form with id: {}", id, e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("刪除團購表單時發生錯誤");
    }
  }
}
