'use client';
import React, { useState, useEffect } from 'react';

import { Loader, Error } from '@/assets/loader-error';
import { sortData, MENU_HEADER } from './resources';
import styles from './menu.module.css';
import Table from '@/assets/table';

const MenuList = ({ menuQuery, selectMenuHandler, width }) => {
  const [menuList, setMenuList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let data = menuQuery?.data ? menuQuery.data : [];
    let tempData = data.filter((menu) => menu.itemName.toLowerCase().includes(searchValue.toLowerCase()));
    searchValue.length === 0 ? setMenuList(data) : setMenuList([...tempData]);
  }, [searchValue, menuQuery]);

  if (menuQuery.isLoading)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Loader />
      </div>
    );

  if (menuQuery.isError)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Error error={menuQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container} style={{ width: width }}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Menu List:</h3>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <Table
          headers={MENU_HEADER}
          data={sortData(menuList)}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={selectMenuHandler}
        />
      </div>
    </div>
  );
};

export default MenuList;
