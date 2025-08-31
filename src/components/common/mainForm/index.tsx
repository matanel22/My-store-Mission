import { FormProvider, useForm } from "react-hook-form";
import ButtonUI from "../ButtonUI";
import { InputHF } from "../fields/TextField";
import DateField from "../fields/DateField";
interface MainFormProps {}
const MainForm = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputHF
          name="example"
          value=""
          onChange={() => {}}
          placeholder="Enter text"
        />
        <DateField name="date" type="date" validate={{ required: true }} />
        <ButtonUI type="submit">Submit</ButtonUI>
      </form>
    </FormProvider>
  );
};
export default MainForm;
