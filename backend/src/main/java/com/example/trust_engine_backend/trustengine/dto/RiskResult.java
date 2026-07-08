package com.example.trust_engine_backend.trustengine.dto;

/**
 * Data Transfer Object representing the calculated risk levels.
 * Risk levels are strings: Low, Medium, High, Critical.
 */
public record RiskResult(
    String operationalRisk,
    String complianceRisk,
    String securityRisk,
    String privacyRisk,
    String ethicalRisk,
    String overallRisk
) {
}
