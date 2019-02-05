const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const moveSchema = new Schema ({
  // id - ¿es necesario definirlo?
  owner: {type: ObjectId, ref: 'User'}, require: true,
  number: Number, require: true, unique: true,
  title: String,
  date: Date, 
  origin: String, 
  destination: String,
  description: String, 
  boxes: [{
    type: ObjectId, ref: 'Box',
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
}); 
const Move = mongoose.model('Move',moveSchema);

module.exports = Move;

