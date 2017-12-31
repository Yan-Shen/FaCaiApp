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
    let highlight = null;
    return (
      <div id="detailExpontainer" className="rowSec flex-container-wrap">
        {

          uniqCatogories && uniqCatogories.map(category => {

            const labeledAmount = props.labeledTransactions
            .filter(transaction=>transaction.category[0]===category)
            .reduce((accu, cv)=> {
              return accu + cv.amount
            },0)
            if(labeledAmount < 0) {highlight = {backgroundColor: "#f2f0fe"}} else {highlight = {backgroundColor: "white"}}
            return (
              <div className="detailItem" style={highlight} key={category}>
              <div className="detailAmount">{formatCurrency(labeledAmount).slice(0, -3)}</div>
              <span className="categoryName">{category}</span>
            </div>
            )
          })

          }
          {
            props.nonLabeledTransactions &&
            <div className="detailItem" style={highlight} >
              <div className="detailAmount">{formatCurrency(nonLabeledAmount, opts).slice(0, -3)}</div>
              <span className="categoryName">Other</span>
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

