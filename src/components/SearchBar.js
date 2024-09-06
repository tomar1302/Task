import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search products by title..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default React.memo(SearchBar);
