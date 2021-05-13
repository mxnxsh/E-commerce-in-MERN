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
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
function App() {
  return (
    <Router>
      <div className="grid-container">
        <Navbar />
        <main>
          <Route exact path='/' component={HomeScreen}></Route>
          <Route path='/product/:id' exact component={ProductScreen}></Route>
          <Route path='/create-product' exact component={CreateProductScreen}></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/signin' component={SignInScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/shipping' component={ShippingAddressScreen}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/userlist"
            component={UserListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path='/productlist/seller'
            component={ProductListScreen}
          />
          <SellerRoute
            path='/orderlist/seller'
            component={OrderListScreen}
          />
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </Router>
  );
}
export default App;