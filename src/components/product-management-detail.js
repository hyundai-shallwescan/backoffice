import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import '../styles/product-management-detail.css';
import { getCookie } from '../common/Cookie';

const generateRandomBarcode = () => {
    return Math.random().toString(36).substring(2, 12).toUpperCase(); // Random 10-character string
};

const ProductManagementDetail = () => {
    const [productImage, setProductImage] = useState(null); // Use null to indicate no file selected
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDetailImage, setProductDetailImage] = useState(null); // Use null to indicate no file selected

    const navigate = useNavigate();
    const location = useLocation();
    const productData = location.state?.product || null;

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        if (productData) {
            setProductName(productData.name);
            setProductPrice(productData.price);
        }
    }, [productData]);

    const isFormComplete = () => {
        return productName && productPrice && productImage && productDetailImage;
    };

    const handleSubmit = async () => {
        if (!isFormComplete()) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
    
        const formData = new FormData();
        const barcode = generateRandomBarcode();
    
        const productInfo = JSON.stringify({
            name: productName,
            price: parseInt(productPrice, 10),
            barcode: barcode
        });
    
        if (productData) {
            formData.append('patchProductReq', new Blob([productInfo], { type: 'application/json' }));
        } else {
            formData.append('postCreateReviewReq', new Blob([productInfo], { type: 'application/json' }));
        }
    
        if (productImage) formData.append('thumbnail', productImage);
        if (productDetailImage) formData.append('descriptionImage', productDetailImage);
    
        try {
            const token = localStorage.getItem('token');
            if (productData) {
                await api.patch(`/admins/products/${productData.productId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`
                 }
                });
            } else {
                await api.post('/admins/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`            
                }
                });
            }
            navigate('/product-management');
        } catch (error) {
            console.error('Error submitting product:', error);
            alert('상품 등록 중 오류가 발생했습니다.');
        }
    };

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="product-management-detail-popup">
            <div className="product-management-detail-content">
                <h2>{productData ? '상품 수정' : '상품 추가'}</h2>
                <div className="product-management-detail-form">
                    <label>상품명</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                    />

                    <label>가격</label>
                    <input 
                        type="number" 
                        value={productPrice} 
                        onChange={(e) => setProductPrice(e.target.value)} 
                    />

                    <label>상품 이미지</label>
                    <label className={`custom-file-upload ${productImage ? 'uploaded' : 'not-uploaded'}`}>
                        {productImage ? 'Image Selected' : 'Choose Image'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, setProductImage)} 
                        />
                    </label>

                    <label>상품 상세 이미지</label>
                    <label className={`custom-file-upload ${productDetailImage ? 'uploaded' : 'not-uploaded'}`}>
                        {productDetailImage ? 'Detail Image Selected' : 'Choose Detail Image'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, setProductDetailImage)} 
                        />
                    </label>

                    <div className="button-container">
                        <button 
                            onClick={handleSubmit} 
                            disabled={!isFormComplete()}
                            className={`submit-button ${isFormComplete() ? 'enabled' : 'disabled'}`}
                        >
                            {productData ? '수정 완료' : '추가 완료'}
                        </button>
                        <button 
                            onClick={() => navigate('/product-management')} 
                            className='cancel-button'>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagementDetail;
