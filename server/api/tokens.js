const router = require('express').Router()
const {Institution, Token} = require('../db/models');
const plaid = require('plaid');

const PLAID_ENV = 'sandbox';
const credentials = {
  PLAID_CLIENT_ID: '5a39e7cfefe64e7803074b58',
  PLAID_SECRET: '33148810212bdb98f09993a25f4457',
  PLAID_PUBLIC_KEY: 'f74fcf55c0b94e51b2e5a3912667b0',
}

// if (PLAID_ENV === 'sandbox') {
//   credentials = {
//     PLAID_CLIENT_ID: '5a39e7cfefe64e7803074b58',
//     PLAID_SECRET: '33148810212bdb98f09993a25f4457',
//     PLAID_PUBLIC_KEY: 'f74fcf55c0b94e51b2e5a3912667b0',
//   }
// } else if (PLAID_ENV === 'development') {
//   credentials = {
//     PLAID_CLIENT_ID: '5a39e7cfefe64e7803074b58',
//     PLAID_SECRET: '33148810212bdb98f09993a25f4457',
//     PLAID_PUBLIC_KEY: 'f74fcf55c0b94e51b2e5a3912667b0',
//   }
// }

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
