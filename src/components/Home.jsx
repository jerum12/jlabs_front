import React from 'react';
import { Navigate } from 'react-router-dom';
import SellerHome from './SellerHome';
import CustomerHome from './CustomerHome';

const Home = ({ userType, userData, onUpdateProfile, onLogout }) => {
  if (!userData) {
    // Redirect to login if userData is not available (not logged in)
    return <Navigate to="/" />;
  }

  return (
    <>
      {userType === 'seller' ? (
        <SellerHome userData={userData} onUpdateProfile={onUpdateProfile} onLogout={onLogout} />
      ) : (
        <CustomerHome userData={userData} onUpdateProfile={onUpdateProfile} onLogout={onLogout} />
      )}
    </>
  );
};

export default Home;
