import React from 'react';

import ReactTable from '@/assets/react-table';
import { RiAddCircleLine } from 'react-icons/ri';
import styles from '@/styles/prod.module.css';

const MenuPage = () => {
  let COLUMNS = [
    { Header: 'id', accessor: 'id' },
    { Header: 'image', accessor: 'image' },
    { Header: 'item name', accessor: 'item_name' },
    { Header: 'size/variation', accessor: 'size_variation' },
    { Header: 'price', accessor: 'price' },
  ];
  let DATA = [
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
  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>Menu</h2>
        <div className={styles.header_button}>
          <RiAddCircleLine />
        </div>
      </div>

      <ReactTable COLUMNS={COLUMNS} DATA={DATA} />
    </div>
  );
};

export default MenuPage;
