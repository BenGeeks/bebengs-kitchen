'use client';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styles from './customers.module.css';

import ReactTable from '@/assets/react-table';

const CustomersListPage = () => {
  let COLUMNS = [
    { Header: 'id', accessor: 'id' },
    { Header: 'name', accessor: 'name' },
    { Header: 'address', accessor: 'address' },
    { Header: 'block', accessor: 'block' },
    { Header: 'lot', accessor: 'lot' },
  ];
  let DATA = [
    { id: 1, name: 'Bebeng', address: 'sta rosa hills', block: '19', lot: '23' },
    { id: 2, name: 'Susan', address: 'sta rosa hills', block: '19', lot: '24' },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div>
      <h1>Customers list goes here</h1>

      <ReactTable COLUMNS={columns} DATA={data} />
    </div>
  );
};

export default CustomersListPage;
