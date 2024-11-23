package com.example.back_end.controller;

import com.example.back_end.dto.OrderFormRequest;
import com.example.back_end.service.OrderFormService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orderforms")
public class OrderFormController {

  @Autowired private OrderFormService orderFormService;

  public OrderFormController(OrderFormService orderFormService) {
    this.orderFormService = orderFormService;
  }

  @PostMapping
  public String createOrderForm(@RequestBody OrderFormRequest orderFormRequest) {
    // 調用 Service 方法處理請求
    orderFormService.createOrderForm(orderFormRequest);
    return "Order form created successfully!";
  }

  @GetMapping("/{participantFormId}")
  public Map<String, Object> getOrderStatus(@PathVariable int participantFormId) {
    return orderFormService.getOrderStatus(participantFormId);
  }

  @GetMapping("/host/{hostformId}")
  public Map<String, Object> getOrderList(@PathVariable int hostformId) {
    List<Map<String, Object>> orderList = orderFormService.getOrderList(hostformId);
    return Map.of("orderList", orderList);
  }

  @GetMapping("/menu/{hostformId}")
  public Map<String, String> getMenuImage(@PathVariable int hostformId) {
    // 調用 Service 層獲取圖片數據
    String base64Image = orderFormService.getMenuImage(hostformId);

    // 封裝返回結果
    return Map.of("image", base64Image);
  }
}
