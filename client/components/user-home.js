import React, { Component } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getAccountsThunk, getBanksThunk, getTransactionsThunk} from '../store'
import {BalanceRow, ProfitRow} from './chart/SummaryRow';
import {BalanceDetails} from './chart/BalanceDetails';
import {ProfitDetails} from './chart/ProfitDetails';
/**
 * COMPONENT
//  */

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.loadAccounts();
    this.props.loadInstitions();
    this.props.loadTransactions();
  }

  render() {
    return (
        <div id="homeContainer" className="flex-container-column">
          <div id="bankNavContainer" className="flex-container-row">
            <div><span>Summary</span></div>
            {
              this.props.banks.map(bank=>{
              return <div key={bank.id}><span>{bank.name}</span></div>
              })
            }

          </div>
          <div id="edge"/>
          <div id="dashboardContainer" className="flex-container-row">
            <div id="balance" className="flex-container-column halfSec">
              <h3>Balance</h3>
              <BalanceRow />
              <BalanceDetails />
              <div className="chartContainer">Chart</div>
            </div>
            <div id="exp" className="flex-container-column halfSec">
              <h3>Income/Expense</h3>
              <ProfitRow />
              <ProfitDetails />
              <div className="chartContainer">Chart</div>
            </div>
          </div>
       </div>
     )
  }
}


const mapState = state => {
  return {
    // email: state.user.email,
    accounts: state.accounts || null,
    banks: state.banks || null
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.path.slice(1);
  return {
    loadAccounts(){
      dispatch(getAccountsThunk(userId))
    },
    loadInstitions(){
      dispatch(getBanksThunk(userId))
    },
    loadTransactions(){
      dispatch(getTransactionsThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   // email: PropTypes.string
// }
