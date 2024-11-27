import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../Admin/AdminDashboard';
import Incidents from '../Admin/Incidents';
import Demo from './Demo';
// import Profile from './Profile';

function Routing() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/home/*" element={<ProtectedRoute> <HomePage /></ProtectedRoute>} /> */}
        {/* <Route path="/home/*" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} /> */}
        <Route path="/home/*" element={<ProtectedRoute> <Demo/> </ProtectedRoute>} />
        {/* <Route path="/home/incidents" element={<ProtectedRoute> <Incidents/> </ProtectedRoute>} /> */}
        
        {/* <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />     */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default Routing;