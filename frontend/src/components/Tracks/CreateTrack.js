import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';

export const CreateTrack = () => {
  const [newSong, setNewSong] = useState({
    title: '',
    description: '',
  });

  const [file, setFile] = useState('');

  const [createTrack, { error }] = useMutation(CREATE_TRACK_MUTATION, {onCompleted: data => console.log(data)});

  const handleAudioChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = e => {
    e.preventDefault();
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleAudioUpload = async () => {
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
  };

  return (
    <div>
      <button>Add a Song</button>
      <form onSubmit={e => handleSubmit(e)} style={{ display: 'flex' }}>
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
          rows='5'
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
        <button
          disabled={
            !newSong.title.trim() || !newSong.description.trim() || !file
          }>
          Submit
        </button>
      </form>
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
      }
    }
  }
`;
