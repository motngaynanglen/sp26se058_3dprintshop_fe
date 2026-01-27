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

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageMaterials from "../pages/Admin/ManageMaterials";
import ManageStaffAccounts from "../pages/Admin/ManageStaffAccounts";
import ManageUsers from "../pages/Admin/ManageUsers";
import FeedbackList from "../pages/Admin/FeedbackList";
import SystemSettings from "../pages/Admin/SystemSettings";

// Manager Pages
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
            <PrivateRoute requiredRole="manager">
              <ManagerLayout>
                <ManagerDashboard />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/products"
          element={
            <PrivateRoute requiredRole="manager">
              <ManagerLayout>
                <ManageProducts />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/materials"
          element={
            <PrivateRoute requiredRole="manager">
              <ManagerLayout>
                <ManageMaterials />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/staff"
          element={
            <PrivateRoute requiredRole="manager">
              <ManagerLayout>
                <ManageStaffAccounts />
              </ManagerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/feedback"
          element={
            <PrivateRoute requiredRole="manager">
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
            <PrivateRoute requiredRole="employee">
              <StaffDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/custom-orders"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCustomOrdersList />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/custom-orders/:id"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCustomOrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/custom-orders/:orderId/items/:itemId/printing"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCustomItemPrinting />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/custom-orders-management"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCustomOrdersManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/custom-orders-management/:id"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCustomOrderManagementDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/production-jobs/new"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffCreateProductionJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/design-reviews"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffDesignReviewsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/design-reviews/:id"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffDesignReviewDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/upload-design/:orderId"
          element={
            <PrivateRoute requiredRole="employee">
              <DesignFileUpload />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/templates"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffTemplateManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/templates/:id"
          element={
            <PrivateRoute requiredRole="employee">
              <StaffTemplateDetail />
            </PrivateRoute>
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
              <PublicRoute>
                <Home />
              </PublicRoute>
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
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
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
