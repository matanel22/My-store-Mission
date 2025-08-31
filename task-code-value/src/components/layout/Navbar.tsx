import react,{ useState } from "react";
import ButtonUI from "../common/ButtonUI";
import TextInput from "../common/fields/TextInput";
import ProductDetails from "../../services/ProductDetails";

const Navbar = () => {
    const [inputValue, setInputValue] = useState<string>("");
    // let filteredArray = ProductDetails.filter(item => item.name.includes(inputValue));
    const handleAddCard = () => {
        console.log('Add Card button clicked!');
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Input changed:', e.target.value);
        setInputValue(e.target.value);
    };
    return (
        <nav>
        
            <ButtonUI onClick={handleAddCard} >+ Add</ButtonUI>

            <TextInput value={inputValue} onChange={() => handleInputChange} />
        </nav>
    );
};

export default Navbar;
