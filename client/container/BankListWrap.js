
import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import PropTypes from 'prop-types'

import Note from '../components/linkAdd/note'
import BankList from '../components/BankList'
import {getAccountsThunk, getBanksThunk, getTransactionsThunk} from '../store'

class BankListWrap extends Component {
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
      <div className="flex-container-wrap flex-container-spaceArd noteListContainer">
        <Note />
        <BankList {...this.props} loaderView={this.state.loaderView}/>
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

export default connect(mapState, mapDispatch)(BankListWrap);

