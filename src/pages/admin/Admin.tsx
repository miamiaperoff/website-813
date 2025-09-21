import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SimpleAdminDashboard from '@/components/admin/SimpleAdminDashboard';

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <SimpleAdminDashboard />
    </AdminLayout>
  );
};

export default Admin;
