package com.example.trust_engine_backend.controller;

import com.example.trust_engine_backend.dto.TrustCalculationResponse;
import com.example.trust_engine_backend.service.TrustScoreCalculatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/trust")
@CrossOrigin(origins = "*")
public class TrustController {

    private final TrustScoreCalculatorService trustScoreCalculatorService;

    public TrustController(TrustScoreCalculatorService trustScoreCalculatorService) {
        this.trustScoreCalculatorService = trustScoreCalculatorService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<TrustCalculationResponse> calculateTrust(@RequestBody Map<String, String> payload) {
        UUID assessmentId = UUID.fromString(payload.get("assessmentId"));
        return ResponseEntity.ok(trustScoreCalculatorService.calculateScore(assessmentId));
    }
}
