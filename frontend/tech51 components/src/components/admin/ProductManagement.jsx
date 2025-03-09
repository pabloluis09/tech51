import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/products', { name, price, description, countInStock });
    setProducts([...products, data]);
  };

  return (
    <div className="product-management">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form onSubmit={addProduct} className="mb-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="input" />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="input" />
        <input type="number" placeholder="Count In Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="input" />
        <button type="submit" className="btn">Add Product</button>
      </form>
      <ul className="list">
        {products.map(product => (
          <li key={product._id} className="list-item">{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
