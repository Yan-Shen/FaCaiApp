import React from 'react';
import {connect} from 'react-redux';
const _ = require('lodash');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

const TransactionList = props => {
  const groups = _.groupBy(props.transactions, 'account.name')
  const accountNames = Object.keys(groups)
  console.log('groups are-----------', groups)
    return (
      <ReactCSSTransitionGroup
      transitionName="pieContainer"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      <div className="transactionListSection flex-container-row">
        <div className="transactionListContainer flex-container-row" >
          <div className="transactionListInnerContainer">
            { accountNames.map(accountName => {
              return (
                <div key={accountName}>
                  {accountName}
                  {
                    groups[accountName].map(transaction => {
                      return (
                        <div key={transaction.id} className="transactionItem flex-container-row">
                          <div>
                          <span>{transaction.name.toLowerCase()}</span>
                          {transaction.amount}
                          </div>
                          <div>{transaction.date}</div>
                        </div>
                      )
                    })
                  }
                </div>

              )
            })
            //   props.transactions.map(transaction => {
            //   return (
            //     <div key={transaction.id} className="transactionItem flex-container-row">
            //       <div>
            //       <span>{transaction.name.toLowerCase()}</span>
            //       {transaction.amount}
            //       </div>
            //       <div>{transaction.date}</div>
            //     </div>
            //   )
            // })
            }
          </div>
        </div>
      </div>
      </ReactCSSTransitionGroup>
    )
}

const mapState = (state, ownProps) => {
  return {
    transactions: state.transactions.filter(transaction => transaction.account.institutionId === ownProps.currentBank.id),
   }
}

export default connect(mapState)(TransactionList);


