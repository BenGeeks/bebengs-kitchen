import React, { useState } from 'react';
import { BsArrowDownSquare, BsArrowUpSquare } from 'react-icons/bs';

import ModalWide from '@/assets/modal-wide';
import styles from '../new-order.module.css';

const EditShoppingCartItem = ({ item, open, close, onSave }) => {
  const [price, setPrice] = useState(item.price);
  const [qty, setQty] = useState(item.qty);

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.header_bar}>
        <h3 className={styles.header_bar_title}>{`${item.itemName} ${item.size}`}</h3>
        <h3 className={styles.header_bar_title}>{(price * qty).toLocaleString('en-US')}</h3>
      </div>
      <div className={styles.update_cart_item_grid_container}>
        <div className={styles.update_cart_item_grid} onClick={() => setPrice((prev) => prev - 1)}>
          <div className={styles.update_cart_item_grid_icon}>
            <BsArrowDownSquare />
          </div>
          <div className={styles.update_cart_item_grid_text}>Price Down</div>
        </div>
        <div className={styles.update_cart_item_grid_display}>
          <div className={styles.update_cart_item_grid_icon}>{price}</div>
          <div className={styles.update_cart_item_grid_text}>Price</div>
        </div>
        <div className={styles.update_cart_item_grid} onClick={() => setPrice((prev) => prev + 1)}>
          <div className={styles.update_cart_item_grid_icon}>
            <BsArrowUpSquare />
          </div>
          <div className={styles.update_cart_item_grid_text}>Price Up</div>
        </div>

        <div className={styles.update_cart_item_grid} onClick={() => setQty((prev) => prev - 1)}>
          <div className={styles.update_cart_item_grid_icon}>
            <BsArrowDownSquare />
          </div>
          <div className={styles.update_cart_item_grid_text}>Quantity Down</div>
        </div>
        <div className={styles.update_cart_item_grid_display}>
          <div className={styles.update_cart_item_grid_icon}>{qty}</div>
          <div className={styles.update_cart_item_grid_text}>Quantity</div>
        </div>
        <div className={styles.update_cart_item_grid} onClick={() => setQty((prev) => prev + 1)}>
          <div className={styles.update_cart_item_grid_icon}>
            <BsArrowUpSquare />
          </div>
          <div className={styles.update_cart_item_grid_text}>Quantity Up</div>
        </div>
      </div>

      <div className={styles.button_container}>
        <div className={styles.button_cancel} onClick={close}>
          Cancel
        </div>
        <div className={styles.button_save} onClick={() => onSave({ ...item, qty, price, subTotal: qty * price })}>
          Save
        </div>
      </div>
    </ModalWide>
  );
};

export default EditShoppingCartItem;
