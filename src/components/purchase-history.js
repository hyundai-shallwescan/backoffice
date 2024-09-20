import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateToKST } from '../components/time-util'; 
import '../styles/list.css';
import arrowIcon from '../asset/image/arrow.svg';
import SearchBar from './search-bar';
import MainLayout from '../layouts/MainLayout';
import { instance } from '../apis';
import { getCookie } from '../common/Cookie';
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState('0');
    const [size, setSize] = useState('10');
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const processedPayments = new Set(); // To track unique payment IDs

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource;
        const baseURL = process.env.REACT_APP_API_URL;
        const eventSourceURL = `${baseURL}/admins/payments/members?page=${page}&size=${size}&year=${startDate.getFullYear()}&month=${startDate.getMonth() + 1}&day=${startDate.getDate()}`;
        const token = getCookie('accessToken');

        const eventSource = new EventSource(eventSourceURL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        eventSource.onmessage = (event) => {
            const payment = JSON.parse(event.data);
            payment.createdAt = formatDateToKST(payment.createdAt);
            
            setPurchases((prevPurchases) => {
                if (!processedPayments.has(payment.paymentId)) {
                    processedPayments.add(payment.paymentId);
                    const updatedPurchases = [payment, ...prevPurchases];
                    return updatedPurchases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }
                return prevPurchases;
            });
        };

        eventSource.onerror = () => {
            eventSource.close(); 
        };

        return () => {
            eventSource.close(); 
        };
    }, [page, size, startDate]);

    const handleArrowClick = async (purchase) => {
        try {
            const response = await instance.get(`/admins/payments/${purchase.paymentId}`);
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
        <MainLayout>
            <div className="purchase-history-container">
                <div className='purchase-history-search-bar'>
                <SearchBar hideDatePicker={true} />
                </div>
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
        </MainLayout>
    );    
};

export default PurchaseHistory;
