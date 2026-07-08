package com.example.trust_engine_backend.governancematurity.service;

import com.example.trust_engine_backend.governancematurity.calculator.GovernanceCalculator;
import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.governancematurity.dto.QuestionnaireAnswers;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GovernanceMaturityServiceImpl implements GovernanceMaturityService {

    private final GovernanceCalculator calculator;

    public GovernanceMaturityServiceImpl(GovernanceCalculator calculator) {
        this.calculator = calculator;
    }

    @Override
    public GovernanceResult calculateMaturity(QuestionnaireAnswers answers) {
        // 1. Calculate individual category scores
        Map<String, Double> categoryScores = calculator.calculateCategoryScores(answers);

        // 2. Calculate aggregate maturity score
        double overallScore = calculator.calculateOverallScore(categoryScores);

        // 3. Return final payload
        return new GovernanceResult(
            answers.assessmentId(),
            overallScore,
            categoryScores
        );
    }
}
