import { ImCancelCircle, ImCheckmark } from 'react-icons/im';
import { QTY_NUMBER } from '@/resources/orders';
import styles from '../new-order.module.css';

const Step3 = ({ selectedItem, selectQuantityHandler, setStep, isOrderEdit, onCancel, items }) => {
  const getRandomColor = () => {
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
    return color;
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select {selectedItem?.itemName} quantity:</h2>
        {isOrderEdit ? (
          <div className={styles.header_bar_filter} title="cancel" onClick={onCancel}>
            <ImCancelCircle />
          </div>
        ) : (
          <>
            {items.length > 0 && (
              <div className={styles.header_bar_filter} title="save" onClick={onCancel}>
                <ImCheckmark />
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.cards_container}>
        <div className={styles.number_card} onClick={() => setStep(2)}>
          <div className={styles.card_name}>Back to SIZE</div>
        </div>
        {QTY_NUMBER.map((num) => {
          return (
            <div
              key={num}
              className={styles.number_card}
              onClick={() => selectQuantityHandler(num)}
              style={{ backgroundColor: getRandomColor() }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
