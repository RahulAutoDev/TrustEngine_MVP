package com.example.trust_engine_backend.trustengine.analyzer;

import com.example.trust_engine_backend.trustengine.model.TrustEngineContext;

/**
 * Analyzes the raw governance data and identifies key trust dimensions.
 */
public interface TrustAnalyzer {
    void analyze(TrustEngineContext context);
}
