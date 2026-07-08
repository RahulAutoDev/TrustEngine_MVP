package com.example.trust_engine_backend.dto;

import java.util.List;

public class RecommendationResponse {
    private List<String> strengths;
    private List<String> weaknesses;
    private List<RecommendationDto> recommendations;

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getWeaknesses() { return weaknesses; }
    public void setWeaknesses(List<String> weaknesses) { this.weaknesses = weaknesses; }

    public List<RecommendationDto> getRecommendations() { return recommendations; }
    public void setRecommendations(List<RecommendationDto> recommendations) { this.recommendations = recommendations; }
}
