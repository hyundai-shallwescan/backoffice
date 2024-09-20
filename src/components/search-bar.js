import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/searchbar.css';

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
