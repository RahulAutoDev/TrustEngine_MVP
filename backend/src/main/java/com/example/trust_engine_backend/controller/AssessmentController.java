package com.example.trust_engine_backend.controller;

import com.example.trust_engine_backend.dto.AssessmentResultDto;
import com.example.trust_engine_backend.dto.CreateAssessmentRequest;
import com.example.trust_engine_backend.dto.CreateAssessmentResponse;
import com.example.trust_engine_backend.dto.SubmitAnswerRequest;
import com.example.trust_engine_backend.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "*") // Allow frontend to call
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @PostMapping
    public ResponseEntity<CreateAssessmentResponse> createAssessment(@RequestBody CreateAssessmentRequest request) {
        return ResponseEntity.ok(assessmentService.createAssessment(request));
    }

    @PostMapping("/{assessmentId}/answers")
    public ResponseEntity<Void> submitAnswer(@PathVariable UUID assessmentId, @RequestBody SubmitAnswerRequest request) {
        assessmentService.submitAnswer(assessmentId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<AssessmentResultDto>> getAllAssessments() {
        return ResponseEntity.ok(assessmentService.getAllAssessments());
    }
}
