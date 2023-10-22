import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TopBar from '@/page-components/top-bar';
import pageStyles from '@/page-styles/pages.module.css';

export default function Home() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const userLoginMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `/user/login`, method: 'POST', data: payload }),
    onSuccess: (response) => {
      console.log('LOGIN RESPONSE: ', response);
      toast.success('Log in successfully!');
      queryClient.setQueryData('user', response.data);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    userLoginMutation.mutate({ username, password });
  };

  return (
    <div className={pageStyles.page_body}>
      <TopBar />
      <main className={pageStyles.page_main}>
        <div className={pageStyles.login_container}>
          <form className={pageStyles.login_form} onSubmit={onSubmitHandler}>
            <div className={pageStyles.login_set}>
              <label className={pageStyles.login_label}>Username:</label>
              <input className={pageStyles.login_input} type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className={pageStyles.login_set}>
              <label className={pageStyles.login_label}>Password:</label>
              <input
                className={pageStyles.login_input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button className={pageStyles.login_btn}>Login</button>
          </form>
        </div>
      </main>
    </div>
  );
}
