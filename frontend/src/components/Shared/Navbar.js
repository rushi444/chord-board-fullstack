import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Navbar = ({ currentUser, setIsLoggedIn, isLoggedIn }) => {
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    currentUser && setIsLoggedIn(true);
  }, [currentUser, setIsLoggedIn]);

  return (
    <>
      <NavBar>
        <FlexContainer>
          <h1>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: 'black',
              }}>
              Music Cloud
            </Link>
          </h1>

          {currentUser ? (
            <NavLinks>
              <Link to={`/profile/${currentUser.id}`}>
                Hi {currentUser.username}
              </Link>
            </NavLinks>
          ) : (
            <NavLinks>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </NavLinks>
          )}
          {isLoggedIn && (
            <LogoutButton onClick={logout}>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                Logout
              </Link>
            </LogoutButton>
          )}
        </FlexContainer>
      </NavBar>
    </>
  );
};

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #c5c6c7;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
  h1 {
    color: white;
    margin: auto 0;
  }
`;

const NavLinks = styled.ul`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  padding-top: 1%;

  & a {
    color: #0b0c10;
    text-transform: capitalize;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #45a29e;
      border-bottom: 1px solid #45a29e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  margin: auto 0;
  cursor: pointer;
  background-color: #45a29e;
  border: 2px solid #45a29e;
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
`;
