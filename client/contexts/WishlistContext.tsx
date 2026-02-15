import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from './CartContext';
import { useLanguage } from './LanguageContext';

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
  getWishlistMessage: (action: 'added' | 'removed' | 'cleared') => string;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { language } = useLanguage();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('danxome-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (parsedWishlist.items && Array.isArray(parsedWishlist.items)) {
          // Clear existing items first to avoid duplicates
          dispatch({ type: 'CLEAR_WISHLIST' });
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
    localStorage.setItem('danxome-wishlist', JSON.stringify({
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

  const getWishlistMessage = (action: 'added' | 'removed' | 'cleared'): string => {
    const messages = {
      fr: {
        added: 'ajouté aux favoris',
        removed: 'retiré des favoris',
        cleared: 'Liste de favoris vidée'
      },
      en: {
        added: 'added to wishlist',
        removed: 'removed from wishlist',
        cleared: 'Wishlist cleared'
      }
    };
    return messages[language][action];
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
        getWishlistMessage,
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
