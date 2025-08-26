import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from './CartContext';

export interface WishlistState {
  items: Product[];
  itemCount: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'TOGGLE_ITEM'; payload: Product };

const initialState: WishlistState = {
  items: [],
  itemCount: 0,
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return state; // Item already in wishlist
      }
      const updatedItems = [...state.items, action.payload];
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.length,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.length,
      };
    }
    case 'TOGGLE_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        // Remove from wishlist
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.length,
        };
      } else {
        // Add to wishlist
        const updatedItems = [...state.items, action.payload];
        return {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.length,
        };
      }
    }
    case 'CLEAR_WISHLIST':
      return {
        items: [],
        itemCount: 0,
      };
    default:
      return state;
  }
}

interface WishlistContextType {
  state: WishlistState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('gbeto-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (parsedWishlist.items && Array.isArray(parsedWishlist.items)) {
          parsedWishlist.items.forEach((item: Product) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('gbeto-wishlist', JSON.stringify({
      items: state.items,
      itemCount: state.itemCount
    }));
  }, [state.items, state.itemCount]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const toggleItem = (product: Product) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: product });
  };

  const isInWishlist = (productId: number) => {
    return state.items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
