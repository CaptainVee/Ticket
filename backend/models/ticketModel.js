const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: {
    type: String,
    required: [true, "Oga which product dey worry you"],
    enum: ['iPhone', 'iMac', 'Macbook Pro', 'iPad'],
  },
  description : {
    type: String,
    required: [true, "Talk wetin dey worry you na?"]
  },  
  status : {
    type: String,
    required: true,
    enum: ['new', 'open', 'closed'],
    default: 'new'

  },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Ticket', ticketSchema)
