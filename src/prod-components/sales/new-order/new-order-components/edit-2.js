import React, { useState } from 'react';
import moment from 'moment';

import styles from '@/assets/react-form.module.css';
import DatePicker from '@/assets/date-picker';
import NumberPad from '@/assets/number-pad';

const EditOrderDetails = ({ defaultValues, onCancel, onSubmit, action }) => {
  const [deliveryDate, setDeliveryDate] = useState(defaultValues?.deliveryDate ? defaultValues.deliveryDate : moment());
  const [deliveryTime, setDeliveryTime] = useState(defaultValues?.deliveryTime ? defaultValues.deliveryTime : '12:00');
  const [isDelivered, setIsDelivered] = useState(defaultValues?.isDelivered ? defaultValues.isDelivered : false);
  const [isGcash, setIsGcash] = useState(defaultValues?.isGcash ? defaultValues.isGcash : false);
  const [isPaid, setIsPaid] = useState(defaultValues?.isPaid ? defaultValues.isPaid : false);
  const [isDownPayment, setIsDownPayment] = useState(defaultValues?.isDownPayment ? defaultValues.isDownPayment : false);
  const [paymentDate, setPaymentDate] = useState(defaultValues?.paymentDate ? defaultValues.paymentDate : null);
  const [downPaymentDate, setDownPaymentDate] = useState(defaultValues?.downPaymentDate ? defaultValues.downPaymentDate : null);
  const [downPayment, setDownPayment] = useState(defaultValues?.downPayment ? defaultValues.downPayment : 0);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateName, setDatename] = useState('');
  const [openNumberPad, setOpenNumPad] = useState(false);

  const onDateClick = (name) => {
    setOpenDatePicker(true);
    setDatename(name);
  };

  const setCalendarDateHandler = (date) => {
    dateName === 'deliveryDate' && setDeliveryDate(moment(date));
    dateName === 'paymentDate' && setPaymentDate(moment(date));
    dateName === 'downPaymentDate' && setDownPaymentDate(moment(date));
    setOpenDatePicker(false);
  };

  const handleSubmit = () => {
    onSubmit({ deliveryDate, deliveryTime, isDelivered, isGcash, isPaid, paymentDate, isDownPayment, downPaymentDate, downPayment });
  };

  return (
    <>
      {openNumberPad && (
        <NumberPad open={openNumberPad} close={() => setOpenNumPad(false)} onSubmit={(num) => setDownPayment(num)} value={downPayment} />
      )}
      {openDatePicker && <DatePicker open={openDatePicker} close={() => setOpenDatePicker(false)} onSave={setCalendarDateHandler} />}
      <div className={styles.input_container}>
        <label className={styles.input_label}>Delivery Date:</label>
        <div type="date" className={styles.date} onClick={() => onDateClick('deliveryDate')}>
          {moment(deliveryDate).format('LL')}
        </div>
      </div>
      <div className={styles.input_container}>
        <label htmlFor="deliveryTime" className={styles.input_label}>
          Delivery Time:
        </label>
        <input
          id="deliveryTime"
          type="time"
          className={styles.input}
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="isDelivered" className={styles.input_label}>
          Delivered:
        </label>
        <label className={styles.switch}>
          <input type="checkbox" id="isDelivered" checked={isDelivered} onChange={() => setIsDelivered((prev) => !prev)} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="isGcash" className={styles.input_label}>
          G-Cash:
        </label>
        <label className={styles.switch}>
          <input type="checkbox" id="isGcash" checked={isGcash} onChange={() => setIsGcash((prev) => !prev)} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="isDownPayment" className={styles.input_label}>
          Down Payment:
        </label>
        <label className={styles.switch}>
          <input type="checkbox" id="isDownPayment" checked={isDownPayment} onChange={() => setIsDownPayment((prev) => !prev)} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
      {isDownPayment && (
        <div className={styles.input_container}>
          <label className={styles.input_label}>DP Date:</label>
          <div type="date" className={styles.date} onClick={() => onDateClick('downPaymentDate')}>
            {moment(downPaymentDate).format('LL')}
          </div>
        </div>
      )}
      {isDownPayment && (
        <div className={styles.input_container}>
          <label className={styles.input_label}>DP Amount:</label>
          <div className={styles.date} onClick={() => setOpenNumPad(true)}>
            {downPayment}
          </div>
        </div>
      )}

      <div className={styles.input_container}>
        <label htmlFor="isPaid" className={styles.input_label}>
          Paid:
        </label>
        <label className={styles.switch}>
          <input type="checkbox" id="isPaid" checked={isPaid} onChange={() => setIsPaid((prev) => !prev)} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>

      {isPaid && (
        <div className={styles.input_container}>
          <label className={styles.input_label}>Payment Date:</label>
          <div type="date" className={styles.date} onClick={() => onDateClick('paymentDate')}>
            {moment(paymentDate).format('LL')}
          </div>
        </div>
      )}

      <div className={styles.button_container}>
        <button type="reset" className={styles.button_cancel} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.button_save} type="submit" onClick={handleSubmit}>
          {action === 'Add' ? 'Save' : 'Update'}
        </button>
      </div>
    </>
  );
};

export default EditOrderDetails;
