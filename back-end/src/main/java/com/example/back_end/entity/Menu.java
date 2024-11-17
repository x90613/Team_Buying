package com.example.back_end.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Menu")
public class Menu {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Menu ID

  @Column(name = "name", nullable = false, length = 100)
  private String name; // Menu name

  @ElementCollection
  @CollectionTable(name = "menu_product", joinColumns = @JoinColumn(name = "menu_id"))
  @Column(name = "product", length = 255, nullable = false)
  private List<String> products; // Array of product names

  @ElementCollection
  @CollectionTable(name = "menu_price", joinColumns = @JoinColumn(name = "menu_id"))
  @Column(name = "price", nullable = false)
  private List<Integer> prices; // Array of product prices

  // No-argument constructor for JPA
  public Menu() {}

  // All-arguments constructor for convenience
  public Menu(String name, List<String> products, List<Integer> prices) {
    this.name = name;
    this.products = products;
    this.prices = prices;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<String> getProducts() {
    return products;
  }

  public void setProducts(List<String> products) {
    this.products = products;
  }

  public List<Integer> getPrices() {
    return prices;
  }

  public void setPrices(List<Integer> prices) {
    this.prices = prices;
  }
}
