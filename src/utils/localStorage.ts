

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

const PRODUCTS_STORAGE_KEY = 'mystore_products';
const FILTER_STATE_STORAGE_KEY = 'mystore_filter_state';


export const saveProductsToStorage = (products: Product[]): void => {
  try {
    const serializedProducts = products.map(product => ({
      ...product,
      startDate: product.startDate
    }));
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(serializedProducts));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
};


export const loadProductsFromStorage = (): Product[] | null => {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!savedProducts) {
      return null;
    }
    
    const parsedProducts = JSON.parse(savedProducts);
    return parsedProducts.map((product: any) => ({
      ...product,
      startDate: new Date(product.startDate)
    }));
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return null;
  }
};


export const clearProductsFromStorage = (): void => {
  try {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing products from localStorage:', error);
  }
};


export const saveFilterStateToStorage = (filterState: FilterState): void => {
  try {
    localStorage.setItem(FILTER_STATE_STORAGE_KEY, JSON.stringify(filterState));
  } catch (error) {
    console.error('Error saving filter state to localStorage:', error);
  }
};


export const loadFilterStateFromStorage = (): FilterState | null => {
  try {
    const savedFilterState = localStorage.getItem(FILTER_STATE_STORAGE_KEY);
    if (!savedFilterState) {
      return null;
    }
    return JSON.parse(savedFilterState);
  } catch (error) {
    console.error('Error loading filter state from localStorage:', error);
    return null;
  }
};


export const clearFilterStateFromStorage = (): void => {
  try {
    localStorage.removeItem(FILTER_STATE_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing filter state from localStorage:', error);
  }
};


export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
