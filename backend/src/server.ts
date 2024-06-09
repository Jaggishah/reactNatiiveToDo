import express , { Request, Response } from "express"
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import { categoryRoutes } from "./routes/categories.routes";

const application = express();
application.use(express.json());
const port = 1337;
connectToDatabase();

application.get("/ping" , ( request : Request , response : Response ) => {
    response.send("Poong")
})

application.use("/users",userRoutes);
application.use("/categories",categoryRoutes);

application.listen( port , () => {
    console.log("Server up and running")
})