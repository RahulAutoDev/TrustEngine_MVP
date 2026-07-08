package com.example.trust_engine_backend.service;

import com.example.trust_engine_backend.dto.AssessmentResultDto;
import com.example.trust_engine_backend.dto.CreateAssessmentRequest;
import com.example.trust_engine_backend.dto.CreateAssessmentResponse;
import com.example.trust_engine_backend.dto.SubmitAnswerRequest;
import com.example.trust_engine_backend.model.Answer;
import com.example.trust_engine_backend.model.Assessment;
import com.example.trust_engine_backend.model.AssessmentResponse;
import com.example.trust_engine_backend.model.Question;
import com.example.trust_engine_backend.repository.AnswerRepository;
import com.example.trust_engine_backend.repository.AssessmentRepository;
import com.example.trust_engine_backend.repository.AssessmentResponseRepository;
import com.example.trust_engine_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final AssessmentResponseRepository assessmentResponseRepository;

    public AssessmentService(AssessmentRepository assessmentRepository,
                             QuestionRepository questionRepository,
                             AnswerRepository answerRepository,
                             AssessmentResponseRepository assessmentResponseRepository) {
        this.assessmentRepository = assessmentRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.assessmentResponseRepository = assessmentResponseRepository;
    }

    @Transactional
    public CreateAssessmentResponse createAssessment(CreateAssessmentRequest request) {
        Assessment assessment = new Assessment();
        assessment.setOrganizationName(request.getOrganizationName());
        assessment.setIndustry(request.getIndustry());
        assessment.setCountry(request.getCountry());
        assessment.setSystemName(request.getSystemName());
        assessment.setAssessmentOwner(request.getAssessmentOwner());
        assessment.setScope(request.getScope());

        Assessment saved = assessmentRepository.save(assessment);
        return new CreateAssessmentResponse(saved.getId());
    }

    @Transactional
    public void submitAnswer(UUID assessmentId, SubmitAnswerRequest request) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Map answer string ("Yes", "Partial", "No") to the corresponding answer ID in DB for this question
        Answer answer = answerRepository.findAll().stream()
                .filter(a -> a.getQuestion().getId().equals(question.getId()) && a.getText().equalsIgnoreCase(request.getAnswer()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Valid answer mapping not found for text: " + request.getAnswer()));

        // Check if a response already exists for this assessment and question to update it
        AssessmentResponse response = assessmentResponseRepository.findAll().stream()
                .filter(r -> r.getAssessment().getId().equals(assessmentId) && r.getQuestion().getId().equals(question.getId()))
                .findFirst()
                .orElse(new AssessmentResponse());

        response.setAssessment(assessment);
        response.setQuestion(question);
        response.setAnswer(answer);

        assessmentResponseRepository.save(response);
    }

    @Transactional(readOnly = true)
    public List<AssessmentResultDto> getAllAssessments() {
        return assessmentRepository.findAll().stream().map(assessment -> {
            AssessmentResultDto dto = new AssessmentResultDto();
            dto.setId(assessment.getId());
            dto.setCompanyName(assessment.getOrganizationName());
            dto.setOverallScore(assessment.getOverallScore() != null ? assessment.getOverallScore() : 0);
            dto.setCreatedAt(assessment.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }
}
