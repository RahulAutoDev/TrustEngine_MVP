package com.example.trust_engine_backend.trustengine.dto;

/**
 * Data Transfer Object representing the calculated statistical confidence of the assessment.
 */
public record ConfidenceResult(
    double assessmentConfidenceScore,
    String confidenceLevel
) {
}
