import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import your custom API client
import { formatDateToKST } from '../components/time-util'; 
import '../styles/list.css';
import arrowIcon from '../asset/image/arrow.svg';
import SearchBar from './search-bar';

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState('0');
    const [size, setSize] = useState('10');
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const baseURL = api.defaults.baseURL;

        const eventSourceURL = `${baseURL}/admins/payments/members?page=${page}&size=${size}&year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}&day=${startDate.getDate()}`;

        const eventSource = new EventSource(eventSourceURL);

        eventSource.onmessage = (event) => {
            const payment = JSON.parse(event.data);
            payment.createdAt = formatDateToKST(payment.createdAt); 
            setPurchases((prevPurchases) => [payment, ...prevPurchases]);
        };

        return () => {
            eventSource.close();
        };
    }, [page, size, startDate]);

    const handleArrowClick = async (purchase) => {
        try {
            const response = await api.get(`/admins/payments/${purchase.paymentId}`);
            const purchaseDetail = response.data;

            navigate(`/purchase-detail/${purchase.paymentId}`, { 
                state: { 
                    purchaseDetail,
                    userName: purchase.userName,
                    createdAt: purchase.createdAt
                } 
            });
        } catch (error) {
            console.error('Error fetching purchase detail:', error);
        }
    };

    return (
        <div className="purchase-history-container">
            <div className='purchase-history-search-bar'><SearchBar></SearchBar></div>
            {purchases.length > 0 ? (
                purchases.map((purchase) => (
                    <div key={purchase.paymentId} className="purchase">
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
            ) : null}
        </div>
    );    
};

export default PurchaseHistory;
