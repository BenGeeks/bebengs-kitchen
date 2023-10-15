import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Table from '@/assets/table';
import ReactForm from '@/assets/react-form';
import apiRequest from '@/lib/axios';
import { VARIATION_INPUT, VARIATION_SCHEMA, VARIATION_HEADERS } from '@/resources/menu';
import modalStyles from '@/styles/modal.module.css';

const ViewVariationList = ({ menu_id }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const queryClient = useQueryClient();

  const variationQuery = useQuery({
    queryKey: ['variation'],
    queryFn: () => apiRequest({ url: `variations/${menu_id}`, method: 'GET' }).then((res) => res.data),
  });

  const deleteVariationMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `variations/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Successfully delete a variation.');
      queryClient.invalidateQueries({ queryKey: ['variation'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const updateVariationMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `variations/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Successfully updated.');
      queryClient.invalidateQueries({ queryKey: ['variation'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteVariationHandler = (id) => {
    if (confirm('Are you sure you want to delete this variation?') == true) {
      deleteVariationMutation.mutate(id);
    }
  };

  const saveVariationHandler = (data) => {
    updateVariationMutation.mutate({ id: editData._id, data: data });
    setOnEdit(false);
  };

  const onEditVariation = (data) => {
    setEditData(data);
    setOnEdit(true);
  };

  if (variationQuery.isLoading) return <h1>Loading...</h1>;
  if (variationQuery.isError) return <pre> {JSON.stringify(variationQuery.error)}</pre>;
  return (
    <div className={modalStyles.modal_body}>
      {onEdit ? (
        <ReactForm
          layout={VARIATION_INPUT}
          schema={VARIATION_SCHEMA}
          defaultValues={editData}
          onSubmit={saveVariationHandler}
          onCancel={() => setOnEdit(false)}
          action={'Update'}
        />
      ) : (
        <Table
          headers={VARIATION_HEADERS}
          data={variationQuery.data}
          onDelete={deleteVariationHandler}
          onEdit={onEditVariation}
          enableActions={true}
        />
      )}
    </div>
  );
};

export default ViewVariationList;
