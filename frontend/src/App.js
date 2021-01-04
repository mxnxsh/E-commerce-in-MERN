import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <Router>
      <div className="grid-container">
        <Navbar />
        <main>
          <Route exact path='/' component={HomeScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </Router>
  );
}
export default App;