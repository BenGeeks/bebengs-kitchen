'use client';

import styles from '@/styles/prod.module.css';

import ReactTable from '@/assets/react-table';

const CustomersListPage = () => {
  let COLUMNS = [
    { Header: 'name', accessor: 'name' },
    { Header: 'address', accessor: 'address' },
    { Header: 'block', accessor: 'block' },
    { Header: 'lot', accessor: 'lot' },
  ];
  let DATA = [
    { id: 1, name: 'Bebeng', address: 'sta rosa hills', block: '19', lot: '23' },
    { id: 2, name: 'Susan', address: 'sta rosa hills', block: '19', lot: '24' },
    { id: 3, name: 'Vivian', address: 'sta rosa hills', block: '3', lot: '14' },
    { id: 4, name: 'Chona', address: 'sta rosa hills', block: '25', lot: '15' },
  ];

  return (
    <div className={styles.main_page}>
      <h2 className={styles.header_text}>Customers</h2>

      <ReactTable COLUMNS={COLUMNS} DATA={DATA} />
    </div>
  );
};

export default CustomersListPage;
