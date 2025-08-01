import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  images: string;
  price: number;
  category: string;
  description: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading products...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center dark:bg-gray-800"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />
            <h3 className="product-title font-semibold text-lg mb-2 line-clamp-2">
                {product.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">${product.price}</p>
            <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
