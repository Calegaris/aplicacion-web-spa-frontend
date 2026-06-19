import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrdersPage } from '../pages/OrdersPage';
import { AdminDashboard } from '../pages/AdminDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Rutas Protegidas para Clientes (user) */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute requiredRole="user">
              <CheckoutPage />
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

        {/* Rutas Protegidas para Administradores (admin) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback para cualquier ruta no definida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
