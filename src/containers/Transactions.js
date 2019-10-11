import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import NavBar from '../components/Navbar';
import '../scss/Transactions.scss';

function Transactions(props) {

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'transactions-root';
    console.log(props.user)
  }, [props.user]);

  const transactionList = () => {
    if (props.user) {
      return props.user.transactions.map(transaction => {
        return (
          <ListGroupItem key={transaction.created_at}>
            {'BUY'} <span className='bold-ticker'>({transaction.ticker})</span> - {transaction.quantity} {transaction.quantity > 1 ? 'shares' : 'share'} @ {Number(transaction.price).toFixed(2)}
          </ListGroupItem>
          )
      })
    }
  }

  return(
    <>
      <NavBar />
      <Container fluid className='transactions-page-container text-center'>
        <h2 className='transactions-header'><span>Transaction History</span></h2>
        <ListGroup flush className='text-center'>
          {transactionList()}
        </ListGroup>
      </Container>
    </>
    )
}

export default Transactions;
