import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './style.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  selectedProducts,
  removeSelectedProducts,
} from '../redux/action/productActions';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description, id } = product;
  const { productId } = useParams();

  console.log(product);
  const dispatch = useDispatch();

  const fetcProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => {
        console.log('err', err);
      });

    dispatch(selectedProducts(response.data));
  };

  useEffect(() => {
    if (productId && productId !== '') {
      fetcProductDetail();
    }

    return () => {
      dispatch(removeSelectedProducts());
    };
  }, [productId]);

  return (
    <div className='ui grid container'>
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className={s.product_item} key={id}>
          <img src={image} />
          <div className={s.product_list}>
            <h3>{title}</h3>
            <h4>{category}</h4>
            <span className={s.price}>{price}</span>
            <button href='' className={s.button}>
              В корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
