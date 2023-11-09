'use client';
import moment from 'moment';

import CustomersList from '@/prod-components/customer/customer-list';
import NewOrderSelectItem from './new-order-components/select-item';
import ReactForm from '@/assets/react-form';

import { ORDER_DETAILS_INPUT, ORDER_DETAILS_SCHEMA } from '@/resources/orders';
import styles from './new-order.module.css';

const NewOrderMainPage = ({
  setSelectedCustomer,
  setOrderDetails,
  orderDetails,
  setEdit,
  edit,
  setStep,
  onAddItem,
  isOrderEdit,
  onCancel,
  items,
}) => {
  const updateDetailsHandler = (data) => {
    let tempData = {
      ...data,
      deliveryDate: data?.deliveryDate ? data.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: data?.deliveryTime ? data.deliveryTime : null,
      paymentDate: data?.paymentDate ? data.paymentDate : null,
    };
    setOrderDetails(tempData);
    setStep(3);
    isOrderEdit ? setEdit(null) : setEdit(3);
  };

  const cancelHandler = () => {
    !isOrderEdit && setStep(1);
    isOrderEdit && setEdit(null);
  };

  const selectCustomerHandler = (data) => {
    setSelectedCustomer(data);
    setStep(2);
    isOrderEdit ? setEdit(null) : setEdit(2);
  };

  return (
    <div className={edit ? styles.page_container : styles.page_container_hide}>
      {edit === 1 && <CustomersList onSelectCustomer={selectCustomerHandler} isEdit={isOrderEdit} onCancel={onCancel} />}
      {edit === 2 && orderDetails && (
        <div className={styles.main_page}>
          <div className={styles.header_bar}>
            <h3 className={styles.header_bar_title}>Order Details:</h3>
          </div>
          <ReactForm
            layout={ORDER_DETAILS_INPUT}
            schema={ORDER_DETAILS_SCHEMA}
            action={'Add'}
            defaultValues={{
              ...orderDetails,
              deliveryDate: moment(orderDetails.deliveryDate).format('yyyy-MM-DD'),
              paymentDate: moment(orderDetails.paymentDate).format('yyyy-MM-DD'),
            }}
            onSubmit={updateDetailsHandler}
            onCancel={cancelHandler}
          />
        </div>
      )}
      {edit === 3 && (
        <NewOrderSelectItem
          onAddItem={onAddItem}
          edit={edit}
          setEdit={setEdit}
          onCancel={onCancel}
          isOrderEdit={isOrderEdit}
          items={items}
        />
      )}
    </div>
  );
};

export default NewOrderMainPage;
