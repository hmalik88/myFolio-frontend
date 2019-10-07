import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../assets/myfoliologo.svg';
import '../scss/Navbar.scss';

function NavBar() {

  const logOut = () => {
    localStorage.removeItem("token");
  }


  return(
      <Navbar color='light' className='navbar-expand-sm'>
        <NavbarBrand>
          <img src={logo} className='navbar-logo' alt='' />
        </NavbarBrand>
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
