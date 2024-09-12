import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css'; 

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('payment-history');
    const location = useLocation(); // useLocation hook to get the current route

    useEffect(() => {
        // Update the selected item based on the current pathname
        if (location.pathname.includes('payment-history')) {
            setSelectedItem('payment-history');
        } else if (location.pathname.includes('sales-history')) {
            setSelectedItem('sales-history');
        } else if (location.pathname.includes('product-management')) {
            setSelectedItem('product-management');
        }
    }, [location]); // Runs every time the location (route) changes


    // Function to handle item selection
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <nav className="sidebar">
            <Link 
                to="/payment-history" 
                className={`menu-item ${selectedItem === 'payment-history' ? 'selected' : ''}`}
                onClick={() => handleItemClick('payment-history')}
            >
                결제 내역
            </Link>
            <Link 
                to="/sales-history" 
                className={`menu-item ${selectedItem === 'sales-history' ? 'selected' : ''}`}
                onClick={() => handleItemClick('sales-history')}
            >
                매출 내역
            </Link>
            <Link 
                to="/product-management" 
                className={`menu-item ${selectedItem === 'product-management' ? 'selected' : ''}`}
                onClick={() => handleItemClick('product-management')}
            >
                상품 관리
            </Link>
        </nav>
    );
};

export default Sidebar;
