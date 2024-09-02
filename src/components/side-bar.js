import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; 

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('payment-history');

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
