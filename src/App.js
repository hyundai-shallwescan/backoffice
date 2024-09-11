import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PurchaseHistory from './components/purchase-history';
import PurchaseDetail from './components/purchase-detail';
import SalesHistory from './components/dash-board';
import ProductManagement from './components/product-management';
import ProductManagementDetail from './components/product-management-detail';
import Login from './pages/login/Login';
import './styles/app.css';
import './styles/purchase-detail.css';
import { getCookie } from './common/Cookie';

/**
 * App.js
 * @author 구지웅
 * @since 2024.09.04
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.04  구지웅        최초 생성 
 * 2024.09.10  정은지        로그인 페이지 추가
 * </pre>
 */
const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const id = getCookie('loginId');
        if (!id) {
            navigate('/login');
        } 
    }, [navigate]);

    return ( 
        <Routes>
            <Route path="/" element={<PurchaseHistory />} />
            <Route path="/payment-history" element={<PurchaseHistory />} />
            <Route path="/purchase-detail/:id" element={<PurchaseDetail />} />
            <Route path="/sales-history" element={<SalesHistory />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/product-management-detail" element={<ProductManagementDetail />} /> 
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

const RootApp = () => (
    <Router>
        <App />
    </Router>
);

export default RootApp;