package com.example.trust_engine_backend.trustengine.compliance;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Evaluates regulatory compliance alignment (e.g., EU AI Act, NIST AI RMF).
 */
public interface ComplianceChecker {
    void evaluateCompliance(TrustEngineContext context);
}
