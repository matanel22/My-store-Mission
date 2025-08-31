import ButtonUI from "../common/ButtonUI";

const Footer = () => {
  return (
    <footer>
      <ButtonUI onClick={() => console.log('Footer button clicked!')}>Prev </ButtonUI>
      <ButtonUI onClick={() => console.log('Footer button clicked!')}>Next </ButtonUI>
     
    </footer>
  );
};

export default Footer;
