import mongoose from "mongoose";

export function mongooseConnect (){
    console.log(process.env.NEXT_PUBLIC_MONGODB_URL);
    if(mongoose.connection.readyState === 1 ){
        return mongoose.connection.asPromise()
    }else{
        const uri = process.env.NEXT_PUBLIC_MONGODB_URL
        return mongoose.connect(uri)
    }
}