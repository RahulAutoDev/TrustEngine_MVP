package com.example.trust_engine_backend.trustengine.dto;

import java.util.Map;

/**
 * Data Transfer Object representing the final calculated Trust Index and level.
 */
public record TrustIndex(
    double trustIndex,
    String trustLevel,
    Map<String, Double> trustBreakdown
) {
}
