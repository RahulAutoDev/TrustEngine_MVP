package com.example.trust_engine_backend.governancematurity.dto;

import java.util.Map;

/**
 * Data Transfer Object representing the calculated maturity scores.
 */
public record GovernanceResult(
    String assessmentId,
    double overallMaturityScore,
    Map<String, Double> categoryScores
) {
}
