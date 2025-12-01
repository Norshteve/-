
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import VendorDetails from './pages/VendorDetails';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EventInvitation from './pages/EventInvitation';
import Dresses from './pages/Dresses';
import DressDetails from './pages/DressDetails';
import OccasionPlan from './pages/OccasionPlan';
import PackageDetails from './pages/PackageDetails';
import Bundles from './pages/Bundles';
import Booking from './pages/Booking';
import EventDashboard from './pages/EventDashboard';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminDashboard from './pages/AdminDashboard';
import Notifications from './pages/Notifications';
import NotificationSettingsPage from './pages/NotificationSettings';

const { HashRouter: Router, Routes, Route } = ReactRouterDOM;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Invitation Route (No Layout or Simple Layout) */}
        <Route path="/event/:id" element={<EventInvitation />} />
        
        {/* Organizer Dashboard (Separate Route) */}
        <Route path="/event/:id/dashboard" element={
          <Layout>
            <EventDashboard />
          </Layout>
        } />
        
        {/* ADMIN DASHBOARD (Standalone Route - Hidden) */}
        <Route path="/admin-munasabatkom" element={<AdminDashboard />} />

        {/* Main App Routes */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/vendor/:id" element={<VendorDetails />} />
              <Route path="/dresses" element={<Dresses />} />
              <Route path="/dresses/:id" element={<DressDetails />} />
              <Route path="/plans/:type" element={<OccasionPlan />} />
              <Route path="/plans/:type/package/:id" element={<PackageDetails />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/create" element={<CreateEvent />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notifications/settings" element={<NotificationSettingsPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
