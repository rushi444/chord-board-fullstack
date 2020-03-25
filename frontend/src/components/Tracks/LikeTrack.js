import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

import { FaThumbsUp } from 'react-icons/fa';
import { UserContext, ME_QUERY } from '../../App';

export const LikeTrack = ({ trackId, likeCount }) => {
  const [createLike] = useMutation(CREATE_LIKE_MUTATION, {
    variables: { trackId: trackId },
    refetchQueries: [{ query: ME_QUERY }],
  });

  const currentUser = useContext(UserContext);

  const handleDisableLikedTrack = () => {
    const userLikes = currentUser.likeSet;
    const isTrackLiked =
      userLikes.findIndex(({ track }) => track.id === trackId) > -1;
    return isTrackLiked;
  };

  return (
    <Like onClick={createLike} disabled={handleDisableLikedTrack()}>
      {likeCount} <FaThumbsUp style={{ color: '#45a29e' }} />
    </Like>
  );
};

const CREATE_LIKE_MUTATION = gql`
  mutation($trackId: Int!) {
    createLike(trackId: $trackId) {
      track {
        id
        likes {
          id
        }
      }
    }
  }
`;

const Like = styled.button`
  font-size: 1.5em;
  background-color: #c5c6c7;
  border: none;
`;
