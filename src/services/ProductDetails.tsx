import { Product } from "../types/productType";


const ProductDetails: Product[] = [
  {
    name: "Product 1",
    id: 1,
    description: "This is Product 1",
    price: 5,
    startDate: new Date("2023-01-01"),
  },
  {
    name: "Product 2",
    id: 2,
    description: "This is Product 2",
    price: 10,
    startDate: new Date("2023-02-01"),
  },
  {
    name: "Product 3",
    id: 3,
    description: "This is Product 3 ",
    price: 15, 
    startDate: new Date("2023-03-01"),
  },
];

export default ProductDetails;
