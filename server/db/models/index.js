const User = require('./user')
const Institution = require('./institution')
const Account = require('./account')
const Transaction = require('./transaction')
const Token = require('./token')

Token.belongsTo(User);
User.hasMany(Token);

Token.belongsTo(Institution);

Transaction.belongsTo(Account);
Account.hasMany(Transaction)

Account.belongsTo(Institution);
Institution.hasMany(Account);

Account.belongsTo(User);
User.hasMany(Account);

Transaction.belongsTo(User);
User.hasMany(Transaction);

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const Instituion= require('../db/models/user')
 */
module.exports = {
  User,
  Institution,
  Account,
  Transaction,
  Token
}
