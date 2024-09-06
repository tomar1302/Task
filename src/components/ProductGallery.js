
import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import styles from './ProductGallery.module.css';

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [albumFilter, setAlbumFilter] = useState('all'); // 'all', '1', '2', '3'
  const limit = 20; // Items to load per scroll

  // Fetch products
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        const newProducts = [...products, ...data];
        setProducts(newProducts);
        applyFilters(newProducts, searchQuery, albumFilter);  // Apply filters when new data is fetched
        if (data.length === 0) setHasMore(false);
      })
      .catch(error => console.error('Error fetching products', error));
  }, [page]);

  // Apply search and album filters
  const applyFilters = (productsToFilter, query, albumId) => {
    let filtered = productsToFilter;

    if (query) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (albumId !== 'all') {
      filtered = filtered.filter(product => product.albumId === parseInt(albumId));
    }

    setFilteredProducts(filtered);
  };

  // Handle search and filter
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    applyFilters(products, query, albumFilter);  // Apply the search query when updating
  }, [products, albumFilter]);

  // Handle album filter
  const handleAlbumFilter = useCallback((albumId) => {
    setAlbumFilter(albumId);
    applyFilters(products, searchQuery, albumId);  // Apply the album filter when updating
  }, [products, searchQuery]);

  const fetchMoreData = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      
      {/* Filter Dropdown */}
      <div className={styles.filter}>
        <label>Filter by Album ID:</label>
        <select onChange={(e) => handleAlbumFilter(e.target.value)} value={albumFilter}>
          <option value="all">All Albums</option>
          <option value="1">Album 1</option>
          <option value="2">Album 2</option>
          <option value="3">Album 3</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className={styles.grid}
      >
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </InfiniteScroll>
    </div>
  );
};





export default React.memo(ProductGallery);


