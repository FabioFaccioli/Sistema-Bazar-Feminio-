export interface Product {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  quantity: number;
  category: string;
  condition: 'Novo' | 'Seminovo' | 'Usado';
  dateAdded: string;
}

export interface Sale {
  id: string;
  products: {
    productId: string;
    quantity: number;
    priceAtSale: number;
  }[];
  total: number;
  date: string;
  paymentMethod: 'Dinheiro' | 'Cartão' | 'Pix';
  customerName?: string;
}