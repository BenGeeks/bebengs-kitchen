'use client';
import { BiReset, BiFilterAlt } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ImCancelCircle } from 'react-icons/im';

import AddressFilterSelector from './filter/address-filter';
import BlockFilterSelector from './filter/block-filter';
import { Loader, Error } from '@/assets/loader-error';
import { CUSTOMER_HEADER } from './resources';
import styles from './customer.module.css';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';

const CustomersList = ({ onSelectCustomer, isEdit, onCancel }) => {
  const [defaultList, setDefaultList] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addressSelectorIsOpen, setAddressSelectorIsOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [blockSelectorIsOpen, setBlockSelectorIsOpen] = useState(false);
  const [block, setBlock] = useState(null);

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
    onSuccess: (customers) => {
      setCustomerData(customers);
      setDefaultList(customers);
      setAddressSelectorIsOpen(false);
      setBlockSelectorIsOpen(false);
    },
  });

  const sortData = (customer) => {
    let sortedData = customer.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    let tempData = defaultList?.filter((customer) => {
      let searchFrom = `${customer.name.toLowerCase()} ${customer.address} ${customer.block} ${customer.lot}`;
      return searchFrom.includes(searchValue.toLowerCase());
    });
    searchValue.length === 0 ? setCustomerData(defaultList) : setCustomerData([...tempData]);
  }, [searchValue, defaultList, setCustomerData]);

  const filterHandler = (type, data) => {
    switch (type) {
      case 'address':
        setAddressSelectorIsOpen(false);
        if (data) {
          setAddress(data);
          setCustomerData(defaultList.filter((customer) => customer.address === data));
        } else {
          setAddress(null);
          setCustomerData(defaultList);
        }
        break;
      case 'block':
        setBlockSelectorIsOpen(false);
        if (data) {
          setBlock(data);
          let filteredTemp = defaultList.filter((customer) => customer.address === address);
          setCustomerData(filteredTemp?.filter((customer) => customer.block == data));
        } else {
          setBlock(null);
          setCustomerData(defaultList.filter((customer) => customer.address === address));
        }
        break;
      default:
    }
  };

  const resetFilter = () => {
    setAddress(null);
    setBlock(null);
    setCustomerData(defaultList);
  };

  if (customersQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (customersQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={customersQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      {addressSelectorIsOpen && <AddressFilterSelector open={addressSelectorIsOpen} onSelect={filterHandler} />}
      {blockSelectorIsOpen && <BlockFilterSelector open={blockSelectorIsOpen} onSelect={filterHandler} />}
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          {address ? (
            <>
              <div className={styles.header_bar_filter} onClick={resetFilter}>
                <BiReset />
              </div>
              <div className={styles.header_bar_filter} onClick={() => setAddressSelectorIsOpen(true)}>
                {address}
              </div>
              <div className={styles.header_bar_filter} onClick={() => setBlockSelectorIsOpen(true)}>
                Block: {block}
              </div>
            </>
          ) : (
            <div className={styles.header_bar_filter} onClick={() => setAddressSelectorIsOpen(true)}>
              <BiFilterAlt />
            </div>
          )}

          {!address && (
            <input
              className={styles.search_input}
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}

          {isEdit && (
            <div className={styles.header_bar_filter} title="cancel" onClick={onCancel}>
              <ImCancelCircle />
            </div>
          )}
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
