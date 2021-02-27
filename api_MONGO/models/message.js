const mongoose=require('mongoose');

const messageSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
idSource:String,
idDestination:[String],
contenu:String,
date:Date
}
)
module.exports=mongoose.model('Message',messageSchema);

