import React, { useState } from 'react';

import SalesTable from '@/assets/sales-table';

import styles from '@/styles/prod.module.css';
import { RiAddCircleLine } from 'react-icons/ri';
import { COLUMNS, SAMPLE_DATA } from './Resource';
import Modal from '@/assets/modal';

import NewOrder from './NewOrder';

const OrdersPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>Daily Sales</h2>
        <div className={styles.header_button} onClick={() => setIsOpen(true)}>
          <RiAddCircleLine />
        </div>
      </div>
      <Modal open={isOpen}>
        <NewOrder onClose={() => setIsOpen(false)} />
      </Modal>

      <SalesTable COLUMNS={COLUMNS} DATA={SAMPLE_DATA} />
    </div>
  );
};

export default OrdersPage;
