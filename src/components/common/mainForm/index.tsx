import { FormProvider, useForm } from "react-hook-form";
import ButtonUI from "../ButtonUI";
import InputHF from "../fields/InputField";
import DateField from "../fields/DateField";
import TextArea from "../fields/TextArea";
import Modal from "../Modal";
import { Product } from "../../../utils/localStorage";
import { Dispatch, SetStateAction } from "react";

interface FormData {
  productName: string;
  price: number;
  description: string;
  startDate: string;
}

interface MainFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const MainForm = ({ isOpen, setIsOpen, setProducts }: MainFormProps) => {
  const methods = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      productName: "",
      price: 0,
      description: "",
      startDate: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form Data:", data);
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          id: Date.now(),
          name: data.productName,
          price: data.price,
          description: data.description,
          startDate: new Date(data.startDate),
        },
      ]);
      alert("Product added successfully!");
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        style={{
          padding: "32px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          margin: "20px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1f2937",
              margin: "0 0 8px 0",
            }}
          >
            Add New Product
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: "0",
            }}
          >
            Fill in the details below to add a new product to your store
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <InputHF
              name="productName"
              type="text"
              label="Product Name"
              placeholder="Enter product name"
              validate={{
                required: "Product name is required",
                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Product name must be at most 100 characters",
                },
              }}
            />

            <InputHF
              name="price"
              type="number"
              label="Price ($)"
              placeholder="0.00"
              validate={{
                required: "Price is required",
                min: {
                  value: 0.01,
                  message: "Price must be greater than 0",
                },
              }}
            />

            <TextArea
              name="description"
              label="Description"
              placeholder="Enter product description..."
              rows={5}
              validate={{
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              }}
            />

            {/* Start Date */}
            <DateField
              name="startDate"
              label="Available From"
              validate={{
                required: "Start date is required",
              }}
            />

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-end",
                marginTop: "32px",
              }}
            >
              <ButtonUI
                type="button"
                onClick={handleClose}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  minWidth: "100px",
                }}
              >
                Cancel
              </ButtonUI>

              <ButtonUI
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isValid ? "#3b82f6" : "#9ca3af",
                  color: "#ffffff",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  minWidth: "100px",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Adding..." : "Add Product"}
              </ButtonUI>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default MainForm;
