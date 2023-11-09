'use client';
import { RiAddCircleLine } from 'react-icons/ri';
import { useState } from 'react';
import moment from 'moment';

import EditShoppingCartItem from './new-order-components/edit-cart-item';
import ActionModal from '@/assets/action-modal';
import Table from '@/assets/table';

import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import styles from './new-order.module.css';

const NewOrderSideBar = ({ selectedCustomer, orderDetails, items, step, setStep, setItems, onCancel, onSave, edit, setEdit, title }) => {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const [openEditHandler, setOpenEditHandler] = useState(false);

  let total = items.reduce((total, data) => +data.subTotal + total, 0) - +orderDetails.downPayment;

  const customerClickHandler = () => {
    if (step === 1) {
      setStep(2);
      setEdit(2);
    } else {
      edit ? setEdit(null) : setEdit(1);
    }
  };

  const cancelHandler = () => {
    setSelectedCartItem(null);
    setOpenActionModal(false);
  };

  const rowClickHandler = (item) => {
    setSelectedCartItem(item);
    setOpenActionModal(true);
  };

  const editHandler = () => {
    setOpenActionModal(false);
    setOpenEditHandler(true);
  };

  const deleteHandler = () => {
    let tempData = items.filter((item) => item._id !== selectedCartItem._id);
    setItems(tempData);
    setOpenActionModal(false);
  };

  const updateItemHandler = (newItem) => {
    let tempData = items.map((item) => (item._id === newItem._id ? newItem : item));
    setItems(tempData);
    setOpenEditHandler(false);
  };

  return (
    <>
      {openActionModal && (
        <ActionModal open={openActionModal} close={cancelHandler} onCancel={cancelHandler} onEdit={editHandler} onDelete={deleteHandler} />
      )}
      {openEditHandler && (
        <EditShoppingCartItem
          open={openEditHandler}
          close={() => setOpenEditHandler(false)}
          item={selectedCartItem}
          onSave={updateItemHandler}
        />
      )}
      <div className={edit ? styles.container_hide : styles.container}>
        <div className={styles.main_box}>
          <h2 className={styles.header}>{title}</h2>
          {selectedCustomer && (
            <div className={styles.customer_box} onClick={customerClickHandler}>
              <div className={styles.sub_header}>Customer's Info:</div>
              <div className={styles.info_container}>
                <div className={styles.title}>Name: </div>
                {selectedCustomer?.name}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Address: </div>
                {selectedCustomer?.address}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Block: </div>
                {selectedCustomer?.block}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Lot: </div>
                {selectedCustomer?.lot}
              </div>
            </div>
          )}
          {orderDetails && step >= 2 && (
            <div className={styles.customer_box} onClick={() => (edit ? setEdit(null) : setEdit(2))}>
              <div className={styles.sub_header}>Order Details:</div>
              <div className={styles.info_container}>
                <div className={styles.title}>Delivery Date: </div>
                {moment(orderDetails.deliveryDate).format('MMM DD, yyyy')}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Delivery Time: </div>
                {orderDetails?.deliveryTime}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Is Delivered: </div>
                {orderDetails?.isDelivered ? '🟢' : '🔴'}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Is G-Cash: </div>
                {orderDetails?.isGcash ? '🟢' : '🔴'}
              </div>
              <div className={styles.info_container}>
                <div className={styles.title}>Is Paid: </div>
                {orderDetails?.isPaid ? '🟢' : '🔴'}
              </div>
              {orderDetails.isPaid && (
                <div className={styles.info_container}>
                  <div className={styles.title}>Payment Date: </div>
                  {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('MMM DD, yyyy')}
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div className={styles.customer_box}>
              <div className={styles.shoping_card_header_bar}>
                <div className={styles.shoping_card_title}>Shopping Cart:</div>
                {edit !== 3 && (
                  <div className={styles.shoping_cart_add_icon} title="add" onClick={() => setEdit(3)}>
                    <div className={styles.shoping_cart_icon}>
                      <RiAddCircleLine />
                    </div>
                    <p className={styles.shoping_cart_icon_text}>Menu</p>
                  </div>
                )}
              </div>
              <div className={styles.table_container}>
                <Table headers={ORDER_ITEMS_HEADER} data={items} enableRowClick={true} onRowClick={rowClickHandler} />
              </div>
            </div>
          )}
        </div>
        {selectedCustomer && items.length !== 0 && (
          <div className={styles.bottom_container}>
            <div className={styles.total_container}>
              <div className={styles.total}>TOTAL: </div>
              <div className={styles.total}>₱ {total.toLocaleString('en-US')}</div>
            </div>
            <div className={styles.action_container}>
              <div className={styles.cancel} onClick={onCancel}>
                CANCEL
              </div>
              <div className={styles.save} onClick={onSave}>
                SAVE
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewOrderSideBar;
