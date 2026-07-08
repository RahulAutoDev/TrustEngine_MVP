package com.example.trust_engine_backend.governancematurity.dto;

import java.util.Map;

/**
 * Data Transfer Object representing the raw input answers from the Governance Assessment.
 */
public record QuestionnaireAnswers(
    String assessmentId,
    String organizationId,
    Map<String, Integer> rawScores // Mapping of specific questions/areas to a numeric score (e.g., 0-100 or 1-5)
) {
}
