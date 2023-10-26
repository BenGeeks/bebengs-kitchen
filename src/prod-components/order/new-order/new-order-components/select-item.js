import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import apiRequest from '@/lib/axios';

const NewOrderSelectItem = ({ onAddItem }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [sortedMenuList, setSortedMenuList] = useState([]);
  const [recentItemList, setRecentItemList] = useState([]);
  const [step, setStep] = useState(1);

  console.log('RECENT ITEMS: ', recentItemList);

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      let sortedData = data.sort((a, b) => {
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
        return 0;
      });
      setSortedMenuList(sortedData);
    },
  });

  const variationQuery = useQuery({
    queryKey: [selectedItem?._id],
    enabled: selectedItem?._id !== null,
    queryFn: () => apiRequest({ url: `variations/${selectedItem?._id}`, method: 'GET' }).then((res) => res.data),
  });

  // check local storage if list is available and not old then all list to recent items list
  // clear local storage data if list is old
  useEffect(() => {
    let recentItems = localStorage.getItem('recentItems') ? JSON.parse(localStorage.getItem('recentItems')) : null;
    if (recentItems) {
      let isToday = moment(recentItems.date).isSame(moment(), 'day');
      if (isToday) {
        setRecentItemList(recentItems.list);
      } else {
        localStorage.removeItem('recentItems');
      }
    }
  }, []);

  const selectItemHandler = (newItem) => {
    // add new item to local storage recent items list
    if (recentItemList.length === 0) {
      // if recent item does not exist then add the new file to local storage with date
      setRecentItemList(newItem);
      localStorage.setItem('recentItems', JSON.stringify({ date: moment(), list: [newItem] }));
    } else {
      // if recent item is not empty, then check if the new item is already on the list - do nothing
      let isNew = recentItemList.filter((item) => item._id === newItem._id).length === 0;
      // if item is new then add the new item to the previous list and store in local storage with date
      if (isNew) {
        setRecentItemList([...recentItemList, newItem]);
        let newLocalStorageFile = JSON.stringify({ date: moment(), list: [...recentItemList, newItem] });
        localStorage.setItem('recentItems', newLocalStorageFile);
      }
    }
    setSelectedItem(newItem);
    setStep(2);
  };

  const selectVariationHandler = (item) => {
    setSelectedVariation(item);
    setStep(3);
  };

  const selectQuantityHandler = (num) => {
    setStep(1);
    onAddItem({ ...selectedVariation, itemName: selectedItem.itemName, qty: num, subTotal: num * selectedVariation.price });
  };

  if (menuQuery.isLoading || variationQuery.isLoading) return <LoadingPage />;
  if (menuQuery.isError || variationQuery.isError) return <ErrorPage error={menuQuery.error} />;

  return (
    <>
      {step === 1 && <Step1 sortedMenuList={sortedMenuList} recentItemList={recentItemList} selectItemHandler={selectItemHandler} />}
      {step === 2 && (
        <Step2
          selectedItem={selectedItem}
          variationQuery={variationQuery.data}
          setStep={setStep}
          selectVariationHandler={selectVariationHandler}
        />
      )}
      {step === 3 && <Step3 selectedItem={selectedItem} selectQuantityHandler={selectQuantityHandler} setStep={setStep} />}
    </>
  );
};

export default NewOrderSelectItem;
