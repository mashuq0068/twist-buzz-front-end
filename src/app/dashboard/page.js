import DashboardNews from '@/components/DashboardNews/DashboardNews';
import AdminVerification from '@/utils/AdminVerification';
import React from 'react';

const Dashboard = () => {
    return (
        <div className=' container'>
            <AdminVerification>
                <DashboardNews />
            </AdminVerification>
        </div>
    );
};

export default Dashboard;