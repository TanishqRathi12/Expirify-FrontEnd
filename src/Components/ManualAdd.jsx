import React, { useState } from 'react';
import axios from '../Components/Axios';

const ManualAdd = ({ onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleAddProduct = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (productName.trim() === '' || expiryDate.trim() === '') {
            setNotification({ message: 'Please fill in all required fields!', type: 'error' });
            return; // Early return if validation fails
        }

        if (!loading) {
            setLoading(true); // Prevent multiple submissions
            try {
                const productData = {
                    name: productName,
                    expiryDate,
                    ...(manufacturingDate && { manufacturingDate }) // Include manufacturingDate if provided
                };

                const token = localStorage.getItem('token');
                const response = await axios.post('/manual', productData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 201) {
                    // Successfully added product
                    onAddProduct({ 
                        name: productName, 
                        expiryDate, 
                        manufacturingDate: manufacturingDate || 'Not Provided' // Show "Not Provided" if manufacturingDate is empty
                    });
                    setProductName('');
                    setExpiryDate('');
                    setManufacturingDate('');
                    setNotification({ message: 'Product added successfully!', type: 'success' });
                } else {
                    // Handle unsuccessful response status
                    setNotification({ message: 'Failed to add product! Please try again.', type: 'error' });
                }
            } catch (error) {
                // Handle error case
                setNotification({ message: 'Error while adding product! Please check your input or try again later.', type: 'error' });
                console.error('Error while adding product:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    // Clear notification when the user starts typing in input fields
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setNotification({ message: '', type: '' }); // Clear notification on input change
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            {notification.message && (
                <div className={`p-4 mb-4 text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-lg shadow`}>
                    {notification.message}
                </div>
            )}
            <form 
                onSubmit={handleAddProduct} 
                className="bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manual Add Product</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={handleInputChange(setProductName)}
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
                        onChange={handleInputChange(setExpiryDate)}
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
                        onChange={handleInputChange(setManufacturingDate)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">This field is optional.</p>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded-lg transition duration-300 font-semibold ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ManualAdd;
