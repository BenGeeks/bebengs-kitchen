'use client';
import { useState } from 'react';
import DailyOrderListView from './orders-view/view-order-list';
import NewOrderPage from './new-order/new-order';

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState('order-list');

  return (
    <>
      {currentPage === 'order-list' && <DailyOrderListView setCurrentPage={setCurrentPage} />}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} />}
    </>
  );
};

export default OrdersPage;
