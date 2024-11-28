package com.example.back_end.dao;

import com.example.back_end.entity.Item;
import com.example.back_end.entity.ParticipantForm;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderFormDao {

  @Autowired private JdbcTemplate jdbcTemplate;
  private static final Logger logger = LoggerFactory.getLogger(OrderFormDao.class);

  public OrderFormDao(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  // create order form
  // 保存參與者表單
  public int saveParticipantForm(ParticipantForm participantForm) {
    String sql =
        "INSERT INTO participant_form (host_form_id, participant_id, anonymous, username, status,"
            + " payment_status, joined_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    jdbcTemplate.update(
        sql,
        participantForm.getHostFormId(),
        participantForm.getParticipantId(),
        participantForm.getAnonymous(),
        participantForm.getUsername(),
        participantForm.getStatus(),
        participantForm.getPaymentStatus(),
        participantForm.getJoinedAt());
    // 獲取插入的主鍵
    String getIdSql = "SELECT LAST_INSERT_ID()";
    return jdbcTemplate.queryForObject(getIdSql, Integer.class);
  }

  // 保存多個產品項目
  public void saveItems(List<Item> items) {
    String sql = "INSERT INTO item (form_id, note, product, price, number) VALUES (?, ?, ?, ?, ?)";
    for (Item item : items) {
      jdbcTemplate.update(
          sql,
          item.getFormId(),
          item.getNote(),
          item.getProduct(),
          item.getPrice(),
          item.getNumber());
    }
  }

  // read order form status
  // Get ParticipantForm details
  public Map<String, Object> getParticipantFormDetails(int participantFormId) {
    String sql =
        "SELECT pf.username AS teamBuyingName, "
            + "       pf.payment_status, "
            + "       pf.host_form_id "
            + "FROM participant_form pf "
            + "WHERE pf.participant_id = ?";
    try {
      return jdbcTemplate.queryForMap(sql, participantFormId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No participant form found with id: {}", participantFormId);
      return null; // Return null if not found
    }
  }

  // Get HostForm details
  public Map<String, Object> getHostFormDetails(int hostFormId) {

    String sql = "SELECT * " + "FROM host_form hf " + "WHERE hf.host_id = ?";

    try {
      return jdbcTemplate.queryForMap(sql, hostFormId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No host form found with id: {}", hostFormId);
      return null; // Return null if not found
    }
  }

  // Get Item order details related to ParticipantForm
  public String getOrderDetailsByParticipantFormId(int participantFormId) {
    String sql =
        "SELECT GROUP_CONCAT(i.product, ' (Quantity: ', i.number, ', Price: ', i.price, ')') AS"
            + " orderDetails FROM item i WHERE i.form_id = ?";
    try {
      return jdbcTemplate.queryForObject(sql, String.class, participantFormId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No items found for participant form id: {}", participantFormId);
      return null; // Return null if not found
    }
  }

  // read order list
  // Get all participants linked to hostformId
  public List<Map<String, Object>> getParticipantsByHostFormId(int hostformId) {
    String sql = "SELECT *" + "FROM participant_form pf " + "WHERE pf.host_form_id = ?";
    try {
      return jdbcTemplate.queryForList(sql, hostformId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No participants found for hostformId: {}", hostformId);
      return new ArrayList<>(); // Return empty list if not found
    }
  }

  // Get items data for each participantFormId
  public List<Map<String, Object>> getItemsByParticipantFormId(int participantFormId) {
    String sql =
        "SELECT i.product, i.note, i.price, i.number " + "FROM item i " + "WHERE i.form_id = ?";
    try {
      return jdbcTemplate.queryForList(sql, participantFormId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No items found for participantFormId: {}", participantFormId);
      return new ArrayList<>(); // Return empty list if not found
    }
  }

  // read menu
  // 查詢 HostForm 的菜單圖片數據
  // Get menu ID for hostformId
  public Integer getMenuIdByHostFormId(int hostformId) {
    String sql = "SELECT menu_id FROM host_form WHERE id = ?";
    try {
      return jdbcTemplate.queryForObject(sql, Integer.class, hostformId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No menu found for hostformId: {}", hostformId);
      return null; // Return null if not found
    }
  }

  // Get menu image data by menuId
  public byte[] getMenuImageByMenuId(int menuId) {
    String sql = "SELECT img FROM menu WHERE id = ?";
    try {
      return jdbcTemplate.queryForObject(sql, byte[].class, menuId);
    } catch (EmptyResultDataAccessException e) {
      logger.warn("No menu image found for menuId: {}", menuId);
      return new byte[0]; // Return empty byte array if not found
    }
  }
}
