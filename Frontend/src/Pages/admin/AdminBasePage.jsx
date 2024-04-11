import React from 'react';
import TopAdminNavbar from '../../components/adminComponents/TopAdminNavbar';
import BaseAdminPage from '../../components/adminComponents/BaseAdminPage';
import AdminFooter from '../../components/adminComponents/AdminFooter';

function AdminBasePage({ data }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopAdminNavbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {data === 'dashboard' && <BaseAdminPage value={'dashboard'} />}
        {data === 'doctor' && <BaseAdminPage value={'doctor'} />}
        {data === 'patient' && <BaseAdminPage value={'patient'} />}
        {data === 'department' && <BaseAdminPage value={'department'} />}
        {data === 'createDep' && <BaseAdminPage value={'createDep'} />}
      </div>
      
    </div>
  );
}

export default AdminBasePage;
