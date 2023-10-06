'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import SalesTable from '@/assets/sales-table';

import Modal from '@/assets/modal';
import OrderNew from './order-new';
import { COLUMNS, SAMPLE_ORDER_DATA } from './resource';
import styles from './order.module.css';

const OrderToday = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(SAMPLE_ORDER_DATA);

  const onAddOrder = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className={styles.floating_icon} onClick={onAddOrder}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <OrderNew onClose={() => setModalOpen(false)} />
      </Modal>
      <SalesTable COLUMNS={COLUMNS} DATA={data} />
    </>
  );
};

export default OrderToday;
