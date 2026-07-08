package com.example.trust_engine_backend.dto;

public class RecommendationDto {
    private String title;
    private String priority; // HIGH, MEDIUM, LOW
    private String businessImpact;

    public RecommendationDto() {}
    
    public RecommendationDto(String title, String priority, String businessImpact) {
        this.title = title;
        this.priority = priority;
        this.businessImpact = businessImpact;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getBusinessImpact() { return businessImpact; }
    public void setBusinessImpact(String businessImpact) { this.businessImpact = businessImpact; }
}
