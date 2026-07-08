package com.example.trust_engine_backend.trustengine.confidence;

import com.example.trust_engine_backend.trustengine.dto.ConfidenceResult;
import org.springframework.stereotype.Component;

/**
 * Analyzes the statistical confidence of the assessment results.
 */
@Component
public class ConfidenceAnalyzer {

    /**
     * Determines deterministic confidence levels based on completeness and consistency.
     *
     * @param totalQuestions        The total number of questions in the assessment.
     * @param answeredQuestions     The number of questions the user actually answered.
     * @param questionConsistency   A metric (0.0 to 1.0) evaluating how logically consistent the answers are.
     * @return ConfidenceResult containing the confidence score (0-100) and categorical level.
     */
    public ConfidenceResult analyzeConfidence(int totalQuestions, int answeredQuestions, double questionConsistency) {
        
        // Safety check to prevent divide by zero
        if (totalQuestions <= 0) {
            return new ConfidenceResult(0.0, "Low");
        }

        // 1. Calculate Completeness (0.0 to 1.0)
        double completeness = (double) answeredQuestions / totalQuestions;
        completeness = Math.min(1.0, Math.max(0.0, completeness)); // Clamp between 0 and 1

        // 2. Ensure consistency is bounded
        double consistency = Math.min(1.0, Math.max(0.0, questionConsistency));

        // 3. Calculate Overall Confidence Score (0-100)
        // Completeness is weighted at 60%, Consistency at 40%
        double confidenceScore = ((completeness * 0.6) + (consistency * 0.4)) * 100.0;

        // 4. Determine Categorical Level
        String level = determineConfidenceLevel(confidenceScore);

        return new ConfidenceResult(
                Math.round(confidenceScore * 10.0) / 10.0,
                level
        );
    }

    /**
     * Converts the numeric confidence score to a categorical level.
     */
    private String determineConfidenceLevel(double score) {
        if (score >= 85.0) {
            return "High";
        } else if (score >= 65.0) {
            return "Medium";
        } else {
            return "Low";
        }
    }
}
