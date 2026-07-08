package com.example.trust_engine_backend.controller;

import com.example.trust_engine_backend.model.Question;
import com.example.trust_engine_backend.repository.QuestionRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*") // Allow frontend to call
public class QuestionnaireController {

    private final QuestionRepository questionRepository;

    public QuestionnaireController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}
