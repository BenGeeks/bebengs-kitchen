import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BiReset, BiFilterAlt } from 'react-icons/bi';

import Table from '@/assets/table';
import AddressFilterSelector from './filter/address-filter';
import BlockFilterSelector from './filter/block-filter';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import apiRequest from '@/lib/axios';
import { CUSTOMER_HEADER } from '@/resources/customers';
import customerStyles from '@/styles/customer.module.css';

const CustomersList = ({ onSelectCustomer }) => {
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
  };

  if (customersQuery.isLoading) return <LoadingPage />;
  if (customersQuery.isError) return <ErrorPage error={JSON.stringify(customersQuery.error)} />;

  return (
    <div className={customerStyles.page_container}>
      <AddressFilterSelector open={addressSelectorIsOpen} onSelect={filterHandler} />
      <BlockFilterSelector open={blockSelectorIsOpen} onSelect={filterHandler} />
      <div className={customerStyles.main_page}>
        <div className={customerStyles.header_bar}>
          {address ? (
            <>
              <div className={customerStyles.header_bar_filter} onClick={resetFilter}>
                <BiReset />
              </div>
              <div className={customerStyles.header_bar_filter} onClick={() => setAddressSelectorIsOpen(true)}>
                {address}
              </div>
              <div className={customerStyles.header_bar_filter} onClick={() => setBlockSelectorIsOpen(true)}>
                Block: {block}
              </div>
            </>
          ) : (
            <div className={customerStyles.header_bar_filter} onClick={() => setAddressSelectorIsOpen(true)}>
              <BiFilterAlt />
            </div>
          )}

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
