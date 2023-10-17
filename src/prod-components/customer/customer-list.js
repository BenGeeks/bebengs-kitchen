'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import CustomerNew from './customer-new';
import Table from '@/assets/table';
import { HEADER } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import pageStyles from '@/styles/page.module.css';

const CustomersList = ({ customersQuery }) => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [customerData, setCustomerData] = useState({ name: '', address: '', block: '', lot: '' });

  const newCustomerMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'customers', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('Customer added successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `customers/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Customer deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `customers/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Customer updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
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
    <div className={pageStyles.page_container}>
      <div className={pageStyles.floating_icon} onClick={onAddCustomer}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <CustomerNew onClose={onCancel} action={action} data={customerData} onAdd={addNewCustomerHandler} onEdit={editCustomerHandler} />
      </Modal>
      <Table
        headers={HEADER}
        data={customersQuery.data}
        enableDelete={true}
        enableEdit={true}
        onDelete={onDeleteCustomer}
        onEdit={onEditCustomer}
      />
    </div>
  );
};

export default CustomersList;
