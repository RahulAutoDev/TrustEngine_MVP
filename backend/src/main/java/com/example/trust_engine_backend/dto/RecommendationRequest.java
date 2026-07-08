package com.example.trust_engine_backend.dto;

import java.util.Map;
import java.util.UUID;

public class RecommendationRequest {
    private UUID assessmentId;
    private Map<String, Integer> trustScores;
    private String riskLevel;

    public UUID getAssessmentId() { return assessmentId; }
    public void setAssessmentId(UUID assessmentId) { this.assessmentId = assessmentId; }

    public Map<String, Integer> getTrustScores() { return trustScores; }
    public void setTrustScores(Map<String, Integer> trustScores) { this.trustScores = trustScores; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
}
