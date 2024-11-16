package com.example.back_end.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Item")
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // Primary Key, Item ID

  @Column(name = "formId", nullable = false)
  private Integer formId; // Foreign Key, references HostForm table

  @Column(name = "userName", nullable = false, length = 50)
  private String userName; // Name of the user

  @Column(name = "product", nullable = false, length = 100)
  private String product; // Product name

  @Column(name = "price", nullable = false)
  private Integer price; // Product price

  @Column(name = "number", nullable = false)
  private Integer number; // Quantity ordered

  // No-argument constructor for JPA
  public Item() {}

  // All-arguments constructor for convenience
  public Item(Integer formId, String userName, String product, Integer price, Integer number) {
    this.formId = formId;
    this.userName = userName;
    this.product = product;
    this.price = price;
    this.number = number;
  }

  // Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getFormId() {
    return formId;
  }

  public void setFormId(Integer formId) {
    this.formId = formId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
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

  public Integer getNumber() {
    return number;
  }

  public void setNumber(Integer number) {
    this.number = number;
  }
}