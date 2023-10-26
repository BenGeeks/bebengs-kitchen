'use client';
import { useState } from 'react';
import DailyOrderListView from './orders-view/view-order-list';
import NewOrderPage from './new-order/new-order';
import EditOrderPage from './new-order/edit-order';

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState('order-list');
  const [orderData, setOrderData] = useState(null);

  const onEditHandler = (data) => {
    setOrderData(data);
    setCurrentPage('edit-order');
  };

  return (
    <>
      {currentPage === 'order-list' && <DailyOrderListView setCurrentPage={setCurrentPage} onEdit={onEditHandler} />}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'edit-order' && <EditOrderPage setCurrentPage={setCurrentPage} orderData={orderData} />}
    </>
  );
};

export default OrdersPage;
