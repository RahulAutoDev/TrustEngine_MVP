package com.example.trust_engine_backend.trustengine.model;

import com.example.trust_engine_backend.trustengine.dto.TrustEngineRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * The execution context for the Trust Engine pipeline.
 * Holds intermediate computation state between different engine modules.
 */
public class TrustEngineContext {
    private final TrustEngineRequest request;
    private final Map<String, Object> intermediateResults;

    public TrustEngineContext(TrustEngineRequest request) {
        this.request = request;
        this.intermediateResults = new HashMap<>();
    }

    public TrustEngineRequest getRequest() {
        return request;
    }

    public void putResult(String key, Object value) {
        this.intermediateResults.put(key, value);
    }

    public Object getResult(String key) {
        return this.intermediateResults.get(key);
    }
}
