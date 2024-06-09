import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";


export const getAllCategories = async ( request : AuthRequest, response : Response ) => {
    try{
        const { user } = request;
        const categories = await Category.find({user})
        return response.send(categories)

    }catch(error){
        console.log("error in getallCategories", error);
        throw (error);
    }
}

export const createCategories = async ( request : AuthRequest, response : Response ) => {
    try{
        const  { color, icon, name, isEditable }: ICategory= request.body;
        const { user } = request;

        const category = await Category.create({
            color,
            icon,
            isEditable,
            name,
            user
        })


        return response.send(category)

    }catch(error){
        console.log("error in getallCategories", error);
        response.send({ error : "Something Went Wrong "})
        throw (error);
    }
}

export const deleteCategories = async ( request : AuthRequest, response : Response ) => {
    try{
        const { id } = request.params;
        await Category.deleteMany({ _id : id });
        response.send( { message : "Category Deleted"})
    }catch(error){
        console.log("error in deleteCategories", error);
        response.send({ error : "Something Went Wrong "})
        throw (error);
    }
}

export const updateCategories = async ( request : AuthRequest, response : Response ) => {
    try{
        const  { _id, color, icon, name, isEditable }: ICategory= request.body;
    
        const category = await Category.updateOne({
            _id,
        },{
            $set:{
                color, icon, name, isEditable
            }
        })


        return response.send({ message : "Category updated successfully"})

    }catch(error){
        console.log("error in getallCategories", error);
        response.send({ error : "Something Went Wrong "})
        throw (error);
    }
}