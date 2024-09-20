import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/purchase-detail.css'; 
import MainLayout from '../layouts/MainLayout';


/**
 * PurchaseDetail Component
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.03  구지웅        최초 생성
 * </pre>
 */
const PurchaseDetail = () => {
    const location = useLocation();
    const { purchaseDetail } = location.state || {};
    const { userName } = location.state || {};
    const { createdAt } = location.state || {};

    console.log();

    if (!purchaseDetail) {
        return <div>로딩 중입니다.</div>; 
    }

    const formatNumber = (value) => {
        return (value || 0).toLocaleString(); 
    };

    const formatDate = (dateStr) => {
        const dateObject = new Date(dateStr);
        return !isNaN(dateObject.getTime())
            ? dateObject.toLocaleString() 
            : 'Invalid time';
    };

    const formattedTime = formatDate(purchaseDetail.paymentCreatedAt);

    return (
        <MainLayout>
        <div className="purchase-detail-container">
            <div className="purchase-summary">
                <div className="purchase-id">
                    <span className="purchase-id-label">아이디</span>
                    <span className="purchase-id-value">{userName}</span>
                </div>
                <div className="purchase-total">
                    <span className="purchase-total-label">총 결제 금액</span>
                    <span className="purchase-total-value">
                        {formatNumber(purchaseDetail.totalAmountSum)}원
                    </span>
                </div>
                <div className="purchase-date">
                    <span className="purchase-date-label">결제 시각</span>
                    <span className="purchase-date-value">{createdAt}</span>
                </div>
            </div>
            <div className="purchase-list-letter"><h2>구매내역</h2></div>
            <div className="purchase-list">
                {purchaseDetail.purchasedProducts && purchaseDetail?.purchasedProducts.length > 0 ? (
                    purchaseDetail.purchasedProducts.map((item) => (
                        <div key={item.productId} className="purchase-list-item">
                            <div className="item-image" style={{ backgroundImage: `url(${item.thumbnailImage})` }}></div>
                            <div className="item-name">{item.productName || 'N/A'}</div>
                            <div className="item-quantity">{item.quantity || 'N/A'}개</div>
                            <div className='mobile-item-detail'>
                                <div className="mobile-item-name">{item.productName || 'N/A'}</div>
                                <div className="mobile-item-quantity">{item.quantity || 'N/A'}개</div>
                            </div>
                            <div className="item-price">
                                {formatNumber(item.price)}원
                            </div>
                        </div>
                    ))
                ) : (
                    <p>구매 내역이 없습니다.</p>
                )}
            </div>
        </div>
        </MainLayout>
    );
};

export default PurchaseDetail;
