import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Table from '@/assets/table';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import AddressFilterSelector from './address-filter';
import BlockFilter from './block-filter';
import { SELECT_CUSTOMER_LIST } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import newOrderStyles from '@/styles/new-order.module.css';

const Customer = ({ setSelectedCustomer, setStep, setEdit }) => {
  const [defaultList, setDefaultList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [addressSelectorIsOpen, setAddressSelectorIsOpen] = useState(false);
  const [address, setAddress] = useState('Filter');
  const [blockSelectorIsOpen, setBlockSelectorIsOpen] = useState(false);
  const [block, setBlock] = useState(null);

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: () => apiRequest({ url: 'customers', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      setCustomerData(data);
      setDefaultList(data);
      setAddressSelectorIsOpen(false);
      setBlockSelectorIsOpen(false);
    },
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

  const filterHandler = (type, data) => {
    switch (type) {
      case 'address':
        setAddressSelectorIsOpen(false);
        setAddress(data);
        if (data === 'Filter') {
          console.log(1);
          setCustomerData(defaultList);
        } else {
          console.log(2);
          setCustomerData(defaultList.filter((customer) => customer.address === data));
        }
        break;
      case 'block':
        setBlockSelectorIsOpen(false);
        setBlock(data);
        if (data) {
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

  if (customersQuery.isLoading) return <LoadingPage />;
  if (customersQuery.isError) return <ErrorPage error={JSON.stringify(customersQuery.error)} />;

  return (
    <div className={newOrderStyles.main_page}>
      <AddressFilterSelector open={addressSelectorIsOpen} onSelect={filterHandler} />
      <BlockFilter open={blockSelectorIsOpen} onSelect={filterHandler} />
      <div className={newOrderStyles.header_bar}>
        <div className={newOrderStyles.header_bar_filter} onClick={() => setAddressSelectorIsOpen(true)}>
          {address}
        </div>
        {address !== 'Filter' && (
          <div className={newOrderStyles.header_bar_filter} onClick={() => setBlockSelectorIsOpen(true)}>
            Block: {block}
          </div>
        )}

        <input
          className={newOrderStyles.search_input}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={address !== 'Filter'}
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
