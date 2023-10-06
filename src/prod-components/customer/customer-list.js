'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import CustomerModal from './customer-modal';
import ReactTable from '@/assets/react-table';
import { DATA, COLUMNS } from './resources';
import styles from './customer.module.css';

const CustomersList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [customerData, setCustomerData] = useState({ name: '', address: '', block: '', lot: '' });

  const onAddCustomer = () => {
    setCustomerData({ name: '', address: '', block: '', lot: '' });
    setAction('Add new');
    setModalOpen(true);
  };

  const onEditCustomer = (data) => {
    setModalOpen(true);
    setAction('Edit');
    setCustomerData(data);
  };

  const onDeleteCustomer = (id) => {
    confirm('Confirm delete this user?') == true && console.log(id);
  };

  const onCancel = () => {
    setCustomerData({ name: '', address: '', block: '', lot: '' });
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.floating_icon} onClick={onAddCustomer}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <CustomerModal onClose={onCancel} action={action} data={customerData} />
      </Modal>

      <ReactTable COLUMNS={COLUMNS} DATA={DATA} onDelete={onDeleteCustomer} onEdit={onEditCustomer} enableActions={true} />
    </>
  );
};

export default CustomersList;
