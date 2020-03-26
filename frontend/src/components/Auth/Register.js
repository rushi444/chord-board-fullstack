import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

import { Error } from '../Shared/Error';

export const Register = props => {
  localStorage.getItem('token') && props.history.push('/');

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [createUser, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onError: () => null,
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createUser({ variables: { ...user } });
    await props.history.push('/login');
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{ padding: '30px 40px', width: '500px' }}
        onSubmit={e => handleSubmit(e)}>
        <h1>Register</h1>
        <FormControl>
          <input
            type='text'
            name='email'
            placeholder='email*'
            autoComplete='off'
            value={user.email}
            onChange={e => handleChange(e)}
          />
        </FormControl>
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
          disabled={
            loading ||
            !user.username.trim() ||
            !user.email.trim() ||
            !user.password.trim()
          }>
          {loading ? 'Registering...' : 'Register'}
        </FormButton>
        <LoginButton>Have an account? Click here</LoginButton>
        {error && <Error error={error} />}
      </form>
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
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
  background-color: #45a29e;
  border: 2px solid #45a29e;
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

const LoginButton = styled.button`
  cursor: pointer;
  background-color: white;
  border: 2px solid #45a29e;
  border-radius: 4px;
  color: #45a29e;
  font-weight: bold;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
`;
