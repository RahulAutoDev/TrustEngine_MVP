package com.example.trust_engine_backend.trustengine.recommendation;

import com.example.trust_engine_backend.trustengine.dto.Decision;
import com.example.trust_engine_backend.trustengine.dto.GovernanceAnalysis;
import com.example.trust_engine_backend.trustengine.dto.ComplianceResult;
import com.example.trust_engine_backend.trustengine.dto.RiskResult;
import com.example.trust_engine_backend.trustengine.dto.TrustIndex;
import com.example.trust_engine_backend.trustengine.dto.Recommendation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Deterministically generates prioritized action plans and recommendations.
 */
@Component
public class RecommendationEngine {

    /**
     * Synthesizes all outputs to generate a targeted list of executive recommendations.
     */
    public List<Recommendation> generateRecommendations(
            TrustIndex trustIndex,
            GovernanceAnalysis governanceAnalysis,
            RiskResult risk,
            ComplianceResult compliance,
            Decision decision) {
        
        List<Recommendation> recommendations = new ArrayList<>();

        // 1. Analyze Weaknesses directly from GovernanceAnalysis
        if (governanceAnalysis != null && governanceAnalysis.weaknesses() != null) {
            for (String weakness : governanceAnalysis.weaknesses()) {
                if (weakness.equalsIgnoreCase("Security")) {
                    recommendations.add(new Recommendation(
                            "Implement Robust Access Controls",
                            "Deploy role-based access control (RBAC) and data encryption to mitigate security gaps.",
                            "HIGH",
                            "Reduced Security Risk",
                            15,
                            "Immediate (0-30 Days)",
                            "CISO"
                    ));
                } else if (weakness.equalsIgnoreCase("Privacy")) {
                    recommendations.add(new Recommendation(
                            "Enhance Data Anonymization",
                            "Implement strict PII masking and automated data retention policies.",
                            "HIGH",
                            "Enhanced Regulatory Compliance",
                            12,
                            "Immediate (0-30 Days)",
                            "Data Protection Officer"
                    ));
                } else if (weakness.equalsIgnoreCase("Transparency")) {
                    recommendations.add(new Recommendation(
                            "Publish Model Explainability Reports",
                            "Generate standardized transparency documentation for all AI models.",
                            "MEDIUM",
                            "Increased Executive Confidence",
                            8,
                            "Short-Term (30-60 Days)",
                            "Chief AI Officer"
                    ));
                } else if (weakness.equalsIgnoreCase("Fairness")) {
                    recommendations.add(new Recommendation(
                            "Deploy Automated Bias Monitoring",
                            "Integrate algorithmic fairness checks into the CI/CD pipeline.",
                            "MEDIUM",
                            "Reduced Ethical Risk",
                            10,
                            "Short-Term (30-60 Days)",
                            "AI Ethics Board"
                    ));
                } else if (weakness.equalsIgnoreCase("Accountability")) {
                    recommendations.add(new Recommendation(
                            "Establish AI Governance Committee",
                            "Formalize a cross-functional committee with clear sign-off authority for AI models.",
                            "HIGH",
                            "Reduced Operational Risk",
                            14,
                            "Immediate (0-30 Days)",
                            "CIO"
                    ));
                }
            }
        }

        // 2. Risk-based Recommendations (if not already covered)
        if (risk != null && ("Critical".equalsIgnoreCase(risk.overallRisk()) || "High".equalsIgnoreCase(risk.overallRisk()))) {
            boolean hasSecurityRec = recommendations.stream().anyMatch(r -> r.title().contains("Access Controls"));
            if (!hasSecurityRec) {
                recommendations.add(new Recommendation(
                        "Conduct Comprehensive Security Audit",
                        "Engage third-party auditors to identify and remediate critical risk vectors immediately.",
                        "HIGH",
                        "Risk Mitigation",
                        18,
                        "Immediate (0-30 Days)",
                        "CISO"
                ));
            }
        }

        // 3. Fallback: If no weaknesses are found, suggest continuous improvement
        if (recommendations.isEmpty()) {
            recommendations.add(new Recommendation(
                    "Establish Continuous AI Monitoring",
                    "Transition from point-in-time assessments to real-time observability of AI systems.",
                    "LOW",
                    "Maintained Trust Leader Status",
                    5,
                    "Medium-Term (60-90 Days)",
                    "Chief AI Officer"
            ));
        }

        return recommendations;
    }
}
