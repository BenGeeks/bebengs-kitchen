import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';

import styles from './react-form.module.css';

const ReactForm = ({ layout, schema, defaultValues, onSubmit, onCancel, action }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {layout.map((input, index) => {
          return (
            <div key={index} className={styles.input_container}>
              <label htmlFor={input.name} className={styles.input_label}>
                {input.label}:
              </label>
              {errors[input.name] && <div className={styles.error_message}>{errors[input.name]?.message}</div>}

              {input.type === 'textarea' ? (
                <textarea {...register(input.name)} className={styles.textarea} rows={5} />
              ) : (
                <>
                  {input.type === 'checkbox' ? (
                    <label className={styles.switch}>
                      <input type="checkbox" {...register(input.name)} />
                      <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                  ) : (
                    <>
                      <input
                        type={input.type}
                        placeholder={input.label}
                        className={styles.input}
                        list={input.name}
                        {...register(input.name)}
                        autoFocus={index === 0}
                      />
                      {input.list && (
                        <datalist id={input.name}>
                          {input.list.map((el) => {
                            return <option value={el.address} key={el.address} />;
                          })}
                        </datalist>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
        <div className={styles.button_container}>
          <button type="reset" className={styles.button_cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.button_save} type="submit">
            {action === 'Add' ? 'Save' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactForm;
