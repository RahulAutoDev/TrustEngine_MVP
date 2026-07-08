# Trust Assessment Engine

## Description
The Trust Assessment Engine is an enterprise-grade AI governance platform designed to evaluate, quantify, and explain the trustworthiness of AI systems. It provides executives and stakeholders with a comprehensive view of AI risk, compliance, and governance maturity, empowering them to make informed deployment decisions through explainable metrics and actionable roadmaps.

## Features
- **Dynamic Trust Scoring:** Evaluates AI systems across key pillars (Transparency, Fairness, Privacy, Security, Accountability).
- **Executive Board Resolution Engine:** Automates deployment decisions (e.g., Approved, Conditional Approval, Do Not Deploy) based on calculated Trust Scores and configurable business rules.
- **Trust Intelligence Engine™:** Provides deterministic explainability into how Trust Scores were calculated, including positive contributors and critical weaknesses.
- **Trust Copilot™:** An interactive AI assistant providing executive summaries, prioritized recommendations, and a 90-day improvement roadmap.
- **Role-Based Workflows:** Seamlessly integrated views for technical assessors and executive decision-makers.

## Architecture
The application follows a decoupled microservices-inspired architecture:
- **Frontend Layer:** A responsive, interactive dashboard and assessment wizard built with React and Vite. It consumes RESTful APIs and utilizes a robust state management strategy.
- **Backend Layer:** A scalable Spring Boot service that processes assessment data, calculates deterministic Trust Scores, and aggregates governance metrics.
- **Data Pipeline:** End-to-end data propagation ensuring synchronized real-time updates across the Trust Copilot and Trust Intelligence Engine.

## Tech Stack
### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Java 21
- Spring Boot 3.5

## How to Run

### Prerequisites
- Node.js (v18+)
- Java 21+
- Maven

### Running the Frontend
1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Running the Backend
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Start the Spring Boot application:
   \`\`\`bash
   ./mvnw spring-boot:run
   \`\`\`

*Note: The frontend can operate in a 'Demo Mode' utilizing fallback simulation if the backend is unreachable.*

## Future Roadmap
- **Automated CI/CD Integration:** Integrate governance checks directly into deployment pipelines.
- **Advanced Bias Detection:** Connect to live model endpoints for continuous monitoring.
- **Customizable Weighting:** Allow administrators to dynamically adjust formula weights via a dedicated UI panel.
- **Audit Logging:** Comprehensive, immutable event tracking for compliance audits.

## License
Copyright © 2026. All rights reserved.
