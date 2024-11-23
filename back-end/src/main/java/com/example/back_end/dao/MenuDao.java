package com.example.back_end.dao;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MenuDao {
  private final JdbcTemplate jdbcTemplate;

  public MenuDao(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public boolean insertMenu(String name, String img, List<Map<String, Object>> products) {
    try {
      // 插入菜單
      String insertMenuSql = "INSERT INTO menu (name, img) VALUES (?, ?)";
      jdbcTemplate.update(insertMenuSql, name, img);

      // 獲取剛剛插入的菜單 ID
      String getMenuIdSql = "SELECT LAST_INSERT_ID()";
      Long menuId = jdbcTemplate.queryForObject(getMenuIdSql, Long.class);

      // 插入產品
      String insertProductSql = "INSERT INTO product (product, price, menu_id) VALUES (?, ?, ?)";
      for (Map<String, Object> product : products) {
        String productName = (String) product.get("product");
        Integer productPrice = (Integer) product.get("price");
        jdbcTemplate.update(insertProductSql, productName, productPrice, menuId);
      }
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  // 獲取菜單和相關產品
  public List<Map<String, Object>> getMenu() {
    try {
      // 查詢所有菜單
      String getMenuSql = "SELECT * FROM menu";
      List<Map<String, Object>> menus = jdbcTemplate.queryForList(getMenuSql);

      // 查詢每個菜單的產品
      String getProductsSql = "SELECT * FROM product WHERE menu_id = ?";
      for (Map<String, Object> menu : menus) {
        Long menuId = ((Number) menu.get("id")).longValue();
        List<Map<String, Object>> products = jdbcTemplate.queryForList(getProductsSql, menuId);
        menu.put("products", products);
      }
      return menus;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
