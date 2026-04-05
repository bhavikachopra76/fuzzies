import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/header';
import Home from './Pages/home';
import About from './Pages/about';
import SignupLogin from './Pages/SignupLogin';
import CategoryList from './Pages/CategoryList';
import Cart from './Pages/Cart';
import BillingForm from './Pages/BillingForm';
import BillingPage from './Components/BillingPage';
import Product from './Pages/Product';
import AdminDashboard from './Pages/AdminDashboard';
import ProfilePage from './Components/ProfilePage';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsAuthenticated(true);
            setIsAdmin(storedUser.isAdmin || false); 
        }
    }, []);

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin || false);
        localStorage.setItem('user', JSON.stringify(user));
        showFeedback('Login successful!');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.clear()
        showFeedback('You have been logged out.');
    };

    const showFeedback = (message) => {
        setFeedbackMessage(message);
        setTimeout(() => setFeedbackMessage(''), 3000);
    };

    return (
        <Router>
            {isAuthenticated && (
                <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
            )}
            {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
            <main>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
                    <Route path="/products/:categoryName" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
                    <Route path="/categories" element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!isAuthenticated ? <SignupLogin onLogin={handleLogin} /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!isAuthenticated ? <SignupLogin onLogin={handleLogin} /> : <Navigate to="/" />} />
                    <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
                    <Route path="/billing" element={isAuthenticated ? <BillingPage/> : <Navigate to="/login"/>} />
                    <Route path="/form" element={isAuthenticated ? <BillingForm/> : <Navigate to="/login"/>} />
                    <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
                    <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;