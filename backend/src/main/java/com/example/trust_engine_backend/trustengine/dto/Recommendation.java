package com.example.trust_engine_backend.trustengine.dto;

/**
 * Data Transfer Object representing a specific, actionable governance recommendation.
 */
public record Recommendation(
    String title,
    String description,
    String priority, // HIGH, MEDIUM, LOW
    String businessImpact, // Reduced Risk, Enhanced Compliance, etc.
    int expectedTrustImprovement, // +X Trust Points
    String timeline, // Immediate (0-30 Days), Short-Term (30-60 Days), Medium-Term (60-90 Days)
    String owner // e.g., CISO, AI Ethics Board, Data Protection Officer
) {
}
