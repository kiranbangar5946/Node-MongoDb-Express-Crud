var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema(
  {
    name: {
      type: String
   
    },
    categoryId:{
      type:Schema.Types.ObjectId,
      ref:"Category" 
    }

  }
);

module.exports =  mongoose.model("Product", productSchema);
