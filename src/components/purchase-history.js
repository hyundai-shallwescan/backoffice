import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/list.css'; // Ensure this path is correct

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = () => {
        const dummyData = [
            { id: "user1", name: "shallwescan", date: "24.08.17 16:33:05", totalAmount: "50,000원" },
            { id: "user2", name: "scanandduo", date: "24.08.17 16:23:05", totalAmount: "30,000원" },
            { id: "user3", name: "duo", date: "24.08.17 14:33:05", totalAmount: "70,000원" },
            { id: "user4", name: "scanscan", date: "24.08.17 12:33:05", totalAmount: "40,000원" },
            { id: "user5", name: "yum", date: "24.08.17 11:33:05", totalAmount: "90,000원" },
        ];

        setPurchases(dummyData);
    };

    const handleArrowClick = (purchase) => {
        navigate(`/purchase-detail/${purchase.id}`, { state: { purchaseId: purchase.id, purchaseDate: purchase.date } });
    };

    return (
        <div className="purchase-history-container">
            {purchases.map((purchase, index) => (
                <div key={index} className="purchase">
                    <div className="purchase-info">
                        <div className="purchase-name">{purchase.name}</div>
                        <div className="purchase-details">
                            <div className="purchase-date">{purchase.date}</div>
                            <div className="purchase-arrow" onClick={() => handleArrowClick(purchase)}>&gt;</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PurchaseHistory;
