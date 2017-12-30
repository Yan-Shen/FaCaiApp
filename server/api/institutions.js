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
    const institutionArr = tokens.map(token=>{
      return Institution.findById(token.institutionId)
    })
    return Promise.all(institutionArr)
    .then(institutions => res.json(institutions))
    .catch(next)
  })
  .catch(next)
})
