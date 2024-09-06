import React from 'react';
import styles from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        src={product.thumbnailUrl}
        alt={product.title}
        loading="lazy" // Lazy loading the images
      />
      <h3>{product.title}</h3>
    </div>
  );
};

export default React.memo(ProductItem);
