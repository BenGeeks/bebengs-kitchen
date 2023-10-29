import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import assetStyles from '@/styles/assets.module.css';

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
            <div key={index} className={assetStyles.input_container}>
              <label htmlFor={input.name} className={assetStyles.input_label}>
                {input.label}:
              </label>
              {errors[input.name] && <div className={assetStyles.error_message}>{errors[input.name]?.message}</div>}

              {input.type === 'textarea' ? (
                <textarea {...register(input.name)} className={assetStyles.textarea} rows={5} />
              ) : (
                <>
                  <input
                    type={input.type}
                    placeholder={input.label}
                    className={assetStyles.input}
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
            </div>
          );
        })}
        <div className={assetStyles.button_container}>
          <button type="reset" className={assetStyles.button_cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={assetStyles.button_save} type="submit">
            {action === 'Add' ? 'Save' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactForm;
