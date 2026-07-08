package com.example.trust_engine_backend.trustengine.dto;

/**
 * Data Transfer Object representing the calculated compliance readiness metrics.
 */
public record ComplianceResult(
    double complianceReadiness,
    double transparencyReadiness,
    double privacyReadiness,
    double securityReadiness,
    double overallComplianceScore,
    String complianceLevel
) {
}
