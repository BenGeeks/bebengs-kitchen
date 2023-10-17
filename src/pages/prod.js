'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import NavigationBar from '@/prod-components/navigation';
import CustomersList from '@/prod-components/customer/customer-list';
import MenuList from '@/prod-components/menu/menu-list';
import OrderToday from '@/prod-components/order/today/order-today';
import SideBar from '@/prod-components/side-bar';
import apiRequest from '@/lib/axios';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [showNav, setShowNav] = useState(false);
  const [salesData, setSalesData] = useState([{ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 }]);
  const [salesCount, setSalesCount] = useState([]);

  const summarizeReport = (sales) => {
    let tempArray = [];
    let summary = {};
    let cash = 0;
    let gCash = 0;
    sales.forEach((order) => {
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
    });
    const keys = Object.keys(summary);
    keys.forEach((key) => {
      tempArray.push(summary[key]);
    });
    setSalesCount(tempArray);
    setSalesData([{ cashTotal: cash, gCashTotal: gCash, dailyTotal: cash + gCash }]);
  };

  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiRequest({ url: 'orders/today', method: 'GET' }).then((res) => res.data),
    onSuccess: (orders) => summarizeReport(orders),
  });

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
  });

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
  });
  return (
    <div className={styles.page_holder}>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} showNav={showNav} setShowNav={setShowNav} />
      <div className={styles.main_container}>
        <SideBar salesData={salesData} salesCount={salesCount} />
        {currentPage === 'orders' && <OrderToday orderQuery={orderQuery} />}
        {currentPage === 'menu' && <MenuList menuQuery={menuQuery} />}
        {currentPage === 'customers' && <CustomersList customersQuery={customersQuery} />}
      </div>
    </div>
  );
};

export default ProdPage;
