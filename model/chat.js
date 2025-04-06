const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
      message: {
         type:String 
         },
   createdBy:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
   }
}, {timestamps:true})
const chat = mongoose.model('chat', chatSchema);

module.exports = chat