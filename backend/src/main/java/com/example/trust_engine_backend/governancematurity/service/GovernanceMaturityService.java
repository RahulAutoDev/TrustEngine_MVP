package com.example.trust_engine_backend.governancematurity.service;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.governancematurity.dto.QuestionnaireAnswers;

/**
 * Service interface for the Governance Maturity Engine.
 */
public interface GovernanceMaturityService {
    
    /**
     * Calculates deterministic maturity scores based on questionnaire inputs.
     * 
     * @param answers The raw questionnaire answers
     * @return GovernanceResult containing category scores and overall maturity score
     */
    GovernanceResult calculateMaturity(QuestionnaireAnswers answers);
}
