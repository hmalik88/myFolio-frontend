import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../components/Navbar';


function Transactions() {

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'transactions-root';
  }, []);

  return(
    <NavBar />

    )
}

export default Transactions;
