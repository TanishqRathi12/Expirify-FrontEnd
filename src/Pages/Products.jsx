import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const sampleProducts = [
    {
      id: 1,
      name: "Organic Almonds",
      mfgDate: "2023-05-01",
      expiryDate: "2025-05-01",
    },
    {
      id: 2,
      name: "Whole Wheat Flour",
      mfgDate: "2023-06-15",
      expiryDate: "2024-06-15",
    },
    {
      id: 3,
      name: "Coconut Oil",
      mfgDate: "2023-07-20",
      expiryDate: "2025-07-20",
    },
    {
      id: 4,
      name: "Brown Rice",
      mfgDate: "2023-08-10",
      expiryDate: "2025-08-10",
    },
    {
      id: 5,
      name: "Organic Green Tea",
      mfgDate: "2023-09-01",
      expiryDate: "2025-09-01",
    },
    {
      id: 6,
      name: "Honey",
      mfgDate: "2023-04-15",
      expiryDate: "2025-04-15",
    },
    {
      id: 7,
      name: "Chia Seeds",
      mfgDate: "2023-08-20",
      expiryDate: "2025-08-20",
    },
    {
      id: 8,
      name: "Pumpkin Seeds",
      mfgDate: "2023-05-25",
      expiryDate: "2025-05-25",
    },
    {
      id: 9,
      name: "Dried Apricots",
      mfgDate: "2023-09-10",
      expiryDate: "2025-09-10",
    },
    {
      id: 10,
      name: "Granola Bars",
      mfgDate: "2023-03-30",
      expiryDate: "2024-03-30",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = { data: sampleProducts };
        setProducts(response.data);
      } catch (error) {
        setError('There was an error fetching the products!');
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-700">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Product Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">MFG Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{product.mfgDate}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{product.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">No products found!</p>
        )}
      </div>
    </div>
  );
}

export default Products;
