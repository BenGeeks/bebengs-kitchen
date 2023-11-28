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
  const [leftWidth, setLeftWidth] = useState(50);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (windowWidth < 1024) {
      if (isRightSwipe && leftWidth === 0) setLeftWidth(100);
      if (isLeftSwipe && leftWidth === 100) setLeftWidth(0);
    } else {
      if (isRightSwipe) {
        leftWidth === 0 && setLeftWidth(50);
        leftWidth === 50 && setLeftWidth(100);
      }
      if (isLeftSwipe) {
        leftWidth === 100 && setLeftWidth(50);
        leftWidth === 50 && setLeftWidth(0);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      if (view % 2 !== 0) setLeftWidth(0);
      if (view % 2 === 0) setLeftWidth(100);
    } else {
      if (view % 3 === 1) setLeftWidth(50);
      if (view % 3 === 2) setLeftWidth(0);
      if (view % 3 === 0) setLeftWidth(100);
    }
  }, [view, windowWidth]);

  const onEditHandler = (data) => {
    setOrderData(data);
    setCurrentPage('edit-order');
  };

  return (
    <div style={{ display: 'flex', width: '100%' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {currentPage === 'todays-list' && (
        <OrderListToday
          setCurrentPage={setCurrentPage}
          onEdit={onEditHandler}
          currentPage={currentPage}
          setView={setView}
          leftWidth={leftWidth}
        />
      )}
      {currentPage === 'history-list' && (
        <OrderListHistory
          setCurrentPage={setCurrentPage}
          onEdit={onEditHandler}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
          currentPage={currentPage}
          setView={setView}
          leftWidth={leftWidth}
        />
      )}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'edit-order' && <EditOrderPage setCurrentPage={setCurrentPage} orderData={orderData} />}
    </div>
  );
};

export default OrdersPage;
