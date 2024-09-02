import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/side-bar';
import SearchBar from './components/search-bar';
import PurchaseHistory from './components/purchase-history';
import PurchaseDetail from './components/purchase-detail';
import SalesHistory from './components/dash-board'
import './styles/app.css';
import './styles/purchase-detail.css';

const App = () => (
    <Router>
        <div className="app">
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content-container">
                    <Layout />
                </div>
            </div>
        </div>
    </Router>
);

const Layout = () => {
    const location = useLocation();
    const isPurchaseDetail = location.pathname.startsWith('/purchase-detail');
    const isSalesHistory = location.pathname.startsWith('/sales-history');
    
    const shouldHideSearchBar = isPurchaseDetail || isSalesHistory;


    
    return (
        <div className={`content-container ${shouldHideSearchBar ? 'hide-search-bar' : ''}`}>
            {!shouldHideSearchBar && (
                <div className="search-bar-container">
                    <SearchBar />
                </div>
            )}
            <div className="content">
                <Routes>
                    <Route path="/" element={<PurchaseHistory />} />
                    <Route path="/payment-history" element={<PurchaseHistory />} />
                    <Route path="/purchase-detail/:id" element={<PurchaseDetail />} />
                    <Route path="/sales-history" element={<SalesHistory />} />
                    <Route path="*" element={<h2>404 Not Found</h2>} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
