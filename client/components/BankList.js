import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';


import PlaidLink from './PlaidLink';
import {getBanksThunk} from '../store'
class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount(){
    // console.log('this.props is-------------------', this.props)
    this.props.loadInstitions()
  }

  handleOnClick(){
    axios.post('/api/link', {user: this.props.user})
      .then(res=>this.props.history.push(`/${this.props.user.id}`))
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
          <div>
            <button onClick={this.handleOnClick}>Go</button>
          </div>
      </div>
     )
  }
}

const mapState = state => {
  return {
    banks: state.banks,
    user: state.user
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

export default connect(mapState, mapDispatch)(BankList);

