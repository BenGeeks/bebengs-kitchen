import React from 'react';
import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';

import assetStyles from '@/styles/assets.module.css';

const Table = ({ headers, data, enableDelete, enableEdit, onDelete, onEdit, enableRowClick, onRowClick, isLoading, isError }) => {
  if (isError) {
    return (
      <div className={assetStyles.table_loader}>
        <h2>An error occurred while fetching.</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={assetStyles.table_loader}>
        <img src="/images/spinner.gif" alt="loader gif" />
      </div>
    );
  }

  return (
    <table className={assetStyles.table}>
      <thead>
        <tr className={assetStyles.table_head_row}>
          {headers.map((header) => {
            return (
              <th className={assetStyles.table_head} key={header.name}>
                <div className={assetStyles.table_head_text}>{header.display}</div>
              </th>
            );
          })}
          {(enableDelete || enableEdit) && (
            <th className={assetStyles.table_head}>
              <div className={assetStyles.table_head_text}>Actions</div>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => {
            return (
              <tr
                key={index}
                className={enableRowClick ? assetStyles.table_row_clickable : assetStyles.table_row}
                onClick={enableRowClick ? () => onRowClick(row) : null}
              >
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={assetStyles.cell}>
                      {typeof row[header.name] === 'boolean' ? (row[header.name] ? '🟢' : '🔴') : row[header.name]}
                    </td>
                  );
                })}
                {(enableDelete || enableEdit) && (
                  <td className={assetStyles.cell}>
                    <div className={assetStyles.icons_container}>
                      {enableDelete && (
                        <div className={assetStyles.delete_icon_holder} onClick={() => onDelete(row._id)}>
                          <RiDeleteBin4Line />
                        </div>
                      )}
                      {enableEdit && (
                        <div className={assetStyles.edit_icon_holder} onClick={() => onEdit(row)}>
                          <RiEditLine />
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
