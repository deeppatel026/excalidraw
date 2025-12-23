import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import { createUserSchema, signinUserSchema, createRoomSchema } from "@repo/common/zodschema"


const app = express()

app.post("/signup", (req,res)=> {

    //Need to include zod validations here
    const data = createUserSchema.safeParse(req.body);
    if(!data.success){
        res.status(302).json({
            message : "Incorrect input or miss on the zod validation"
        })
    }

    //Need a DB call here 
})


app.post("/signin", (req,res)=> {
      
    const data = signinUserSchema.safeParse(req.body);
    if(!data.success){
        res.status(302).json({
            message : "Incorrect input or miss on the zod validation"
        })
    }
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
    
    const data = createRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(302).json({
            message : "Incorrect input or miss on the zod validation"
        })
    }

    const roomId = 123;
    res.json({
        message: "room created successfully",
        roomId : roomId
    })
})

app.listen(3001, ()=> {
    console.log("HTTP server started on 3001")
})