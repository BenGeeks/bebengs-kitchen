import Axios from 'axios';

const apiRequest = (payload) => {
  console.log(payload);
  let config = {
    method: payload.method,
    url: `/api/v1/${payload.url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
    data: payload.data,
  };

  return Axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export default apiRequest;
