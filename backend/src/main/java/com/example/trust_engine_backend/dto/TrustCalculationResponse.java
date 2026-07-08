package com.example.trust_engine_backend.dto;

import java.util.Map;

public class TrustCalculationResponse {
    private Integer overallTrustScore;
    private String trustLevel;
    private String riskLevel;
    private Map<String, Integer> categoryScores;
    private String executiveSummary;

    public Integer getOverallTrustScore() { return overallTrustScore; }
    public void setOverallTrustScore(Integer overallTrustScore) { this.overallTrustScore = overallTrustScore; }

    public String getTrustLevel() { return trustLevel; }
    public void setTrustLevel(String trustLevel) { this.trustLevel = trustLevel; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public Map<String, Integer> getCategoryScores() { return categoryScores; }
    public void setCategoryScores(Map<String, Integer> categoryScores) { this.categoryScores = categoryScores; }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }
}
