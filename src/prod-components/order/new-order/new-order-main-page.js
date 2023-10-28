import moment from 'moment';

import Customer from './new-order-components/customer/customer';
import NewOrderSelectItem from './new-order-components/select-item';
import EditShoppingCart from './new-order-components/edit-cart';
import ReactForm from '@/assets/react-form';
import { ORDER_DETAILS_INPUT, ORDER_DETAILS_SCHEMA } from '@/resources/orders';
import pageStyles from '@/styles/page.module.css';
import newOrderStyles from '@/styles/new-order.module.css';

const NewOrderMainPage = ({
  setSelectedCustomer,
  setOrderDetails,
  orderDetails,
  setEdit,
  edit,
  setStep,
  onAddItem,
  items,
  setItems,
  isOrderEdit,
}) => {
  const updateDetailsHandler = (data) => {
    let tempData = {
      deliveryDate: data?.deliveryDate ? data.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: data?.deliveryTime ? data.deliveryTime : null,
      downPayment: data?.downPayment ? data.downPayment : 0,
      paymentDate: data?.paymentDate ? data.paymentDate : null,
    };
    setOrderDetails(tempData);
    setStep(3);
    setEdit(3);
  };

  const cancelHandler = () => {
    !isOrderEdit && setStep(1);
    isOrderEdit ? setEdit(3) : setEdit(1);
  };

  return (
    <div className={pageStyles.page_container}>
      {edit === 1 && <Customer setSelectedCustomer={setSelectedCustomer} setStep={setStep} setEdit={setEdit} />}
      {edit === 2 && orderDetails && (
        <div className={newOrderStyles.main_page}>
          <div className={newOrderStyles.header_bar}>
            <h3 className={newOrderStyles.header_bar_title}>Order Details:</h3>
          </div>
          <ReactForm
            layout={ORDER_DETAILS_INPUT}
            schema={ORDER_DETAILS_SCHEMA}
            action={'Add'}
            defaultValues={{
              ...orderDetails,
              deliveryDate: moment(orderDetails.deliveryDate).format('yyyy-MM-DD'),
            }}
            onSubmit={updateDetailsHandler}
            onCancel={cancelHandler}
          />
        </div>
      )}
      {edit === 3 && <NewOrderSelectItem onAddItem={onAddItem} />}
      {edit === 4 && <EditShoppingCart setEdit={setEdit} items={items} setItems={setItems} />}
    </div>
  );
};

export default NewOrderMainPage;
