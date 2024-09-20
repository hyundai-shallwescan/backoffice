import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/searchbar.css';

/**
 * SearchBar Component
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.03  구지웅        최초 생성
 * 2024.09.20  구지웅        hideDatePicker 추가
 * </pre>
 */
const SearchBar = ({ hideDatePicker, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [startDate, setStartDate] = useState(new Date());
    
    const navigate = useNavigate(); 

    const handleSearch = () => {
        
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleAddProduct = () => {
        navigate('/product-management-detail'); 
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">검색</button>
                {!hideDatePicker && (
                    <button onClick={handleAddProduct} className="add-product-button">+</button>
                )}
            </div>
            {!hideDatePicker && (  
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy.MM.dd"
                    className="date-picker"
                />
            )}
        </div>
    );
};

export default SearchBar;
