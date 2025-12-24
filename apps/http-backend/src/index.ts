import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import { createUserSchema, signinUserSchema, createRoomSchema } from "@repo/common/zodschema"
import { prismaClient } from "@repo/db"

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {

    const parsedData = createUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(302).json({
            message: "Incorrect input or miss on the zod validation"
        })
        return;
    }



    try {
        const userAdd = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists or email already registered"
        })
    }



    //Need a DB call here 
})


app.post("/signin", (req, res) => {

    const data = signinUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(302).json({
            message: "Incorrect input or miss on the zod validation"
        })
    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "You have successfully signed up",
        token: token
    })
})


app.post("/create-room", middleware, (req, res) => {

    const data = createRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.status(302).json({
            message: "Incorrect input or miss on the zod validation"
        })
    }

    const roomId = 123;
    res.json({
        message: "room created successfully",
        roomId: roomId
    })
})

app.listen(3001, () => {
    console.log("HTTP server started on 3001")
})


