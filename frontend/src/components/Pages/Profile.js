import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';
import format from 'date-fns/format'

import { AudioPlayer } from '../Shared/AudioPlayer';

export const Profile = ({ match }) => {
  const id = match.params.id;

  const { data, loading } = useQuery(PROFILE_QUERY, {
    onCompleted: data => console.log('on', data),
    variables: { id },
  });
  console.log(data);

  if (loading) return <div>loading...</div>;
  
  return (
    <div style={{ marginTop: '100px' }}>
      <div>
        <h1>{data.user.username}</h1>
        <h4>{`Joined ${data.user.dateJoined}`}</h4>
      </div>
      <div>
        <h2>Created Tracks</h2>
        {data.user.trackSet.map(track => (
          <SongContainer key={track.id}>
            <h4>
              {track.title} - Likes: {track.likes.length}{' '}
            </h4>
            <AudioPlayer url={track.url} />
          </SongContainer>
        ))}
      </div>
      <h2>Liked Tracks</h2>
      {data.user.likeSet.map(({ track }) => (
        <SongContainer>
          <h4>
            {track.title} - Likes: {track.likes.length}
          </h4>
          <AudioPlayer url={track.url} />
        </SongContainer>
      ))}
    </div>
  );
};

const PROFILE_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          id
          title
          url
          description
          likes {
            id
          }
          postedBy {
            id
            username
          }
        }
      }
      trackSet {
        id
        title
        url
        description
        likes {
          id
        }
      }
    }
  }
`;

const SongContainer = styled.div`
  min-width: 600px;
  border: 1px solid #45a29e;
  border-radius: 5px;
  padding: 2%;
  padding-bottom: 3%;
  margin: 2%;
  h4 {
    margin-block-start: 0.3em;
    font-weight: lighter;
  }
`;
