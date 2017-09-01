const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bannerSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String
})
  
