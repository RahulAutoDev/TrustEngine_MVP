package com.example.trust_engine_backend.governancematurity.calculator;

import com.example.trust_engine_backend.governancematurity.dto.QuestionnaireAnswers;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Deterministic calculation engine for determining Governance Maturity scores.
 * Maps raw questionnaire data into predefined governance categories.
 */
@Component
public class GovernanceCalculator {

    public static final String CAT_TRANSPARENCY = "Transparency";
    public static final String CAT_FAIRNESS = "Fairness";
    public static final String CAT_PRIVACY = "Privacy";
    public static final String CAT_SECURITY = "Security";
    public static final String CAT_ACCOUNTABILITY = "Accountability";

    /**
     * Calculates deterministic scores based on provided raw scores.
     * Note: This is a robust mock/stub for the hackathon MVP. It uses static weights
     * and maps simulated question prefixes to their respective categories.
     */
    public Map<String, Double> calculateCategoryScores(QuestionnaireAnswers answers) {
        Map<String, Double> categoryScores = new HashMap<>();
        Map<String, Integer> rawScores = answers.rawScores();

        if (rawScores == null || rawScores.isEmpty()) {
            // Default fallback if no data provided
            categoryScores.put(CAT_TRANSPARENCY, 0.0);
            categoryScores.put(CAT_FAIRNESS, 0.0);
            categoryScores.put(CAT_PRIVACY, 0.0);
            categoryScores.put(CAT_SECURITY, 0.0);
            categoryScores.put(CAT_ACCOUNTABILITY, 0.0);
            return categoryScores;
        }

        // Aggregate scores dynamically based on key prefix (simulated logic)
        double transScore = 0; int transCount = 0;
        double fairScore = 0; int fairCount = 0;
        double privScore = 0; int privCount = 0;
        double secScore = 0; int secCount = 0;
        double accScore = 0; int accCount = 0;

        for (Map.Entry<String, Integer> entry : rawScores.entrySet()) {
            String key = entry.getKey().toLowerCase();
            int val = entry.getValue();

            if (key.contains("transparency") || key.contains("explain")) { transScore += val; transCount++; }
            else if (key.contains("fair") || key.contains("bias")) { fairScore += val; fairCount++; }
            else if (key.contains("priv") || key.contains("data")) { privScore += val; privCount++; }
            else if (key.contains("sec") || key.contains("access")) { secScore += val; secCount++; }
            else { accScore += val; accCount++; } // Default to accountability
        }

        categoryScores.put(CAT_TRANSPARENCY, transCount > 0 ? (transScore / transCount) : 75.0);
        categoryScores.put(CAT_FAIRNESS, fairCount > 0 ? (fairScore / fairCount) : 80.0);
        categoryScores.put(CAT_PRIVACY, privCount > 0 ? (privScore / privCount) : 85.0);
        categoryScores.put(CAT_SECURITY, secCount > 0 ? (secScore / secCount) : 90.0);
        categoryScores.put(CAT_ACCOUNTABILITY, accCount > 0 ? (accScore / accCount) : 70.0);

        return categoryScores;
    }

    /**
     * Calculates the overall maturity score.
     * Uses a weighted average (Security and Privacy weighted slightly higher).
     */
    public double calculateOverallScore(Map<String, Double> categoryScores) {
        double weightedSum = 0;
        
        weightedSum += categoryScores.getOrDefault(CAT_SECURITY, 0.0) * 1.2;
        weightedSum += categoryScores.getOrDefault(CAT_PRIVACY, 0.0) * 1.1;
        weightedSum += categoryScores.getOrDefault(CAT_ACCOUNTABILITY, 0.0) * 1.0;
        weightedSum += categoryScores.getOrDefault(CAT_FAIRNESS, 0.0) * 0.9;
        weightedSum += categoryScores.getOrDefault(CAT_TRANSPARENCY, 0.0) * 0.8;

        return Math.min(100.0, weightedSum / 5.0);
    }
}
