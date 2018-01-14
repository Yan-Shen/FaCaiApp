import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAccountsThunk, getBanksThunk, getTransactionsThunk, getCurrentBank} from '../store'
import {BalanceRow, ProfitRow} from './chart/SummaryRow';
import {BalanceDetails} from './chart/BalanceDetails';
import {ProfitDetails} from './chart/ProfitDetails';
import BalanceChart from './chart/BalanceChart';
import LineBarAreaComposedChart from './chart/ExpenseChart'
import { BankHeader } from './BankHeader';

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
    const userId = this.props.match.path.slice(1);
    return (

        <div id="homeContainer" className="flex-container-column">
          <BankHeader
          banks={this.props.banks}
          setInstitution={this.props.setInstitution}
          userId={userId}/>

          <div id="dashboardContainer" className="flex-container-row">
            <div id="balance" className="flex-container-column halfSec">
              <span className="sectionLabel">Balance</span>
              <BalanceRow />
              <BalanceDetails />
              {/* <div className="chartContainer">Chart</div> */}
              <div className="chartWrap">
                <div className="chartTitleArea">Asset Class (%)</div>
                <BalanceChart />
              </div>
            </div>
            <div id="exp" className="flex-container-column halfSec">
              <span className="sectionLabel">Income/Expense</span>
              <ProfitRow />
              <ProfitDetails />
              <div className="chartWrap">
                <div className="chartTitleArea">Expenses by Vendor ($)</div>
                  <LineBarAreaComposedChart />
              </div>

            </div>

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
    },
    setInstitution(bank){
      dispatch(getCurrentBank(bank))
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
