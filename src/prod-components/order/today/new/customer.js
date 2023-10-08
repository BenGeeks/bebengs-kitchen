'use client';
import React, { useEffect, useState } from 'react';
import { RiAddCircleLine, RiSearchLine } from 'react-icons/ri';
import { BsPersonFillGear } from 'react-icons/bs';

import CustomerNew from '@/prod-components/customer/customer-new';
import { DATA } from '@/prod-components/customer/resources';
import { CUSTOMER_COLUMNS } from './resources';

import styles from './order-new.module.css';
import styles2 from '@/assets/react-table.module.css';

const Customer = ({ selectedCustomer, setSelectedCustomer }) => {
  const [addCustomer, setAddCustomer] = useState(false);
  const [changeCustomer, setChangeCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(DATA);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let tempData = DATA.filter((customer) => {
      return customer.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    searchValue.length === 0 ? setCustomerData(DATA) : setCustomerData([...tempData]);
  }, [searchValue]);

  const selectCustomerHandler = (data) => {
    setSelectedCustomer(data);
    setChangeCustomer(false);
  };

  const addNewCustomerHandler = (data) => {
    console.log('Add new Customer has been triggered: ', data);
    setSelectedCustomer(data);
    setAddCustomer(false);
    setChangeCustomer(false);
  };

  return (
    <div className={styles.sub_container}>
      {selectedCustomer === null || changeCustomer ? (
        <div className={styles.sub_body}>
          {addCustomer ? (
            <>
              <CustomerNew onClose={() => setAddCustomer(false)} action="Add" onAdd={addNewCustomerHandler} />
            </>
          ) : (
            <>
              <div className={styles.sub_header_bar}>
                <h2>Select Customer:</h2>
                <div className={styles.sub_header_icon_container}>
                  {addCustomer ? (
                    <div className={styles.sub_header_icon} onClick={() => setAddCustomer(false)}>
                      <RiSearchLine />
                    </div>
                  ) : (
                    <div className={styles.sub_header_icon} onClick={() => setAddCustomer(true)}>
                      <RiAddCircleLine />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.search_container}>
                <input
                  className={styles.search_input}
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <table className={styles2.table}>
                  <thead>
                    <tr className={styles2.table_head_row}>
                      {CUSTOMER_COLUMNS.map((head) => {
                        return (
                          <th className={styles2.table_head} key={head}>
                            <div className={styles2.table_head_text}>{head}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {customerData.map((customer) => {
                      return (
                        <tr key={customer.id} className={styles.table_row} onClick={() => selectCustomerHandler(customer)}>
                          <td className={styles2.cell}>{customer.name}</td>
                          <td className={styles2.cell}>{customer.address}</td>
                          <td className={styles2.cell}>{customer.block}</td>
                          <td className={styles2.cell}>{customer.lot}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.selected_data}>
          <h2>
            {selectedCustomer.name} - {selectedCustomer.address} {selectedCustomer.block} {selectedCustomer.lot}
          </h2>
          <div className={styles.sub_header_icon_container}>
            <div className={styles.sub_header_icon} onClick={() => setChangeCustomer(true)}>
              <BsPersonFillGear />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
