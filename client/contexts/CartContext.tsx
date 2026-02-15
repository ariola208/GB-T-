import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  artisan?: string;
  location?: string;
  inStock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.inStock) }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      } else {
        // Add new item
        const newItem: CartItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      }
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.inStock)) }
          : item
      ).filter(item => item.quantity > 0);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartMessage: (action: 'added' | 'removed' | 'updated' | 'cleared', productName?: string) => string;
  getCartSummary: () => { subtotal: string; shipping: string; total: string; };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { language, t } = useLanguage();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('danxome-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          // Clear existing items first to avoid duplicates
          dispatch({ type: 'CLEAR_CART' });
          parsedCart.items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('danxome-cart', JSON.stringify({
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    }));
  }, [state.items, state.total, state.itemCount]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getCartMessage = (action: 'added' | 'removed' | 'updated' | 'cleared', productName?: string): string => {
    const messages = {
      fr: {
        added: productName ? `${productName} a été ajouté au panier` : 'Article ajouté au panier',
        removed: productName ? `${productName} a été retiré du panier` : 'Article retiré du panier',
        updated: 'Quantité mise à jour',
        cleared: 'Panier vidé'
      },
      en: {
        added: productName ? `${productName} has been added to cart` : 'Item added to cart',
        removed: productName ? `${productName} has been removed from cart` : 'Item removed from cart',
        updated: 'Quantity updated',
        cleared: 'Cart cleared'
      }
    };
    return messages[language][action];
  };

  const getCartSummary = () => {
    const shipping = state.total > 50 ? 0 : 5.90;
    const subtotal = state.total;
    const total = subtotal + shipping;

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    };

    return {
      subtotal: formatPrice(subtotal),
      shipping: shipping === 0 ? t('cart.free') : formatPrice(shipping),
      total: formatPrice(total)
    };
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getCartMessage,
        getCartSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
