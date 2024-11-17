package com.example.back_end.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

  @RequestMapping("/test")
  public String test() {
    System.out.println("test");
    return "Hello World";
  }
}
