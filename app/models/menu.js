const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Menu_Schema=new Schema({
    
name:{type:String, require:true},
image:{type:String, require:true},
price:{type:Number, require:true},
size:{type:String, require:true}
  });

  const Menu=new mongoose.model("Menu",Menu_Schema);

  module.exports =Menu;