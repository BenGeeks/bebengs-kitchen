'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TopBar from '@/prod-components/top-bar/top-bar';
import CustomersList from '@/prod-components/customer/customer-list';
import MenuList from '@/prod-components/menu/menu-list';
import Orders from '@/prod-components/order/orders';
import apiRequest from '@/lib/axios';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [onAdd, setOnAdd] = useState(false);

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
  });

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
  });
  return (
    <div className={styles.main_container}>
      <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} setOnAdd={setOnAdd} />
      <div className={styles.page_container}>
        {currentPage === 'orders' && <Orders onAdd={onAdd} setOnAdd={setOnAdd} />}
        {currentPage === 'menu' && <MenuList menuQuery={menuQuery} />}
        {currentPage === 'customers' && <CustomersList customersQuery={customersQuery} />}
      </div>
    </div>
  );
};

export default ProdPage;
