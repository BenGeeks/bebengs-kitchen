import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import styles from './sales-table.module.css';

const SalesTable = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

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
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={styles.table_row}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={cell.column.Header === 'Total' ? styles.cell_total : styles.cell}>
                    <>{cell.render('Cell')}</>
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
