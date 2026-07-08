package com.example.trust_engine_backend.trustengine.risk;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.trustengine.dto.RiskResult;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Analyzes the Governance Maturity to determine deterministic risk levels.
 */
@Component
public class RiskAnalyzer {

    /**
     * Determines risk levels based on inverse mapping from governance scores.
     * High governance maturity = Low risk.
     * Low governance maturity = High/Critical risk.
     *
     * @param maturity The output from the Governance Maturity Engine.
     * @return RiskResult containing categorical risk levels.
     */
    public RiskResult analyzeRisk(GovernanceResult maturity) {
        Map<String, Double> scores = maturity.categoryScores();
        
        // If no scores are present, default to Critical risk across the board
        if (scores == null || scores.isEmpty()) {
            return new RiskResult("Critical", "Critical", "Critical", "Critical", "Critical", "Critical");
        }

        // Map categories to specific risks deterministically
        // Operational Risk relies heavily on Accountability and Transparency
        double opScore = (scores.getOrDefault("Accountability", 0.0) + scores.getOrDefault("Transparency", 0.0)) / 2.0;
        
        // Compliance Risk relies on Privacy and Accountability
        double compScore = (scores.getOrDefault("Privacy", 0.0) + scores.getOrDefault("Accountability", 0.0)) / 2.0;
        
        // Security Risk maps directly to Security
        double secScore = scores.getOrDefault("Security", 0.0);
        
        // Privacy Risk maps directly to Privacy
        double privScore = scores.getOrDefault("Privacy", 0.0);
        
        // Ethical Risk maps directly to Fairness
        double ethScore = scores.getOrDefault("Fairness", 0.0);

        String operationalRisk = determineRiskLevel(opScore);
        String complianceRisk = determineRiskLevel(compScore);
        String securityRisk = determineRiskLevel(secScore);
        String privacyRisk = determineRiskLevel(privScore);
        String ethicalRisk = determineRiskLevel(ethScore);
        
        String overallRisk = determineRiskLevel(maturity.overallMaturityScore());

        return new RiskResult(
                operationalRisk,
                complianceRisk,
                securityRisk,
                privacyRisk,
                ethicalRisk,
                overallRisk
        );
    }

    /**
     * Converts a maturity score (0-100) into a categorical risk string.
     * 
     * Maturity 85+ = Low Risk
     * Maturity 70-84 = Medium Risk
     * Maturity 50-69 = High Risk
     * Maturity < 50 = Critical Risk
     */
    private String determineRiskLevel(double maturityScore) {
        if (maturityScore >= 85.0) {
            return "Low";
        } else if (maturityScore >= 70.0) {
            return "Medium";
        } else if (maturityScore >= 50.0) {
            return "High";
        } else {
            return "Critical";
        }
    }
}
