import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { QTY_NUMBER } from '@/resources/orders';
import apiRequest from '@/lib/axios';
import pageStyles from '@/styles/page.module.css';
import cardStyles from '@/styles/card.module.css';

const SelectItem = ({ step, setStep, onSubmit, onUpdate, isEdit, editData }) => {
  const [selectedItem, setSelectedItem] = useState(isEdit ? editData : null);
  const [selectedVariation, setSelectedVariation] = useState(isEdit ? editData : null);

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
  });

  const variationQuery = useQuery({
    queryKey: [selectedItem?._id],
    enabled: selectedItem?._id !== null,
    queryFn: () => apiRequest({ url: `variations/${selectedItem?._id}`, method: 'GET' }).then((res) => res.data),
  });

  const selectItemHandler = (item) => {
    setSelectedItem(item);
    setStep(2);
  };

  const selectVariationHandler = (item) => {
    setSelectedVariation(item);
    setStep(3);
  };

  const selectQuantityHandler = (num) => {
    setStep(1);
    isEdit
      ? onUpdate({ ...selectedVariation, qty: num, subTotal: num * selectedVariation.price })
      : onSubmit({ ...selectedVariation, qty: num, subTotal: num * selectedVariation.price });
  };

  if (menuQuery.isLoading) return <h1>Loading...</h1>;
  if (menuQuery.isError) return <pre> {JSON.stringify(menuQuery.error)}</pre>;
  if (variationQuery.isLoading) return <h1>Loading...</h1>;
  if (variationQuery.isError) return <pre> {JSON.stringify(variationQuery.error)}</pre>;
  return (
    <>
      {step === 1 && (
        <div className={pageStyles.page_container}>
          <div className={pageStyles.sub_header_bar}>
            <h2>Select an item</h2>
          </div>
          <div className={cardStyles.select_card_container}>
            {menuQuery.data.map((item, index) => {
              return (
                <div key={index} className={cardStyles.select_card} onClick={() => selectItemHandler(item)}>
                  <img src={item.imageUrl} className={cardStyles.select_card_image} />
                  <h3 className={cardStyles.select_card_name}>{item.itemName}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className={pageStyles.page_container}>
          <div className={pageStyles.sub_header_bar}>
            <h2>Select {selectedItem.itemName} variation</h2>
          </div>
          <div className={cardStyles.select_card_container}>
            {variationQuery.data.map((variation, index) => {
              return (
                <div key={index} className={cardStyles.select_card} onClick={() => selectVariationHandler(variation)}>
                  <h3 className={cardStyles.select_card_name}>{variation.qty} pcs</h3>
                  <div className={cardStyles.select_price_container}>
                    <h1 className={cardStyles.select_price}>₱ {variation.price}</h1>
                  </div>

                  <h3 className={cardStyles.select_card_name}>{variation.size}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={pageStyles.page_container}>
          <div className={pageStyles.sub_header_bar}>
            <h2>
              Select {selectedItem.itemName} {selectedVariation.size} quantity
            </h2>
          </div>
          <div className={cardStyles.select_card_container}>
            {QTY_NUMBER.map((num, index) => {
              return (
                <div key={index} className={cardStyles.select_card} onClick={() => selectQuantityHandler(num)}>
                  <div className={cardStyles.select_price_container}>
                    <h1 className={cardStyles.select_price}>{num}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectItem;
