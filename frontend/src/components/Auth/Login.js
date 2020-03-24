import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

import { Error } from '../Shared/Error';

export const Login = (props) => {
  const token = localStorage.getItem('token');

  token && props.history.push('/');

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [tokenAuth, { loading, error, data, called, client }] = useMutation(
    LOGIN_MUTATION,
    {
      onError: () => null,
      onCompleted: data => localStorage.setItem('token', data.tokenAuth.token),
    },
  );

  console.log(data);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, client) => {
    e.preventDefault();
    await tokenAuth({ variables: { ...user } });
    await client.writeData({ data: { isLoggedIn: true } });
    await props.setIsLoggedIn(true)
    await props.history.push('/')
  };

  return (
    <>
      <form
        style={{ padding: '30px 40px', width: '500px' }}
        onSubmit={e => handleSubmit(e, client)}>
        <h1>Login</h1>
        <FormControl>
          <input
            type='text'
            name='username'
            placeholder='username*'
            autoComplete='off'
            value={user.username}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl>
          <input
            type='password'
            name='password'
            placeholder='password*'
            autoComplete='off'
            value={user.password}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormButton
          type='submit'
          disabled={loading || !user.username.trim() || !user.password.trim()}>
          {loading ? 'Logging in...' : 'Login'}
        </FormButton>
        <RegisterButton>Don't have an account? Click here</RegisterButton>
        {error && <Error error={error} />}
      </form>
    </>
  );
};

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const FormControl = styled.div`
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
  input {
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
  input:focus {
    outline: 0;
    border-color: #777;
  }
`;

const FormButton = styled.button`
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  :disabled {
    background-color: gray;
    border-color: gray;
  }
`;

const RegisterButton = styled.button`
  cursor: pointer;
  background-color: white;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #3498db;
  font-weight: bold;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
`;
