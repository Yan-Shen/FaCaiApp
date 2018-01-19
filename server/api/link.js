const linkRouter = require('express').Router()
const moment = require('moment');
const plaid = require('plaid');
const {Account, Transaction, User, Token} = require('../db/models');

var startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
var endDate = moment().format('YYYY-MM-DD');



const loadData = tokenArr => {

  const PLAID_ENV = 'sandbox';
  let credentials;
  if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET || !process.env.PLAID_PUBLIC_KEY) {
    console.log('Plaid client ID / secret not found. Cannot establish link.')
  } else {
    credentials = {
      PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
      PLAID_SECRET: process.env.PLAID_SECRET,
      PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY,
    }
  }

  const client = new plaid.Client(
    credentials.PLAID_CLIENT_ID,
    credentials.PLAID_SECRET,
    credentials.PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV]
  );

  tokenArr.map(token => {
    client.getAuth(token.accessToken, function(error, authResponse) {
      if (error != null) {
        var msg = 'Unable to pull accounts from the Plaid API.';
        console.log(msg + '\n' + error);
      }
      // console.log('authResponse is--------------', authResponse)
      const accountsPromiseArr = authResponse.accounts.map(account => {
        // mark existing accounts.current to false
        // the newly created account.current will be true
       return Account.destroy({
          where: {
            name: account.name,
            type: account.type,
            subtype: account.subtype,
            institutionId: authResponse.item.institution_id,
            userId: token.userId,
          }
        })
        .then((res)=>{
          return Account.findOrCreate({
            where: {
              id: account.account_id,
              name: account.name,
              balanceCurrent: account.balances.current,
              type: account.type,
              subtype: account.subtype,
              institutionId: authResponse.item.institution_id,
              userId: token.userId,
              current: true
            }
          })
        })
      })
      Promise.all(accountsPromiseArr)
        .then(() => {
          client.getTransactions(token.accessToken, startDate, endDate, {
            count: 300,
            offset: 0,
          }, function(error, transactionsResponse) {
            if (error != null) {
              console.log(JSON.stringify(error));
            }

          const transactionPromiseArr = transactionsResponse.transactions.map( transaction =>{
                return Transaction.destroy({
                  where: {
                    userId: token.userId,
                    accountId: null
                  }
                })
                .then(()=>{
                // return is important.  otherwise the promise might not capture all functions need to be called
                 return Transaction.findOrCreate({
                    where: {
                      accountId: transaction.account_id,
                      amount: transaction.amount,
                      category: transaction.category,
                      categoryId: transaction.category_id,
                      date: transaction.date,
                      name: transaction.name,
                      userId: token.userId,
                    }
                  })
                })
              })
              Promise.all(transactionPromiseArr)
              .then(()=> console.log('wait for all transaction'))
              .catch(err=>console.log(err))
          });
        })
        .catch(err=>console.log(err))
    });
  })
};

// loadData currently is triggered by
// 1. click go in the front end
// 2. reload everytime run server

// need to schedule loadData for all users by the server midnight
linkRouter.post('/', (req, res, next)=>{
  const {user}  = req.body;
  Token.findAll({
    where: {
      userId: user.id
    }
  })
  .then(tokens => {
    return loadData(tokens);
  })
  .then(() => res.status(200).send())
  .catch(next)
})

module.exports = {linkRouter, loadData};
