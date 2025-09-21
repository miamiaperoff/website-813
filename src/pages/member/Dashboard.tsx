import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import Dashboard from '@/components/member/Dashboard';

const MemberDashboard: React.FC = () => {
  return (
    <MemberLayout>
      <Dashboard />
    </MemberLayout>
  );
};

export default MemberDashboard;
