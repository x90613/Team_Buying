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

    public boolean updateOrderStatus(Integer orderId, int status) {
        String sql = "UPDATE participant_form SET status = ? WHERE id = ?";
        int update = jdbcTemplate.update(sql, status, orderId);
        return update > 0;
    }

    // 完成團購
    public boolean finishTeamBuying(Integer hostformID) {
        String sql = "UPDATE host_form SET status = 1 WHERE id = ?";
        int update = jdbcTemplate.update(sql, hostformID);
        return update > 0;
    }
}
