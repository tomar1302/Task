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
  const [albumFilter, setAlbumFilter] = useState(''); // Added for filtering by album ID
  const limit = 20; // Items to load per scroll

  // Fetch products
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        const newProducts = [...products, ...data];
        setProducts(newProducts);
        setFilteredProducts(newProducts);
        if (data.length === 0) setHasMore(false);
      })
      .catch(error => console.error('Error fetching products', error));
  }, [page]);

  // Handle search and filter
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    let updatedProducts = products;

    // Apply album filter if selected
    if (albumFilter) {
      updatedProducts = products.filter(product => product.albumId === parseInt(albumFilter, 10));
    }

    // Apply search filter
    if (query) {
      const filtered = updatedProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(updatedProducts);
    }
  }, [products, albumFilter]);

  // Handle album ID filter
  const handleAlbumFilter = useCallback((albumId) => {
    setAlbumFilter(albumId);

    // Filter products based on the selected album ID
    const filtered = products.filter(product => product.albumId === parseInt(albumId, 10));
    setFilteredProducts(filtered);
  }, [products]);

  const fetchMoreData = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return (
    <div className={styles.productGallery}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

      {/* Filter by Album ID Dropdown */}
      <div className={styles.filter}>
        <label>Filter by Album ID:</label>
        <select onChange={(e) => handleAlbumFilter(e.target.value)} value={albumFilter}>
          <option value="">All Albums</option>
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


