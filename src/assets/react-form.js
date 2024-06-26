import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './react-form.module.css';
import ImageUploader from './image-uploader';
import DatePicker from './date-picker';
import moment from 'moment';

const ReactForm = ({ layout, schema, defaultValues, onSubmit, onCancel, action }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateName, setDatename] = useState('');
  const [calendarDates, setCalendarDates] = useState({});
  const [urls, setUrls] = useState();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onDateClick = (name) => {
    setOpenDatePicker(true);
    setDatename(name);
  };

  const setCalendarDateHandler = (date) => {
    setCalendarDates({ ...calendarDates, [dateName]: moment(date) });
    setOpenDatePicker(false);
  };

  const onSubmitHandler = (data) => {
    urls ? onSubmit({ ...data, ...urls }) : onSubmit({ ...data, ...calendarDates });
  };

  useEffect(() => {
    layout?.forEach((item) => {
      if (item.type === 'date') setCalendarDates((prev) => ({ ...prev, [item.name]: defaultValues[[item.name]] }));
    });
  }, [layout, defaultValues]);

  return (
    <>
      {openDatePicker && (
        <DatePicker
          open={openDatePicker}
          close={() => setOpenDatePicker(false)}
          defaultDate={calendarDates[dateName]}
          onSave={setCalendarDateHandler}
        />
      )}

      {layout.map((input, index) => {
        if (input.type === 'image')
          return <ImageUploader key={index} setUrls={setUrls} item={input.name} uploading={uploading} setUploading={setUploading} />;
      })}

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {layout.map((input, index) => {
          return (
            <div key={index} className={styles.input_container}>
              {input.type !== 'image' && (
                <label htmlFor={input.name} className={styles.input_label}>
                  {input.label}:
                </label>
              )}
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
                      {input.type === 'date' ? (
                        <>
                          <div type="date" {...register(input.name)} className={styles.date} onClick={() => onDateClick(input.name)}>
                            {moment(calendarDates[input.name]).format('ll')}
                          </div>
                        </>
                      ) : (
                        <>
                          {input.type === 'select' ? (
                            <select placeholder={input.label} className={styles.input} {...register(input.name)}>
                              {input?.options?.map((option) => {
                                return (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                );
                              })}
                            </select>
                          ) : (
                            <>
                              {input.type === 'image' ? null : (
                                <>
                                  <input
                                    type={input.type}
                                    placeholder={input.label}
                                    className={styles.input}
                                    list={input.name}
                                    {...register(input.name)}
                                    autoFocus={index === 0}
                                  />
                                  {input?.list && (
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
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}

        <div className={styles.button_container}>
          {!uploading && (
            <>
              <button type="reset" className={styles.button_cancel} onClick={onCancel}>
                Cancel
              </button>
              <button className={styles.button_save} type="submit">
                {action === 'Add' ? 'Save' : 'Update'}
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ReactForm;
