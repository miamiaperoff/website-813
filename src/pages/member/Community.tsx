import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import CommunityBoard from '@/components/member/CommunityBoard';

const Community: React.FC = () => {
  return (
    <MemberLayout>
      <CommunityBoard />
    </MemberLayout>
  );
};

export default Community;
