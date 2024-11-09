import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req:any, res:any) => res.send("Hello"));

app.listen(PORT);