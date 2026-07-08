package com.example.trust_engine_backend.trustengine.explainability;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Translates quantitative outcomes into human-readable, executive-friendly explanations.
 */
public interface ExplainabilityEngine {
    String generateReport(TrustEngineContext context);
}
