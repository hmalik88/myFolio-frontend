import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import CountUp from 'react-countup';
import '../scss/PortfolioDisplay.scss';

function PortfolioDisplay(props) {

  const [transactionObj, setTransactionObj] = useState({});

  useEffect(() => {
    const organizeTransactions = async () => {
      const obj = {};
      props.transactions.forEach(transaction => {
        if (!obj[transaction.ticker]) {
          obj[transaction.ticker] = {qty: 1, price: null, color: null}
        } else {
          obj[transaction.ticker]['qty']++;
        }
      })
      const tickerStr = Object.keys(obj).join(',');
      if (!tickerStr) return;
      let quotes = await fetch(`https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${tickerStr}&token=pk_e564103e97a948c3b4a1484d391db3c1`)
      .then(res => res.json())
      Object.keys(obj).forEach(company => {
        obj[company]['price'] = quotes[company]['quote']['latestPrice'];
        if (quotes[company]['quote']['open']) {
          if (obj[company]['price'] < quotes[company]['quote']['open']) {
            obj[company]['color'] = 'red';
          } else if (obj[company]['price'] > quotes[company]['quote']['open']) {
            obj[company]['color'] = 'green';
          } else {
            obj[company]['color'] = 'grey';
          }
        } else {
          obj[company]['color'] = 'grey';
        }
      });
      setTransactionObj(obj);
      console.log(obj)
    }
    organizeTransactions();
  }, [props.transactions]);

  const displayPortfolio = () => {
    let stocks = [];
    for (let company of Object.keys(transactionObj)) {
      let price = transactionObj[company]['price'];
      let color = transactionObj[company]['color'];
      let qty = transactionObj[company]['qty'];
      let result = Number(price * qty).toFixed(2);
      let countQty = <CountUp style={{color: 'black'}} end={qty} duration={0.5} decimals={0} redraw={true} useEasing={false} />
      let countResult = <CountUp className={`stock-color-${color}`} end={Number(result)} duration={0.5} decimals={2} redraw={true} useEasing={false} />
      let el = (
        <ListGroupItem key={company} className='portfolio-item'>
          <span className={`stock-color-${color} company-span`}>{company}</span> - {countQty} {qty > 1 ? 'shares' : 'share'}{' '}<span className={`stock-color-${color}`}>${countResult}</span>
        </ListGroupItem>
        )
      stocks.push(el);
    }
    return stocks;
  }

  const portfolioBalance = () => {
    if (Object.keys(transactionObj).length < 1) return null;
    let total = 0;
    for (let company of Object.keys(transactionObj)) {
      let price = transactionObj[company]['price'];
      let qty = transactionObj[company]['qty'];
      let amt = parseFloat(Number(price * qty).toFixed(2));
      total += amt;
    }
    return <CountUp className={"balance-amount"} end={Number(Number(total).toFixed(2))} duration={0.5} decimals={2} redraw={true} useEasing={false} />;
  }


  return(
    <>
      <h2 className='portfolio-header'><span>Portfolio</span> (${portfolioBalance()})</h2>
      <ListGroup flush>
        {displayPortfolio()}
      </ListGroup>
    </>
    )

}

export default PortfolioDisplay;
