import React from 'react';

import FutureOrdersSideBar from './orders-side-bar';
import FutureOrdersList from './orders-list';
import FutureOrdersIconBar from './orders-icon-bar';

import styles from './orders.module.css';

const FutureOrdersMainPage = ({ futureOrdersQuery, summary, onView, setCurrentPage, setOrderData }) => {
  return (
    <div className={styles.super_container}>
      <FutureOrdersSideBar futureOrdersQuery={futureOrdersQuery} summary={summary} />
      <FutureOrdersList futureOrdersQuery={futureOrdersQuery} onView={onView} setCurrentPage={setCurrentPage} setOrderData={setOrderData} />
      <FutureOrdersIconBar setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default FutureOrdersMainPage;
