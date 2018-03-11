import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PlaidLink from '../components/linkAdd/PlaidLink';

function BankList(props) {
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
            props.banks &&  props.banks.map(bank=>{
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
        onClick={props.handleOnClick}>Go</button>
        <div style = {props.loaderView} className="loader">Loading...</div>
      </div>
    </div>

  )
}

export default BankList;
