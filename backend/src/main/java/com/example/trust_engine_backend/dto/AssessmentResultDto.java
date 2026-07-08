package com.example.trust_engine_backend.dto;

import java.util.UUID;
import java.time.ZonedDateTime;
import java.util.List;

public class AssessmentResultDto {
    private UUID id;
    private String companyName;
    private Integer overallScore;
    private ZonedDateTime createdAt;
    private List<String> recommendations;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public Integer getOverallScore() { return overallScore; }
    public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
}
