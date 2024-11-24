package com.example.back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**") // 匹配所有端點
            .allowedOrigins("*") // 允許所有來源
            .allowedMethods("*") // 允許所有 HTTP 方法
            .allowedHeaders("*") // 允許所有 Header
            .allowCredentials(false); // 不允許攜帶憑證（為了安全性，和 `*` 同時使用時需設為 false）
      }
    };
  }
}
