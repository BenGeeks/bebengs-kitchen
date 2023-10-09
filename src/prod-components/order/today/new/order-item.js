'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiAddCircleLine, RiDeleteBin4Line } from 'react-icons/ri';

import Modal2 from '@/assets/Modal2';
import Card from '@/assets/card';
import { ITEMS_COLUMNS, QTY_NUMBER } from './resources';
import styles from './order-new.module.css';
import styles2 from '@/assets/react-table.module.css';

const OrderItem = ({ items, setItems }) => {
  const [addEnabled, setAddEnabled] = useState(false);
  const [enableQuatity, setEnableQuantity] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const SAMPLE_TODAYS_MENU_LIST_DATA = [
    { id: 1, item_name: 'Banana Muffins', size: 'small box', price: 40 },
    { id: 2, item_name: 'Banana Muffins', size: 'medium box', price: 70 },
    { id: 3, item_name: 'Banana Muffins', size: 'large box', price: 100 },
    { id: 4, item_name: 'Banana Muffins', size: 'extra large box', price: 190 },
    { id: 5, item_name: 'Banana Turon', size: 'small box', price: 50 },
    { id: 6, item_name: 'Banana Turon', size: 'big box', price: 190 },
    { id: 7, item_name: 'Lechon Manok', size: 'regular', price: 350 },
    { id: 8, item_name: 'Cordon Bleu', size: 'regular box', price: 120 },
  ];

  const onSelectHandler = (data) => {
    setSelectedItem(data);
    setEnableQuantity(true);
  };

  const onCancelHandler = () => {
    setAddEnabled(false);
    setEnableQuantity(false);
    setSelectedItem({});
  };

  const onAddItem = (qty) => {
    let tempData = [];
    let isUpdate = false;
    items.forEach((order) => {
      console.log('IF: ', 'ORDERS ID:', order.id, 'SELECTED ITEM ID: ', selectedItem.id);
      if (order.id === selectedItem.id) {
        tempData.push({ ...selectedItem, qty: qty + order.qty, sub_total: order.price * (qty + order.qty) });
        isUpdate = true;
      } else {
        console.log('ELSE: ', 'ORDERS ID:', order.id, 'SELECTED ITEM ID: ', selectedItem.id);
        tempData.push(order);
      }
    });
    !isUpdate && tempData.push({ ...selectedItem, qty: qty, sub_total: selectedItem.price * qty });
    setItems(tempData);
    setAddEnabled(false);
    setEnableQuantity(false);
    setSelectedItem({});
  };

  const handleDelete = (id) => {
    if (confirm('Confirm delete menu item?') == true) {
      let tempData = items.filter((order) => order.id !== id);
      setItems(tempData);
    }
  };

  return (
    <div>
      <Modal2 open={addEnabled}>
        <div className={styles.sub_container}>
          <div className={styles.sub_body}>
            <div className={styles.sub_header_bar}>
              <h2>Select an item</h2>
              <div className={styles.sub_header_icon_container}>
                <div className={styles.sub_header_icon} onClick={onCancelHandler}>
                  <RiCloseCircleLine />
                </div>
              </div>
            </div>
            <div className={styles.main_page}>
              {enableQuatity ? (
                <>
                  {QTY_NUMBER.map((num) => {
                    return (
                      <div key={num} className={styles.card_container} onClick={() => onAddItem(num)}>
                        <div className={styles.number}>{num}</div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <Card data={SAMPLE_TODAYS_MENU_LIST_DATA} isPrice={true} onSelect={onSelectHandler} />
              )}
            </div>
          </div>
        </div>
      </Modal2>
      <div className={styles.sub_container}>
        <div className={styles.sub_body}>
          <div className={styles.sub_header_bar}>
            <h2>Item List:</h2>
            <div className={styles.sub_header_icon_container}>
              <div className={styles.sub_header_icon} onClick={() => setAddEnabled(true)}>
                <RiAddCircleLine />
              </div>
            </div>
          </div>
          <table className={styles2.table}>
            <thead>
              <tr className={styles2.table_head_row}>
                {ITEMS_COLUMNS.map((head) => {
                  return (
                    <th className={styles2.table_head} key={head}>
                      <div className={styles2.table_head_text}>{head}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id} className={styles.table_row_normal}>
                    <td className={styles2.cell}>{item.item_name}</td>
                    <td className={styles2.cell}>{item.size}</td>
                    <td className={styles2.cell}>{item.qty}</td>
                    <td className={styles2.cell}>{item.price}</td>
                    <td className={styles2.cell}>{item.sub_total}</td>
                    <td className={styles2.cell}>
                      <div className={styles.delete_icon_holder} onClick={() => handleDelete(item.id)}>
                        <RiDeleteBin4Line />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
