import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  width: '100%',
  // margin: 20,
  minHeight: '450px',
  textAlign: 'left',
  display: 'inline-block',
  paddingTop: '20px',
  paddingLeft: '15px',
  paddingRight: '15px',
  color: '#666'
};

const Note = () => (
  <div className="noteContainer">
    <Paper style={style} zDepth={2}>
      <p>Click Add Link to add the financial institutions you want to access. </p>
      <p>To experience the functionality of LINKapp, which will allow access to cross-platform financial information such as bank account balances and transactions, please use the below default (sandbox) credentials for all financial institutions:</p>
      <p>username: user_good</p>
      <p>password: pass_good</p>
      <p>pin: credential_good (when required)</p>
      <p>To access your personal financial information, please check back later. Until securing sponsor funding, this app will be running in sandbox mode to deter the monthly data aggregation agency charge.</p>
    </Paper>
  </div>
);

export default Note;
