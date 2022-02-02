import React from 'react';
import { useSelector } from 'react-redux';
import s from './style.module.css';

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);

  const renderList = products.map((product) => {
    const { id, title, image, price, category, description } = product;
    return (
      //   <div className='four column wide'>
      //     <div className='ui link cards' key={id}>
      //       <div className='card'>
      //         <div className='image'>
      //           <img src={image} alt={title} />
      //         </div>
      //         <div className='content'>
      //           <div className='header'>{title}</div>
      //           <div className='meta price'>${price}</div>
      //           <div className='meta'>{category}</div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      <div className={s.product_item}>
        <img src={image} />
        <div className={s.product_list}>
          <h3>{title}</h3>
          <span className={s.price}>{price}</span>
          <a href='' className={s.button}>
            В корзину
          </a>
        </div>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
