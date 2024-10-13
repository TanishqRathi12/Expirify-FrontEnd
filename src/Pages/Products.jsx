import React, { useEffect, useState } from 'react';
import axios from '../Components/Axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
import { jwtDecode } from 'jwt-decode';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const decoded = jwtDecode(localStorage.getItem('token'));
        const user = decoded.id;
        const response = await axios.get(`/${user}/products`);
        console.log(response.data);
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
    product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

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
                    <td className="py-2 px-4 border-b border-gray-200">{product.product_name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{formatDate(product.mfg_date)}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{formatDate(product.expiry_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">No products found!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
