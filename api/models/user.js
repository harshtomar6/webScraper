let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')

//Define User Schema
var userSchema  = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
})

//Define methods to generate hash
userSchema.methods.generateHast = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//Check valid password
userSchema.methods.validatePassword = (password) => {
  return bcrypt.compareSync(password, this.local.password)
}

//create model and export it
methods.exports = mongoose.model('User', userSchema)
