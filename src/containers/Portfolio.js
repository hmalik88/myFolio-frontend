import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import NavBar from '../components/Navbar';
import BuyForm from '../components/BuyForm';
import PortfolioDisplay from './PortfolioDisplay';
import bank from '../assets/bank-building.svg';
import '../scss/Portfolio.scss';

function Portfolio(props) {

  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formText, setFormText] = useState('');
  const [quantityText, setQuantityText] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'portfolio-root';
    console.log(props.user)
    setTransactions([...props.user.transactions]);
    setBalance(Number(props.user.user.balance).toFixed(2));
  }, [props.user]);

  const handleTickerChange = e => {
    setFormText('');
    setQuantityText('');
    setTicker(e.target.value);
  };

  const handleQuantityChange = e => {
    setFormText('');
    setQuantityText('');
    setQuantity(e.target.value)
  };

  const handlePurchaseSubmission = async e => {
    e.preventDefault();
    setFormText('');
    const tickerVal = ticker.toUpperCase();
    let quantityVal = quantity;
    const quantityText = document.querySelector('.buy-row .qty-txt');
    quantityText.classList.remove('text-muted');
    quantityText.classList.remove('error-form-text');
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    const splitQty = quantityVal.split('');
    for (let i = 0; i < splitQty.length; i++) {
      if (i == 0 && splitQty[i] === '0')  {
        quantityText.classList.add('error-form-text');
        return setQuantityText('Quantity should be a whole number only.');
      }
      if (!numbers.includes(splitQty[i])) {
        quantityText.classList.add('error-form-text');
        return setQuantityText('Quantity should be a numeric value only.');
      }
    }
    quantityVal = parseInt(quantityVal);
    const tickerText = document.querySelector('.buy-row .ticker-txt');
    tickerText.classList.remove('text-muted')
    tickerText.classList.remove('error-form-text');
    tickerText.classList.remove('success-form-text');
    const result = await fetchPrice(tickerVal);
    if (result !== 'failed' ) {
      if (result !== 'wrong ticker' && (quantityVal * result.price) <= props.user.user.balance) {
        initiateTrade(quantityVal, result.price, result.ticker);
        tickerText.classList.add('success-form-text');
        setFormText('Transaction successful')
        setTicker('');
        setQuantity(1);
      } else if (result !== 'wrong ticker' ) {
        tickerText.classList.add('error-form-text');
        setFormText('You do not have enough in your balance to cover this transaction.')
        setTicker('');
        setQuantity(1);
      }
    } else {
      tickerText.classList.add('error-form-text');
      setFormText('That ticker symbol does not exist, please choose another.')
      setTicker('');
      setQuantity(1);
    }
  }

  const fetchPrice = async ticker => {
    const buyBtn = document.querySelector('.buy-btn');
    const buySpinner = document.querySelector('.buy-spinner');
    const tickerText = document.querySelector('.buy-row .ticker-txt');
    buyBtn.style.display = 'none'
    buySpinner.style.display = 'flex';
    if (ticker === '') {
      setTimeout(() => {
        buyBtn.style.display = 'flex'
        buySpinner.style.display = 'none';
        tickerText.classList.add('error-form-text');
        setFormText('Please choose a ticker.');
      }, 200);
      return 'wrong ticker';
    }
    return fetch(`https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${ticker}&token=pk_e564103e97a948c3b4a1484d391db3c1`)
    .then(res => res.json())
    .then(json => {
      buyBtn.style.display = 'flex';
      buySpinner.style.display='none';
      return {price: parseFloat(parseFloat(json[ticker]['quote']['latestPrice']).toFixed(2)), ticker: ticker};
    })
    .catch(error => {
      buyBtn.style.display = 'flex';
      buySpinner.style.display='none';
      return 'failed'
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

  const generateCountUp = () => {
    if (props.user) {
      return <CountUp className={"balance-amount"} end={Number(balance)} duration={0.5} decimals={2} redraw={true} useEasing={false} />
    } else {
      return null
    }
  }

  const cashBalance = generateCountUp();
  const portfolioBalance = '$' + transactions.length;

  return(
    <>
      <NavBar />
      <Container className='portfolio-page-container text-center'>
        <Row>
          <Col xs='7' className='portfolio-section'>
            <h2 className='portfolio-header'><span>Portfolio</span> ({portfolioBalance})</h2>
            <PortfolioDisplay transactions={transactions} />
          </Col>
          <Col xs='5' className='buy-form-section'>
            <img src={bank} className='bank' alt='' />
            <h2 className='cash-balance'><span>Cash - </span>${cashBalance}</h2>
            <BuyForm
              ticker={ticker}
              quantity={quantity}
              handleTickerChange={handleTickerChange}
              handleQuantityChange={handleQuantityChange}
              handlePurchaseSubmission={handlePurchaseSubmission}
              formText={formText}
              quantityText={quantityText}
              />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default Portfolio;
