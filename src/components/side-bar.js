import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css'; 

/**
 * PurchaseHistory Component
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.03  구지웅        최초 생성
 * 2024.09.20  구지웅        hideDatePicker 추가
 * </pre>
 */
const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('payment-history');
    const location = useLocation(); 

    useEffect(() => {
        if (location.pathname.includes('payment-history')) {
            setSelectedItem('payment-history');
        } else if (location.pathname.includes('sales-history')) {
            setSelectedItem('sales-history');
        } else if (location.pathname.includes('product-management')) {
            setSelectedItem('product-management');
        }
    }, [location]);


    
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
