const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const User_Schema=new Schema({
    
name:{type:String, require:true},
Email:{type:String, require:true, unique:true},
password:{type:String, require:true},
role:{type:String, default:'Customer'}
  },{timestamps:true});

  const Menu=new mongoose.model("User",User_Schema);

  module.exports =Menu;