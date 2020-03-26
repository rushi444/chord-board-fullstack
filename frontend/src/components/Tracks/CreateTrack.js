import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';
import axios from 'axios';

import { GET_TRACKS_QUERY } from '../Pages/Dashboard';

export const CreateTrack = () => {
  const [newSong, setNewSong] = useState({
    title: '',
    description: '',
  });

  const [file, setFile] = useState('');
  const [expand, setExpand] = useState(false);

  const [createTrack] = useMutation(CREATE_TRACK_MUTATION, {
    update(cache, { data: { createTrack } }) {
      const { tracks } = cache.readQuery({ query: GET_TRACKS_QUERY });
      cache.writeQuery({
        query: GET_TRACKS_QUERY,
        data: { tracks: [...tracks, createTrack.track] },
      });
    },
  });

  const handleAudioChange = e => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 10000000;
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      console.error(`${selectedFile.name}: File Size Exceeded Limit`);
    } else {
      setFile(selectedFile);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleAudioUpload = async () => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('resource_type', 'raw');
      data.append('upload_preset', 'music-cloud');
      data.append('cloud_name', 'rushi44');
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/rushi44/raw/upload',
        data,
      );
      return res.data.url;
    } catch (err) {
      console.error('Error Uploading File', err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const uploadedUrl = await handleAudioUpload();
    createTrack({
      variables: {
        title: newSong.title,
        description: newSong.description,
        url: uploadedUrl,
      },
    });
    setNewSong({ title: '', description: '' });
    setFile('');
    setExpand(false);
  };

  return !expand ? (
    <SwitchButton onClick={() => setExpand(true)}>Add a Song</SwitchButton>
  ) : (
    <div>
      <SwitchButton onClick={() => setExpand(false)}>Cancel</SwitchButton>
      <AddSongForm onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          name='title'
          placeholder='Add Title'
          autoComplete='off'
          value={newSong.title}
          onChange={e => handleChange(e)}
        />
        <textarea
          type='text'
          name='description'
          rows='3'
          placeholder='Add Description'
          autoComplete='off'
          value={newSong.description}
          onChange={e => handleChange(e)}
        />
        <div>
          <input
            id='audio'
            required
            type='file'
            accept='audio/*'
            onChange={handleAudioChange}
          />
        </div>
        <SwitchButton
          disabled={
            !newSong.title.trim() || !newSong.description.trim() || !file
          }>
          Submit
        </SwitchButton>
      </AddSongForm>
    </div>
  );
};

const CREATE_TRACK_MUTATION = gql`
  mutation($title: String!, $description: String!, $url: String!) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
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
  }
`;

const SwitchButton = styled.button`
  cursor: pointer;
  margin: auto;
  background-color: #45a29e;
  border: 2px solid #45a29e;
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 80%;
  :disabled {
    background-color: gray;
    border-color: gray;
  }
`;

const AddSongForm = styled.form`
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
  input,
  textarea {
    border: none;
    border-bottom: 1px solid lightgray;
    border-radius: 4px;
    display: block;
    width: 80%;
    margin: auto;
    margin-top: 1%;
    padding: 10px;
    font-size: 14px;
  }
  input,
  textarea:focus {
    outline: 0;
  }
  #audio {
    border: none;
  }
`;
