package com.example.trust_engine_backend.trustengine.explainability;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.trustengine.dto.ComplianceResult;
import com.example.trust_engine_backend.trustengine.dto.ConfidenceResult;
import com.example.trust_engine_backend.trustengine.dto.ExplainabilityResult;
import com.example.trust_engine_backend.trustengine.dto.RiskResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Deterministically generates human-readable explanations for the Trust Score.
 */
@Service
public class ExplainabilityService {

    /**
     * Generates a comprehensive trust explanation without using LLMs.
     */
    public ExplainabilityResult generateExplanation(
            GovernanceResult governance,
            RiskResult risk,
            ComplianceResult compliance,
            ConfidenceResult confidence) {
        
        List<String> positiveFactors = new ArrayList<>();
        List<String> negativeFactors = new ArrayList<>();
        List<String> topContributors = new ArrayList<>();

        // 1. Analyze Governance factors
        if (governance != null && governance.categoryScores() != null) {
            for (Map.Entry<String, Double> entry : governance.categoryScores().entrySet()) {
                if (entry.getValue() >= 85.0) {
                    positiveFactors.add(entry.getKey() + " maturity is exceptionally high.");
                    topContributors.add("Strong " + entry.getKey() + " controls.");
                } else if (entry.getValue() < 60.0) {
                    negativeFactors.add(entry.getKey() + " requires immediate remediation.");
                }
            }
        }

        // 2. Analyze Risk factors
        if (risk != null) {
            if ("Low".equalsIgnoreCase(risk.overallRisk())) {
                positiveFactors.add("Overall risk profile is minimal.");
            } else if ("Critical".equalsIgnoreCase(risk.overallRisk())) {
                negativeFactors.add("System exposes the organization to Critical risk.");
            }
        }

        // 3. Analyze Compliance factors
        if (compliance != null) {
            if (compliance.overallComplianceScore() >= 85.0) {
                positiveFactors.add("High alignment with regulatory frameworks.");
            } else if (compliance.overallComplianceScore() < 60.0) {
                negativeFactors.add("Significant compliance gaps identified.");
            }
        }

        // 4. Construct Rationale
        String trustScoreRationale = String.format(
            "The Trust Score is primarily driven by a Governance Maturity of %.1f/100, combined with a %s Risk level and a %s Compliance Readiness. The statistical confidence in this assessment is %s.",
            governance != null ? governance.overallMaturityScore() : 0.0,
            risk != null ? risk.overallRisk() : "Unknown",
            compliance != null ? compliance.complianceLevel() : "Unknown",
            confidence != null ? confidence.confidenceLevel() : "Unknown"
        );

        // 5. Construct Overall Explanation
        String explanation = "The Trust Engine has evaluated the system across Governance, Risk, and Compliance dimensions. "
            + (positiveFactors.size() > negativeFactors.size() 
                ? "The system demonstrates robust trust characteristics." 
                : "The system exhibits notable trust deficiencies that must be addressed.");

        return new ExplainabilityResult(
                explanation,
                trustScoreRationale,
                topContributors,
                positiveFactors,
                negativeFactors
        );
    }
}
