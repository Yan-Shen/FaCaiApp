

import React, { Component } from "react";
import Script from "react-load-script";
import axios from 'axios'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import {getBanksThunk} from '../store'

class PlaidLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: true,
      linkLoaded: false,
      initializeURL: "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  static defaultProps = {
    institution: null,
    selectAccount: false,
  };

  onScriptError = () => {
    console.error("There was an issue loading the link-initialize.js script");
  };

  onScriptLoaded = () => {
    axios.post('/api/tokens')
      .then(res=>res.data)
      .then(res=> {
        window.linkHandler = window.Plaid.create({
          apiVersion: 'v2',
          clientName: 'Plaid Walkthrough Demo',
          env: res.PLAID_ENV,
          product: ['transactions'],
          key: res.PLAID_PUBLIC_KEY,
          onExit: this.handleOnExit,
          onLoad: this.handleLinkOnLoad,
          onSuccess: this.handleOnSuccess,
          // selectAccount: true,
          // webhook: this.props.webhook
        });
      })

    this.setState({ disabledButton: false });
  };

  handleLinkOnLoad = () => {
    console.log('link: loaded');
    this.setState({ linkLoaded: true });
  };

  handleOnSuccess (publicToken, metadata) {
    axios.post('/api/tokens/get_access_token',
    {publicToken, user: this.props.user})
      .then(()=> this.props.loadInstitions())
      // .then(()=> this.props.loadInstition())
      // .then(()=> this.props.loadAccounts())
      // .then(()=> this.props.history.push('/banklist'))

  }

  handleOnClick = () => {
    var institution = this.props.institution || null;
    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  };

  handleOnExit () {
    console.log('link: user exited');
  }

  exit = configurationObject => {
    if (window.linkHandler) {
      window.linkHandler.exit(configurationObject);
    }
  };

  render() {
    return (
      <div id="plaidContainer">
        <button
          onClick={this.handleOnClick}
        >
          <span>Add Links</span>
        </button>
        <Script
          url={this.state.initializeURL}
          onError={this.onScriptError}
          onLoad={this.onScriptLoaded}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const path = ownProps.match.path;
  const index = path.lastIndexOf('/');
  const userId = path.slice(index + 1);
  return {
    loadInstitions(){
      dispatch(getBanksThunk(userId))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(PlaidLink));
