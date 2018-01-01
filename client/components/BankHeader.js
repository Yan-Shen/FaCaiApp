import React, { Component } from 'react';
// import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
// import {getCurrentBank} from '../store';


export class BankHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div id="bankNavContainer" className="flex-container-row">
            <NavLink to={`/${this.props.userId}`} activeClassName="active">
                <div className="hvr-underline-reveal">
                  <span>Summary</span>
                </div>
            </NavLink>
            {
              this.props.banks && this.props.banks.map(bank => {
              return (
                <NavLink to={`/${this.props.userId}/${bank.id}`} activeClassName="active" key={bank.id}>
                  <div className="hvr-underline-reveal" >
                    <button onClick={(evt) => this.props.setInstitution(bank)}>{bank.name}</button>
                  </div>
                </NavLink>
              )

              })
            }

          </div>
     )
  }
}


export default BankHeader;
