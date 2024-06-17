import express from "express";

export const app = express();

app.use(express.json());

app.post('/sum', (req, res) => {
    const a:number = req.body.a;
    const b:number = req.body.b;

    const result:number = a + b;

    res.status(200).json({
        result
    })
})