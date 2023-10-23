import React from 'react';
import { useQuery } from '@tanstack/react-query';

import MenuList from './menu-list';
import MenuIconbar from './menu-icon-bar';
import apiRequest from '@/lib/axios';

const MenuPage = () => {
  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
  });

  return (
    <>
      <MenuList menuQuery={menuQuery} />
      <MenuIconbar />
    </>
  );
};

export default MenuPage;
