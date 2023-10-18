import React from 'react';

import Table from '@/assets/table';
import { SALES_HEADER, COUNT_HEADER } from '@/resources/side-bar';
import sideStyles from '@/styles/side-bar.module.css';
const SideBar = ({ salesCount, salesData }) => {
  return (
    <div className={sideStyles.container}>
      <div className={sideStyles.box}>
        <div className={sideStyles.header_box}>
          <h2>Sales Summary</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={SALES_HEADER} data={salesData} />
        </div>
        <div className={sideStyles.header_box}>
          <h2>Sales Count Summary</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={COUNT_HEADER} data={salesCount} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
