import react,{ useState } from "react";
import ButtonUI from "../common/ButtonUI";
import TextInput from "../common/fields/TextInput";
import ProductDetails from "../../services/ProductDetails";
import Modal from "../common/Modal";
import NumberInput from "../common/fields/NumberInput";
import TextArea from "../common/fields/TextArea";

const Navbar = () => {
    const [nameValue, setNameValue] = useState<string>("");
    const [priceValue, setPriceValue] = useState<number>(0);
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // let filteredArray = ProductDetails.filter(item => item.name.includes(inputValue));
    const handleAddCard = () => {
setIsOpen(true);
        console.log('Add Card button clicked!');
    };
    // Handlers for each input
    const handleNameChange = (value: string) => {
        setNameValue(value);
    };
    const handlePriceChange = (value: number) => {
        setPriceValue(value);
    };
    const handleDescriptionChange = (value: string) => {
        setDescriptionValue(value);
    };
    return (
        <nav>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2>Add New Card</h2>
                    <TextInput value={nameValue} onChange={handleNameChange} />
                    <NumberInput value={priceValue} onChange={handlePriceChange} />
                    <TextArea value={descriptionValue} onChange={handleDescriptionChange} />
                </Modal>
            )}
            <ButtonUI onClick={handleAddCard} >+ Add</ButtonUI>
            {/* ...existing code... */}
        </nav>
    );
};

export default Navbar;
