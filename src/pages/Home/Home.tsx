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
  Product,
  FilterState,
} from "../../utils/localStorage";

const Home = () => {
  // Initialize products from localStorage or fallback to default data
  const [products, setProducts] = useState<Product[]>(() => {
    if (isLocalStorageAvailable()) {
      const savedProducts = loadProductsFromStorage();
      return savedProducts || ProductDetails;
    }
    return ProductDetails;
  });

  // Initialize filter state from localStorage or use defaults
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

  const [saveStatus, setSaveStatus] = useState<string>("");
  const itemsPerPage = 2;

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      saveProductsToStorage(products);
      setSaveStatus("Data saved ✓");
      const timer = setTimeout(() => setSaveStatus(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  // Save filter state to localStorage whenever filter state changes
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

  // Show initial load status
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const savedProducts = loadProductsFromStorage();
      const savedFilterState = loadFilterStateFromStorage();

      if (savedProducts || savedFilterState) {
        let message = "Data loaded from storage ✓";
        if (savedFilterState) {
          message = "Data and filters restored ✓";
        }
        setSaveStatus(message);
        const timer = setTimeout(() => setSaveStatus(""), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Filter and sort products based on search term and order
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort based on orderBy value
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

  // Validate and adjust current page if it's out of bounds
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

      // Adjust current page if necessary
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
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleOrderChange = (orderValue: string) => {
    setOrderBy(orderValue);
    setCurrentPage(1); // Reset to first page when changing order
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data to original products? This will restore deleted items and clear all filters."
      )
    ) {
      setProducts(ProductDetails);
      setCurrentPage(1);
      setSearchTerm("");
      setOrderBy("name");
      setSaveStatus("Data reset ✓");
      const timer = setTimeout(() => setSaveStatus(""), 2000);
      return () => clearTimeout(timer);
    }
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
      {/* Debug info - can be removed in production */}
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
      />
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => console.log("Card clicked!")}
            onDelete={() => handleDeleteCard(item.id)}
          >
            <h2>{item.name}</h2>
            <div>{item.description}</div>
            <div>Price: ${item.price}</div>
            <div>Start Date: {item.startDate.toDateString()}</div>
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
    </div>
  );
};

export default Home;
