import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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

  const selectItemHandler = (item) => {
    if (recentItemList.length === 0) {
      setRecentItemList([{ ...selectedItem, ...item }]);
    } else {
      let checkList = recentItemList.filter((el) => el._id === item._id);
      if (checkList.length === 0) {
        setRecentItemList([...recentItemList, { ...selectedItem, ...item }]);
        localStorage.setItem('recentItems', JSON.stringify({ recentItems: [...recentItemList, { ...selectedItem, ...item }] }));
      }
    }
    setSelectedItem(item);
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
