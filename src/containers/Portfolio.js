import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../components/Navbar';
import BuyForm from '../components/BuyForm';
import '../scss/Portfolio.scss';

function Portfolio() {

  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'portfolio-root';
  }, []);

  const handleTickerChange = e => setTicker(e.target.value);
  const handleQuantityChange = e => e.target.value < 1 ? setQuantity(1) : setQuantity(e.target.value);

  const handleSubmission = async e => {
    e.preventDefault();
    setError('');
    const ticker = e.target[0].value;
    const quantity = e.target[1].value;
    const result = await fetchPrice(ticker);
    if (result !== 'failed') {
      if ((quantity * result) <= 5000.00) {
        console.log('you got the money');
      } else {
        setError('You do not have enough in your balance to cover this transaction')
      }
    } else {
      setError('That ticker symbol does not exist, please choose another')
    }
  }

  const fetchPrice = async ticker => {
    const buyBtn = document.querySelector('.buy-btn');
    const buySpinner = document.querySelector('.buy-spinner');
    buyBtn.style.display = 'none'
    buySpinner.style.display = 'flex';
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
            <h2 className='portfolio-header'>Portfolio ($5000.00)</h2>
          </Col>
          <Col xs='5' className='buy-form-section'>
            <h2 className='cash-balance'>Cash - $4000.00</h2>
            <BuyForm
              ticker={ticker}
              quantity={quantity}
              handleTickerChange={handleTickerChange}
              handleQuantityChange={handleQuantityChange}
              handleSubmission={handleSubmission}
              formText={error}
              />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default Portfolio;
