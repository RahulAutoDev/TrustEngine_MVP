package com.example.trust_engine_backend.trustengine.dto;

/**
 * Data Transfer Object representing the final executive decision.
 */
public record Decision(
    String executiveDecision, // Approved, Approved with Conditions, Conditional Approval, Postpone, Do Not Deploy
    String businessJustification
) {
}
