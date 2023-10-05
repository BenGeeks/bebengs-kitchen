import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import ReactTable from './react-table';
import styles from './sales-table.module.css';

const SalesTable = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  let ITEM_HEADER = [
    { Header: 'item', accessor: 'item_name' },
    { Header: 'size', accessor: 'size_variation' },
    { Header: 'qty', accessor: 'qty' },
    { Header: 'price', accessor: 'price' },
    { Header: 'total', accessor: 'total' },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className={styles.table_head_row}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.table_head}>
                <div className={styles.table_head_text}>{column.render('Header')}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={styles.table_row}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={cell.column.Header === 'Total' ? styles.cell_total : styles.cell}>
                    {cell.column.Header === 'Order Details' ? (
                      <div className={styles.cell_order_container}>
                        <div className={styles.cell_customer}>{cell.value.name}</div>
                        <ReactTable COLUMNS={ITEM_HEADER} DATA={cell.value.item} />
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalesTable;
