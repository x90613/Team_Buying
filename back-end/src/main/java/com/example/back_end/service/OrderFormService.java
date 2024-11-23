package com.example.back_end.service;

import com.example.back_end.dao.OrderFormDao;
import com.example.back_end.dto.OrderFormRequest;
import com.example.back_end.entity.Item;
import com.example.back_end.entity.ParticipantForm;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderFormService {

  private static final Logger logger = LoggerFactory.getLogger(OrderFormService.class);

  @Autowired private OrderFormDao orderFormDAO;

  public OrderFormService(OrderFormDao orderFormDAO) {
    this.orderFormDAO = orderFormDAO;
  }

  // create Order Form
  public void createOrderForm(OrderFormRequest request) {
    // 創建 ParticipantForm 實體
    ParticipantForm participantForm = new ParticipantForm();
    participantForm.setHostFormId(request.getHostformId());
    participantForm.setParticipantId(request.getParticipantId());
    participantForm.setAnonymous(request.getAnonymous());
    participantForm.setUsername("Anonymous User"); // 默認用戶名
    participantForm.setStatus(1); // 默認狀態 1
    participantForm.setPaymentStatus(0); // 默認付款狀態 0
    participantForm.setJoinedAt(java.time.LocalDateTime.now());

    logger.info("Creating ParticipantForm: {}", participantForm);

    // 保存 ParticipantForm 並獲取主鍵 ID
    int participantFormId = orderFormDAO.saveParticipantForm(participantForm);
    logger.info("Saved ParticipantForm with ID: {}", participantFormId);

    // 創建 Item 實體列表
    List<Item> items = new ArrayList<>();
    for (int i = 0; i < request.getOrder().size(); i++) {
      Item item = new Item();
      item.setFormId(participantFormId); // 關聯 ParticipantForm 的 ID
      item.setProduct(request.getOrder().get(i)); // 商品名稱
      item.setNote(""); // 默認備註
      item.setPrice(request.getPrice().get(i).intValue()); // 單價
      item.setNumber(Integer.valueOf(request.getQuantity().get(i))); // 數量
      items.add(item);
    }

    logger.info("Creating Items: {}", items);

    // 保存所有 Item
    orderFormDAO.saveItems(items);
    logger.info("Items saved successfully");
  }

  // Read Order Status
  public Map<String, Object> getOrderStatus(int participantFormId) {
    Map<String, Object> response = new HashMap<>();

    try {
      // Get ParticipantForm details
      Map<String, Object> participantForm =
          orderFormDAO.getParticipantFormDetails(participantFormId);
      if (participantForm == null || participantForm.isEmpty()) {
        logger.warn("No participant form found with id: {}", participantFormId);
        response.put("error", "Participant form not found");
        return response;
      }

      // Get HostForm details
      int hostFormId = (int) participantForm.get("hostFormId");
      Map<String, Object> hostForm = orderFormDAO.getHostFormDetails(hostFormId);
      if (hostForm == null || hostForm.isEmpty()) {
        logger.warn("No host form found with id: {}", hostFormId);
        response.put("error", "Host form not found");
        return response;
      }

      // Get order details related to ParticipantForm
      String orderDetails = orderFormDAO.getOrderDetailsByParticipantFormId(participantFormId);
      if (orderDetails == null) {
        orderDetails = "No items found for this participant form";
      }

      // Assemble final response data
      response.put("teamBuyingName", participantForm.getOrDefault("teamBuyingName", "N/A"));
      response.put("teamBuyngDeadline", hostForm.getOrDefault("teamBuyingDeadline", "N/A"));
      response.put("order", orderDetails);
      response.put("hostcontact", hostForm.getOrDefault("hostContact", "N/A"));
      response.put("transferInformation", hostForm.getOrDefault("transferInformation", "N/A"));
      response.put("paymentSatus", participantForm.getOrDefault("paymentStatus", 0));

    } catch (Exception e) {
      logger.error(
          "An error occurred while getting order status for participantFormId: {}",
          participantFormId,
          e);
      response.put("error", "An unexpected error occurred");
    }

    return response;
  }

  // Read Order List
  public List<Map<String, Object>> getOrderList(int hostformId) {
    List<Map<String, Object>> orderList = new ArrayList<>();
    try {
      // Get all participants linked to the hostformId
      List<Map<String, Object>> participants = orderFormDAO.getParticipantsByHostFormId(hostformId);

      if (participants == null || participants.isEmpty()) {
        logger.warn("No participants found for hostformId: {}", hostformId);
        return orderList; // Return empty list if no participants found
      }

      // Assemble the result list
      for (Map<String, Object> participant : participants) {
        int participantFormId = (int) participant.get("participantFormId");
        String participantName = (String) participant.get("username");
        int paymentStatus = (int) participant.get("paymentStatus");

        // Get items related to the participant
        List<Map<String, Object>> items =
            orderFormDAO.getItemsByParticipantFormId(participantFormId);

        if (items == null || items.isEmpty()) {
          logger.warn("No items found for participantFormId: {}", participantFormId);
          continue; // Skip to the next participant if no items found
        }

        for (Map<String, Object> item : items) {
          Map<String, Object> order = new HashMap<>();
          order.put("participantName", participantName); // Participant name
          order.put("product", item.get("product")); // Product name
          order.put("quantity", item.get("number")); // Product quantity
          order.put("price", item.get("price")); // Product price
          order.put("note", item.get("note")); // Note
          order.put("paymentStatus", paymentStatus); // Payment status

          orderList.add(order);
        }
      }
    } catch (Exception e) {
      logger.error("An error occurred while getting order list for hostformId: {}", hostformId, e);
    }
    return orderList;
  }

  // Read menu
  public String getMenuImage(int hostformId) {
    // 获取菜单 ID
    Integer menuId = orderFormDAO.getMenuIdByHostFormId(hostformId);
    if (menuId == null) {
      logger.warn("No menu found for hostformId: {}", hostformId);
      return ""; // Return empty string if no menu found
    }

    // 获取图片的二进制数据
    byte[] imageBytes = orderFormDAO.getMenuImageByMenuId(menuId);

    // 将图片数据转换为 Base64 编码
    return Base64.getEncoder().encodeToString(imageBytes);
  }
}
