const router = require('express').Router()
const {Institution, Token} = require('../db/models');
const plaid = require('plaid');

const PLAID_ENV = 'sandbox';

let credentials;
if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET || !process.env.PLAID_PUBLIC_KEY) {
  console.log('Plaid client ID / secret not found. Cannot create retrieve token.')
} else {
  credentials = {
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY,
  }
}

// Initialize the Plaid client
var client = new plaid.Client(
  credentials.PLAID_CLIENT_ID,
  credentials.PLAID_SECRET,
  credentials.PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

router.post('/', function(request, response, next) {
  response.json({
    PLAID_PUBLIC_KEY: credentials.PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  })
});


router.post('/get_access_token', function(request, response, next) {
  const {publicToken, user}  = request.body;
  let accessToken = null;
  let itemId = null;
  client.exchangePublicToken(publicToken, function(error, tokenResponse) {
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }
        accessToken = tokenResponse.access_token;
        itemId = tokenResponse.item_id;
        client.getItem(accessToken, function(error, itemResponse) {
          if (error != null) {
            console.log(JSON.stringify(error));
            return response.json({
              error: error
            });
          } else {
            client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
              if (err != null) {
                var msg = 'Unable to pull institution information from the Plaid API.';
                console.log(msg + '\n' + error);
                return response.json({
                  error: msg
                });
              } else {

                Institution.findOrCreate({
                  where: {
                    id: instRes.institution.institution_id,
                    name: instRes.institution.name
                  }
                })
                  .then(() => {
                    Token.findOrCreate({
                      where: {
                        accessToken,
                        itemId,
                        userId: user.id,
                        institutionId: itemResponse.item.institution_id
                      }
                    })
                    .spread((createdToken, createBool)=>{
                      const id = instRes.institution.institution_id;
                      const name = instRes.institution.name;
                      response.json({id, name});
                    })
                  })
                  .catch(next);
              }
            })
          }
    })
    })

})

module.exports = router;
