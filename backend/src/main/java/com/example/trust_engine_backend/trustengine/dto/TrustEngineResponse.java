package com.example.trust_engine_backend.trustengine.dto;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import java.util.List;

/**
 * Master Data Transfer Object representing the final output payload from the Trust Engine Orchestrator.
 * Encapsulates all independently calculated modules for the Results Dashboard.
 */
public record TrustEngineResponse(
    String assessmentId,
    TrustIndex trustIndex,
    GovernanceResult governanceMaturity,
    GovernanceAnalysis governanceAnalysis,
    RiskResult riskProfile,
    ComplianceResult complianceProfile,
    ConfidenceResult confidenceProfile,
    ExplainabilityResult explainability,
    Decision executiveDecision,
    List<Recommendation> roadmapRecommendations
) {
}
