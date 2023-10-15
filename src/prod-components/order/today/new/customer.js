'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiAddCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { BsPersonFillGear } from 'react-icons/bs';

import CustomerNew from '@/prod-components/customer/customer-new';
import Table from '@/assets/table';
import { SELECT_CUSTOMER_LIST } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import pageStyles from '@/styles/page.module.css';

const Customer = ({ selectedCustomer, setSelectedCustomer, onEdit, edited }) => {
  const [addCustomer, setAddCustomer] = useState(false);
  const [changeCustomer, setChangeCustomer] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
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
    setSelectedCustomer({ _id: data._id, displayName: `${data.name} - ${data.address} ${data.block} ${data.lot}` });
    setChangeCustomer(false);
    onEdit(null);
    edited(true);
  };

  const addNewCustomerHandler = (data) => {
    setSelectedCustomer(data);
    setAddCustomer(false);
    setChangeCustomer(false);
  };

  if (customersQuery.isLoading) return <h1>Loading...</h1>;
  if (customersQuery.isError) return <pre> {JSON.stringify(customersQuery.error)}</pre>;

  return (
    <div className={pageStyles.sub_container}>
      {selectedCustomer === null || changeCustomer ? (
        <div className={pageStyles.sub_body}>
          {addCustomer ? (
            <>
              <CustomerNew onClose={() => setAddCustomer(false)} action="Add" onAdd={addNewCustomerHandler} />
            </>
          ) : (
            <>
              <div className={pageStyles.sub_header_bar}>
                <h2>Select Customer:</h2>
                <div className={pageStyles.sub_header_icon_container}>
                  <div
                    className={pageStyles.sub_header_icon}
                    title="cancel"
                    onClick={() => {
                      setChangeCustomer(false);
                      onEdit(null);
                    }}
                  >
                    <RiCloseCircleLine />
                  </div>
                  <div className={pageStyles.sub_header_icon} title="add customer" onClick={() => setAddCustomer(true)}>
                    <RiAddCircleLine />
                  </div>
                </div>
              </div>
              <div className={pageStyles.search_container}>
                <input
                  className={pageStyles.search_input}
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Table
                  headers={SELECT_CUSTOMER_LIST}
                  data={customerData}
                  enableDelete={false}
                  enableEdit={false}
                  enableRowClick={true}
                  onRowClick={selectCustomerHandler}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={pageStyles.selected_data}>
          {selectedCustomer.displayName ? (
            <h2>{selectedCustomer.displayName}</h2>
          ) : (
            <h2>
              {selectedCustomer.name} - {selectedCustomer.address} {selectedCustomer.block} {selectedCustomer.lot}
            </h2>
          )}

          <div className={pageStyles.sub_header_icon_container}>
            <div
              className={pageStyles.sub_header_icon}
              onClick={() => {
                setChangeCustomer(true);
                onEdit('customer');
              }}
            >
              <BsPersonFillGear />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
