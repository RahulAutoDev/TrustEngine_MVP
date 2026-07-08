package com.example.trust_engine_backend.repository;

import com.example.trust_engine_backend.model.AssessmentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentResponseRepository extends JpaRepository<AssessmentResponse, Long> {
}
