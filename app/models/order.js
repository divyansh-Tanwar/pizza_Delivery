const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const order_Schema=new Schema({
    
    CustomerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:{type:Object,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    paymentType:{type:String,default:"COD"},
    status:{type:String,default:"Order_Placed"},
  },{timestamps:true});

  const Order=new mongoose.model("Order",order_Schema);

  module.exports =Order;