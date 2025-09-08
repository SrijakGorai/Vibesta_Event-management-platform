// src/main/java/com/vibesta/model/QuestionFeedback.java
package com.vibesta.model;

import jakarta.persistence.*;

@Entity
public class QuestionFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;       // user who submitted
    private String question;    // the feedback/question
    private String response;    // <-- make sure this field exists

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
}
