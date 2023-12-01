import Axios from 'axios';

const apiRequest = (payload) => {
  let config = {
    method: payload.method,
    url: `/api/${payload.url}`,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${payload.token}`,
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
