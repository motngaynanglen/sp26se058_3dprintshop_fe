import React, { createContext, useContext, useState, useCallback } from 'react';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    // Fake data ban đầu
    { id: 'ORD-001', date: '15/01/2024', status: 'completed', total: 797000, type: 'product', shipping: 30000, tax: 59760, subtotal: 707240, items: [], shippingInfo: {} },
    { id: 'ORD-002', date: '12/01/2024', status: 'shipping', total: 299000, type: 'product', shipping: 30000, tax: 22148, subtotal: 246852, items: [], shippingInfo: {} },
    { id: 'CUST-001', date: '08/01/2024', status: 'processing', total: 1500000, type: 'custom', shipping: 30000, tax: 111111, subtotal: 1358889, items: [], shippingInfo: {} },
  ]);

  // Thêm đơn hàng mới
  const addOrder = useCallback((newOrder) => {
    setOrders(prev => [newOrder, ...prev]); // Đưa lên đầu danh sách
  }, []);

  const getOrderById = useCallback((id) => {
    return orders.find(o => o.id === id);
  }, [orders]);

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
};
