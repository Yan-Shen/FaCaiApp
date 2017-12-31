import React from 'react';
import {connect} from 'react-redux';


const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }

const DetailRow = (props)=>{

    return (

      <div id="detailRowContainer" className="rowSec flex-container-wrap">
        {
          props.groups && props.groups.map(group=> {
            let highlight = null;
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
            const net = assets - liabilities;
            if(net <= 0) {highlight = {backgroundColor: "#f2f0fe"}} else {highlight = {backgroundColor: "white"}};

           return (
              <div className="detailItem" style={highlight} key={group.id}>
              <div className="detailAmount">{formatCurrency((net)).slice(0, -3)}</div>
              <span className="categoryName">{group.name}</span>
              </div>

           )
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

