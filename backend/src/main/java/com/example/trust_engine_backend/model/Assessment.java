package com.example.trust_engine_backend.model;

import jakarta.persistence.*;
import java.util.UUID;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "organization_name")
    private String organizationName;

    @Column(name = "industry")
    private String industry;

    @Column(name = "country")
    private String country;

    @Column(name = "system_name")
    private String systemName;

    @Column(name = "assessment_owner")
    private String assessmentOwner;

    @Column(name = "scope")
    private String scope;

    @Column(name = "overall_score")
    private Integer overallScore;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AssessmentResponse> responses;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    
    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }
    
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public String getSystemName() { return systemName; }
    public void setSystemName(String systemName) { this.systemName = systemName; }
    
    public String getAssessmentOwner() { return assessmentOwner; }
    public void setAssessmentOwner(String assessmentOwner) { this.assessmentOwner = assessmentOwner; }
    
    public String getScope() { return scope; }
    public void setScope(String scope) { this.scope = scope; }
    
    public Integer getOverallScore() { return overallScore; }
    public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }
    
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    
    public List<AssessmentResponse> getResponses() { return responses; }
    public void setResponses(List<AssessmentResponse> responses) { this.responses = responses; }
}
