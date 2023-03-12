const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
   const connectToMongo =  mongoose.connect("mongodb://127.0.0.1:27017/todolsitDB", { useNewUrlParser: true },function(err){
        if(err){
         console.log(err);
        }else{
          console.log("connected to mongoDB succesfully");
        }
      });

      const todoSchema = new mongoose.Schema({
          title:{
            type: String,
            require:true
          },
          content:{
            type:String,
            require:true
          }  ,
          Date:{
            type: Date,
            default:Date.now
          }

      });

      const todoList = mongoose.model("todoLists" , todoSchema);

      
      
module.exports = connectToMongo;

module.exports = todoList;