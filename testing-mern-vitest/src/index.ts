import express from "express";
import z from "zod"
import { prismaClient } from "./db";
export const app = express();

app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number(),
})

app.post('/sum', (req, res) => {
    const parsedInput = sumInput.safeParse(req.body);
    if(!parsedInput) {
        return res.json({
            message: "incorrect inputs"
        })
    }
    if(parsedInput.data){
        const a:number = parsedInput.data.a;
        const b:number = parsedInput.data.b;
        const result:number = a + b;

        return res.status(200).json({
            result,
        })
    }
    res.status(411).send({
        message:"incorrect inputs"
    })
})

app.get("/sum", async(req,res) => {
    const parsedResponse = sumInput.safeParse({
        a:Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    if(!parsedResponse.success) {
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }

    const result = parsedResponse.data.a + parsedResponse.data.b;

    const response = await prismaClient.sum.create({
        data:{
            a: parsedResponse.data.a,


            
            b: parsedResponse.data.b,
            result: result
        }
    })

    res.json({
        result: result,

        id: response.id
    })
})