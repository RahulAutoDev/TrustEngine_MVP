package com.example.trust_engine_backend.trustengine.dto;

import java.util.List;

/**
 * Data Transfer Object representing the deterministic explainability output.
 */
public record ExplainabilityResult(
    String trustExplanation,
    String trustScoreRationale,
    List<String> topContributors,
    List<String> positiveFactors,
    List<String> negativeFactors
) {
}
