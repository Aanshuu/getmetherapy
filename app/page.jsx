'use client';
import React from 'react';
import Onboarding from './onboardingPage/page';
// import Tracking from './tracking/page';
import ProtectedRoute from './components/ProtectedRoute';

const MainPage = () => {
  return (
    <div>
      <Onboarding />
      {/* <ProtectedRoute>
        <Tracking />
      </ProtectedRoute> */}
    </div>
  );
};

export default MainPage;


