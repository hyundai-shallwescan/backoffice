import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/searchbar.css';

const SearchBar = ({ hideDatePicker, onSearch }) => {
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const navigate = useNavigate(); // Initialize useNavigate

    // Effect to trigger search on date change
    useEffect(() => {
        if (onSearch) {
            onSearch(username, startDate);
        }
    }, [startDate, username, onSearch]);

    const handleSearch = () => {
        console.log('Searching for:', username, startDate);
        if (onSearch) {
            onSearch(username, startDate);
        }
    };

    const handleAddProduct = () => {
        navigate('/product-management-detail'); // Navigate to the product management detail page
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="아이디 검색"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">검색</button>
                {hideDatePicker && (
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
