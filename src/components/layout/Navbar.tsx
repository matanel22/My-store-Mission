import react,{ useState } from "react";
import ButtonUI from "../common/ButtonUI";
import TextInput from "../common/fields/TextInput";
import ProductDetails from "../../services/ProductDetails";
import Modal from "../common/Modal";
import NumberInput from "../common/fields/NumberInput";
import TextArea from "../common/fields/TextArea";
import DateInput from "../common/fields/DateInput";
import ViewItems from "./ViewItems";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    // let filteredArray = ProductDetails.filter(item => item.name.includes(inputValue));
    const handleAddCard = () => {
          setIsOpen(true);
        console.log('Add Card button clicked!');
    };
   

    return (
        <nav>
           {isOpen && (
           <ViewItems setIsOpen={setIsOpen} isOpen={isOpen} />
           )}
            <ButtonUI onClick={()=>{ setIsOpen(true)}} >+ Add</ButtonUI>
            
        </nav>
    );
};

export default Navbar;
