import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminTest: React.FC = () => {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test admin page to verify routing is working.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTest;
