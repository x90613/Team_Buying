package com.example.back_end.service;

import com.example.back_end.dao.FeedbackDAO;
import com.example.back_end.dto.FeedbackRequest;
import com.example.back_end.entity.UserFeedBack;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

  private final FeedbackDAO feedbackDAO;

  @Autowired
  public FeedbackService(FeedbackDAO feedbackDAO) {
    this.feedbackDAO = feedbackDAO;
  }

  public void saveFeedback(FeedbackRequest feedbackDTO) {
    UserFeedBack userFeedback =
        new UserFeedBack(
            feedbackDTO.getUserId() != null ? Integer.parseInt(feedbackDTO.getUserId()) : null,
            feedbackDTO.getHostId() != null ? Integer.parseInt(feedbackDTO.getHostId()) : null,
            feedbackDTO.getHostFormId() != null
                ? Integer.parseInt(feedbackDTO.getHostFormId())
                : null,
            feedbackDTO.getContent(),
            feedbackDTO.getStar(),
            LocalDateTime.now());
    feedbackDAO.save(userFeedback);
  }
}
