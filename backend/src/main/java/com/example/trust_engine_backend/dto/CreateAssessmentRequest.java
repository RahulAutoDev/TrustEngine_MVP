package com.example.trust_engine_backend.dto;

public class CreateAssessmentRequest {
    private String organizationName;
    private String industry;
    private String country;
    private String systemName;
    private String assessmentOwner;
    private String scope;

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
}
