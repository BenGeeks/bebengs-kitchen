import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

import PrintSalesDailySummary from './print-sales-summary';
import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import DatePicker from '@/assets/date-picker';

import apiRequest from '@/lib/axios';

const OrderListHistory = ({ currentPage, setCurrentPage, onEdit, calendarDate, setCalendarDate, getWidth, setView }) => {
  const printRef = useRef();
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(true);
  const [isPrint, setIsPrint] = useState(false);

  const summarizeReport = (sales) => {
    let tempArray = [];
    let summary = {};
    let cash = 0;
    let gCash = 0;
    let collectibles = [];
    sales?.forEach((order) => {
      if (order.isPaid) {
        if (order.isGcash) gCash = gCash + order.total;
        if (!order.isGcash) cash = cash + order.total;
        order.orderDetails.items.forEach((item) => {
          if (summary[item._id]) {
            summary[item._id] = { ...item, qty: summary[item._id].qty + item.qty };
          } else {
            summary[item._id] = item;
          }
        });
      }

      if (order.isDelivered && !order.isPaid) {
        collectibles.push({ name: order.orderDetails.customer.name, amount: order.total });
      }
    });
    const keys = Object.keys(summary);
    keys.forEach((key) => {
      tempArray.push(summary[key]);
    });

    setSalesData({ cashTotal: cash, gCashTotal: gCash, dailyTotal: cash + gCash });
    setSalesCount(tempArray);
    setCollectibleData(collectibles);
  };

  const orderQuery = useQuery({
    queryKey: ['history'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'orders/search',
        method: 'POST',
        data: { dateFrom: moment(calendarDate).startOf('day'), dateTo: moment(calendarDate).endOf('day') },
      }).then((res) => res.data),
    onSuccess: (orders) => {
      summarizeReport(orders);
    },
  });

  useEffect(() => summarizeReport(orderQuery.data), []);

  const setCalendarHandler = (date) => {
    setCalendarDate(moment(date));
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  const handleBeforeGetContent = () => {
    setIsPrint(true);
    return Promise.resolve();
  };

  const onPrintHandler = useReactToPrint({
    onBeforeGetContent: () => handleBeforeGetContent(),
    content: () => printRef.current,
    documentTitle: 'daily_sales',
    onAfterPrint: () => setIsPrint(false),
  });

  return (
    <>
      <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setCalendarHandler} />
      {isPrint ? (
        <div ref={printRef}>
          <PrintSalesDailySummary data={orderQuery.data} salesSummary={salesData} date={calendarDate} />
        </div>
      ) : (
        <>
          <OrdersSideBar
            salesData={salesData}
            salesCount={salesCount}
            collectibleData={collectibleData}
            calendarDate={calendarDate}
            width={getWidth('left')}
          />
          <OrdersMainPage orderQuery={orderQuery} onEdit={onEdit} width={getWidth('right')} />
          <OrdersIconBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPrint={onPrintHandler}
            setOpenCalendar={setOpenCalendar}
            onView={() => setView((prev) => prev + 1)}
          />
        </>
      )}
    </>
  );
};

export default OrderListHistory;
