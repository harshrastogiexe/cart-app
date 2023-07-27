export interface Credentials {
  email: string;

  password: string;
}

export interface User extends Credentials {
  firstName: string;

  lastName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface OrderItem {
  product: Product;

  quantity: number;
}

export interface ICartHandler {}

export interface Cart {
  id: number;

  products: Product[];

  userId: number;
}

export interface CartItem {
  product: Product;

  quantity: number;
}

export interface UserCart {
  items: CartItem[];

  initialized: boolean;

  loading: boolean;
}
