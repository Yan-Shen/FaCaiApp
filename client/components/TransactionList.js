import React, { Component } from 'react';
import {connect} from 'react-redux';
const _ = require('lodash');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {getTransactionsThunk} from '../store'
import {withRouter} from 'react-router-dom'

const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

class TransactionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchMode: false,
      inputValue: ''
    }
  }
  componentDidMount(){
    this.props.loadTransactions();
  }

  render(){
    const groups = _.groupBy(this.props.transactions, 'account.name')
    const accountNames = Object.keys(groups)
    return (
      <ReactCSSTransitionGroup
      transitionName="pieContainer"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      className="fullWidth transctionListWrap">
      <div className="transactionListSection flex-container-row">
        <div className="transactionListContainer flex-container-row" >
          <div className="transactionListInnerContainer">

            { accountNames.map(accountName => {
              return (
                <div key={accountName}
                className="accountNameWrapper fullWidth flex-container-spaceBtw">
                  <div className = "accountName" >
                    {accountName}
                  </div>
                  <div className="flex-container-column transactionItemsByAccount">
                    {
                      groups[accountName].map(transaction => {
                        return (
                          <div key={transaction.id}
                          className="transactionItem flex-container-row ">
                            <div>
                            <span>{transaction.name.toLowerCase()}</span>
                            <p>{transaction.amount}</p>
                            </div>
                            <span className="transactionDate">{transaction.date}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  </ReactCSSTransitionGroup>
  )
  }

}

const mapState = (state, ownProps) => {
  return {
    transactions: state.transactions.filter(transaction => transaction.account.institutionId === ownProps.currentBank.id),
   }
}

const mapStateAll = (state) => {
  return {
    transactions: state.transactions
   }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log('ownProps is---------', ownProps)
  const userId = +ownProps.match.params.userId;
  console.log('userId is---------', userId)
  return {
    loadTransactions(){
      dispatch(getTransactionsThunk(userId))
    },
  }
}

export const InstitutionTransactions = withRouter(connect(mapState, mapDispatch)(TransactionList));
export const AllTransactions = withRouter(connect(mapStateAll, mapDispatch)(TransactionList))


