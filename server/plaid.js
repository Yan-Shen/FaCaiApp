const moment = require('moment');
const plaid = require('plaid');
const {Institution, Account, Transaction} = require('./db/models');

var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
var endDate = moment().format('YYYY-MM-DD');


const PLAID_CLIENT_ID='5a39e7cfefe64e7803074b58';
const PLAID_SECRET='33148810212bdb98f09993a25f4457';
const PLAID_PUBLIC_KEY='f74fcf55c0b94e51b2e5a3912667b0';
const PLAID_ENV='sandbox';


const loadData = function (tokenArr) {

  const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV]
  );

  tokenArr.map(token=>{
    return new Promise ((res, rej)=>{
      client.getItem(token.accessToken, function(error, itemResponse) {
        if (error != null) {
          console.log(JSON.stringify(error));
        } else {
          client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
            if (err != null) {
              var msg = 'Unable to pull institution information from the Plaid API.';
              console.log(msg + '\n' + error);
            } else {
              console.log('itemResponse is ---------------', itemResponse);
              console.log('instRes is ---------------', instRes);

              Institution.findOrCreate({
                where: {
                  id: instRes.institution.institution_id,
                  name: instRes.institution.name
                }
              })
            }
          })
        }
        })
        res('Promise success!');
      })
        .then(()=>{
          client.getAuth(token.accessToken, function(error, authResponse) {
            if (error != null) {
              var msg = 'Unable to pull accounts from the Plaid API.';
              console.log(msg + '\n' + error);
            }
            console.log('authResponse is ---------------', authResponse);
            authResponse.accounts.map(account=>{
              Account.findOrCreate({
                where: {
                  id: account.account_id,
                  name: account.name,
                  balanceCurrent: account.balances.current,
                  type: account.type,
                  subtype: account.subtype,
                  institutionId: authResponse.item.institution_id,
                  userId: token.userId,
                }
              })
            })
          });

        })
          .then(()=>{
            client.getTransactions(token.accessToken, startDate, endDate, {
              count: 5,
              offset: 0,
            }, function(error, transactionsResponse) {
              if (error != null) {
                console.log(JSON.stringify(error));
              }
              transactionsResponse.transactions.map(transaction=>{
                    Transaction.findOrCreate({
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
                .catch(err=>console.log(err))
              })
            });
          })
          .catch(err=>console.log(err))

  })
}

module.exports = loadData;