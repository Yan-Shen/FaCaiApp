import React, { Component } from 'react';
import {connect} from 'react-redux'

import PlaidLink from './PlaidLink';

class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div id="bankListContainer">
          <PlaidLink />
          <div id="bankList">
         {
            this.props.banks &&  this.props.banks.map(bank=>{
              return (
                  <div key={bank.name}>
                    <span >{bank.name.toLowerCase()}</span>
                  </div>
              )
            })
          }
          </div>
      </div>
     )
  }
}

const mapState = state => {
  return {
    accounts: state.accounts || null,
    banks: state.banks || null
  }
}

export default connect(mapState)(BankList);

