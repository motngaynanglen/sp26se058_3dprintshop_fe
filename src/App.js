import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// General Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';

// Customer Pages
import CustomOrderType from './pages/CustomOrderType';
import CustomOrderUpload from './pages/CustomOrderUpload';
import CustomOrderRequestDesign from './pages/CustomOrderRequestDesign';
import CustomOrderAIGenerate from './pages/CustomOrderAIGenerate';
import MyCustomOrders from './pages/MyCustomOrders';
import CustomOrderDetail from './pages/CustomOrderDetail';
import Preview3D from './pages/Preview3D';
import FeedbackForm from './pages/FeedbackForm';

// Staff Pages
import StaffDashboard from './pages/Staff/StaffDashboard';
import StaffCustomOrdersList from './pages/Staff/StaffCustomOrdersList';
import StaffCustomOrderDetail from './pages/Staff/StaffCustomOrderDetail';
import DesignFileUpload from './pages/Staff/DesignFileUpload';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import ManageMaterials from './pages/Admin/ManageMaterials';
import ManageStaffAccounts from './pages/Admin/ManageStaffAccounts';
import ManageUsers from './pages/Admin/ManageUsers';
import FeedbackList from './pages/Admin/FeedbackList';
import SystemSettings from './pages/Admin/SystemSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Protected Customer Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <ShoppingCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-order"
              element={
                <ProtectedRoute>
                  <CustomOrderType />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-order/upload"
              element={
                <ProtectedRoute>
                  <CustomOrderUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-order/request-design"
              element={
                <ProtectedRoute>
                  <CustomOrderRequestDesign />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-order/ai-generate"
              element={
                <ProtectedRoute>
                  <CustomOrderAIGenerate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-custom-orders"
              element={
                <ProtectedRoute>
                  <MyCustomOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/custom-orders/:id"
              element={
                <ProtectedRoute>
                  <CustomOrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview/:id"
              element={
                <ProtectedRoute>
                  <Preview3D />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback/:orderId"
              element={
                <ProtectedRoute>
                  <FeedbackForm />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes */}
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute requiredRole="employee">
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/custom-orders"
              element={
                <ProtectedRoute requiredRole="employee">
                  <StaffCustomOrdersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/custom-orders/:id"
              element={
                <ProtectedRoute requiredRole="employee">
                  <StaffCustomOrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/upload-design/:orderId"
              element={
                <ProtectedRoute requiredRole="employee">
                  <DesignFileUpload />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/materials"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageMaterials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/staff"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageStaffAccounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute requiredRole="admin">
                  <FeedbackList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <SystemSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
