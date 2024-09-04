import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/purchase-detail.css'; // Ensure the correct path

const PurchaseDetail = () => {
    const location = useLocation();
    const { purchaseId, purchaseDate } = location.state || {};
    const [purchaseDetail, setPurchaseDetail] = useState(null);

    useEffect(() => {
        const fetchPurchaseDetail = () => {
            const data = {
                id: "123456",
                totalAmount: 50000,
                items: [
                    {
                        image: "https://via.placeholder.com/134",
                        name: "상품 A",
                        quantity: 2,
                        price: 15000
                    },
                    {
                        image: "https://via.placeholder.com/134",
                        name: "상품 B",
                        quantity: 1,
                        price: 20000
                    },
                    {
                        image: "https://via.placeholder.com/134",
                        name: "상품 C",
                        quantity: 3,
                        price: 5000
                    }
                ]
            };
            setPurchaseDetail(data);
        };

        if (purchaseId) {
            fetchPurchaseDetail();
        }
    }, [purchaseId]);

    if (!purchaseDetail) {
        return <div>로딩 중입니다.</div>;
    }

    return (
        <div className="purchase-detail-container">
            <div className="purchase-summary">
                <div className="purchase-id">
                    <span className="purchase-id-label">아이디</span>
                    <span className="purchase-id-value">{purchaseDetail.id}</span>
                </div>
                <div className="purchase-total">
                    <span className="purchase-total-label">총 결제 금액</span>
                    <span className="purchase-total-value">{purchaseDetail.totalAmount.toLocaleString()}원</span>
                </div>
                <div className="purchase-date">
                    <span className="purchase-date-label">결제 시각</span>
                    <span className="purchase-date-value">{purchaseDate}</span>
                </div>
            </div>
            <div className="purchase-list-letter"><h2>구매내역</h2></div>
            <div className="purchase-list">
                <div className="purchase-list-header">
                    <span>상품 이미지</span>
                    <span>상품명</span>
                    <span>수량</span>
                    <span>가격</span>
                </div>
                {purchaseDetail.items.map((item, index) => (
                    <div key={index} className="purchase-list-item">
                        <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">{item.quantity}개</div>
                        <div className='mobile-item-detail'>
                        <div className="mobile-item-name">{item.name}</div>
                        <div className="mobile-item-quantity">{item.quantity}개</div>
                        </div>
                        <div className="item-price">{item.price.toLocaleString()}원</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseDetail;
