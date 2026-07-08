package com.example.trust_engine_backend.trustengine.confidence;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Evaluates the statistical confidence of the assessment results.
 */
public interface ConfidenceEvaluator {
    double calculateConfidence(TrustEngineContext context);
}
