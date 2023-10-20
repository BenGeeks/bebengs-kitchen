import React from 'react';

import Table from '@/assets/table';
import { SALES_HEADER, COUNT_HEADER } from '@/resources/side-bar';
import sideStyles from '@/styles/side-bar.module.css';

const SideBar = ({ salesCount, collectibleData, collectibleCount, salesData, viewReport }) => {
  return (
    <div className={`${sideStyles.container} ${viewReport && sideStyles.show}`}>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Today's Sales</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={SALES_HEADER} data={salesData} />
        </div>
      </div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Sales Count Summary</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={COUNT_HEADER} data={salesCount} />
        </div>
      </div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Today's Collectible</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={SALES_HEADER} data={collectibleData} />
        </div>
      </div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Collectible Count Summary</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={COUNT_HEADER} data={collectibleCount} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
