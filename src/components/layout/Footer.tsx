import ButtonUI from "../common/ButtonUI";

const Footer = () => {
  return (
    <footer>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #ccc' }}>
      <ButtonUI onClick={() => console.log('Footer button clicked!')}>Prev </ButtonUI>

      
      <ButtonUI onClick={() => console.log('Footer button clicked!')}>Next </ButtonUI>
      </div>
        
     
    </footer>
  );
};

export default Footer;
