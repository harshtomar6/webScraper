let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')

//Define User Schema
var userSchema  = mongoose.Schema({
  local: {
    name: String
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    name: String
    email: String,
    name: String
  }
})

//Define methods to generate hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//Check valid password
userSchema.methods.validatePassword = (password) => {
  return bcrypt.compareSync(password, this.local.password)
}

//create model and export it
module.exports = mongoose.model('User', userSchema)
