// src/main/java/com/vibesta/dto/FeedbackResponseDTO.java
package com.vibesta.dto;

public class FeedbackResponseDTO {
    private String response;

    public FeedbackResponseDTO() {}

    public FeedbackResponseDTO(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
