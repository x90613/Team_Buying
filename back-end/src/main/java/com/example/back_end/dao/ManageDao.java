package com.example.back_end.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ManageDao {

  private final JdbcTemplate jdbcTemplate;

  public ManageDao(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public boolean updateTransferStatus(Integer orderId, Integer paymentStatus) {
    String sql = "UPDATE participant_form SET payment_status = ? WHERE id = ?";
    int update = jdbcTemplate.update(sql, paymentStatus, orderId);
    return update > 0;
  }

  // Not be used in current setting
  public boolean updateOrderStatus(Integer orderId, int status) {
    String sql = "UPDATE participant_form SET status = ? WHERE id = ?";
    int update = jdbcTemplate.update(sql, status, orderId);
    return update > 0;
  }

  // 完成團購
  public boolean finishTeamBuying(Integer hostformID) {
    String sql_host_form = "UPDATE host_form SET status = 1 WHERE id = ?";
    int update_hostform = jdbcTemplate.update(sql_host_form, hostformID);

    // 改participant的status
    String sql_participant_status =
        "UPDATE participant_form SET payment_status = 2 WHERE host_form_id = ? AND payment_status ="
            + " 0";
    jdbcTemplate.update(sql_participant_status, hostformID);
    return update_hostform > 0;
  }
}
