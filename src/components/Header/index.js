import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Container,
  Content,
  NavbarContainer,
  HamburguerMenu,
  MobileNavContainer,
} from './styles';
import ProfileContainer from './ProfileContainer';
import Navbar from './Navbar';
import logo from '~/assets/images/logo.png';

export default function Header() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggleNavbarVisible() {
    setNavbarVisible(!navbarVisible);
  }

  const user = useSelector(state => state.auth.user);

  const onMobileSize = useMemo(() => {
    if (windowWidth <= 996) {
      return true;
    }
    return false;
  }, [windowWidth]);

  return (
    <>
      <Container>
        <Content>
          <NavbarContainer>
            <Link to="/">
              <img src={logo} alt="FastFeet" />
            </Link>

            {!onMobileSize && <Navbar />}
          </NavbarContainer>

          {onMobileSize && (
            <HamburguerMenu
              onClick={toggleNavbarVisible}
              animate={navbarVisible}
            >
              <div />
              <div />
              <div />
            </HamburguerMenu>
          )}
          {!onMobileSize && <ProfileContainer username={user.name} />}
        </Content>
      </Container>
      {onMobileSize && (
        <MobileNavContainer visible={navbarVisible}>
          <Navbar />
          <ProfileContainer username={user.name} />
        </MobileNavContainer>
      )}
    </>
  );
}
