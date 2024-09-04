import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import your custom API client
import { formatDateToKST } from '../components/time-util'; 
import '../styles/list.css';
import arrowIcon from '../asset/image/arrow.svg';

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState('0');
    const [size, setSize] = useState('10');
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        // Extract baseURL from the axios instance
        const baseURL = api.defaults.baseURL;

        // Construct the full URL for EventSource
        const eventSourceURL = `${baseURL}/admins/payments/members?page=${page}&size=${size}&year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}&day=${startDate.getDate()}`;

        const eventSource = new EventSource(eventSourceURL);

        eventSource.onmessage = (event) => {
            const payment = JSON.parse(event.data);
            payment.createdAt = formatDateToKST(payment.createdAt); // Convert time to KST
            setPurchases((prevPurchases) => [payment, ...prevPurchases]);
        };

        return () => {
            eventSource.close();
        };
    }, [page, size, startDate]);

    const handleArrowClick = (purchase) => {
        navigate(`/purchase-detail/${purchase.id}`, { state: { purchaseId: purchase.id, purchaseDate: purchase.createdAt } });
    };

    return (
        <div className="purchase-history-container">
            {purchases.length > 0 ? (
                purchases.map((purchase) => (
                    <div key={purchase.id} className="purchase">
                        <div className="purchase-info">
                            <div className="purchase-name">{purchase.userName}</div>
                            <div className="purchase-details">
                                <div className="purchase-date">{purchase.createdAt}</div>
                                <img 
                                    src={arrowIcon} 
                                    alt="Arrow Icon" 
                                    className="purchase-arrow" 
                                    onClick={() => handleArrowClick(purchase)} 
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No purchases available.</p>
            )}
        </div>
    );
};

export default PurchaseHistory;
