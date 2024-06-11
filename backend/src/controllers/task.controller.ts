import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async ( request : AuthRequest, response : Response ) => {
    try{
        const userId = request.user;
        const tasks = await Task.find({
            user: userId,
        })
        return response.send(tasks)

    }catch(error){
        console.log("error in getallTask", error);
        response.send({ error : "Error while fetching tasks"})
        throw (error);
    }
}

export const getAllTasksByCategory = async( request : AuthRequest, response : Response) => {
    try{
        const userId = request.user;
        const { id } = request.params;
        const tasks = await Task.find({
            user: userId,
            categoryId: id,
        })
        response.send(tasks);
    }catch(error){
        console.log("error in getallTaskCategory ", error);
        response.send({ error : "Error while fetching tasks"})
        throw (error);
    }
}

export const getAllTasksCompleted = async( request : AuthRequest, response : Response) => {
    try{
        const userId = request.user;
        const tasks = await Task.find({
            user: userId,
            isCompleted:true
        })
        response.send(tasks);
    }catch(error){
        console.log("error in getallTaskCategory ", error);
        response.send({ error : "Error while fetching tasks have completed"})
        throw (error);
    }
}

export const getTaskForToday = async( request : AuthRequest, response : Response) => {
    try{
        const userId = request.user;
        const todayISODate = new Date();
        todayISODate.setHours(0,0,0,0)
        const tasks = await Task.find({
            user: userId,
            date: todayISODate.toISOString()
        })
    
        response.send(tasks);
    }catch(error){
        console.log("error in getTaskForToday ", error);
        response.send({ error : "Error while fetching taskfortoday"})
        throw (error);
    }
}



export const createTask = async ( request : AuthRequest, response : Response ) => {
    try{
        const userId = request.user;
        const { isCompleted, name, date, categoryId }:ITask = request.body;
        const tasks = await Task.create({
            isCompleted, name, date, categoryId,  user: userId
        })
        return response.send(tasks)

    }catch(error){
        console.log("error in creatingTask", error);
        response.send({ error : "Error while creating tasks"})
        throw (error);
    }
}

export const toogleTaskStatus = async ( request : AuthRequest, response : Response ) => {
    try{
        const { isCompleted } = request.body;
        const { id } = request.params;
        const tasks = await Task.updateOne({
           _id : id
        },{
            isCompleted,
        })
        return response.send(tasks)

    }catch(error){
        console.log("error in creatingTask", error);
        response.send({ error : "Error while toogle tasks status"})
        throw (error);
    }
}

export const editTask = async ( request : AuthRequest, response : Response ) => {
    try{
        const { _id, categoryId, name, date }:ITask = request.body;
         await Task.updateOne({
           _id 
        },{
            $set:{
                name,
                categoryId,
                date
            }
        })
        return response.send({"message" : "Task Update Successfully"})

    }catch(error){
        console.log("error in rdit task", error);
        response.send({ error : "Error while editing task status"})
        throw (error);
    }
}

export const deleteTasks = async ( request : AuthRequest, response : Response ) => {
    try{
        const { id } = request.params;
        await Task.deleteMany({ _id : id });
        response.send( { message : "task Deleted"})
    }catch(error){
        console.log("error in delelting task", error);
        response.send({ error : "Something Went Wrong "})
        throw (error);
    }
}