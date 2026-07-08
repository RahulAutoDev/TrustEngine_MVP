package com.example.trust_engine_backend.trustengine.calculator;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Calculates quantitative scores for the Trust Engine.
 */
public interface ScoreCalculator {
    double calculateOverallTrustScore(TrustEngineContext context);
}
