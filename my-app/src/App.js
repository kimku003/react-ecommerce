import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Auth from './components/Auth';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/products/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="bg-gray-100 min-h-screen">
                        <Header />
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetail products={products} />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Routes>
                        <footer className="bg-gray-800 text-white py-4 text-center rounded-md">
                            <p>© 2024 Mon Superbe Site d'E-commerce. Tous droits réservés.</p>
                        </footer>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;

