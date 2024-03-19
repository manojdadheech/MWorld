import Mongoose from "mongoose";



const  UserSchema = new Mongoose.Schema({
    name: { type : String , required : true },
    email:{type:String,unique: true,required:true},
    password:{type:String,required:true}
});









const noteSchema=  new Mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title for the note"]
    },
    description:{
        type: String
    },
    userId
    :{
        type:Mongoose.Types.ObjectId,
        ref:"users"
    }
});


const noteModel=Mongoose.model("Note",noteSchema);
const UserModel=Mongoose.model("user",UserSchema);
export { noteModel, UserModel};

