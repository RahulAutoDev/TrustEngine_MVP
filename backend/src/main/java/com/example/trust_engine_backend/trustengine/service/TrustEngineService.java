package com.example.trust_engine_backend.trustengine.service;

import com.example.trust_engine_backend.trustengine.dto.TrustEngineRequest;
import com.example.trust_engine_backend.trustengine.dto.TrustEngineResponse;

/**
 * The core orchestration service for the Trust Engine.
 * Sits between the Governance Assessment (Maturity Engine) and the Results Dashboard.
 */
public interface TrustEngineService {
    
    /**
     * Executes the main Trust Engine pipeline.
     * 
     * @param request the input payload containing assessment data
     * @return the calculated results intended for the dashboard
     */
    TrustEngineResponse evaluateTrust(TrustEngineRequest request);
}
