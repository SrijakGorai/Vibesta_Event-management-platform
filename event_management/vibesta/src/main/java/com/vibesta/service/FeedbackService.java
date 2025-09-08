// service/FeedbackService.java
package com.vibesta.service;

import com.vibesta.model.QuestionFeedback;
import com.vibesta.repository.QuestionFeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final QuestionFeedbackRepository repo;

    public FeedbackService(QuestionFeedbackRepository repo) {
        this.repo = repo;
    }

    public QuestionFeedback submitFeedback(QuestionFeedback feedback) {
        return repo.save(feedback);
    }

    public List<QuestionFeedback> getAllFeedback() {
        return repo.findAll();
    }

    public List<QuestionFeedback> getUserFeedback(String email) {
        return repo.findByEmail(email);
    }

    public QuestionFeedback respondFeedback(Long id, String response) {
        QuestionFeedback feedback = repo.findById(id).orElseThrow();
        feedback.setResponse(response);
        return repo.save(feedback);
    }
}
