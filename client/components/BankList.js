
import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PlaidLink from './PlaidLink';
import {getAccountsThunk, getBanksThunk, getTransactionsThunk} from '../store'

class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = { loaderView: {visibility: 'hidden'} }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount(){
    this.props.loadInstitions()
  }

  handleOnClick(){
    axios.post('/api/link', {user: this.props.user})
      .then(res => this.props.loadAccounts())
      .then(res => this.props.loadTransactions())
      .then(res => {
        const load = () => {
          this.props.history.push(`/${this.props.user.id}`)
        }
        setTimeout(load, 3000);
      })
    this.setState({loaderView: {visibility: 'visible'}})
  }

  render() {
    return (
      <div id="bankListContainer">
          <PlaidLink />
          <div id="bankList" >
            <ReactCSSTransitionGroup
            transitionName="bankList"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
                this.props.banks &&  this.props.banks.map(bank=>{
                  return (
                      <div key={bank.name}>
                        <span >{bank.name.toLowerCase()}</span>
                      </div>
                  )
                })
              }
            </ReactCSSTransitionGroup>
          </div>
          <div className="goBtnWrapper">
            <button id="goBtn" className="hvr-float-shadow"
            onClick={this.handleOnClick}>Go</button>
            <div style = {this.state.loaderView} className="loader">Loading...</div>
          </div>
      </div>
     )
  }
}

// BankList.propTypes = {
//   show: PropTypes.bool.isRequired
// };

const mapState = (state, ownProps) => {
  return {
    banks: state.banks,
    user: state.user,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const path = ownProps.match.path;
  const index = path.lastIndexOf('/');
  const userId = path.slice(index + 1);
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

export default connect(mapState, mapDispatch)(BankList);

