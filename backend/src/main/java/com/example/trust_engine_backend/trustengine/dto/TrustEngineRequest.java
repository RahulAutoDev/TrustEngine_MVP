package com.example.trust_engine_backend.trustengine.dto;

import java.util.Map;

/**
 * Data Transfer Object representing the input payload to the Trust Engine.
 * It contains the raw outputs from the Governance Maturity Engine.
 */
public record TrustEngineRequest(
    String assessmentId,
    String organizationId,
    Map<String, Object> governanceMaturityMetrics,
    Map<String, Object> complianceData
) {
}
