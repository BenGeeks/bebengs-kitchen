'use client';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiAddCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { BsPersonFillGear } from 'react-icons/bs';

import CustomerNew from '@/prod-components/customer/customer-new';
import Table from '@/assets/table';
import { SELECT_CUSTOMER_LIST } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import newOrderStyles from '@/styles/new-order.module.css';

const Customer = ({ setSelectedCustomer, setStep, isNew }) => {
  const queryClient = useQueryClient();
  const [addCustomer, setAddCustomer] = useState(false);
  const [changeCustomer, setChangeCustomer] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
  });

  const newCustomerMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'customers', method: 'POST', data: payload }),
    onSuccess: (data) => {
      setSelectedCustomer({
        ...data.data,
        displayName: `${data.data.name} - ${data.data.address} B-${data.data.block} L-${data.data.lot}`,
      });
      setAddCustomer(false);
      setChangeCustomer(false);
      isNew && setStep(2);
      toast.success('Customer added successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  useEffect(
    () => {
      let data = customersQuery && customersQuery.data ? customersQuery.data : [];
      let tempData = data.filter((customer) => {
        let searchFrom = `${customer.name.toLowerCase()} ${customer.address} ${customer.block} ${customer.lot}`;
        return searchFrom.includes(searchValue.toLowerCase());
      });
      searchValue.length === 0 ? setCustomerData(data) : setCustomerData([...tempData]);
    },
    [searchValue],
    customersQuery
  );

  const selectCustomerHandler = (data) => {
    setSelectedCustomer({ ...data, displayName: `${data.name} - ${data.address} B-${data.block} L-${data.lot}` });
    setStep(2);
  };

  if (customersQuery.isLoading) return <h1>Loading...</h1>;
  if (customersQuery.isError) return <pre> {JSON.stringify(customersQuery.error)}</pre>;

  return (
    <div className={newOrderStyles.main_page}>
      <div className={newOrderStyles.header_bar}>
        <h3 className={newOrderStyles.header_bar_title}>Select Customer:</h3>
        <input
          className={newOrderStyles.search_input}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Table
        headers={SELECT_CUSTOMER_LIST}
        data={customerData}
        enableDelete={false}
        enableEdit={false}
        enableRowClick={true}
        onRowClick={selectCustomerHandler}
      />
    </div>
  );
};

export default Customer;
