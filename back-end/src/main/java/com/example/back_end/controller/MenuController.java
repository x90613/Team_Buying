package com.example.back_end.controller;

import com.example.back_end.service.MenuService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

  private final MenuService menuService;

  public MenuController(MenuService menuService) {
    this.menuService = menuService;
  }

  @PostMapping
  public ResponseEntity<String> insertMenu(@RequestBody Map<String, Object> requestBody) {
    try {
      String name = (String) requestBody.get("name");
      String img = (String) requestBody.get("img");
      List<Map<String, Object>> products = (List<Map<String, Object>>) requestBody.get("products");

      boolean inserted = menuService.insertMenu(name, img, products);
      if (inserted) {
        return ResponseEntity.ok("Insert Menu successfully.");
      } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Failed to insert Menu.");
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("Invalid request data: " + e.getMessage());
    }
  }

  @GetMapping
  public ResponseEntity<Object> getMenu() {
    List<Map<String, Object>> menus = menuService.getMenu();
    if (menus == null) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get Menu.");
    }
    return ResponseEntity.ok(menus);
  }
}
