import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = express()

app.post("/signup", (req,res)=> {

    const username = req.body.usermane;
    const password = req.body.password;

    //Need a DB call here 
})


app.post("/signin", (req,res)=> {
    
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "You have successfully signed up",
        token : token
    })
})


app.post("/create-room", middleware, (req,res)=> {
    
    const roomId = 123;
    res.json({
        message: "room created successfully",
        roomId : roomId
    })
})

app.listen(3001, ()=> {
    console.log("HTTP server started on 3001")
})