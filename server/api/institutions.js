const router = require('express').Router()
const {Institution, Token} = require('../db/models');
const Promise = require('bluebird');

module.exports = router

router.get('/:userId', (req, res, next) => {
  Token.findAll({
    where: {
      userId: +req.params.userId
    }
  })
  .then(tokens=>{
    console.log('Tokens are---------------------------', tokens)
    const institutionArr = tokens.map(token=>{
      // console.log('token.institutionId is-------------', token.institutionId)
      return Institution.findById(token.institutionId)
      // .then((institution)=>console.log('institution is-------------', institution))
    })
    console.log('institutionArr are---------------------------', institutionArr)
    return Promise.all(institutionArr)
    .then(institutions => res.json(institutions))
    .catch(next)
  })
  .catch(next)
})
