import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const SearchTrack = ({setSearchResults}) => {
  const client = useApolloClient();

  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await client.query({
      query: SEARCH_TRACKS_QUERY,
      variables: {
        search: searchText,
      },
    });
    setSearchResults(res.data.tracks)
    setSearchText('')
  };
  return (
    <SearchForm onSubmit={handleSubmit}>
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

const SEARCH_TRACKS_QUERY = gql`
  query($search: String) {
    tracks(search: $search) {
      id
      title
      description
      url
      likes {
        id
      }
      postedBy {
        id
        username
      }
    }
  }
`;
