import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import AnalyticsDashboard from '@/components/member/AnalyticsDashboard';

const Analytics: React.FC = () => {
  return (
    <MemberLayout>
      <AnalyticsDashboard />
    </MemberLayout>
  );
};

export default Analytics;
