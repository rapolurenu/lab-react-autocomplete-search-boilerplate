// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import countryData from '../resources/countryData.json';
import './Searchbox.css'; 

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (query) {
      const filteredSuggestions = countryData.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="country-search-box">
      <div className="country-search-heading">Country Search</div>
      <div className="country-search-container">
        <input
          id="country-search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search for a country..."
        />
        <button id="country-search-button">Search</button>
      </div>
      {showSuggestions && query && (
        <ul id="country-search-suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
