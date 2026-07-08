package com.example.trust_engine_backend.trustengine.risk;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Assesses overall risk levels based on governance weaknesses.
 */
public interface RiskAssessor {
    String determineRiskLevel(TrustEngineContext context);
}
