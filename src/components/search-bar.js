import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/searchbar.css';

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const handleSearch = () => {
        console.log('Searching for:', username, startDate);
        // Add your search logic here
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
            </div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy.MM.dd"
                className="date-picker"
            />
        </div>
    );
};

export default SearchBar;
