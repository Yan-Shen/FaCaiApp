import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  width: '400px',
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
  paddingLeft: '10px',
  paddingRight: '10px',
  color: '#666'
};

const Note = () => (
  <div>
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
