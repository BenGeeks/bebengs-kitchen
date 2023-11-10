'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ActionModal from '@/assets/action-modal';
import MenuIconbar from './menu-icon-bar';
import MenuSideBar from './menu-side-bar';
import apiRequest from '@/lib/axios';
import MenuList from './menu-list';
import NewMenu from './menu-new';
import EditMenu from './menu-edit';

const MenuPage = () => {
  const queryClient = useQueryClient();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openAction, setOpenAction] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [editMenu, setEditMenu] = useState(false);

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

  const deleteMenuMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `menu/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Menu deleted successfully.');
      setSelectedMenu(null);
      queryClient.invalidateQueries({ queryKey: 'menu' });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const selectMenuHandler = (menu) => {
    setSelectedMenu(null);
    setTimeout(() => setSelectedMenu(menu), 5);
  };

  const cancelHandler = () => {
    setOpenAction(false);
    setAddNew(false);
    setEditMenu(false);
  };

  const editHandler = () => {
    setOpenAction(false);
    setAddNew(false);
    setEditMenu(true);
  };

  const deleteHandler = () => {
    if (confirm('Are you sure you want to delete this Item?') == true) {
      setOpenAction(false);
      deleteMenuMutation.mutate(selectedMenu._id);
    }
  };

  return (
    <>
      {openAction && (
        <ActionModal
          name={selectedMenu?.itemName}
          open={openAction}
          close={() => setOpenAction(false)}
          onCancel={cancelHandler}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      )}
      {addNew && <NewMenu open={addNew} onCancel={cancelHandler} />}
      {editMenu && <EditMenu open={editMenu} onCancel={cancelHandler} menu={selectedMenu} />}
      <MenuSideBar
        variationQuery={variationQuery}
        width={selectedMenu ? '100%' : '0px'}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        actionModal={() => setOpenAction(true)}
      />
      <MenuList menuQuery={menuQuery} selectMenuHandler={selectMenuHandler} width={selectedMenu ? '0px' : '100%'} />
      <MenuIconbar addNewMenu={() => setAddNew(true)} />
    </>
  );
};

export default MenuPage;
