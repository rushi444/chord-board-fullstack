import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

export const Register = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, createUser) => {
    e.preventDefault();
    const res = await createUser();
    console.log(res);
  };

  return (
    <Mutation mutation={REGISTER_MUTATION} variables={{ ...user }}>
      {createUser => {
        return (
          <>
            <form
              style={{ padding: '30px 40px', width: '500px' }}
              onSubmit={e => handleSubmit(e, createUser)}>
              <h1>Register</h1>
              <FormControl>
                <input
                  type='text'
                  name='email'
                  placeholder='email*'
                  value={user.email}
                  onChange={e => handleChange(e)}
                />
              </FormControl>
              <FormControl>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder='username*'
                  value={user.username}
                  onChange={e => handleChange(e)}
                />
              </FormControl>
              <FormControl>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  placeholder='password*'
                  value={user.password}
                  onChange={e => handleChange(e)}
                />
              </FormControl>
              <FormButton type='submit'>Register</FormButton>
              <LoginButton>Have an account? Log in here</LoginButton>
            </form>
          </>
        );
      }}
    </Mutation>
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
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
`;

const LoginButton = styled.button`
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
