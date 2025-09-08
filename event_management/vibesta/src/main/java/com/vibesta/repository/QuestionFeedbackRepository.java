// repository/QuestionFeedbackRepository.java
package com.vibesta.repository;

import com.vibesta.model.QuestionFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionFeedbackRepository extends JpaRepository<QuestionFeedback, Long> {
    List<QuestionFeedback> findByEmail(String email); // user's own feedback
}
