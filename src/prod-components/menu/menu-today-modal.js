import { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiSkipBackLine, RiCheckboxCircleLine } from 'react-icons/ri';

import Card from '@/assets/card';
import { DATA } from './resources';
import styles from './menu.module.css';

const MenuTodayModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [variation, setVariation] = useState([]);

  const onSelectItem = (data) => {
    let tempData = [];
    data.variation.forEach((variation) => {
      tempData.push({ ...variation, item_name: data.item_name, selected: false });
    });
    setVariation([...tempData]);
    setStep(2);
  };

  const onSelectPrice = (data) => {
    let tempData = variation;
    tempData[tempData.findIndex((el) => el.id === data.id)] = { ...data, selected: !data.selected };
    setVariation([...tempData]);
  };

  const onBackStep = () => {
    setVariation();
    setStep(1);
  };

  const onSaveHandler = () => {
    let selectedData = [];
    let tempData = variation.filter((el) => el.selected);
    tempData.forEach((el) => {
      selectedData.push({
        id: el.id,
        item_name: el.item_name,
        qty: el.qty,
        size: el.size,
        price: el.price,
        date: moment().format(),
      });
    });
    onSave(selectedData);
  };

  return (
    <div>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>{step === 1 ? 'Add item to daily menu:' : 'Select available variations:'}</h2>
        <div className={styles.modal_header_icon_container}>
          {step === 2 && (
            <>
              <div className={styles.modal_header_icon} onClick={onBackStep}>
                <RiSkipBackLine />
              </div>
              <div className={styles.modal_header_icon} onClick={onSaveHandler}>
                <RiCheckboxCircleLine />
              </div>
            </>
          )}
          <div className={styles.modal_header_icon} onClick={onClose}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={styles.modal_body}>
        {step === 1 && <Card data={DATA} size="small" onSelect={onSelectItem} />}
        {step === 2 && <Card data={variation} isPrice={true} onSelect={onSelectPrice} />}
      </div>
    </div>
  );
};

export default MenuTodayModal;
