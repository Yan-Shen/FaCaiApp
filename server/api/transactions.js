
const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  console.log('req.params.userId-----------', req.params.userId, 'end')
  Transaction.findAll({
      where: {
        userId: +req.params.userId
      },
      include: [{all: true}]
    //
  })
    .then(transactions => res.json(transactions))
    .catch(next)
})
