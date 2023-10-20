import moment from 'moment';

import Customer from './new-order-components/customer';
import NewOrderSelectItem from './new-order-components/select-item';
import ReactForm from '@/assets/react-form';
import { ORDER_DETAILS_INPUT, ORDER_DETAILS_SCHEMA } from '@/resources/orders';
import pageStyles from '@/styles/page.module.css';
import newOrderStyles from '@/styles/new-order.module.css';

const NewOrderMainPage = ({ setSelectedCustomer, setOrderDetails, orderDetails, step, setStep, onAddItem }) => {
  const updateDetailsHandler = (data) => {
    let tempData = {
      deliveryDate: data && data.deliveryDate ? data.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: data && data.deliveryTime ? data.deliveryTime : null,
      downPayment: data && data.downPayment ? data.downPayment : 0,
    };
    setOrderDetails(tempData);
    setStep(3);
  };

  return (
    <>
      {step === 1 && (
        <div className={pageStyles.page_container}>
          <Customer setSelectedCustomer={setSelectedCustomer} setStep={setStep} />
        </div>
      )}
      {step === 2 && orderDetails && (
        <div className={pageStyles.page_container}>
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
              onCancel={() => setStep(1)}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={pageStyles.page_container}>
          <NewOrderSelectItem onAddItem={onAddItem} />
        </div>
      )}
    </>
  );
};

export default NewOrderMainPage;
