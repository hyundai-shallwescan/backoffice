import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../apis';
import { getCookie } from '../common/Cookie';
import MainLayout from '../layouts/MainLayout';
import '../styles/product-management.css';
import SearchBar from './search-bar';

/**
 * ProductManagement Component
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.01  구지웅        최초 생성
 * </pre>
 */

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();


    const fetchProducts = async (searchTerm, page = currentPage, size = pageSize) => {
        try {
            const response = await instance.get('/products', {
                params: { name: searchTerm, page, size },
            });
            setProducts(response.data); 
            setTotalProducts(response.data); 
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(searchTerm, currentPage);
    }, [searchTerm, currentPage]);


    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(0); 
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalProducts / pageSize);
        const pages = [];
        const maxPagesToShow = 5;
    
        const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
        pages.push(
            <button
                key="prev"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`pagination-button ${currentPage === 0 ? 'disabled' : ''}`}
            >
                PREV
            </button>
        );
    
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`pagination-button ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
    
        // Add Next button
        pages.push(
            <button
                key="next"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
            >
                NEXT
            </button>
        );
    
        return (
            <div className="pagination-controls">
                {pages}
            </div>
        );
    };
    

    const handleToggleProduct = async (productId) => {
        try {
            await instance.delete(`/admins/products/${productId}`);

            setProducts(prevState =>
                prevState.map(item =>
                    item.productId === productId ? { ...item, isDeleted: !item.isDeleted } : item
                )
            );
        } catch (error) {
            console.error('Error toggling product status:', error);
        }
    };

    // Navigate to add product page
    const handleAddProduct = () => {
        navigate('/product-management-detail');
    };

    return (
        <MainLayout>
        <div className="product-management-container">
            <div className="product-management-search-bar">
                <SearchBar hideDatePicker onSearch={handleSearch} />
            </div>
            <div className="product-management-list">
                <div className="product-management-list-header">
                    <span>상품 이미지</span>
                    <span>상품명</span>
                    <span>가격</span>
                </div>

                {products.map((item) => (
                    <div
                        key={item.productId}
                        className={`product-management-list-item ${item.isDeleted ? 'disabled' : ''}`}
                        onClick={() => navigate('/product-management-detail', { state: { product: item } })}
                    >
                        <div
                            className="product-management-item-image"
                            style={{ backgroundImage: `url(${item.thumbnailImage})` }}
                        >
                            {item.isDeleted && <div className="disabled-overlay"></div>}
                        </div>

                        <div className={`product-management-item-name ${item.isDeleted ? 'strikethrough' : ''}`}>
                            {item.name}
                        </div>

                        <div className="product-management-item-price">
                            <span className={`price-value ${item.isDeleted ? 'strikethrough' : ''}`}>
                                {item.price.toLocaleString()}원
                            </span>
                        </div>
                        <button
                            className="toggle-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering navigation when toggling
                                handleToggleProduct(item.productId);
                            }}
                        >
                            {item.isDeleted ? '복원' : '삭제'}
                        </button>
                    </div>
                ))}
            </div>

            {renderPagination()}
        </div>
        </MainLayout>
    );
};

export default ProductManagement;
