const router = require('express').Router()
const {linkRouter} = require('./link');
module.exports = router

router.use('/users', require('./users'))
router.use('/tokens', require('./tokens'))
router.use('/link', linkRouter)
router.use('/institutions', require('./institutions'))
router.use('/accounts', require('./accounts'))
router.use('/transactions', require('./transactions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

