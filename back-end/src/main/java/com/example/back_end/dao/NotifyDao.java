package com.example.back_end.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

@Repository
public class NotifyDao {

    private final JdbcTemplate jdbcTemplate;

    public NotifyDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Integer getHostId(Integer hostFormId) {
        String sql = "SELECT hf.host_id FROM host_form hf WHERE hf.id = ?";
        try {
            Integer hostId = jdbcTemplate.queryForObject(sql, Integer.class, hostFormId);
            System.out.println(hostId);
            return hostId;
        } catch (EmptyResultDataAccessException e) {
            System.out.println("error");
            return null; // 返回 null 表示未找到
        }
    }
}
