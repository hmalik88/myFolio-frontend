import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Fade } from 'reactstrap';
import logo from '../assets/myfoliologo.svg';
import '../scss/Navbar.scss';

function NavBar(props) {

  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    setTimeout(() => {
      setFade(false)
    }, 2500);
  }, [])

  const logOut = () => {
    localStorage.removeItem("token");
  }

  return(
      <Navbar color='light' className='navbar-expand-sm'>
        <NavbarBrand>
          <img src={logo} className='navbar-logo' alt='' />
        </NavbarBrand>
        {props.user ? (<Fade className='ml-auto' timeout={{enter:800, exit: 1000}} in={fade} tag='div' style={{fontWeight: 500}}><Nav>
          Welcome home,&nbsp;{props.user.user.name}!</Nav></Fade>) : (null)}
        <Nav className='ml-auto'>
          <NavItem>
            <NavLink href='/portfolio'>Portfolio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/transactions'>Transactions</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/' onClick={logOut}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
}

export default NavBar;
