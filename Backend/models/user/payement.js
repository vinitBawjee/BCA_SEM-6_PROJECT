import mongoose,{model, Schema} from "mongoose";

const {Schema} = mongoose;

const PayementSchema = new Schema({
   
  razorpay_order_id:{
    type:String,
    required:true
  },
  razorpay_payement_id:{
    type:String,
    required:true
  },
  razorpay_signature:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Pending"
  },
  date:{
    type:Date,
    default:Date.now()
  },
});

module.exports = mongoose.model("payement", PayementSchema);

