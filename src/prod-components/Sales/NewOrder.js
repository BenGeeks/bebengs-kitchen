'use client';
import { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

import ReactTable from '@/assets/react-table';
import styles from '@/styles/prod.module.css';

const NewOrder = ({ onClose }) => {
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [fiterText, setFilterText] = useState('');
  const [itemList, setItemList] = useState([
    {
      id: 1,
      item_name: 'Banana Turon',
      size_variation: 'small (10pcs/pack)',
      price: 50,
      qty: 4,
      total: 200,
    },
  ]);
  let customers = [
    { id: 1, name: 'Bebeng', address: 'sta rosa hills', block: '19', lot: '23' },
    { id: 2, name: 'Susan', address: 'sta rosa hills', block: '19', lot: '24' },
    { id: 3, name: 'Vivian', address: 'sta rosa hills', block: '3', lot: '14' },
    { id: 4, name: 'Chona', address: 'sta rosa hills', block: '25', lot: '15' },
  ];

  let items = [
    {
      id: 1,
      image: 'https://urbanblisslife.com/wp-content/uploads/2022/06/filipino-banana-lumpia-FEATURE.jpg',
      item_name: 'Banana Turon',
      description: 'Masarap at malutong',
      size_variation: 'small (10pcs/pack)',
      price: 50,
    },
    {
      id: 1,
      image: 'https://www.lutongpinoyrecipe.com/wp-content/uploads/2020/12/lutong-pinoy-banana-turon-1200x1200.jpg',
      item_name: 'Banana Turon',
      description: 'Masarap at malutong',
      size_variation: 'big (20pcs/pack)',
      price: 100,
    },
    {
      id: 1,
      image: 'https://www.varietyinsight.com/images/honoree/Tom_Cruise.png',
      item_name: 'Banana Turon',
      description: 'Masarap at malutong',
      size_variation: '10" bilao (50pcs/pack)',
      price: 250,
    },
    {
      id: 1,
      image: 'https://urbanblisslife.com/wp-content/uploads/2022/06/filipino-banana-lumpia-FEATURE.jpg',
      item_name: 'Banana Turon',
      description: 'Masarap at malutong',
      size_variation: '12" bilao (60pcs/pack)',
      price: 300,
    },
    {
      id: 1,
      image: 'https://urbanblisslife.com/wp-content/uploads/2022/06/filipino-banana-lumpia-FEATURE.jpg ',
      item_name: 'Banana Turon',
      description: 'Masarap at malutong',
      size_variation: '14" bilao (100pcs/pack)',
      price: 500,
    },
  ];

  let ITEM_HEADER = [
    { Header: 'item', accessor: 'item_name' },
    { Header: 'size', accessor: 'size_variation' },
    { Header: 'qty', accessor: 'qty' },
    { Header: 'price', accessor: 'price' },
    { Header: 'total', accessor: 'total' },
  ];

  let MENU_HEADER = [
    { Header: 'item name', accessor: 'item_name' },
    { Header: 'size/variation', accessor: 'size_variation' },
    { Header: 'price', accessor: 'price' },
  ];

  return (
    <>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>Add New Order</h2>
        <div className={styles.header_button} onClick={onClose}>
          <RiCloseCircleLine />
        </div>
      </div>
      <div className={styles.modal_body}>
        <div className={styles.search_user_container}>
          <div className={styles.search_user_label}>Customer:</div>
          <input className={styles.search_user_input} list="customers" onChange={(e) => setSelectedCustomer(e.target.value)}></input>
          <datalist id="customers">
            {customers.map((customer) => {
              return <option value={`${customer.name} - ${customer.address} ${customer.block} ${customer.lot}`} />;
            })}
          </datalist>
        </div>
        <ReactTable COLUMNS={ITEM_HEADER} DATA={itemList} />
        <div className={styles.search_user_container}>
          <div className={styles.search_user_label}>Search:</div>
          <input className={styles.search_user_input} onChange={(e) => setFilterText(e.target.value)} />
        </div>
        <ReactTable COLUMNS={MENU_HEADER} DATA={items.filter} />
      </div>
    </>
  );
};

export default NewOrder;
