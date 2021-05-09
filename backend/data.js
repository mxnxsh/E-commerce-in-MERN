import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'Manish',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: true
    },
    {
      name: 'Manish Choudhary',
      email: 'user1@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false
    },
    {
      name: 'Mayank',
      email: 'user2@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false
    },
    {
      name: 'Mayank',
      email: 'user3@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false
    },
    {
      name: 'Manish Choudhary',
      email: 'user4@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false
    },
    {
      name: 'Manish Choudhary',
      email: 'user5@example.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false
    }
  ],
  products: [
    {
      name: 'Kite Slim Shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/shirt2.png',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/shirt3.png',
      price: 220,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      name: 'Lacoste Frees Shirt',
      category: 'Shirts',
      image: '/images/shirt4.png',
      price: 220,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/pant1.jpg',
      price: 78,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/pant2.png',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adida Fit Pant',
      category: 'Pants',
      image: '/images/pant3.png',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
      name: 'Adidas Cloth Fit Pant',
      category: 'Pants',
      image: '/images/pant4.png',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
      name: 'Adidas Pant',
      category: 'Pants',
      image: '/images/t-shirt1.png',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fits Pant',
      category: 'Pants',
      image: '/images/t-shirt2.png',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    }
  ],
};
export default data;