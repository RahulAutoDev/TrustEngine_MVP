import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';
import { AssessmentWizard } from '@/pages/AssessmentWizard';
import { AssessmentQuestions } from '@/pages/AssessmentQuestions';
import { AssessmentResults } from '@/pages/AssessmentResults';
import { VerificationPage } from '@/pages/VerificationPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { RoadmapPage } from '@/pages/RoadmapPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<AssessmentWizard />} />
        <Route path="/assessment-questions" element={<AssessmentQuestions />} />
        <Route path="/results" element={<AssessmentResults />} />
        <Route path="/verify/:assessmentId" element={<VerificationPage />} />
        {/* Placeholder routes for future phases */}
        <Route path="/history" element={<div className="p-12 text-center text-muted-foreground">History Coming Soon</div>} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
