import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
function App() {
  return (
    <Router>
      <div className="grid-container">
        <Navbar />
        <main>
          <Route exact path='/' component={HomeScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/signin' component={SignInScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/shipping'  component={ShippingAddressScreen}></Route>
          <Route path='/payment'  component={PaymentMethodScreen}></Route>
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </Router>
  );
}
export default App;