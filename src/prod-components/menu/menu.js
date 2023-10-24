'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import MenuList from './menu-list';
import MenuIconbar from './menu-icon-bar';
import MenuSideBar from './menu-side-bar';
import apiRequest from '@/lib/axios';

const MenuPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  console.log('SELECTED MENU: ', selectedMenu);

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
  });

  const variationQuery = useQuery({
    queryKey: ['variation'],
    enabled: selectedMenu !== null,
    queryFn: () => apiRequest({ url: `variations/${selectedMenu._id}`, method: 'GET' }).then((res) => res.data),
  });
  console.log('VARIANT: ', variationQuery.data);

  const selectMenuHandler = (menu) => {
    setSelectedMenu(null);
    setTimeout(() => setSelectedMenu(menu), 5);
  };
  return (
    <>
      <MenuSideBar
        variationQuery={variationQuery.data}
        isHalf={selectedMenu}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <MenuList menuQuery={menuQuery} selectMenuHandler={selectMenuHandler} isHalf={selectedMenu} />
      <MenuIconbar />
    </>
  );
};

export default MenuPage;
