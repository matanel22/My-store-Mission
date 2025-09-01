export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  startDate: Date;
  imageUrl?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface FilterState {
  searchTerm: string;
  orderBy: string;
  currentPage: number;
}