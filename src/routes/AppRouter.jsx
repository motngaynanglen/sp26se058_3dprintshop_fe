import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ManagerLayout from '../components/Layout/ManagerLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { useAuthModal } from '../contexts/AuthModalContext';
import AuthModal from '../components/Auth/AuthModal';

// General Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ProductCatalog from '../pages/ProductCatalog';
import ProductDetail from '../pages/ProductDetail';
import ShoppingCart from '../pages/ShoppingCart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import MyOrders from '../pages/MyOrders';
import OrderDetail from '../pages/OrderDetail';

// Customer Pages
import CustomOrderType from "../pages/CustomOrderType";
import CustomOrderUpload from "../pages/CustomOrderUpload";
import CustomOrderRequestDesign from "../pages/CustomOrderRequestDesign";
import CustomOrderAIGenerate from "../pages/CustomOrderAIGenerate";
import MyCustomOrders from "../pages/MyCustomOrders";
import CustomOrderDetail from "../pages/CustomOrderDetail";
import Preview3D from "../pages/Preview3D";
import FeedbackForm from "../pages/FeedbackForm";
import Design3DCustomizer from "../pages/Design3DCustomizer";

// Staff Pages
import StaffDashboard from "../pages/Staff/StaffDashboard";
import StaffCustomOrdersList from "../pages/Staff/StaffCustomOrdersList";
import StaffCustomOrderDetail from "../pages/Staff/StaffCustomOrderDetail";
import DesignFileUpload from "../pages/Staff/DesignFileUpload";
import StaffDesignReviewDetail from "../pages/Staff/StaffDesignReviewDetail";
import StaffDesignReviewsList from "../pages/Staff/StaffDesignReviewsList";
import StaffCustomOrderManagementDetail from "../pages/Staff/StaffCustomOrderManagementDetail";
import StaffCustomOrdersManagement from "../pages/Staff/StaffCustomOrdersManagement";
import StaffCustomItemPrinting from "../pages/Staff/StaffCustomItemPrinting";
import StaffTemplateManagement from "../pages/Staff/StaffTemplateManagement";
import StaffTemplateDetail from "../pages/Staff/StaffTemplateDetail";
import StaffCreateProductionJob from "../pages/Staff/StaffCreateProductionJob";

// Admin Pages (using Manager components for now as Admin folder is missing)
import AdminDashboard from "../pages/Manager/ManagerDashboard";
import ManageProducts from "../pages/Manager/ManageProducts";
import ManageMaterials from "../pages/Manager/ManageMaterials";
import ManageStaffAccounts from "../pages/Manager/ManageStaffAccounts";
import ManageUsers from "../pages/Manager/ManageUsers";
import FeedbackList from "../pages/Manager/FeedbackList";
import SystemSettings from "../pages/Manager/SystemSettings";

// Manager Pages (Already imported via above or handled)
import ManagerDashboard from '../pages/Manager/ManagerDashboard';

// Component để redirect login/register và mở modal
const LoginRedirect = () => {
  const { openModal } = useAuthModal();
  React.useEffect(() => {
    openModal('login');
  }, [openModal]);
  return <Navigate to="/" replace />;
};

const RegisterRedirect = () => {
  const { openModal } = useAuthModal();
  React.useEffect(() => {
    openModal('register');
  }, [openModal]);
  return <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes không có Layout (Manager, Admin, Staff) - đặt trước để match trước */}

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard"
          element={
            <PrivateRoute requiredRole={['manager', 'admin']}>
              <ManagerLayout>
                <ManagerDashboard />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/products"
          element={
            <PrivateRoute requiredRole={['manager', 'admin']}>
              <ManagerLayout>
                <ManageProducts />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/materials"
          element={
            <PrivateRoute requiredRole={['manager', 'admin']}>
              <ManagerLayout>
                <ManageMaterials />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/staff"
          element={
            <PrivateRoute requiredRole={['manager', 'admin']}>
              <ManagerLayout>
                <ManageStaffAccounts />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/feedback"
          element={
            <PrivateRoute requiredRole={['manager', 'admin']}>
              <ManagerLayout>
                <FeedbackList />
              </ManagerLayout>
            </PrivateRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff/dashboard"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffDashboard />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/custom-orders"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCustomOrdersList />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/custom-orders/:id"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCustomOrderDetail />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/custom-orders/:orderId/items/:itemId/printing"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCustomItemPrinting />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/custom-orders-management"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCustomOrdersManagement />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/custom-orders-management/:id"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCustomOrderManagementDetail />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/production-jobs/new"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffCreateProductionJob />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/design-reviews"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffDesignReviewsList />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/design-reviews/:id"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffDesignReviewDetail />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/upload-design/:orderId"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <DesignFileUpload />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/templates"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffTemplateManagement />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/staff/templates/:id"
          element={
            <Layout>
              <PrivateRoute requiredRole="employee">
                <StaffTemplateDetail />
              </PrivateRoute>
            </Layout>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/materials"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageMaterials />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageStaffAccounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <PrivateRoute requiredRole="admin">
              <FeedbackList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute requiredRole="admin">
              <SystemSettings />
            </PrivateRoute>
          }
        />

        {/* Routes có Layout (Customer và Public) */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginRedirect />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterRedirect />
            </Layout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductCatalog />
            </Layout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />

        {/* Protected Customer Routes */}
        <Route
          path="/cart"
          element={
            <Layout>
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <Layout>
              <PrivateRoute>
                <OrderConfirmation />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/my-orders"
          element={
            <Layout>
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <Layout>
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/custom-order"
          element={
            <Layout>
              <PrivateRoute>
                <CustomOrderType />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/custom-order/upload"
          element={
            <Layout>
              <PrivateRoute>
                <CustomOrderUpload />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/custom-order/request-design"
          element={
            <Layout>
              <PrivateRoute>
                <CustomOrderRequestDesign />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/custom-order/ai-generate"
          element={
            <Layout>
              <PrivateRoute>
                <CustomOrderAIGenerate />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/my-custom-orders"
          element={
            <Layout>
              <PrivateRoute>
                <MyCustomOrders />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/custom-orders/:id"
          element={
            <Layout>
              <PrivateRoute>
                <CustomOrderDetail />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/preview/:id"
          element={
            <Layout>
              <PrivateRoute>
                <Preview3D />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/feedback/:orderId"
          element={
            <Layout>
              <PrivateRoute>
                <FeedbackForm />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/design-customizer"
          element={
            <PrivateRoute>
              <Design3DCustomizer />
            </PrivateRoute>
          }
        />
      </Routes>
      <AuthModal />
    </Router>
  );
};

export default AppRouter;
