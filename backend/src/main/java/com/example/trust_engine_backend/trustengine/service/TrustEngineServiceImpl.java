package com.example.trust_engine_backend.trustengine.service;

import com.example.trust_engine_backend.governancematurity.dto.GovernanceResult;
import com.example.trust_engine_backend.governancematurity.dto.QuestionnaireAnswers;
import com.example.trust_engine_backend.governancematurity.service.GovernanceMaturityService;
import com.example.trust_engine_backend.trustengine.analyzer.GovernanceAnalyzer;
import com.example.trust_engine_backend.trustengine.calculator.TrustCalculator;
import com.example.trust_engine_backend.trustengine.compliance.ComplianceAnalyzer;
import com.example.trust_engine_backend.trustengine.confidence.ConfidenceAnalyzer;
import com.example.trust_engine_backend.trustengine.decision.DecisionEngine;
import com.example.trust_engine_backend.trustengine.dto.*;
import com.example.trust_engine_backend.trustengine.explainability.ExplainabilityService;
import com.example.trust_engine_backend.trustengine.recommendation.RecommendationEngine;
import com.example.trust_engine_backend.trustengine.risk.RiskAnalyzer;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The Master Orchestrator for the Trust Engine.
 * Coordinates all independent calculation and analysis modules without containing its own business logic.
 */
@Service
public class TrustEngineServiceImpl implements TrustEngineService {

    private final GovernanceMaturityService governanceMaturityService;
    private final GovernanceAnalyzer governanceAnalyzer;
    private final RiskAnalyzer riskAnalyzer;
    private final ComplianceAnalyzer complianceAnalyzer;
    private final ConfidenceAnalyzer confidenceAnalyzer;
    private final TrustCalculator trustCalculator;
    private final ExplainabilityService explainabilityService;
    private final DecisionEngine decisionEngine;
    private final RecommendationEngine recommendationEngine;

    public TrustEngineServiceImpl(
            GovernanceMaturityService governanceMaturityService,
            GovernanceAnalyzer governanceAnalyzer,
            RiskAnalyzer riskAnalyzer,
            ComplianceAnalyzer complianceAnalyzer,
            ConfidenceAnalyzer confidenceAnalyzer,
            TrustCalculator trustCalculator,
            ExplainabilityService explainabilityService,
            DecisionEngine decisionEngine,
            RecommendationEngine recommendationEngine) {
        
        this.governanceMaturityService = governanceMaturityService;
        this.governanceAnalyzer = governanceAnalyzer;
        this.riskAnalyzer = riskAnalyzer;
        this.complianceAnalyzer = complianceAnalyzer;
        this.confidenceAnalyzer = confidenceAnalyzer;
        this.trustCalculator = trustCalculator;
        this.explainabilityService = explainabilityService;
        this.decisionEngine = decisionEngine;
        this.recommendationEngine = recommendationEngine;
    }

    @Override
    public TrustEngineResponse evaluateTrust(TrustEngineRequest request) {

        // Note: In a real implementation, we would map request.governanceMaturityMetrics() 
        // to QuestionnaireAnswers. For this hackathon scope, we adapt the map to Integers.
        Map<String, Integer> rawScores = new HashMap<>();
        if (request.governanceMaturityMetrics() != null) {
            request.governanceMaturityMetrics().forEach((k, v) -> {
                if (v instanceof Number n) {
                    rawScores.put(k, n.intValue());
                }
            });
        }
        QuestionnaireAnswers answers = new QuestionnaireAnswers(request.assessmentId(), request.organizationId(), rawScores);

        // 1. Calculate base Governance Maturity
        GovernanceResult governanceMaturity = governanceMaturityService.calculateMaturity(answers);

        // 2. Perform Primary Dimensional Analysis
        GovernanceAnalysis governanceAnalysis = governanceAnalyzer.analyze(governanceMaturity);
        RiskResult riskProfile = riskAnalyzer.analyzeRisk(governanceMaturity);
        ComplianceResult complianceProfile = complianceAnalyzer.analyzeCompliance(governanceMaturity);
        
        // 3. Evaluate Statistical Confidence (Using dummy parameters based on map size for hackathon MVP)
        int totalQuestions = 50; 
        int answeredQuestions = Math.max(rawScores.size(), 1); 
        double consistency = 0.95; 
        ConfidenceResult confidenceProfile = confidenceAnalyzer.analyzeConfidence(totalQuestions, answeredQuestions, consistency);

        // 4. Calculate Final Trust Index
        TrustIndex trustIndex = trustCalculator.calculateTrustIndex(
                governanceMaturity, riskProfile, complianceProfile, confidenceProfile);

        // 5. Generate High-Level Explainability
        ExplainabilityResult explainability = explainabilityService.generateExplanation(
                governanceMaturity, riskProfile, complianceProfile, confidenceProfile);

        // 6. Formulate Executive Decision
        Decision executiveDecision = decisionEngine.generateDecision(
                trustIndex, riskProfile, complianceProfile, confidenceProfile);

        // 7. Generate Targeted Implementation Roadmap
        List<Recommendation> roadmapRecommendations = recommendationEngine.generateRecommendations(
                trustIndex, governanceAnalysis, riskProfile, complianceProfile, executiveDecision);

        // 8. Assemble Master Response
        return new TrustEngineResponse(
                request.assessmentId(),
                trustIndex,
                governanceMaturity,
                governanceAnalysis,
                riskProfile,
                complianceProfile,
                confidenceProfile,
                explainability,
                executiveDecision,
                roadmapRecommendations
        );
    }
}
