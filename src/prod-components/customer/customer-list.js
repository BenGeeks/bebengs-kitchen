'use client';
import React, { useState, useEffect } from 'react';

import Table from '@/assets/table';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import { CUSTOMER_HEADER } from '@/resources/customers';
import customerStyles from '@/styles/customer.module.css';

const CustomersList = ({ onSelectCustomer, customersQuery }) => {
  const [customerData, setCustomerData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const sortData = (customer) => {
    let sortedData = customer.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    let data = customersQuery && customersQuery.data ? customersQuery.data : [];
    let tempData = data.filter((customer) => {
      let searchFrom = `${customer.name.toLowerCase()} ${customer.address} ${customer.block} ${customer.lot}`;
      return searchFrom.includes(searchValue.toLowerCase());
    });
    searchValue.length === 0 ? setCustomerData(data) : setCustomerData([...tempData]);
  }, [searchValue, customersQuery]);

  if (customersQuery.isLoading) return <LoadingPage />;
  if (customersQuery.isError) return <ErrorPage error={JSON.stringify(customersQuery.error)} />;

  return (
    <div className={customerStyles.page_container}>
      <div className={customerStyles.main_page}>
        <div className={customerStyles.header_bar}>
          <h3 className={customerStyles.header_bar_title}>Select Customer:</h3>
          <input
            className={customerStyles.search_input}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <Table
          headers={CUSTOMER_HEADER}
          data={sortData(customerData)}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={onSelectCustomer}
        />
      </div>
    </div>
  );
};

export default CustomersList;
