import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/product-management.css'; 

const ProductManagement = () => {
    const [productManagementDetail, setProductManagementDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = () => {
            const data = {
                items: [
                    {
                        id: 1,
                        image: "https://via.placeholder.com/134",
                        name: "가지",
                        price: 15000,
                        disabled: false
                    },
                    {
                        id: 2,
                        image: "https://via.placeholder.com/134",
                        name: "초코송이",
                        price: 20000,
                        disabled: false
                    },
                    {
                        id: 3,
                        image: "https://via.placeholder.com/134",
                        name: "상품 C",
                        price: 5000,
                        disabled: false
                    }
                ]
            };
            setProductManagementDetail(data);
        };

        fetchProductDetail();
    }, []);

    const handleEditProduct = (product) => {
        navigate('/product-management-detail', { state: { product } });
    };

    const handleAddProduct = () => {
        navigate('/product-management-detail');
    };

    const handleToggleProduct = (productId) => {
        setProductManagementDetail(prevState => ({
            ...prevState,
            items: prevState.items.map(item => 
                item.id === productId ? { ...item, disabled: !item.disabled } : item
            )
        }));
    };

    if (!productManagementDetail) {
        return <div>로딩 중입니다.</div>;
    }

    return (
        <div className="product-management-container">
            <div className="product-management-list">
                <div className="product-management-list-header">
                    <span>상품 이미지</span>
                    <span>상품명</span>
                    <span>가격</span>
                </div>
                {productManagementDetail.items.map((item) => (
                    <div 
                        key={item.id} 
                        className={`product-management-list-item ${item.disabled ? 'disabled' : ''}`}
                        onClick={() => handleEditProduct(item)}>
                        <div className="product-management-item-image" style={{ backgroundImage: `url(${item.image})` }}>
                            {item.disabled && <div className="disabled-overlay"></div>}
                        </div>
                        <div className={`product-management-item-name ${item.disabled ? 'strikethrough' : ''}`}>{item.name}</div>
                        <div className="product-management-item-price">
                            <span className={`price-value ${item.disabled ? 'strikethrough' : ''}`}>
                                {item.price.toLocaleString()}원
                            </span>
                            <button 
                                className="toggle-button" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    handleToggleProduct(item.id); 
                                }}
                            >
                                {item.disabled ? 'O' : 'X'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManagement;
