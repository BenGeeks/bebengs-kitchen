import React from 'react';

import Table from '@/assets/table';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import collectiblesStyles from '@/styles/collectibles.module.css';
import sideStyles from '@/styles/side-bar.module.css';

const CollectibleSideBar = ({ selectedOrder }) => {
  return (
    <div className={collectiblesStyles.side_bar_container}>
      <div className={sideStyles.date}>Total Collectibles</div>
      <div className={collectiblesStyles.summary_box}>
        <div className={sideStyles.total_box}>
          <div className={sideStyles.total_item_container}>
            <div className={sideStyles.total_item_value}>{'1500'.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <div className={sideStyles.summary_box}>
          <div className={sideStyles.header_box}>
            <h2 className={sideStyles.header}>Order Details:</h2>
          </div>
          <div className={sideStyles.table_container}>
            <Table headers={ORDER_ITEMS_HEADER} data={selectedOrder?.orderDetails?.items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectibleSideBar;
