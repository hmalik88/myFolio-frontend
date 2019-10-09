import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
      const quotes = await fetch(`https://cloud.iexapis.com/v1/stock/market/batch?&types=quote&symbols=${tickerStr}&token=pk_e564103e97a948c3b4a1484d391db3c1`)
      .then(res => res.json())
      Object.keys(obj).forEach(company => {
        obj[company]['price'] = quotes[company]['quote']['latestPrice'];
        if (quotes[company]['quote']['open']) {
          if (obj[company]['price'] < quotes['quote']['open']) {
            obj[company]['color'] = 'red';
          } else if (obj[company]['price'] > quotes['quote']['open']) {
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


  return(
    <>
      <ListGroup>

      </ListGroup>
    </>
    )

}

export default PortfolioDisplay;
