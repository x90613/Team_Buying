package com.example.back_end.dao;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TeamBuyingDao {

  private final JdbcTemplate jdbcTemplate;

  public TeamBuyingDao(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public List<Map<String, Object>> getAllTeamBuyings() {
    String sql =
        "SELECT hf.id, hf.host_id, hf.dead_time, hf.start_time, hf.description, hf.menu_id,"
            + " hf.open, hf.status, hf.title, hf.img, hf.store_name, hf.transfer_information,"
            + " hf.contact_information, (SELECT COUNT(*) FROM Participant_form pf WHERE"
            + " pf.host_form_id = hf.id) AS participantCount, (SELECT COALESCE(AVG(uf.score), 0)"
            + " FROM user_feed_back uf WHERE uf.host_id = hf.host_id) AS averageFeedbackScore,"
            + " m.name AS menu_store_name, m.img as menu_store_img FROM host_form hf LEFT JOIN menu"
            + " m ON hf.menu_id = m.id WHERE hf.open = true AND hf.status = 0";
    return jdbcTemplate.queryForList(sql);
  }
}
