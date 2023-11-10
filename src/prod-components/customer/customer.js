'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import CustomerIconBar from './customer-icon-bar';
import AddressList from './address/address-list';
import ActionModal from '@/assets/action-modal';
import AddressNew from './address/address-new';
import CustomersList from './customer-list';
import CustomerEdit from './customer-edit';
import CustomerNew from './customer-new';
import apiRequest from '@/lib/axios';

const CustomerPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState('customer');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectActionModal, setSelectActionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [newAddressModal, setNewAddressModal] = useState(false);

  const deleteCustomerMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `customers/${id}`, method: 'DELETE' }),
    onSuccess: (payload) => {
      toast.success(`${payload.data.name} was deleted successfully.`);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setSelectedCustomer(null);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const selectCustomerHandler = (customer) => {
    setSelectedCustomer(customer);
    setSelectActionModal(true);
  };

  const cancelHandler = () => {
    setSelectActionModal(false);
    setEditModal(false);
    setNewModal(false);
    setSelectedCustomer(null);
  };

  const onEditHandler = () => {
    setSelectActionModal(false);
    setNewModal(false);
    setEditModal(true);
  };

  const onAddCustomerHandler = () => {
    setSelectActionModal(false);
    setEditModal(false);
    setSelectedCustomer(null);
    setNewModal(true);
  };

  const onDeleteHandler = () => {
    if (confirm(`Are you sure you want to delete ${selectedCustomer.name}?`) == true) {
      deleteCustomerMutation.mutate(selectedCustomer._id);
      setSelectActionModal(false);
      setEditModal(false);
      setNewModal(false);
    }
  };

  return (
    <>
      {selectActionModal && (
        <ActionModal
          name={selectedCustomer?.name}
          open={selectActionModal}
          close={() => setSelectActionModal(false)}
          onCancel={cancelHandler}
          onEdit={onEditHandler}
          onDelete={onDeleteHandler}
        />
      )}
      {editModal && <CustomerEdit open={editModal} close={cancelHandler} customer={selectedCustomer} />}
      {newModal && <CustomerNew open={newModal} close={cancelHandler} onAddCustomerSuccess={() => null} />}
      {newAddressModal && <AddressNew open={newAddressModal} close={() => setNewAddressModal(false)} />}
      {currentPage === 'customer' && <CustomersList onSelectCustomer={selectCustomerHandler} />}
      {currentPage === 'address' && <AddressList />}
      <CustomerIconBar
        onAdd={onAddCustomerHandler}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onAddAddress={() => setNewAddressModal(true)}
      />
    </>
  );
};

export default CustomerPage;
