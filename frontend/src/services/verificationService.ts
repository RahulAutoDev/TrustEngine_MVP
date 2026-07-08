// Mock Verification Service

export interface VerificationData {
  assessmentId: string;
  organizationName: string;
  industry: string;
  aiSystemName: string;
  assessmentDate: string;
  assessmentVersion: string;
  status: 'Verified' | 'Invalid' | 'Pending';
  overallTrustScore: number;
  governanceMaturityBadge: string;
  riskLevel: string;
  complianceScore: number;
  assessmentConfidence: number;
  categoryScores: Record<string, number>;
  generatedTimestamp: string;
}

export const verificationService = {
  verifyAssessment: async (assessmentId: string): Promise<VerificationData | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // For Hackathon MVP Demo, any ID starting with "ASMT" or "TAE" is valid
    if (!assessmentId) return null;

    // Return a rich set of mock data corresponding to the Demo Org or generic
    return {
      assessmentId,
      organizationName: "Acme Corp Global",
      industry: "Financial Services",
      aiSystemName: "Automated Underwriting Engine",
      assessmentDate: new Date().toLocaleDateString(),
      assessmentVersion: "MVP Hackathon Edition",
      status: "Verified",
      overallTrustScore: 92,
      governanceMaturityBadge: "AI Trust Leader",
      riskLevel: "Low",
      complianceScore: 96,
      assessmentConfidence: 98,
      categoryScores: {
        Transparency: 94,
        Fairness: 88,
        Privacy: 98,
        Security: 82,
        Accountability: 96
      },
      generatedTimestamp: new Date().toISOString()
    };
  }
};
