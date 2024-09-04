import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/product-management-detail.css';

const ProductManagementDetail = () => {
    const [productImage, setProductImage] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDetailImage, setProductDetailImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [detailImagePreview, setDetailImagePreview] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const productData = location.state?.product || null;

    useEffect(() => {
        if (productData) {
            setProductImage(productData.image);
            setProductName(productData.name);
            setProductPrice(productData.price);
        }
    }, [productData]);

    const isFormComplete = () => {
        return productName && productPrice && productImage && productDetailImage;
    };

    const handleSubmit = () => {
        if (!isFormComplete()) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const product = {
            image: productImage,
            name: productName,
            price: parseInt(productPrice),
            detailImage: productDetailImage,
        };

        console.log('Product submitted:', product);
        navigate('/product-management');
    };

    const handleImageUpload = (e, setImage, setPreview) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="product-management-detail-popup">
            <div className="product-management-detail-content">
                <h2>{productData ? '상품 수정' : '상품 추가'}</h2>
                <div className="product-management-detail-form">
                    <label>상품명</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />

                    <label>가격</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

                    <label>상품 이미지</label>
                    <label className={`custom-file-upload ${productImage ? 'uploaded' : 'not-uploaded'}`}>
                        {productImage ? 'Image Selected' : 'Choose Image'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, setProductImage, setImagePreview)} 
                        />
                    </label>

                    <label>상품 상세 이미지</label>
                    <label className={`custom-file-upload ${productDetailImage ? 'uploaded' : 'not-uploaded'}`}>
                        {productDetailImage ? 'Detail Image Selected' : 'Choose Detail Image'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, setProductDetailImage, setDetailImagePreview)} 
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
