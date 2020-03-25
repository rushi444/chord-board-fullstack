import React, { useState } from 'react';
import styled from '@emotion/styled';

export const SearchTrack = () => {
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value);
  };
  return (
    <SearchForm>
      <input
        type='text'
        name='searchText'
        placeholder='Search for music here...'
        value={searchText}
        onChange={handleChange}
      />
    </SearchForm>
  );
};

const SearchForm = styled.form`
  margin-top: 1%;
  input {
    color: white;
    border: none;
    border-bottom: 1px solid #45a29e;
    width: 80%;
    font-size: 20px;
    background-color: #1f2833;
    ::placeholder {
      color: white;
    }
    :focus {
      outline: 0;
    }
  }
`;
