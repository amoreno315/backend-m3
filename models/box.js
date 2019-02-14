const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const boxSchema = new Schema({
  owner: {type: ObjectId, ref: 'User'},  
  move: {type: ObjectId, ref: 'Move'}, 
  boxnummer: Number, 
  boxname: String, 
  category: String,
  description: String, 
  storagelocation: String,
  items: [{
    nameitem: String, 
    quantity: Number,
    description: String,
    image: String,
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});
const Box = mongoose.model('Box',boxSchema)

module.exports = Box;

