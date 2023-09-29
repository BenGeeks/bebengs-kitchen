import React from 'react';

import SalesTable from '@/assets/sales-table';

import styles from '@/styles/prod.module.css';
import { COLUMNS, SAMPLE_DATA } from './Resource';

const CollectiblesPage = () => {
  return (
    <div className={styles.main_page}>
      <h2 className={styles.header_text}>Collectibles</h2>
      <SalesTable COLUMNS={COLUMNS} DATA={SAMPLE_DATA} />
    </div>
  );
};

export default CollectiblesPage;
