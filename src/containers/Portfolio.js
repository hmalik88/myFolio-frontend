import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../components/Navbar';
import BuyForm from '../components/BuyForm';
import bank from '../assets/bank-building.svg';
import '../scss/Portfolio.scss';

function Portfolio(props) {

  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formText, setFormText] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'portfolio-root';
    console.log(props.user)
    console.log('transactions before:', props.user.transactions);
    setTransactions([...props.user.transactions]);
    setBalance(Number(props.user.user.balance).toFixed(2));
  }, [props.user]);

  const handleTickerChange = e => {
    setFormText('');
    setTicker(e.target.value);
  };

  const handleQuantityChange = e => {
    setFormText('');
    e.target.value < 1 ? setQuantity(1) : setQuantity(e.target.value)
  };

  const handlePurchaseSubmission = async e => {
    e.preventDefault();
    setFormText('');
    const tickerVal = ticker;
    const quantityVal = quantity;
    const formText = document.querySelector('.buy-row .form-text');
    formText.classList.remove('text-muted')
    formText.classList.remove('error-form-text');
    formText.classList.remove('success-form-text');
    const result = await fetchPrice(tickerVal);
    if (result !== 'failed' ) {
      if (result !== 'wrong ticker' && (quantityVal * result.price) <= props.user.user.balance) {
        initiateTrade(quantityVal, result.price, result.ticker);
        formText.classList.add('success-form-text');
        setFormText('Transaction successful')
        setTicker('');
        setQuantity(1);
      } else if (result !== 'wrong ticker' ) {
        formText.classList.add('error-form-text');
        setFormText('You do not have enough in your balance to cover this transaction.')
        setTicker('');
        setQuantity(1);
      }
    } else {
      formText.classList.add('error-form-text');
      setFormText('That ticker symbol does not exist, please choose another.')
      setTicker('');
      setQuantity(1);
    }
  }

  const fetchPrice = async ticker => {
    const buyBtn = document.querySelector('.buy-btn');
    const buySpinner = document.querySelector('.buy-spinner');
    const formText = document.querySelector('.buy-row .form-text');
    buyBtn.style.display = 'none'
    buySpinner.style.display = 'flex';
    if (ticker === '') {
      setTimeout(() => {
        buyBtn.style.display = 'flex'
        buySpinner.style.display = 'none';
        formText.classList.add('error-form-text');
        setFormText('Please choose a ticker.');
      }, 200);
      return 'wrong ticker';
    }
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=OQ8H5CP43TDBOU3U`)
    .then(res => res.json())
    .then(json => {
      buyBtn.style.display = 'flex';
      buySpinner.style.display='none';
      if (json['Error Message']) return 'failed';
      return {price: parseFloat(parseFloat(json['Global Quote']['05. price']).toFixed(2)), ticker: json['Global Quote']['01. symbol']};
    })
  }

  const initiateTrade = (shareQuantity, sharePrice, ticker) => {
    const trade = {
      transaction: {
        user_id: props.user.user.id,
        ticker: ticker,
        quantity: shareQuantity,
        price: sharePrice
      }
    }
    const token = localStorage.getItem("token");
    fetch('http://localhost:3000/api/v1/transactions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(trade)
    })
    .then(res => res.json())
    .then(json => {
      setBalance(Number(json.balance).toFixed(2))
      setTransactions([...transactions, json.transaction])
    })
  }

  const cashBalance = '$' + balance;
  const portfolioBalance = '$' + transactions.length;



  return(
    <>
      <NavBar />
      <Container className='portfolio-page-container text-center'>
        <Row>
          <Col xs='7' className='portfolio-section'>
            <h2 className='portfolio-header'><span>Portfolio</span> ({portfolioBalance})</h2>

          </Col>
          <Col xs='5' className='buy-form-section'>
            <img src={bank} className='bank' alt='' />
            <h2 className='cash-balance'><span>Cash - </span>{cashBalance}</h2>
            <BuyForm
              ticker={ticker}
              quantity={quantity}
              handleTickerChange={handleTickerChange}
              handleQuantityChange={handleQuantityChange}
              handlePurchaseSubmission={handlePurchaseSubmission}
              formText={formText}
              />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default Portfolio;
