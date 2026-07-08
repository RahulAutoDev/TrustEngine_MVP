package com.example.trust_engine_backend.trustengine.analyzer;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.trustengine.dto.GovernanceAnalysis;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Analyzes the Governance Maturity results to determine strengths, weaknesses,
 * category rankings, and overall governance health.
 */
@Component
public class GovernanceAnalyzer {

    private static final double STRENGTH_THRESHOLD = 85.0;
    private static final double WEAKNESS_THRESHOLD = 70.0;

    /**
     * Performs a deterministic analysis of the governance maturity scores.
     * 
     * @param result The output from the Governance Maturity Engine.
     * @return GovernanceAnalysis containing strengths, weaknesses, rankings, and health status.
     */
    public GovernanceAnalysis analyze(GovernanceResult result) {
        Map<String, Double> scores = result.categoryScores();
        
        if (scores == null || scores.isEmpty()) {
            return new GovernanceAnalysis(List.of(), List.of(), List.of(), "None", "None", "Critical");
        }

        // 1. Sort rankings (Highest to Lowest)
        List<Map.Entry<String, Double>> rankings = scores.entrySet()
                .stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .collect(Collectors.toList());

        String highestCategory = rankings.get(0).getKey();
        String lowestCategory = rankings.get(rankings.size() - 1).getKey();

        // 2. Identify Strengths and Weaknesses
        List<String> strengths = new ArrayList<>();
        List<String> weaknesses = new ArrayList<>();

        for (Map.Entry<String, Double> entry : rankings) {
            if (entry.getValue() >= STRENGTH_THRESHOLD) {
                strengths.add(entry.getKey());
            } else if (entry.getValue() < WEAKNESS_THRESHOLD) {
                weaknesses.add(entry.getKey());
            }
        }

        // 3. Determine Governance Health
        String health = determineHealth(result.overallMaturityScore());

        return new GovernanceAnalysis(
                strengths,
                weaknesses,
                rankings,
                highestCategory,
                lowestCategory,
                health
        );
    }

    private String determineHealth(double overallScore) {
        if (overallScore >= 90.0) {
            return "Excellent";
        } else if (overallScore >= 75.0) {
            return "Good";
        } else if (overallScore >= 60.0) {
            return "Moderate";
        } else if (overallScore >= 45.0) {
            return "Poor";
        } else {
            return "Critical";
        }
    }
}
