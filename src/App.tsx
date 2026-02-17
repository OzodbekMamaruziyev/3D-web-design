import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './admin/pages/Login';
import AdminLayout from './admin/layout/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Admin Pages
import Dashboard from './admin/pages/Dashboard';
import HeroAdmin from './admin/pages/HeroAdmin';
import HighlightsAdmin from './admin/pages/HighlightsAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import PricingAdmin from './admin/pages/PricingAdmin';
import ContactAdmin from './admin/pages/ContactAdmin';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="highlights" element={<HighlightsAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="pricing" element={<PricingAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
