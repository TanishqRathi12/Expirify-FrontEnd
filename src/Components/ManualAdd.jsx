import React, { useState } from 'react';
import axios from '../Components/Axios';

const ManualAdd = ({ onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [loading, setLoading] = useState(false); 
    const [notification, setNotification] = useState({ message: '', type: '' }); // New state for notifications

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (productName && expiryDate && !loading) {
            setLoading(true); // Set loading to true to prevent multiple submissions
            try {
                const productData = {
                    name: productName,
                    expiryDate,
                };

                if (manufacturingDate) {
                    productData.manufacturingDate = manufacturingDate;
                }
                const token = localStorage.getItem('token');
                const response = await axios.post('/manual', productData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 201) {
                    onAddProduct({ name: productName, expiryDate, manufacturingDate });
                    setProductName('');
                    setExpiryDate('');
                    setManufacturingDate('');
                    setNotification({ message: 'Product added successfully!', type: 'success' });
                } else {
                    setNotification({ message: 'Failed to add product!', type: 'error' });
                }
            } catch (error) {
                setNotification({ message: 'Error while adding product!', type: 'error' });
                console.error('Error while adding product:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        } else {
            setNotification({ message: 'Please fill in all required fields!', type: 'error' });
        }
    };

    return (
        <div>
            {notification.message && (
                <div className={`p-4 mb-4 text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-lg`} role="alert">
                    {notification.message}
                </div>
            )}
            <form 
                onSubmit={handleAddProduct} 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mt-8"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Manual Add Product</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Expiry Date:
                    </label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Manufacturing Date (Optional):
                    </label>
                    <input
                        type="date"
                        value={manufacturingDate}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">This field is optional.</p>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded-lg transition duration-300 font-semibold ${
                        loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ManualAdd;
