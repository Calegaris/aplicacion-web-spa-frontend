import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmOrderPage } from '../pages/ConfirmOrderPage';
import { SuccessPage } from '../pages/SuccessPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminOrderDetailPage } from '../pages/AdminOrderDetailPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Cliente con Layout de Navegación y Footer */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          
          <Route
            path="/checkout"
            element={
              <ProtectedRoute requiredRole="user">
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/confirm"
            element={
              <ProtectedRoute requiredRole="user">
                <ConfirmOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/success"
            element={
              <ProtectedRoute requiredRole="user">
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole="user">
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Rutas de Autenticación independientes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas de Administración (modo oscuro con Sidebar) */}
        <Route
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
        </Route>

        {/* Fallback para cualquier ruta no definida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};


