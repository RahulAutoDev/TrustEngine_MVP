package com.example.trust_engine_backend.dto;

import java.util.UUID;

public class CreateAssessmentResponse {
    private UUID assessmentId;

    public CreateAssessmentResponse() {}

    public CreateAssessmentResponse(UUID assessmentId) {
        this.assessmentId = assessmentId;
    }

    public UUID getAssessmentId() { return assessmentId; }
    public void setAssessmentId(UUID assessmentId) { this.assessmentId = assessmentId; }
}
