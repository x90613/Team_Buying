package com.example.back_end.dao;

import com.example.back_end.entity.HostForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class HostFormDAO {
    private static final Logger log = LoggerFactory.getLogger(HostFormDAO.class);
    private final JdbcTemplate jdbcTemplate;

    private static final String INSERT_SQL =
            "INSERT INTO host_form (host_id, menu_id, title, store_name, description, status, start_time, dead_time, " +
                    "host_contact_information, transfer_information, participant_information, link, open, image) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String UPDATE_SQL =
            "UPDATE host_form SET host_id = ?, menu_id = ?, title = ?, store_name = ?, description = ?, status = ?, " +
                    "start_time = ?, dead_time = ?, host_contact_information = ?, transfer_information = ?, " +
                    "participant_information = ?, link = ?, open = ?, image = ? WHERE id = ?";

    private static final String SELECT_BY_ID_SQL =
            "SELECT * FROM host_form WHERE id = ?";

    private static final String SELECT_BY_HOST_ID_SQL =
            "SELECT * FROM host_form WHERE host_id = ?";

    private static final String DELETE_SQL =
            "DELETE FROM host_form WHERE id = ?";

    private static final String EXISTS_BY_ID_AND_HOST_ID_SQL =
            "SELECT COUNT(*) FROM host_form WHERE id = ? AND host_id = ?";

    public HostFormDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public HostForm save(HostForm hostForm) {
        try {
            if (hostForm.getId() == null) {
                return insert(hostForm);
            } else {
                return update(hostForm);
            }
        } catch (Exception e) {
            log.error("Error saving host form", e);
            throw new RuntimeException("Error saving host form", e);
        }
    }

    private HostForm insert(HostForm hostForm) {
        log.debug("Inserting new host form");
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(INSERT_SQL,
                    Statement.RETURN_GENERATED_KEYS);
            try {
                setHostFormParameters(ps, hostForm);
            } catch (SQLException e) {
                log.error("Error setting host form parameters", e);
                throw new RuntimeException("Error setting host form parameters", e);
            }
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            hostForm.setId(key.intValue());
            log.debug("Inserted host form with id: {}", hostForm.getId());
        }
        return hostForm;
    }

    private HostForm update(HostForm hostForm) {
        log.debug("Updating host form with id: {}", hostForm.getId());
        int updated = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(UPDATE_SQL);
            try {
                setHostFormParameters(ps, hostForm);
                ps.setInt(15, hostForm.getId());  // WHERE id = ?
            } catch (SQLException e) {
                log.error("Error setting host form parameters", e);
                throw new RuntimeException("Error setting host form parameters", e);
            }
            return ps;
        });

        if (updated == 0) {
            log.warn("No rows affected when updating host form with id: {}", hostForm.getId());
            throw new RuntimeException("No rows affected when updating host form with id: " + hostForm.getId());
        }

        return hostForm;
    }

    private void setHostFormParameters(PreparedStatement ps, HostForm hostForm) throws SQLException {
        int paramIndex = 1;
        ps.setInt(paramIndex++, hostForm.getHostId());
        ps.setObject(paramIndex++, hostForm.getMenuId());
        ps.setString(paramIndex++, hostForm.getTitle());
        ps.setString(paramIndex++, hostForm.getStoreName());
        ps.setString(paramIndex++, hostForm.getDescription());
        ps.setInt(paramIndex++, hostForm.getStatus());
        ps.setTimestamp(paramIndex++, Timestamp.valueOf(hostForm.getStartTime()));
        ps.setTimestamp(paramIndex++, Timestamp.valueOf(hostForm.getDeadTime()));
        ps.setString(paramIndex++, hostForm.getHostContactInformation());
        ps.setString(paramIndex++, hostForm.getTransferInformation());
        ps.setBoolean(paramIndex++, hostForm.getParticipantInformation());
        ps.setString(paramIndex++, hostForm.getLink());
        ps.setBoolean(paramIndex++, hostForm.getOpen());
        ps.setString(paramIndex, hostForm.getImage());
    }

    public Optional<HostForm> findById(Integer id) {
        try {
            log.debug("Finding host form by id: {}", id);
            HostForm hostForm = jdbcTemplate.queryForObject(
                    SELECT_BY_ID_SQL,
                    this::mapRowToHostForm,
                    id
            );
            return Optional.ofNullable(hostForm);
        } catch (EmptyResultDataAccessException e) {
            log.debug("Host form not found with id: {}", id);
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error finding host form by id: {}", id, e);
            throw new RuntimeException("Error finding host form", e);
        }
    }

    public List<HostForm> findByHostId(Integer hostId) {
        try {
            log.debug("Finding host forms by hostId: {}", hostId);
            List<HostForm> forms = jdbcTemplate.query(
                    SELECT_BY_HOST_ID_SQL,
                    this::mapRowToHostForm,
                    hostId
            );
            log.debug("Found {} host forms for hostId: {}", forms.size(), hostId);
            return forms;
        } catch (Exception e) {
            log.error("Error finding host forms by hostId: {}", hostId, e);
            throw new RuntimeException("Error finding host forms", e);
        }
    }

    public void delete(HostForm hostForm) {
        try {
            log.debug("Deleting host form with id: {}", hostForm.getId());
            int deleted = jdbcTemplate.update(DELETE_SQL, hostForm.getId());
            if (deleted == 0) {
                log.warn("No rows deleted when deleting host form with id: {}", hostForm.getId());
                throw new RuntimeException("No rows deleted when deleting host form with id: " + hostForm.getId());
            }
            log.debug("Successfully deleted host form with id: {}", hostForm.getId());
        } catch (Exception e) {
            log.error("Error deleting host form with id: {}", hostForm.getId(), e);
            throw new RuntimeException("Error deleting host form", e);
        }
    }

    public boolean existsByIdAndHostId(Integer id, Integer hostId) {
        try {
            log.debug("Checking if host form exists with id: {} and hostId: {}", id, hostId);
            Integer count = jdbcTemplate.queryForObject(
                    EXISTS_BY_ID_AND_HOST_ID_SQL,
                    Integer.class,
                    id,
                    hostId
            );
            return count != null && count > 0;
        } catch (Exception e) {
            log.error("Error checking host form existence for id: {} and hostId: {}", id, hostId, e);
            throw new RuntimeException("Error checking host form existence", e);
        }
    }

    private HostForm mapRowToHostForm(java.sql.ResultSet rs, int rowNum) throws SQLException {
        HostForm hostForm = new HostForm();
        hostForm.setId(rs.getInt("id"));
        hostForm.setHostId(rs.getInt("host_id"));
        hostForm.setMenuId(rs.getObject("menu_id", Integer.class));
        hostForm.setTitle(rs.getString("title"));
        hostForm.setStoreName(rs.getString("store_name"));
        hostForm.setDescription(rs.getString("description"));
        hostForm.setStatus(rs.getInt("status"));
        hostForm.setStartTime(rs.getTimestamp("start_time").toLocalDateTime());
        hostForm.setDeadTime(rs.getTimestamp("dead_time").toLocalDateTime());
        hostForm.setHostContactInformation(rs.getString("host_contact_information"));
        hostForm.setTransferInformation(rs.getString("transfer_information"));
        hostForm.setParticipantInformation(rs.getBoolean("participant_information"));
        hostForm.setLink(rs.getString("link"));
        hostForm.setOpen(rs.getBoolean("open"));
        hostForm.setImage(rs.getString("image"));
        return hostForm;
    }
}