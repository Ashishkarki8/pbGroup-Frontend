// ========================================
// APP COMPONENT - UPDATED
// Login now shows as modal on Home page
// ========================================

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ROUTES } from "./utils/constants";

// ========================================
// PUBLIC PAGES (Lazy loaded)
// ========================================
const Home = lazy(() => import("./pages/Home"));
const AllCourses = lazy(() => import("./pages/CoursesPage"));
const AllClientsPartners = lazy(() => import("./pages/ClientsAndPartnersPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const BlogDetailsPage = lazy(() => import("./pages/BlogDetailsPage"));
const OurWorksPage = lazy(() => import("./pages/OurWorksPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// ========================================
// ADMIN PAGES (Lazy loaded)
// ========================================
const AdminDashboard = lazy(() => import("./pages/admin-pages/AdminDashboard"));
const AdminList = lazy(() => import("./pages/admin-pages/AdminList"));
const AdminProfile = lazy(() => import("./pages/admin-pages/AdminProfile"));
const Unauthorized = lazy(() => import("./pages/admin-pages/Unauthorized"));

// ========================================
// PROTECTED ROUTE WRAPPER
// ========================================
const ProtectedRoute = lazy(() => import("./components/features/auth/ProtectedRoute"));

// ========================================
// LOADING FALLBACK
// ========================================
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// ========================================
// MAIN APP COMPONENT
// ========================================
function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ========================================
              PUBLIC ROUTES (Main Website)
              ======================================== */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<AllCourses />} />
            <Route path="clients-partners" element={<AllClientsPartners />} />
            <Route path="blogs" element={<BlogPage />} />
            <Route path="our-works" element={<OurWorksPage />} />
            <Route path="teams" element={<TeamPage />} />
            <Route path="careers" element={<CareersPage />} />

            {/* Detail pages */}
            <Route path="courses/:slug" element={<CourseDetailsPage />} />
            <Route path="blogs/:slug" element={<BlogDetailsPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />

            {/* ========================================
                ✅ LOGIN ROUTE - Shows Home with Login Modal
                When user visits /auth/x7k9p2m/login,
                it loads Home page with login modal on top!
                ======================================== */}
            <Route path={ROUTES.LOGIN} element={<Home />} />
          </Route>

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ========================================
              ADMIN ROUTES (Protected)
              ======================================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />
            
            {/* Profile */}
            <Route path="profile" element={<AdminProfile />} />
            
            {/* Admin Management (Super Admin Only) */}
            <Route
              path="users"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <AdminList />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ========================================
              404 NOT FOUND
              ======================================== */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;