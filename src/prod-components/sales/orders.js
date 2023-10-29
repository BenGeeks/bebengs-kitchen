import { useState } from 'react';
import moment from 'moment';

import OrderListHistory from './orders-view/view-orders-history';
import OrderListToday from './orders-view/view-orders-today';
import EditOrderPage from './new-order/edit-order';
import NewOrderPage from './new-order/new-order';

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState('todays-list');
  const [orderData, setOrderData] = useState(null);
  const [calendarDate, setCalendarDate] = useState(moment());

  const onEditHandler = (data) => {
    setOrderData(data);
    setCurrentPage('edit-order');
  };

  return (
    <>
      {currentPage === 'todays-list' && <OrderListToday setCurrentPage={setCurrentPage} onEdit={onEditHandler} currentPage={currentPage} />}
      {currentPage === 'history-list' && (
        <OrderListHistory
          setCurrentPage={setCurrentPage}
          onEdit={onEditHandler}
          calendarDate={calendarDate}
          setCalendarDate={setCalendarDate}
          currentPage={currentPage}
        />
      )}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'edit-order' && <EditOrderPage setCurrentPage={setCurrentPage} orderData={orderData} />}
    </>
  );
};

export default OrdersPage;
