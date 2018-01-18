const router = require('express').Router()
const {Account, Institution} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  Account.findAll({
      where: {
        userId: +req.params.userId,
        current: true
      },
     include: [{model: Institution}]
  })
    .then(accounts => res.json(accounts))
    .catch(next)
})
