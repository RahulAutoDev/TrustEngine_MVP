package com.example.trust_engine_backend.trustengine.calculator;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.trustengine.dto.ComplianceResult;
import com.example.trust_engine_backend.trustengine.dto.ConfidenceResult;
import com.example.trust_engine_backend.trustengine.dto.RiskResult;
import com.example.trust_engine_backend.trustengine.dto.TrustIndex;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Calculates the definitive Trust Index based on weighted inputs from all engine modules.
 */
@Component
public class TrustCalculator {

    // Configurable weights for the Trust Index calculation
    private static final double WEIGHT_GOVERNANCE = 0.40;
    private static final double WEIGHT_RISK = 0.30;
    private static final double WEIGHT_COMPLIANCE = 0.20;
    private static final double WEIGHT_CONFIDENCE = 0.10;

    /**
     * Synthesizes all scores into a single Trust Index and Tier.
     */
    public TrustIndex calculateTrustIndex(
            GovernanceResult governance,
            RiskResult risk,
            ComplianceResult compliance,
            ConfidenceResult confidence) {

        // 1. Extract base scores
        double govScore = governance != null ? governance.overallMaturityScore() : 0.0;
        double compScore = compliance != null ? compliance.overallComplianceScore() : 0.0;
        double confScore = confidence != null ? confidence.assessmentConfidenceScore() : 0.0;
        
        // Convert categorical risk into a numeric multiplier (0-100 scale for calculation)
        double riskScore = convertRiskToScore(risk != null ? risk.overallRisk() : "Critical");

        // 2. Apply configurable weights
        double weightedGov = govScore * WEIGHT_GOVERNANCE;
        double weightedRisk = riskScore * WEIGHT_RISK;
        double weightedComp = compScore * WEIGHT_COMPLIANCE;
        double weightedConf = confScore * WEIGHT_CONFIDENCE;

        // 3. Compute final Trust Index (0-100)
        double finalTrustIndex = weightedGov + weightedRisk + weightedComp + weightedConf;
        
        // 4. Generate Trust Breakdown for transparency
        Map<String, Double> breakdown = new HashMap<>();
        breakdown.put("GovernanceContribution", weightedGov);
        breakdown.put("RiskContribution", weightedRisk);
        breakdown.put("ComplianceContribution", weightedComp);
        breakdown.put("ConfidenceContribution", weightedConf);

        // 5. Determine the categorical Trust Level
        String trustLevel = determineTrustLevel(finalTrustIndex);

        return new TrustIndex(
                Math.round(finalTrustIndex * 10.0) / 10.0,
                trustLevel,
                breakdown
        );
    }

    /**
     * Converts a qualitative risk string back into a quantitative score for the algorithm.
     */
    private double convertRiskToScore(String riskLevel) {
        if (riskLevel == null) return 0.0;
        
        return switch (riskLevel.toLowerCase()) {
            case "low" -> 90.0;
            case "medium" -> 70.0;
            case "high" -> 40.0;
            case "critical" -> 10.0;
            default -> 0.0;
        };
    }

    /**
     * Maps the final Trust Index to an executive Trust Level.
     */
    private String determineTrustLevel(double index) {
        if (index >= 95.0) {
            return "AI Trust Champion";
        } else if (index >= 85.0) {
            return "AI Trust Leader";
        } else if (index >= 70.0) {
            return "Governed AI";
        } else if (index >= 50.0) {
            return "Developing Governance";
        } else if (index >= 30.0) {
            return "At Risk";
        } else {
            return "Critical";
        }
    }
}
