import { TrustTransformationRoadmap } from '@/components/TrustTransformationRoadmap';
import { TrustImpactSimulator } from '@/components/TrustImpactSimulator';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function RoadmapPage() {
  const location = useLocation();
  const [trustScore, setTrustScore] = useState(location.state?.trustScore || 82);

  useEffect(() => {
    if (!location.state?.trustScore) {
      const demoTrust = localStorage.getItem('demoTrustResults');
      const realTrust = localStorage.getItem('trustResults');
      
      let loadedData = null;
      if (demoTrust) {
        loadedData = JSON.parse(demoTrust);
      } else if (realTrust) {
        loadedData = JSON.parse(realTrust);
      }
      
      if (loadedData && loadedData.overallTrustScore) {
        setTrustScore(loadedData.overallTrustScore);
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustImpactSimulator trustScore={trustScore} />
        <TrustTransformationRoadmap trustScore={trustScore} />
      </main>
    </div>
  );
}
