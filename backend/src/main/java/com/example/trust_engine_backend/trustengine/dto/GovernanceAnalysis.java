package com.example.trust_engine_backend.trustengine.dto;

import java.util.List;
import java.util.Map;

/**
 * Data Transfer Object representing the results of the Governance Analyzer.
 */
public record GovernanceAnalysis(
    List<String> strengths,
    List<String> weaknesses,
    List<Map.Entry<String, Double>> categoryRankings,
    String highestPerformingCategory,
    String lowestPerformingCategory,
    String governanceHealth // Excellent, Good, Moderate, Poor, Critical
) {
}
