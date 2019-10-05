import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../components/Navbar';
import BuyForm from '../components/BuyForm';
import bank from '../assets/bank-building.svg';
import '../scss/Portfolio.scss';

function Portfolio() {

  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formText, setFormText] = useState('');

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'portfolio-root';
  }, []);

  const handleTickerChange = e => {
    setFormText('');
    setTicker(e.target.value);
  };

  const handleQuantityChange = e => {
    setFormText('');
    e.target.value < 1 ? setQuantity(1) : setQuantity(e.target.value)
  };

  const handleSubmission = async e => {
    e.preventDefault();
    setFormText('');
    const tickerVal = ticker;
    const quantityVal = quantity;
    const formText = document.querySelector('.buy-row .form-text');
    formText.classList.remove('text-muted')
    formText.classList.remove('error-form-text');
    formText.classList.remove('success-form-text');
    const result = await fetchPrice(tickerVal);
    if (result !== 'failed') {
      if ((quantityVal * result) <= 5000.00) {
        console.log('you got the money');
        formText.classList.add('success-form-text');
        setFormText('Transaction succesful')
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
      return parseFloat(json['Global Quote']['05. price']);
    })
  }

  return(
    <>
      <NavBar />
      <Container className='portfolio-page-container text-center'>
        <Row>
          <Col xs='7' className='portfolio-section'>
            <h2 className='portfolio-header'><span>Portfolio</span> ($5000.00)</h2>
          </Col>
          <Col xs='5' className='buy-form-section'>
            <img src={bank} className='bank' alt='' />
            <h2 className='cash-balance'><span>Cash - </span>$4000.00</h2>
            <BuyForm
              ticker={ticker}
              quantity={quantity}
              handleTickerChange={handleTickerChange}
              handleQuantityChange={handleQuantityChange}
              handleSubmission={handleSubmission}
              formText={formText}
              />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default Portfolio;
