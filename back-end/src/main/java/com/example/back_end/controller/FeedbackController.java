package com.example.back_end.controller;

import com.example.back_end.dto.FeedbackRequest;
import com.example.back_end.dto.OrderFormRequest;
import com.example.back_end.service.FeedbackService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/feedbacks")
public class FeedbackController {

  private final FeedbackService feedbackService;

  @Autowired
  public FeedbackController(FeedbackService feedbackService) {
    this.feedbackService = feedbackService;
  }

  @PostMapping
  public ResponseEntity<String> createFeedback(@RequestBody FeedbackRequest feedbackDTO) {
    feedbackService.saveFeedback(feedbackDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body("Feedback submitted successfully!");
  }
}


