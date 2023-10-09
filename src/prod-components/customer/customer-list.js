'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import CustomerNew from './customer-new';
import ReactTable from '@/assets/react-table';
import { COLUMNS } from './resources';
import styles from './customer.module.css';

const CustomersList = ({}) => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [customerData, setCustomerData] = useState({ name: '', address: '', block: '', lot: '' });

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => fetch('http://localhost:3000/api/customers').then((res) => res.json()),
  });

  const newCustomerMutation = useMutation({
    mutationFn: (newCustomer) => {
      fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
    },
    onSuccess: () => {
      toast.success('Customer added successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (id) => {
      fetch(`http://localhost:3000/api/customers/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast.success('Customer deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: (updatedCustomer) => {
      fetch(`http://localhost:3000/api/customers/${updatedCustomer.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCustomer.data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
    },
    onSuccess: () => {
      toast.success('Customer updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const onDeleteCustomer = (id) => {
    confirm('Confirm delete this user?') == true && deleteCustomerMutation.mutate(id);
  };

  const addNewCustomerHandler = (data) => {
    newCustomerMutation.mutate(data);
    onCancel();
  };

  const editCustomerHandler = (data) => {
    let _id = data._id;
    let newData = { name: data.name, phone: data.phone, address: data.address, block: data.block, lot: data.lot };
    console.log('Edit Customer has been triggered: ', data);
    updateCustomerMutation.mutate({ id: _id, data: newData });
    onCancel();
  };

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

  const onCancel = () => {
    setCustomerData({ name: '', address: '', block: '', lot: '' });
    setModalOpen(false);
  };

  if (customersQuery.isLoading) return <h1>Loading...</h1>;

  if (customersQuery.isError) return <pre> {JSON.stringify(customersQuery.error)}</pre>;

  return (
    <>
      <div className={styles.floating_icon} onClick={onAddCustomer}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <CustomerNew onClose={onCancel} action={action} data={customerData} onAdd={addNewCustomerHandler} onEdit={editCustomerHandler} />
      </Modal>

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={customersQuery.data.data}
        onDelete={onDeleteCustomer}
        onEdit={onEditCustomer}
        enableActions={true}
      />
    </>
  );
};

export default CustomersList;
