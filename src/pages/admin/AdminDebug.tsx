import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDebug: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Debug Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Authentication Status:</h3>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
            <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <h3 className="font-semibold">User Info:</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold">Instructions:</h3>
            <p>To access admin, login with:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Email: ana@813cafe.com</li>
              <li>Password: admin123</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDebug;
