import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user-model";
import { Types } from "mongoose";

const getUserToken = ( _id: string | Types.ObjectId ) => {
    const authenicatedUserToken = jwt.sign({ _id }, "express" ,{ expiresIn : "7d"} )
    return authenicatedUserToken;
}

export const createUser = async ( request : Request, response : Response ) =>{
    try{
        
        const { name, email, password } = request.body;
        const existingUser = await User.findOne({ email });
        
        if ( existingUser ){
            return response.status(409).send("user already exist")
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        return response.status(201).send({ message : "User Created Successfully!!"})
    }catch(error){
        console.log("Error",error)
        throw (error);
    }
}


export const loginUser = async ( request : Request, response : Response ) =>{
    try {
        const { email, password }: IUser = request.body;
        const existingUser = await User.findOne({ email });

        if ( !existingUser ){
            return response.status(409).send("user doesn't exist")
        }

        const isPasswordIdentical = await bcrypt.compare( password, existingUser.password );

        if( isPasswordIdentical ){
            const token = getUserToken((existingUser)._id);
            return response.send({
                token,
                user:{
                    email: existingUser.email,
                    name : existingUser.name
                }
            })

        }
        else{
            return response.status(400).send({ message : "Wrong credentail "})
        }


    }catch(error){
        console.log("error in login User", error);
        throw (error);
    }
};