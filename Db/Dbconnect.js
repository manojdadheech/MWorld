import Mongoose  from "mongoose";
const option= {
    dbName:'note'
}

async function  connectDB() {
    try {
        await  Mongoose.connect("mongodb+srv://manojdadheechgoldengate:vLPsC3YI96oYgOOZ@cluster0.w6vfda3.mongodb.net/",option);
        console.log('dbconnect ho gya');
        
    } catch (error) {
        console.log(error);
    }
}

export  default connectDB;


   