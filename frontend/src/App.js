import React from 'react';
import { Link } from 'react-router-dom'
import data from './data';
function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">amazona</a>
        </div>
        <div>
          <a href="cart.html">cart</a>
          <a href="signin.html">signin</a>
        </div>
      </header>
      <main>
        <div className="row center">
          {
            data.products.map(product => (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`}
                ><img className="medium" src={product.image} alt={product.name}
                  /></Link>
                <div className="card-body">
                  <Link hreto={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  <div className="rating">
                    <span> <i className="fa fa-star"></i></span>
                    <span> <i className="fa fa-star"></i></span>
                    <span> <i class="fas fa-star-half-alt"></i></span>
                    <span> <i class="far fa-star"></i></span>
                    <span> <i className="fa fa-star"></i></span>
                  </div>
                  <div className="price">Rs:1000</div>
                </div>
              </div>
            ))
          }

        </div>
      </main>
      <footer className="row center">All right reserved.</footer>
    </div>
  );
}

export default App;
