import React from 'react';
import {connect} from 'react-redux'

const _ = require('lodash');
const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

const DetailRow = (props) => {
    const categories = _.map(props.labeledTransactions, _.property('category'))
    .map(category => category[0]);
    const uniqCatogories = _.uniq(categories)

    const nonLabeledAmount = props.nonLabeledTransactions
    .reduce((accu, cv)=> {
      return accu + cv.amount
    },0)
    return (
      <div id="detailRowContainer" className="rowSec flex-container-wrap">
        {

          uniqCatogories && uniqCatogories.map(category => {
            const labeledAmount = props.labeledTransactions
            .filter(transaction=>transaction.category[0]===category)
            .reduce((accu, cv)=> {
              return accu + cv.amount
            },0)
            return (
              <div className="detailItem" key={category}>
              <div>{formatCurrency(labeledAmount).slice(0, -3)}</div>
              <span>{category}</span>
            </div>
            )
          })

          }
          {
            props.nonLabeledTransactions &&
            <div className="detailItem">
              <div>{formatCurrency(nonLabeledAmount, opts).slice(0, -3)}</div>
              <span>Other</span>
          </div>
          }

      </div>
    )
}

const mapState = state => {
  return {
    labeledTransactions: state.transactions.filter(transaction=> transaction.category!==null),
    nonLabeledTransactions: state.transactions.filter(transaction=> transaction.category===null),
    accounts: state.accounts
  }
}

export const ProfitDetails = connect(mapState)(DetailRow);

