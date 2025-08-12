import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [products] = useState([
    {
      id: 1,
      name: 'Smart Watch Pro',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format',
      description: 'Advanced smartwatch with health tracking and notifications'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format',
      description: 'High-quality wireless earbuds with noise cancellation'
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format',
      description: 'Water-resistant laptop backpack with multiple compartments'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format',
      description: 'Portable bluetooth speaker with 20-hour battery life'
    },
    {
      id: 5,
      name: 'Phone Case',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&auto=format',
      description: 'Durable protective phone case with card holder'
    },
    {
      id: 6,
      name: 'Power Bank',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format',
      description: '20000mAh portable charger with fast charging'
    },
    {
      id: 7,
      name: 'Fitness Tracker Band',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=500&auto=format',
      description: 'Fitness band with sleep, heart-rate and step tracking'
    },
    {
      id: 8,
      name: 'Noise Cancelling Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1585386959984-a4155224e542?w=500&auto=format',
      description: 'Comfortable headphones with active noise cancellation'
    },
    {
      id: 9,
      name: 'Smartphone Stand',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=500&auto=format',
      description: 'Adjustable stand for phones and tablets'
    },
    {
      id: 10,
      name: 'USB-C Hub',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1601981705412-c8bfa7431b33?w=500&auto=format',
      description: 'Multiport adapter for laptops with HDMI, USB, SD card'
    },
    {
      id: 11,
      name: 'Wireless Charging Pad',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1611078489935-e9920a0e4088?w=500&auto=format',
      description: 'Qi-certified fast wireless charger pad for smartphones'
    },
    {
      id: 12,
      name: 'Gaming Mouse',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500&auto=format',
      description: 'RGB gaming mouse with high precision and programmable buttons'
    }
  ]);

  const categories = ['all', 'wearables', 'audio', 'accessories', 'power'];

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || getCategory(product.name) === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function getCategory(productName) {
    const name = productName.toLowerCase();
    if (name.includes('watch') || name.includes('tracker')) return 'wearables';
    if (name.includes('earbuds') || name.includes('speaker') || name.includes('headphones')) return 'audio';
    if (name.includes('case') || name.includes('backpack') || name.includes('stand') || name.includes('mouse') || name.includes('hub')) return 'accessories';
    if (name.includes('power') || name.includes('charging')) return 'power';
    return 'accessories';
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Discover Our Products</h1>
        <p className="products-subtitle">Explore our collection of premium tech accessories</p>
      </div>

      <div className="products-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={'category-btn ' + (selectedCategory === category ? 'active' : '')}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
