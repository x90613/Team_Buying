package com.example.back_end.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Product ID

  @Column(name = "menu_id", nullable = false)
  private Integer menuId; // Foreign Key, references Menu table

  @Column(name = "product", nullable = false, length = 255)
  private String product; // Product name

  @Column(name = "price", nullable = false)
  private Integer price; // Product price

  // No-argument constructor for JPA
  public Product() {}

  // All-arguments constructor for convenience
  public Product(Integer menuId, String product, Integer price) {
    this.menuId = menuId;
    this.product = product;
    this.price = price;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getMenuId() {
    return menuId;
  }

  public void setMenuId(Integer menuId) {
    this.menuId = menuId;
  }

  public String getProduct() {
    return product;
  }

  public void setProduct(String product) {
    this.product = product;
  }

  public Integer getPrice() {
    return price;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }
}
