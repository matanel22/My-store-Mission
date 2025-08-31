import React from 'react';
import ProductDetails from '../../services/ProductDetails';
import Card from '../../UI/Card';
import ButtonUI from '../../components/common/ButtonUI';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <div>
      <h1>My Store</h1>
      <Navbar />
      {ProductDetails.map((item) => (
        <Card key={item.id} onClick={() => console.log('Card clicked!')} >
          <h2>{item.name}</h2>
          <div>{item.description}</div>
          <div>Price: ${item.price}</div>
          <div>Start Date: {item.startDate.toDateString()}</div>
          <ButtonUI onClick={() => console.log('Button Delete!')}>Delete</ButtonUI>
        </Card>
      ))}
    <Footer />

    </div>
  );
};

export default Home;

