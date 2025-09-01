import React, { useState, useMemo, useEffect } from "react";
import ProductDetails from "../../services/ProductDetails";
import Card from "../../UI/Card";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  saveProductsToStorage,
  loadProductsFromStorage,
  isLocalStorageAvailable,
  saveFilterStateToStorage,
  loadFilterStateFromStorage,
 
} from "../../utils/localStorage";
import MainForm from "../../components/common/mainForm";
import { FilterState, Product } from "../../types/productType";

const Home = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Product | null>(null);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const itemsPerPage = 2;
  const [products, setProducts] = useState<Product[]>(() => {
    if (isLocalStorageAvailable()) {
      const savedProducts = loadProductsFromStorage();
      return savedProducts || ProductDetails;
    }
    return ProductDetails;
  });
   
  const [currentPage, setCurrentPage] = useState(() => {
    if (isLocalStorageAvailable()) {
      const savedState = loadFilterStateFromStorage();
      return savedState?.currentPage || 1;
    }
    return 1;
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    if (isLocalStorageAvailable()) {
      const savedState = loadFilterStateFromStorage();
      return savedState?.searchTerm || "";
    }
    return "";
  });

  const [orderBy, setOrderBy] = useState(() => {
    if (isLocalStorageAvailable()) {
      const savedState = loadFilterStateFromStorage();
      return savedState?.orderBy || "name";
    }
    return "name";
  });

  

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      saveProductsToStorage(products);

      const timer = setTimeout(() => setSaveStatus(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const filterState: FilterState = {
        searchTerm,
        orderBy,
        currentPage,
      };
      saveFilterStateToStorage(filterState);
    }
  }, [searchTerm, orderBy, currentPage]);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const savedProducts = loadProductsFromStorage();
      const savedFilterState = loadFilterStateFromStorage();

      if (savedProducts || savedFilterState) {
        let message = "Data loaded from storage";
        if (savedFilterState) {
          message = "Data and filters restored";
        }
        setSaveStatus(message);
        const timer = setTimeout(() => setSaveStatus(""), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (orderBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "date-newest":
        filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
        break;
      case "date-oldest":
        filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, orderBy]);

  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [currentPage, filteredAndSortedProducts]);

  const handleDeleteCard = (productId: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );

      const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (updatedProducts.length === 0) {
        setCurrentPage(1);
      }

      return updatedProducts;
    });
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handleOrderChange = (orderValue: string) => {
    setOrderBy(orderValue);
    setCurrentPage(1);
  };

  const handleResetData = () => {
    
      setProducts(ProductDetails);
      setCurrentPage(1);
      setSearchTerm("");
      setOrderBy("name");
      setSaveStatus("Data reset");
      const timer = setTimeout(() => setSaveStatus(""), 2000);
      return () => clearTimeout(timer);
    
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>My Store</h1>
      {saveStatus && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {saveStatus}
        </div>
      )}
    
      {(searchTerm || orderBy !== "name" || currentPage > 1) && (
        <div
          style={{
            background: "#f0f0f0",
            padding: "8px 16px",
            margin: "8px 0",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#666",
            border: "1px solid #ddd",
          }}
        >
          <strong>Active Filters:</strong>
          {searchTerm && ` Search: "${searchTerm}"`}
          {orderBy !== "name" && ` | Order: ${orderBy}`}
          {currentPage > 1 && ` | Page: ${currentPage}`}
          <span style={{ color: "#888", marginLeft: "8px" }}>
            (preserved after refresh)
          </span>
        </div>
      )}
      <Navbar
        onSearch={handleSearch}
        onOrderChange={handleOrderChange}
        onReset={handleResetData}
        searchValue={searchTerm}
        orderValue={orderBy}
        setProducts={setProducts}
      />
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => {
              setCurrentItem(item);
              setIsOpen(true);
            }}
            onDelete={() => handleDeleteCard(item.id)}
          >
            <h2>{item.name}</h2>
            <div>{item.description}</div>
           
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <h3>{searchTerm ? "No products found" : "No products available"}</h3>
          <p>
            {searchTerm
              ? `No products match "${searchTerm}"`
              : "All products have been deleted."}
          </p>
        </div>
      )}
      {filteredAndSortedProducts.length > 0 && (
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          hasPrev={currentPage > 1}
          hasNext={currentPage < totalPages}
        />
      )}
      {isOpen && (
        <MainForm setIsOpen={setIsOpen} isOpen={isOpen} setProducts={setProducts} item={currentItem} />
      )}
    </div>
  );
};

export default Home;
