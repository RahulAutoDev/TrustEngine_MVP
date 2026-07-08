package com.example.trust_engine_backend.trustengine.decision;

import com.example.trust_engine_backend.trustengine.dto.ComplianceResult;
import com.example.trust_engine_backend.trustengine.dto.ConfidenceResult;
import com.example.trust_engine_backend.trustengine.dto.Decision;
import com.example.trust_engine_backend.trustengine.dto.RiskResult;
import com.example.trust_engine_backend.trustengine.dto.TrustIndex;
import org.springframework.stereotype.Component;

/**
 * Deterministically generates an executive deployment decision based on the Trust Engine outputs.
 */
@Component
public class DecisionEngine {

    /**
     * Derives an executive decision (Approved, Postpone, etc.) and a business justification.
     */
    public Decision generateDecision(
            TrustIndex trustIndex,
            RiskResult risk,
            ComplianceResult compliance,
            ConfidenceResult confidence) {

        double indexScore = trustIndex != null ? trustIndex.trustIndex() : 0.0;
        String riskLevel = risk != null ? risk.overallRisk() : "Critical";
        double compScore = compliance != null ? compliance.overallComplianceScore() : 0.0;
        String confLevel = confidence != null ? confidence.confidenceLevel() : "Low";

        String executiveDecision;
        String businessJustification;

        // 1. Critical Failure Condition
        if ("Critical".equalsIgnoreCase(riskLevel) || indexScore < 40.0) {
            executiveDecision = "Do Not Deploy";
            businessJustification = "System exhibits Critical risk and/or unacceptable Trust Index scores. Deployment is blocked until major remediation occurs.";
        }
        // 2. High Risk / Low Compliance Condition
        else if ("High".equalsIgnoreCase(riskLevel) || compScore < 60.0) {
            executiveDecision = "Postpone";
            businessJustification = "System requires mandatory improvements to security, privacy, or compliance before deployment can be reconsidered.";
        }
        // 3. Conditional Approval (Medium Risk, Moderate Confidence)
        else if ("Medium".equalsIgnoreCase(riskLevel) || "Medium".equalsIgnoreCase(confLevel) || indexScore < 75.0) {
            executiveDecision = "Conditional Approval";
            businessJustification = "System is conditionally approved for limited release. Continuous monitoring and rapid remediation of medium-risk findings are required.";
        }
        // 4. Approved with Conditions (Good Score, Minor Gaps)
        else if (indexScore < 85.0 || compScore < 85.0) {
            executiveDecision = "Approved with Conditions";
            businessJustification = "System meets baseline governance and trust standards. Approved for deployment with minor conditions attached to the next release cycle.";
        }
        // 5. Full Approval
        else {
            executiveDecision = "Approved";
            businessJustification = "System demonstrates exceptional AI Trust, minimal risk, and robust compliance. Full deployment is authorized.";
        }

        return new Decision(executiveDecision, businessJustification);
    }
}
