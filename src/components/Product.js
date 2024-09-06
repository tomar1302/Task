import React from 'react';
import ProductGallery from './ProductGallery';
import styles from './Product.module.css'

function Product() {
  return (
    <div className={styles.container}>
      <h1>Product Gallery</h1>
      <ProductGallery />
    </div>
  );
}






export default Product