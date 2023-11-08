'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ReportsMainPage from './reports-main-page';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';

import apiRequest from '@/lib/axios';

const ReportsPage = () => {
  const [salesSummary, setSalesSummary] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesData, setSalesData] = useState([]);
  const [expensesSummary, setExpensesSummary] = useState({});
  const [expensesData, setExpensesData] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(moment());

  const summarizeSales = (sales) => {
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
            summary[item._id] = {
              ...item,
              qty: summary[item._id].qty + item.qty,
              subTotal: (summary[item._id].qty + item.qty) * item.price,
            };
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

    setSalesSummary({ cash: cash, gcash: gCash, total: cash + gCash });
    setSalesData(tempArray.sort((a, b) => b.subTotal - a.subTotal));
  };

  const summarizeExpenses = (expenses) => {
    let cash = 0;
    let gcash = 0;
    let total = 0;
    expenses?.forEach((expense) => {
      if (expense.isGcash) {
        gcash = gcash + expense.total;
      } else {
        cash = cash + expense.total;
      }
      total = total + expense.total;
    });
    setExpensesSummary({ cash, gcash, total });
    setExpensesData(expenses);
  };

  const orderQuery = useQuery({
    queryKey: ['orders'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'orders/today',
        method: 'POST',
        data: { dateFrom: moment(date).startOf('day'), dateTo: moment(date).endOf('day') },
      }).then((res) => res.data),
    onSuccess: (orders) => summarizeSales(orders),
  });

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'expenses/search',
        method: 'POST',
        data: { dateFrom: moment(date).startOf('day'), dateTo: moment(date).endOf('day') },
      }).then((res) => res.data),
    onSuccess: (expenses) => summarizeExpenses(expenses),
  });

  useEffect(() => {
    summarizeSales(orderQuery?.data);
    summarizeExpenses(expensesQuery?.expenses);
  }, []);

  const setDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  return (
    <>
      {openCalendar && <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setDateHandler} />}
      <ReportsMainPage
        salesSummary={salesSummary}
        salesData={salesData}
        expensesData={expensesData}
        expensesSummary={expensesSummary}
        orderQuery={orderQuery?.data}
        date={date}
      />
      <ReportsIconBar setOpenCalendar={setOpenCalendar} />
    </>
  );
};

export default ReportsPage;
