// dispatch getAccounts and update store.accounts
// render the list of accounts
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getAccountsThunk} from '../store'

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const accounts = this.props.accounts;
      return (
        <div>
          <button onClick={this.props.handleClick}>Get Accounts</button>
          {
            accounts &&  accounts.map(account=>{
              return (
                <div key={account.name}>
                  <h2 >{account.name}</h2>
                  <h4>Balance: {account.balances.current}</h4>
                </div>
              )
            })
          }
        </div>
      )

  }
}

const mapState = state => {
  return {
    accounts: state.accounts
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(){
      dispatch(getAccountsThunk())
    }
  }
}
export default connect(mapState, mapDispatch)(Accounts);
