import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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
            <form onSubmit={e => handleSubmit(e, createUser)}>
              <label>Email</label>
              <input
                type='text'
                name='email'
                placeholder='john@musiccloud.com'
                value={user.email}
                onChange={e => handleChange(e)}
              />
              <label>Username</label>
              <input
                type='text'
                name='username'
                placeholder='john44'
                value={user.username}
                onChange={e => handleChange(e)}
              />
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={user.password}
                onChange={e => handleChange(e)}
              />
              <button type='submit'>Register</button>
            </form>
            <button>Have an account? Log in here</button>
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
