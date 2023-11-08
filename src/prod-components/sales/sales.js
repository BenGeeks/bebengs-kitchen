'use client';
import { useState, useEffect } from 'react';
import moment from 'moment';

import OrderListHistory from './orders-view/view-orders-history';
import OrderListToday from './orders-view/view-orders-today';
import EditOrderPage from './new-order/edit-order';
import NewOrderPage from './new-order/new-order';

const OrdersPage = () => {
  const [windowWidth, setWindowWidth] = useState(1024);
  const [view, setView] = useState(1);
  const [currentPage, setCurrentPage] = useState('todays-list');
  const [orderData, setOrderData] = useState(null);
  const [calendarDate, setCalendarDate] = useState(moment());

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getWidth = (pos) => {
    if (windowWidth < 1024) {
      if (view % 2 !== 0) return pos == 'left' ? '0%' : '100%';
      if (view % 2 === 0) return pos == 'left' ? '100%' : '0%';
    } else {
      if (view % 3 === 1) return pos == 'left' ? '50%' : '50%';
      if (view % 3 === 2) return pos == 'left' ? '0%' : '100%';
      if (view % 3 === 0) return pos == 'left' ? '100%' : '0%';
    }
  };

  const onEditHandler = (data) => {
    setOrderData(data);
    setCurrentPage('edit-order');
  };

  return (
    <>
      {currentPage === 'todays-list' && (
        <OrderListToday
          setCurrentPage={setCurrentPage}
          onEdit={onEditHandler}
          currentPage={currentPage}
          getWidth={getWidth}
          setView={setView}
        />
      )}
      {currentPage === 'history-list' && (
        <OrderListHistory
          setCurrentPage={setCurrentPage}
          onEdit={onEditHandler}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
          currentPage={currentPage}
          getWidth={getWidth}
          setView={setView}
        />
      )}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} getWidth={getWidth} setView={setView} />}
      {currentPage === 'edit-order' && (
        <EditOrderPage setCurrentPage={setCurrentPage} orderData={orderData} getWidth={getWidth} setView={setView} />
      )}
    </>
  );
};

export default OrdersPage;
