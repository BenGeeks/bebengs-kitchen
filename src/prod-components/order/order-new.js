'use client';
import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine, RiAddCircleLine, RiSearchLine } from 'react-icons/ri';
import { DATA } from '../customer/resources';

import Modal2 from '@/assets/Modal2';
import { CUSTOMER_COLUMNS, ORDER_COLUMNS } from './resource';
import styles from './order.module.css';
import styles2 from '@/assets/react-table.module.css';

const OrderNew = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const [addCustomer, setAddCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(DATA);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [itemList, setItemList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let tempData = DATA.filter((customer) => {
      return customer.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    searchValue.length === 0 ? setCustomerData(DATA) : setCustomerData([...tempData]);
  }, [searchValue]);

  const onSelectCustomer = (data) => {
    setSelectedCustomer(data);
    setPage(2);
  };

  const onAddItemToCart = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>Create New Order</h2>
        <div className={styles.modal_header_icon_container}>
          {addCustomer ? (
            <div className={styles.modal_header_icon} onClick={() => setAddCustomer(false)}>
              <RiSearchLine />
            </div>
          ) : (
            <div className={styles.modal_header_icon} onClick={() => (page === 1 ? setAddCustomer(true) : onAddItemToCart())}>
              <RiAddCircleLine />
            </div>
          )}

          <div className={styles.modal_header_icon} onClick={onClose}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={styles.modal_body}>
        {page === 1 && (
          <>
            {addCustomer ? (
              <div>
                <h1>Add new customer goes here</h1>
              </div>
            ) : (
              <div className={styles.search_container}>
                <input
                  className={styles.search_input}
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <table className={styles2.table}>
                  <tr className={styles2.table_head_row}>
                    {CUSTOMER_COLUMNS.map((head) => {
                      return (
                        <th className={styles2.table_head} key={head}>
                          <div className={styles2.table_head_text}>{head}</div>
                        </th>
                      );
                    })}
                  </tr>
                  {customerData.map((customer) => {
                    return (
                      <tr key={customer.id} className={styles.table_row} onClick={() => onSelectCustomer(customer)}>
                        <td className={styles2.cell}>{customer.name}</td>
                        <td className={styles2.cell}>{customer.address}</td>
                        <td className={styles2.cell}>{customer.block}</td>
                        <td className={styles2.cell}>{customer.lot}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            )}
          </>
        )}
        {page === 2 && (
          <>
            <Modal2 open={modalOpen}>
              <h1>Modal 2 opens here</h1>
            </Modal2>
            <h1 className={styles.selected_customer}>
              {selectedCustomer.name} - {selectedCustomer.address} {selectedCustomer.block} {selectedCustomer.lot}
            </h1>
            <table className={styles2.table}>
              <tr className={styles2.table_head_row}>
                {ORDER_COLUMNS.map((head) => {
                  return (
                    <th className={styles2.table_head} key={head}>
                      <div className={styles2.table_head_text}>{head}</div>
                    </th>
                  );
                })}
              </tr>
              {itemList.map((item) => {
                return (
                  <tr key={customer.id} className={styles.table_row} onClick={() => onSelectCustomer(customer)}>
                    <td className={styles2.cell}>{item.item_name}</td>
                    <td className={styles2.cell}>{item.variation}</td>
                    <td className={styles2.cell}>{item.qty}</td>
                    <td className={styles2.cell}>{item.price}</td>
                    <td className={styles2.cell}>{item.sub_total}</td>
                  </tr>
                );
              })}
            </table>
          </>
        )}

        {/* <div className={styles.button_container}>
          <button type="reset" className={styles.button_cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.button_save} type="submit">
            Save
          </button>
        </div> */}
      </div>
    </>
  );
};

export default OrderNew;
