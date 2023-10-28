import React, { useState } from 'react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { BsArrowDownSquare, BsArrowUpSquare } from 'react-icons/bs';

import newOrderStyles from '@/styles/new-order.module.css';

const EditShoppingCart = ({ items, setItems, setEdit }) => {
  const [initialData] = useState(items);
  const EDIT_CART_HEADER = ['Item', 'Size', 'Price', 'Quantity', 'Total', 'Delete'];
  console.log('INITIAL DATA: ', initialData);

  const updateItemHandler = (action, data) => {
    if (action === 'delete') {
      let tempData = items.filter((item) => item._id !== data._id);
      setItems(tempData);
    }
    if (action === 'up') {
      let tempData = items.map((item) => (item._id === data._id ? { ...item, qty: item.qty + 1 } : item));
      setItems(tempData);
    }
    if (action === 'down') {
      let tempData = items.map((item) => (item._id === data._id ? { ...item, qty: item.qty - 1 } : item));
      setItems(tempData);
    }
    if (action === 'cancel') {
      setItems(initialData);
      setEdit(3);
    }
  };
  return (
    <div className={newOrderStyles.main_page}>
      <div className={newOrderStyles.header_bar}>
        <h3 className={newOrderStyles.header_bar_title}>Edit Shopping Cart:</h3>
      </div>
      <table className={newOrderStyles.table}>
        <thead>
          <tr>
            {EDIT_CART_HEADER.map((header) => (
              <th className={newOrderStyles.table_head} key={header}>
                <div className={newOrderStyles.table_head_text}>{header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item) => {
              return (
                <tr key={item.itemName}>
                  <td className={newOrderStyles.cell}>{item.itemName}</td>
                  <td className={newOrderStyles.cell}>{item.size}</td>
                  <td className={newOrderStyles.cell}>{item.price}</td>
                  <td className={newOrderStyles.cell_icon_container}>
                    <div className={newOrderStyles.arrow_down} onClick={() => updateItemHandler('down', item)}>
                      <BsArrowDownSquare />
                    </div>
                    <div className={newOrderStyles.cell_qty_text}>{item.qty}</div>
                    <div className={newOrderStyles.arrow_up} onClick={() => updateItemHandler('up', item)}>
                      <BsArrowUpSquare />
                    </div>
                  </td>

                  <td className={newOrderStyles.cell}>{item.price * item.qty}</td>
                  <td className={newOrderStyles.cell_icon_container}>
                    <div className={newOrderStyles.delete} onClick={() => updateItemHandler('delete', item)}>
                      <RiDeleteBin4Line />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className={newOrderStyles.button_container}>
        <div className={newOrderStyles.button_cancel} onClick={() => updateItemHandler('cancel')}>
          Cancel
        </div>
        <div className={newOrderStyles.button_save} onClick={() => setEdit(3)}>
          Save
        </div>
      </div>
    </div>
  );
};

export default EditShoppingCart;
