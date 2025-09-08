// controller/FeedbackController.java
package com.vibesta.controller;

import com.vibesta.dto.FeedbackResponseDTO;
import com.vibesta.model.QuestionFeedback;
import com.vibesta.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    // User submits feedback
    @PostMapping("/submit")
    public QuestionFeedback submitFeedback(@RequestBody QuestionFeedback feedback) {
        return service.submitFeedback(feedback);
    }

    // Admin view all
    @GetMapping("/all")
    public List<QuestionFeedback> getAllFeedback() {
        return service.getAllFeedback();
    }

    // User view their own
    @GetMapping("/user/{email}")
    public List<QuestionFeedback> getUserFeedback(@PathVariable String email) {
        return service.getUserFeedback(email);
    }

    // Admin respond
    @PutMapping("/respond/{id}")
    public QuestionFeedback respondFeedback(@PathVariable Long id, @RequestBody FeedbackResponseDTO dto) {
        return service.respondFeedback(id, dto.getResponse());
    }

}
