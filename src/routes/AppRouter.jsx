import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// General Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ProductCatalog from "../pages/ProductCatalog";
import ProductDetail from "../pages/ProductDetail";
import ShoppingCart from "../pages/ShoppingCart";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import MyOrders from "../pages/MyOrders";
import OrderDetail from "../pages/OrderDetail";

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

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageMaterials from "../pages/Admin/ManageMaterials";
import ManageStaffAccounts from "../pages/Admin/ManageStaffAccounts";
import ManageUsers from "../pages/Admin/ManageUsers";
import FeedbackList from "../pages/Admin/FeedbackList";
import SystemSettings from "../pages/Admin/SystemSettings";
import StaffDesignReviewDetail from "../pages/Staff/StaffDesignReviewDetail";
import StaffDesignReviewsList from "../pages/Staff/StaffDesignReviewsList";
import StaffCustomOrderManagementDetail from "../pages/Staff/StaffCustomOrderManagementDetail";
import StaffCustomOrdersManagement from "../pages/Staff/StaffCustomOrdersManagement";
import StaffCustomItemPrinting from "../pages/Staff/StaffCustomItemPrinting";
import StaffTemplateManagement from "../pages/Staff/StaffTemplateManagement";
import StaffTemplateDetail from "../pages/Staff/StaffTemplateDetail";
import StaffCreateProductionJob from "../pages/Staff/StaffCreateProductionJob";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Protected Customer Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <PrivateRoute>
                <OrderConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-order"
            element={
              <PrivateRoute>
                <CustomOrderType />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-order/upload"
            element={
              <PrivateRoute>
                <CustomOrderUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-order/request-design"
            element={
              <PrivateRoute>
                <CustomOrderRequestDesign />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-order/ai-generate"
            element={
              <PrivateRoute>
                <CustomOrderAIGenerate />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-custom-orders"
            element={
              <PrivateRoute>
                <MyCustomOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-orders/:id"
            element={
              <PrivateRoute>
                <CustomOrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/preview/:id"
            element={
              <PrivateRoute>
                <Preview3D />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/:orderId"
            element={
              <PrivateRoute>
                <FeedbackForm />
              </PrivateRoute>
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
            path="/staff/custom-orders/:id"
            element={
              <PrivateRoute requiredRole="employee">
                <StaffCustomOrderDetail />
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
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
