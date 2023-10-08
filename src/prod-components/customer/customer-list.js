'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import CustomerNew from './customer-new';
import ReactTable from '@/assets/react-table';
import { DATA, COLUMNS } from './resources';
import styles from './customer.module.css';

const CustomersList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [customerData, setCustomerData] = useState({ name: '', address: '', block: '', lot: '' });

  const onAddCustomer = () => {
    setCustomerData({ name: '', address: '', block: '', lot: '' });
    setAction('Add');
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

  const addNewCustomerHandler = (data) => {
    console.log('Add new Customer has been triggered: ', data);
    onCancel();
  };

  const editCustomerHandler = (data) => {
    console.log('Edit Customer has been triggered: ', data);
    onCancel();
  };

  return (
    <>
      <div className={styles.floating_icon} onClick={onAddCustomer}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <CustomerNew onClose={onCancel} action={action} data={customerData} onAdd={addNewCustomerHandler} onEdit={editCustomerHandler} />
      </Modal>

      <ReactTable COLUMNS={COLUMNS} DATA={DATA} onDelete={onDeleteCustomer} onEdit={onEditCustomer} enableActions={true} />
    </>
  );
};

export default CustomersList;
