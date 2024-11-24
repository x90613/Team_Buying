package com.example.back_end.service;
import com.example.back_end.dao.HostFormDAO;
import com.example.back_end.dto.CreateHostFormDTO;
import com.example.back_end.entity.HostForm;
import com.example.back_end.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class HostFormService {
    private final HostFormDAO hostFormDAO;
    private final SecurityUtil securityUtil;
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public HostFormService(HostFormDAO hostFormDAO, SecurityUtil securityUtil) {
        this.hostFormDAO = hostFormDAO;
        this.securityUtil = securityUtil;
    }

    @Transactional
    public HostForm createHostForm(CreateHostFormDTO request) {
        try {
            log.info("Starting to create host form");
            validateCreateHostFormRequest(request);

            HostForm hostForm = new HostForm();

            // 設置基本字段
            log.debug("Setting basic fields");
            hostForm.setTitle(request.getTitle().trim());
            hostForm.setStoreName(request.getStoreName() != null ? request.getStoreName().trim() : null);
            hostForm.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);

            // 處理時間
            log.debug("Processing deadline");
            LocalDateTime deadlineTime = parseAndValidateDeadline(request.getDeadline());
            hostForm.setDeadTime(deadlineTime);
            hostForm.setStartTime(LocalDateTime.now());

            // 設置聯絡資訊
            hostForm.setHostContactInformation(request.getHostContactInformation() != null ?
                    request.getHostContactInformation().trim() : null);
            hostForm.setTransferInformation(request.getTransferInformation() != null ?
                    request.getTransferInformation().trim() : null);

            // 處理 others 相關字段
            log.debug("Processing others-related fields");
            if (Boolean.TRUE.equals(request.getOthers())) {
                if (!StringUtils.hasText(request.getImage())) {
                    throw new IllegalArgumentException("Image is required when others is true");
                }
                hostForm.setImage(request.getImage().trim());
                hostForm.setMenuId(null);
            } else {
                if (request.getMenuId() == null || request.getMenuId() <= 0) {
                    throw new IllegalArgumentException("Valid menuId is required when others is false");
                }
                hostForm.setMenuId(request.getMenuId());
                hostForm.setImage(null);
            }

            // 獲取當前用戶
            log.debug("Getting current user");
            var currentUser = securityUtil.getCurrentUser();
            if (currentUser == null || currentUser.getId() == null) {
                log.error("Current user or user ID is null");
                throw new AccessDeniedException("請先登入系統");
            }
            hostForm.setHostId(currentUser.getId());

            // 設置其他必要字段
            log.debug("Setting default values");
            hostForm.setStatus(0);
            hostForm.setParticipantInformation(false);
            hostForm.setOpen(request.getOpen());

            // 保存到數據庫
            log.info("Saving host form to database");
            return hostFormDAO.save(hostForm);

        } catch (Exception e) {
            log.error("Error in createHostForm: ", e);
            throw e;
        }
    }

    public Optional<HostForm> findById(Integer id) {
        try {
            log.info("Finding host form by id: {}", id);
            return hostFormDAO.findById(id);
        } catch (Exception e) {
            log.error("Error finding host form by id: {}", id, e);
            throw new RuntimeException("Error finding host form", e);
        }
    }

    public List<HostForm> findByHostId(Integer hostId) {
        try {
            log.info("Finding host forms by hostId: {}", hostId);
            return hostFormDAO.findByHostId(hostId);
        } catch (Exception e) {
            log.error("Error finding host forms by hostId: {}", hostId, e);
            throw new RuntimeException("Error finding host forms", e);
        }
    }

    @Transactional
    public HostForm updateHostForm(Integer id, CreateHostFormDTO request) {
        try {
            log.info("Updating host form with id: {}", id);
            validateCreateHostFormRequest(request);

            HostForm existingForm = hostFormDAO.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Host form not found with id: " + id));

            // 驗證當前用戶是否有權限更新
            var currentUser = securityUtil.getCurrentUser();
            if (currentUser == null) {
                throw new AccessDeniedException("請先登入系統");
            }
            if (!currentUser.getId().equals(existingForm.getHostId())) {
                throw new AccessDeniedException("無權限更新此團購表單");
            }

            // 更新基本字段
            existingForm.setTitle(request.getTitle().trim());
            existingForm.setStoreName(request.getStoreName() != null ? request.getStoreName().trim() : null);
            existingForm.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);

            // 更新截止時間
            LocalDateTime deadlineTime = parseAndValidateDeadline(request.getDeadline());
            existingForm.setDeadTime(deadlineTime);

            // 更新聯絡資訊
            existingForm.setHostContactInformation(request.getHostContactInformation() != null ?
                    request.getHostContactInformation().trim() : null);
            existingForm.setTransferInformation(request.getTransferInformation() != null ?
                    request.getTransferInformation().trim() : null);

            // 處理 others 相關字段
            if (Boolean.TRUE.equals(request.getOthers())) {
                if (!StringUtils.hasText(request.getImage())) {
                    throw new IllegalArgumentException("Image is required when others is true");
                }
                existingForm.setImage(request.getImage().trim());
                existingForm.setMenuId(null);
            } else {
                if (request.getMenuId() == null || request.getMenuId() <= 0) {
                    throw new IllegalArgumentException("Valid menuId is required when others is false");
                }
                existingForm.setMenuId(request.getMenuId());
                existingForm.setImage(null);
            }

            log.info("Saving updated host form");
            return hostFormDAO.save(existingForm);

        } catch (Exception e) {
            log.error("Error updating host form: ", e);
            throw e;
        }
    }

    @Transactional
    public void deleteHostForm(Integer id) {
        try {
            log.info("Deleting host form with id: {}", id);
            HostForm hostForm = hostFormDAO.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("找不到該團購表單"));

            // 驗證當前用戶是否有權限刪除
            var currentUser = securityUtil.getCurrentUser();
            if (currentUser == null) {
                throw new AccessDeniedException("請先登入系統");
            }
            if (!currentUser.getId().equals(hostForm.getHostId())) {
                throw new AccessDeniedException("無權限刪除此團購表單");
            }

            hostFormDAO.delete(hostForm);
            log.info("Successfully deleted host form with id: {}", id);

        } catch (IllegalArgumentException | AccessDeniedException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error deleting host form: ", e);
            throw new RuntimeException("刪除團購表單時發生錯誤", e);
        }
    }

    private void validateCreateHostFormRequest(CreateHostFormDTO request) {
        log.debug("Validating create host form request");
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        if (!StringUtils.hasText(request.getTitle())) {
            throw new IllegalArgumentException("Title is required");
        }
        if (request.getOthers() == null) {
            throw new IllegalArgumentException("Others field is required");
        }
        if (request.getDeadline() == null) {
            throw new IllegalArgumentException("Deadline is required");
        }
        log.debug("Request validation passed");
    }

    private LocalDateTime parseAndValidateDeadline(String deadline) {
        try {
            LocalDateTime deadlineTime;
            if (deadline.length() <= 10) {
                // 如果只有日期，加上結束時間 23:59:59
                deadlineTime = LocalDateTime.parse(deadline + "T23:59:59");
            } else {
                deadlineTime = LocalDateTime.parse(deadline, DATE_TIME_FORMATTER);
            }

            // 確保截止時間在當前時間之後
            if (deadlineTime.isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("Deadline must be in the future");
            }

            return deadlineTime;
        } catch (Exception e) {
            log.error("Error parsing deadline: ", e);
            throw new IllegalArgumentException("Invalid deadline format: " + deadline, e);
        }
    }
}