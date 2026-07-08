package com.example.trust_engine_backend.controller;

import com.example.trust_engine_backend.dto.RecommendationRequest;
import com.example.trust_engine_backend.dto.RecommendationResponse;
import com.example.trust_engine_backend.service.TrustScoreCalculatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final TrustScoreCalculatorService trustScoreCalculatorService;

    public RecommendationController(TrustScoreCalculatorService trustScoreCalculatorService) {
        this.trustScoreCalculatorService = trustScoreCalculatorService;
    }

    @PostMapping
    public ResponseEntity<RecommendationResponse> generateRecommendations(@RequestBody RecommendationRequest request) {
        return ResponseEntity.ok(trustScoreCalculatorService.generateRecommendations(request));
    }
}
