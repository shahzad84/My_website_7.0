import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  // ✅ Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (FIXED with id + type)
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(
        (item) => item.id === product.id && item.type === product.type
      );

      if (exist) {
        return prev.map((item) =>
          item.id === product.id && item.type === product.type
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Remove item (FIXED)
  const removeFromCart = (id, type) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.type === type))
    );
  };

  // ✅ Increase qty (FIXED)
  const increaseQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ✅ Decrease qty (FIXED)
  const decreaseQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Custom hook
export const useCart = () => useContext(CartContext);