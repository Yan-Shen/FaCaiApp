import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {getAccountsThunk, getBanksThunk, getTransactionsThunk, getCurrentBank} from '../store'

import {SingleBankBalanceRow, SingleBankProfitRow} from './chart/SummaryRow';
import {SingleBankBalanceDetails} from './chart/BalanceDetails';
import {SingleBankProfitDetails} from './chart/ProfitDetails';
import { BankHeader } from './BankHeader';
import TransactionList from "./TransactionList";


class InstitutionHome extends Component {
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
    // console.log('this.props of instituion home is---------', this.props)
    return (
        <div id="homeContainer" className="flex-container-column">

          <BankHeader
            banks={this.props.banks}
            setInstitution={this.props.setInstitution}
            userId={this.props.userId} />
          <div id="edge" />

          {/* {
            this.props.currentBank &&
            <h3>{this.props.currentBank.name}</h3>
          } */}

          {this.props.currentBank &&
            <div className="fullWidth">
            <div id="dashboardContainer" className="flex-container-row">
              <div id="balance" className="flex-container-column halfSec">
                <span className="sectionLabel">Balance</span>
                <SingleBankBalanceRow currentBank={this.props.currentBank} />
                <SingleBankBalanceDetails currentBank={this.props.currentBank} />
              </div>
              <div id="exp" className="flex-container-column halfSec">
                <span className="sectionLabel">Income/Expense</span>
                <SingleBankProfitRow currentBank={this.props.currentBank} />
                <SingleBankProfitDetails currentBank={this.props.currentBank}/>
              </div>
            </div>
            <TransactionList currentBank={this.props.currentBank} />

        </div>
          }
      </div>
     )
  }
}


const mapState = (state, ownProps) => {
  const institutionId = ownProps.match.params.institutionId;
  // console.log('institutionId is------------', institutionId)
  return {
    currentBank: state.banks.find(bank => bank.id === institutionId),
    banks: state.banks,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.params.userId;
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

export default connect(mapState, mapDispatch)(InstitutionHome);

