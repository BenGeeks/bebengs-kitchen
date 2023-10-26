import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Table from '@/assets/table';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import { SELECT_CUSTOMER_LIST } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import newOrderStyles from '@/styles/new-order.module.css';

const Customer = ({ setSelectedCustomer, setStep, setEdit }) => {
  const [defaultList, setDefaultList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [customerData, setCustomerData] = useState([]);

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      setCustomerData(data);
      setDefaultList(data);
    },
    staleTime: 0,
    refetchInterval: 20000,
  });

  const selectCustomerHandler = (data) => {
    setSelectedCustomer(data);
    setStep(2);
    setEdit(2);
  };

  const sortData = (customer) => {
    let sortedData = customer.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    let tempData = customerData.filter((customer) => {
      let searchFrom = `${customer.name.toLowerCase()} ${customer.address} ${customer.block} ${customer.lot}`;
      return searchFrom.includes(searchValue.toLowerCase());
    });
    searchValue.length === 0 ? setCustomerData(defaultList) : setCustomerData([...tempData]);
  }, [searchValue]);

  if (customersQuery.isLoading) return <LoadingPage />;
  if (customersQuery.isError) return <ErrorPage error={JSON.stringify(customersQuery.error)} />;

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
        data={sortData(customerData)}
        enableDelete={false}
        enableEdit={false}
        enableRowClick={true}
        onRowClick={selectCustomerHandler}
      />
    </div>
  );
};

export default Customer;
