import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb://localhost:27017/todoapp"
        )

        if(connection){
            console.log("Connection establish");
        }
    }catch(error){
        console.log("Unable to Connect" , error);
        throw ( error )
    }
}

export default connectToDatabase;