package com.example.back_end.dao;

import com.example.back_end.dto.UserHistory;
import com.example.back_end.dto.UserInfo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

  @Autowired private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

  public UserInfo getUserInfoByUserId(Integer userId) {
    String sql = "SELECT username, email, phone_number FROM user WHERE id = :userId";
    //        System.out.println("receive getUserInfo Dao" + userId);

    Map<String, Object> map = new HashMap<>();
    map.put("userId", userId);

    List<UserInfo> list =
        namedParameterJdbcTemplate.query(sql, map, new BeanPropertyRowMapper<>(UserInfo.class));

    //        System.out.println(list.get(0).getUsername());
    //        System.out.println(list.get(0).getPhoneNumber());
    //        System.out.println(list.get(0).getEmail());

    if (list.size() > 0) {
      return list.get(0);
    }
    return null;
  }

  public Boolean updateUserInfoByUserId(int userId, UserInfo userInfo) {
    String sql =
        "UPDATE user SET username = :username, email = :email, phone_number = :phoneNumber WHERE id"
            + " = :userId";

    Map<String, Object> params = new HashMap<>();
    params.put("username", userInfo.getUsername());
    params.put("email", userInfo.getEmail());
    params.put("phoneNumber", userInfo.getPhoneNumber());
    params.put("userId", userId);

    return namedParameterJdbcTemplate.update(sql, params) > 0; // 返回是否更新
  }

  public List<UserHistory.HostHistory> getHostHistoryByUserId(int userId) {
    String sql =
        "SELECT title AS name, dead_time AS datetime, status, id AS hostformId FROM host_form WHERE"
            + " host_id = :userId AND status = :status";

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("status", 1);

    return namedParameterJdbcTemplate.query(
        sql,
        params,
        (rs, rowNum) -> {
          UserHistory.HostHistory history = new UserHistory.HostHistory();
          history.setName(rs.getString("name")); // 對應 SELECT 中的別名 `name`
          history.setDatetime(rs.getString("datetime")); // 對應 `dead_time`
          history.setStatus(rs.getString("status")); // 對應 `status`
          history.setHostformId(rs.getString("hostformId")); // 對應 `id` 的別名
          return history;
        });
  }

  public List<UserHistory.ParticipantHistory> getParticipantHistoryByUserId(int userId) {
    System.out.println("getParticipantHistoryByUserId received");
    // SQL 1: 查詢 participant_form 表，獲取 payment_status 和 host_form_id
    String sql1 =
        "SELECT payment_status, host_form_id FROM participant_form WHERE participant_id = :userId"
            + " AND status = :status";

    Map<String, Object> params1 = new HashMap<>();
    params1.put("userId", userId);
    params1.put("status", List.of(1, 2)); // [paymentStatus 0 = NotYet,  1  = Done, 2 = Fail]

    // 查詢結果
    List<Map<String, Object>> participantFormResults =
        namedParameterJdbcTemplate.queryForList(sql1, params1);

    // 保存最終結果
    List<UserHistory.ParticipantHistory> participantHistories = new ArrayList<>();

    for (Map<String, Object> result : participantFormResults) {
      // 從第一個查詢結果中提取 host_form_id 和 payment_status
      Integer hostFormId = (Integer) result.get("host_form_id"); // 確保正確處理 Integer
      Integer paymentStatus = (Integer) result.get("payment_status"); // 確保正確處理 Integer

      // SQL 2: 根據 host_form_id 查詢 host_form 表的 title 和 dead_time
      String sql2 =
          "SELECT title AS name, dead_time AS datetime FROM host_form WHERE id = :hostFormId";

      Map<String, Object> params2 = new HashMap<>();
      params2.put("hostFormId", hostFormId);

      List<UserHistory.ParticipantHistory> hostFormResults =
          namedParameterJdbcTemplate.query(
              sql2,
              params2,
              (rs, rowNum) -> {
                UserHistory.ParticipantHistory history = new UserHistory.ParticipantHistory();
                history.setName(rs.getString("name"));
                history.setDatetime(rs.getString("datetime"));
                history.setPaymentStatus(paymentStatus.toString()); // 使用第一個查詢結果的 payment_status
                history.setHostformId(hostFormId.toString()); // 設置 host_form_id
                return history;
              });

      // 添加查詢結果到最終列表
      participantHistories.addAll(hostFormResults);
    }

    return participantHistories;
  }

  public List<UserHistory.HostHistory> getNowHostingByUserID(int userId) {
    String sql =
        "SELECT title AS name, dead_time AS datetime, id AS hostformId "
            + "FROM host_form WHERE host_id = :userId AND status = :status";

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("status", 0); // [status 0  = NotYet(ongoing),  1  = Done]

    return namedParameterJdbcTemplate.query(
        sql,
        params,
        (rs, rowNum) -> {
          UserHistory.HostHistory history = new UserHistory.HostHistory();
          history.setName(rs.getString("name")); // 對應 SELECT 中的別名 `name`
          history.setDatetime(rs.getString("datetime")); // 對應 `dead_time`
          history.setStatus("0"); // 對應 `status`
          history.setHostformId(rs.getString("hostformId")); // 對應 `id` 的別名
          return history;
        });
  }

  public List<UserHistory.ParticipantHistory> getNowBuyingByUserID(int userId) {
    // SQL 1: 查詢 participant_form 表，獲取 payment_status 和 host_form_id
    String sql1 =
        "SELECT payment_status, host_form_id FROM participant_form WHERE participant_id = :userId"
            + " AND status = :status";

    Map<String, Object> params1 = new HashMap<>();
    params1.put("userId", userId);
    params1.put("status", 0);

    // 查詢結果
    List<Map<String, Object>> participantFormResults =
        namedParameterJdbcTemplate.queryForList(sql1, params1);

    // 保存最終結果
    List<UserHistory.ParticipantHistory> participantHistories = new ArrayList<>();

    for (Map<String, Object> result : participantFormResults) {
      // 從第一個查詢結果中提取 host_form_id 和 payment_status
      Integer hostFormId = (Integer) result.get("host_form_id"); // 確保正確處理 Integer
      Integer paymentStatus = (Integer) result.get("payment_status"); // 確保正確處理 Integer

      // SQL 2: 根據 host_form_id 查詢 host_form 表的 title 和 dead_time
      String sql2 =
          "SELECT title AS name, dead_time AS datetime FROM host_form WHERE id = :hostFormId";

      Map<String, Object> params2 = new HashMap<>();
      params2.put("hostFormId", hostFormId);

      List<UserHistory.ParticipantHistory> hostFormResults =
          namedParameterJdbcTemplate.query(
              sql2,
              params2,
              (rs, rowNum) -> {
                UserHistory.ParticipantHistory history = new UserHistory.ParticipantHistory();
                history.setName(rs.getString("name"));
                history.setDatetime(rs.getString("datetime"));
                history.setPaymentStatus(paymentStatus.toString()); // 使用第一個查詢結果的 payment_status
                history.setHostformId(hostFormId.toString()); // 設置 host_form_id
                return history;
              });

      // 添加查詢結果到最終列表
      participantHistories.addAll(hostFormResults);
    }

    return participantHistories;
  }
}
