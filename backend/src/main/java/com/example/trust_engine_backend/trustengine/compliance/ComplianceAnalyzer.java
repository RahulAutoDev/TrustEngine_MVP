package com.example.trust_engine_backend.trustengine.compliance;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.trustengine.dto.ComplianceResult;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Analyzes Governance Maturity to determine deterministic compliance readiness.
 */
@Component
public class ComplianceAnalyzer {

    /**
     * Determines compliance readiness based on governance scores.
     * Maps governance categories to specific compliance readiness dimensions.
     *
     * @param maturity The output from the Governance Maturity Engine.
     * @return ComplianceResult containing readiness scores and overall level.
     */
    public ComplianceResult analyzeCompliance(GovernanceResult maturity) {
        Map<String, Double> scores = maturity.categoryScores();
        
        if (scores == null || scores.isEmpty()) {
            return new ComplianceResult(0.0, 0.0, 0.0, 0.0, 0.0, "Poor");
        }

        // Transparency Readiness is heavily weighted by Transparency and Fairness
        double transReadiness = (scores.getOrDefault("Transparency", 0.0) * 0.7) + (scores.getOrDefault("Fairness", 0.0) * 0.3);
        
        // Privacy Readiness is heavily weighted by Privacy and Accountability
        double privReadiness = (scores.getOrDefault("Privacy", 0.0) * 0.8) + (scores.getOrDefault("Accountability", 0.0) * 0.2);
        
        // Security Readiness maps directly to Security
        double secReadiness = scores.getOrDefault("Security", 0.0);
        
        // General Compliance Readiness is driven by Accountability and overall maturity
        double compReadiness = (scores.getOrDefault("Accountability", 0.0) * 0.6) + (maturity.overallMaturityScore() * 0.4);

        // Overall Compliance Score is a weighted average of the readiness pillars
        double overallScore = (transReadiness + privReadiness + secReadiness + compReadiness) / 4.0;
        
        String level = determineComplianceLevel(overallScore);

        return new ComplianceResult(
                Math.round(compReadiness * 10.0) / 10.0,
                Math.round(transReadiness * 10.0) / 10.0,
                Math.round(privReadiness * 10.0) / 10.0,
                Math.round(secReadiness * 10.0) / 10.0,
                Math.round(overallScore * 10.0) / 10.0,
                level
        );
    }

    /**
     * Converts an overall compliance score into a categorical level.
     */
    private String determineComplianceLevel(double score) {
        if (score >= 85.0) {
            return "Excellent";
        } else if (score >= 70.0) {
            return "Good";
        } else if (score >= 50.0) {
            return "Moderate";
        } else {
            return "Poor";
        }
    }
}
