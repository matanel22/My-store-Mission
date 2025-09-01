export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  startDate: Date;
}

export interface FilterState {
  searchTerm: string;
  orderBy: string;
  currentPage: number;
}