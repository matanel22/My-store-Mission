import { useState } from "react";
import ButtonUI from "../common/ButtonUI";
import TextInput from "../common/fields/TextInput";
import SelectInput from "../common/fields/SelectInput";

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
  onOrderChange: (orderBy: string) => void;
  onReset?: () => void;
  searchValue: string;
  orderValue: string;
}

const Navbar = ({
  onSearch,
  onOrderChange,
  onReset,
  searchValue,
  orderValue,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const orderOptions = [
    { value: "name", label: "Name" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "date-newest", label: "Date: Newest First" },
    { value: "date-oldest", label: "Date: Oldest First" },
  ];

  const handleSearchChange = (value: string) => {
    onSearch(value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onOrderChange(e.target.value);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        borderBottom: "1px solid #ccc",
        flexWrap: "wrap",
      }}
    >
      {/* {isOpen && <ViewItems setIsOpen={setIsOpen} isOpen={isOpen} />} */}

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold" }}>Search:</label>
        <div style={{ minWidth: "200px" }}>
          <TextInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold" }}>
          Order by:
        </label>
        <div style={{ minWidth: "180px" }}>
          <SelectInput
            options={orderOptions}
            value={orderValue}
            onChange={handleOrderChange}
          />
        </div>
      </div>

      <ButtonUI
        onClick={() => {
          setIsOpen(true);
        }}
      >
        + Add
      </ButtonUI>

      {onReset && (
        <ButtonUI onClick={onReset} background="#dc3545">
          🔄 Reset Data
        </ButtonUI>
      )}
    </nav>
  );
};

export default Navbar;
