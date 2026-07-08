package com.example.trust_engine_backend.dto;

import java.util.List;

public class AssessmentSubmissionRequest {
    private String companyName;
    private List<QuestionResponse> responses;

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public List<QuestionResponse> getResponses() { return responses; }
    public void setResponses(List<QuestionResponse> responses) { this.responses = responses; }

    public static class QuestionResponse {
        private Long questionId;
        private Long answerId;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public Long getAnswerId() { return answerId; }
        public void setAnswerId(Long answerId) { this.answerId = answerId; }
    }
}
