import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Expirify</h2>
                        <p className="text-gray-400">
                            Helping you keep track of product expirations and ensuring safety with ease.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt />
                                <span className="text-gray-400">256 Expirify St., Roorkee 247667, India</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhone />
                                <a href="tel:+918859211714" className="text-gray-400 hover:text-white">+91 8859211714</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope />
                                <a href="mailto:contact@expirify.com" className="text-gray-400 hover:text-white">expirify2k24@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/rathitanishq/" className="text-gray-400 hover:text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://www.instagram.com/rathitanishq/" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://www.instagram.com/rathitanishq/" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/tanishq-rathi-580714295/?originalSubdomain=in" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">
                        © 2024 Expirify. All rights reserved. | <a href="/about" className="text-blue-400 hover:underline">Privacy Policy</a> | <a href="/about" className="text-blue-400 hover:underline">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
