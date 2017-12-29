import React from 'react';
import {connect} from 'react-redux'

const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

const DetailRow = (props)=>{

    return (
      <div id="detailRowContainer" className="rowSec flex-container-wrap">
        {
          props.groups && props.groups.map(group=> {
            const assets = props.accounts.filter(account=>account.institutionId===group.id)
            .filter(account=>account.type!=='credit')
            .reduce((accu, cv)=> {
              return accu + cv.balanceCurrent
            },0)
            const liabilities = props.accounts.filter(account=>account.institutionId===group.id)
            .filter(account=>account.type==='credit')
            .reduce((accu, cv)=> {
              return accu + cv.balanceCurrent
            },0)
           return <div className="detailItem" key={group.id}>
              <div>{formatCurrency((assets-liabilities))}</div>
              <span>{group.name}</span>
              </div>
          })
        }
      </div>
    )
}

const mapState = state => {
  return {
    groups: state.banks,
    accounts: state.accounts
  }
}

export const BalanceDetails = connect(mapState)(DetailRow);

