package com.example.trust_engine_backend.dto;

public class SubmitAnswerRequest {
    private Long questionId;
    private String answer; // "Yes", "Partial", "No"

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}
