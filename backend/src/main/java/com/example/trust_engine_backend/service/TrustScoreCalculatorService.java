package com.example.trust_engine_backend.service;

import com.example.trust_engine_backend.dto.TrustCalculationResponse;
import com.example.trust_engine_backend.model.Answer;
import com.example.trust_engine_backend.model.AssessmentResponse;
import com.example.trust_engine_backend.repository.AssessmentResponseRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class TrustScoreCalculatorService {

    private final AssessmentResponseRepository assessmentResponseRepository;

    public TrustScoreCalculatorService(AssessmentResponseRepository assessmentResponseRepository) {
        this.assessmentResponseRepository = assessmentResponseRepository;
    }

    public TrustCalculationResponse calculateScore(UUID assessmentId) {
        List<AssessmentResponse> responses = assessmentResponseRepository.findAll().stream()
                .filter(r -> r.getAssessment().getId().equals(assessmentId))
                .toList();

        Map<String, Integer> categoryScores = new HashMap<>();
        Map<String, Integer> categoryMax = new HashMap<>();

        for (AssessmentResponse response : responses) {
            String category = response.getQuestion().getCategory();
            int score = response.getAnswer().getScoreValue();
            
            categoryScores.put(category, categoryScores.getOrDefault(category, 0) + score);
            categoryMax.put(category, categoryMax.getOrDefault(category, 0) + 5); // 5 is max for Yes
        }

        Map<String, Integer> finalCategoryScores = new HashMap<>();
        int totalScoreSum = 0;
        int activeCategories = 0;

        String[] allCategories = {"Transparency", "Fairness", "Privacy", "Security", "Accountability"};
        
        for (String cat : allCategories) {
            int max = categoryMax.getOrDefault(cat, 0);
            if (max > 0) {
                int score = (int) Math.round(((double) categoryScores.get(cat) / max) * 100);
                finalCategoryScores.put(cat, score);
                totalScoreSum += score;
                activeCategories++;
            } else {
                finalCategoryScores.put(cat, 0);
            }
        }

        int overallScore = activeCategories > 0 ? (int) Math.round((double) totalScoreSum / activeCategories) : 0;

        String trustLevel;
        if (overallScore >= 90) trustLevel = "Excellent";
        else if (overallScore >= 75) trustLevel = "Good";
        else if (overallScore >= 60) trustLevel = "Moderate";
        else if (overallScore >= 40) trustLevel = "Low";
        else trustLevel = "Critical";

        String riskLevel;
        if (overallScore >= 80) riskLevel = "Low";
        else if (overallScore >= 50) riskLevel = "Medium";
        else riskLevel = "High";

        String executiveSummary;
        if (overallScore >= 80) executiveSummary = "Your AI governance maturity is above average. Maintain continuous monitoring.";
        else if (overallScore >= 50) executiveSummary = "Your AI governance maturity is average. Security and accountability controls require improvement.";
        else executiveSummary = "Your AI governance maturity is critical. Immediate remediation of core principles is required.";

        TrustCalculationResponse response = new TrustCalculationResponse();
        response.setOverallTrustScore(overallScore);
        response.setTrustLevel(trustLevel);
        response.setRiskLevel(riskLevel);
        response.setCategoryScores(finalCategoryScores);
        response.setExecutiveSummary(executiveSummary);

        return response;
    }

    public com.example.trust_engine_backend.dto.RecommendationResponse generateRecommendations(com.example.trust_engine_backend.dto.RecommendationRequest request) {
        com.example.trust_engine_backend.dto.RecommendationResponse response = new com.example.trust_engine_backend.dto.RecommendationResponse();
        
        java.util.List<String> strengths = new java.util.ArrayList<>();
        java.util.List<String> weaknesses = new java.util.ArrayList<>();
        java.util.List<com.example.trust_engine_backend.dto.RecommendationDto> recs = new java.util.ArrayList<>();

        if ("Low".equals(request.getRiskLevel())) {
            strengths.add("Excellent overall risk posture");
        } else {
            weaknesses.add("High risk indicators detected");
        }

        if (request.getTrustScores() != null) {
            request.getTrustScores().forEach((category, score) -> {
                if (score >= 80) strengths.add("Strong " + category + " controls");
                if (score < 50) {
                    weaknesses.add("Poor " + category + " controls");
                    recs.add(new com.example.trust_engine_backend.dto.RecommendationDto(
                            "Improve " + category,
                            "HIGH",
                            "+15 Trust Points"
                    ));
                }
            });
        }

        if (recs.isEmpty()) {
            recs.add(new com.example.trust_engine_backend.dto.RecommendationDto("Continuous Monitoring", "LOW", "+2 Trust Points"));
        }

        response.setStrengths(strengths);
        response.setWeaknesses(weaknesses);
        response.setRecommendations(recs);

        return response;
    }
}
