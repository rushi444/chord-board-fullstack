import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Navbar = ({ currentUser, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    currentUser && setIsLoggedIn(true);
  }, []);

  return (
    <>
      <NavBar>
        <FlexContainer>
          <h1>Music Cloud</h1>
          {currentUser ? (
            <NavLinks>
              <Link to={`/user/${currentUser.id}`}>
                Hi {currentUser.username}
              </Link>
            </NavLinks>
          ) : (
            <NavLinks>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </NavLinks>
          )}
          <LogoutButton onClick={logout}>Logout</LogoutButton>
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
  background: #2d3436;
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

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  margin: auto 0;
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
`;
