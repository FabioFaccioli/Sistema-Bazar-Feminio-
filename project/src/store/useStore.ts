import { create } from 'zustand';
import { Product, Sale } from '../types';

interface StoreState {
  products: Product[];
  sales: Sale[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  addSale: (sale: Sale) => void;
  updateStock: (productId: string, quantity: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  sales: [],
  
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
    
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    })),
    
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
    
  addSale: (sale) =>
    set((state) => ({
      sales: [...state.sales, sale],
    })),
    
  updateStock: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity - quantity }
          : p
      ),
    })),
}));