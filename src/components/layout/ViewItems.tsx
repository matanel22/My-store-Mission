import { useState } from "react";
import Modal from "../common/Modal";
import TextInput from "../common/fields/TextInput";
import NumberInput from "../common/fields/NumberInput";
import TextArea from "../common/fields/TextArea";
import DateInput from "../common/fields/DateInput";

const ViewItems = ({setIsOpen,isOpen}: {setIsOpen: (isOpen: boolean) => void; isOpen: boolean;}) => {
        const [nameValue, setNameValue] = useState<string>("");
        const [priceValue, setPriceValue] = useState<number>(0);
        const [descriptionValue, setDescriptionValue] = useState<string>("");
        const [startDateValue, setStartDateValue] = useState<Date | null>(null);
        const handleNameChange = (value: string) => {
        setNameValue(value);
    };
    const handlePriceChange = (value: number) => {
        setPriceValue(value);
    };
    const handleDescriptionChange = (value: string) => {
        setDescriptionValue(value);
    };
    const handleStartDateChange = (value: Date | null) => {
        setStartDateValue(value);
    };
    return (
        <div>
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                   <h2>Add New Item</h2>
                   <TextInput value={nameValue} onChange={handleNameChange} />
                   <NumberInput value={priceValue} onChange={handlePriceChange} />
                   <TextArea value={descriptionValue} onChange={handleDescriptionChange} />
                   <DateInput value={startDateValue} onChange={handleStartDateChange} />
               </Modal>
        </div>
    );
};

export default ViewItems;
