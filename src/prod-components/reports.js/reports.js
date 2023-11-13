'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import ReportsMainPage from './reports-main-page';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';
import apiRequest from '@/lib/axios';

const ReportsPage = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(moment());
  const [expensesSummary, setExpenseSummary] = useState({});
  const [expenseData, setExpenseData] = useState([]);
  const [salesSummary, setSalesSummary] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [finalReportData, setFinalReportData] = useState([]);

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
    setExpenseSummary({ cash, gcash, total });
    setExpenseData(expenses);
  };

  const summarizeSales = (sales) => {
    let tempArray = [];
    let summary = {};
    let downPayment = 0;
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

      if (order.isDownPayment) downPayment = downPayment + order.downPayment;

      if (order.isDelivered && !order.isPaid) {
        collectibles.push({ name: order.orderDetails.customer.name, amount: order.total });
      }
    });

    const keys = Object.keys(summary);

    keys.forEach((key) => {
      tempArray.push(summary[key]);
    });

    setSalesSummary({ cash: cash, gcash: gCash, total: cash + gCash + downPayment });
    setSalesData(tempArray.sort((a, b) => b.subTotal - a.subTotal));
  };

  useEffect(() => {
    let tempData = [
      { source: 'Sales', cash: salesSummary?.cash, gcash: salesSummary?.gcash, total: salesSummary?.total },
      { source: 'Expenses', cash: expensesSummary?.cash, gcash: expensesSummary?.gcash, total: expensesSummary?.total },
      {
        source: 'Total',
        cash: salesSummary?.cash - expensesSummary?.cash,
        gcash: salesSummary?.gcash - expensesSummary?.gcash,
        total: salesSummary?.total - expensesSummary?.total,
      },
    ];
    setFinalReportData(tempData);
  }, [salesSummary, expensesSummary]);

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'reports',
        method: 'POST',
        data: { dateFrom: moment(date).startOf('day'), dateTo: moment(date).endOf('day') },
      }).then((res) => res.data),
    onSuccess: (data) => {
      summarizeExpenses(data.expenseList);
      summarizeSales(data.salesList);
    },
  });

  const setDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  return (
    <>
      {openCalendar && <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setDateHandler} defaultDate={date} />}
      <ReportsMainPage
        date={date}
        reportsQuery={reportsQuery}
        finalReportData={finalReportData}
        salesData={salesData}
        expenseData={expenseData}
      />
      <ReportsIconBar setOpenCalendar={setOpenCalendar} />
    </>
  );
};

export default ReportsPage;
