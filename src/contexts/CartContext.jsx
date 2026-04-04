import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{ product, quantity, material }]

  // Thêm sản phẩm — nếu đã có (cùng id + material) thì tăng số lượng
  const addToCart = useCallback((product, quantity = 1, material = null) => {
    const mat = material || (product.materials?.[0] ?? 'PLA');
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.material === mat);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.material === mat
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, material: mat }];
    });
  }, []);

  // Cập nhật số lượng
  const updateQuantity = useCallback((productId, material, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.product.id === productId && i.material === material)));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.product.id === productId && i.material === material ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  // Xoá sản phẩm
  const removeFromCart = useCallback((productId, material) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.material === material)));
  }, []);

  // Xoá toàn bộ giỏ
  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
