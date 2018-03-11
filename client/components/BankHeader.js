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
            <NavLink
            exact to={`/${this.props.userId}`}
            className="hvr-underline-reveal"
            activeClassName="active" >
                {/* <div className="hvr-underline-reveal"> */}
                  <span>Summary</span>
                {/* </div> */}
            </NavLink>
            {
              this.props.banks && this.props.banks.map(bank => {
              return (
                <NavLink
                to={`/institution/${this.props.userId}/${bank.id}`}
                className="hvr-underline-reveal"
                activeClassName="active"
                key={bank.id}>
                    <span className="bankBtn" onClick={(evt) => this.props.setInstitution(bank)}>{bank.name}</span>
                </NavLink>
              )

              })
            }

          </div>
     )
  }
}


export default BankHeader;
