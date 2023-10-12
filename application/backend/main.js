const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//import express from "express";
//import mysql from "mysql";
// import cors from "cors";
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSW,
//     database: process.env.DB_SCHEMA,
//     port: process.env.DB_PORT
// })

const usersRoute = require('./routes/users');
const menuRoute = require('./routes/menu');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/UserController', usersRoute);
app.use('/api/MenuController', menuRoute);


// app.get("/api", (req, res) => {
//     res.json("hello this is backend")
// })


// app.get("/api/users", (req, res) => {    
//     const q = "SELECT * FROM FoodOrderSys.LoginDetails"
//     db.query(q, (err, data) =>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

// app.get("/api/menu", (req, res) => {
//     const q = "SELECT * FROM FoodOrderSys.MenuTable";
//     db.query(q, (err, data) =>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

// app.get("/api/searchBar/:query", (req, res) => {
//     const searchTerm = req.params.query;
//     const q = "SELECT * FROM FoodOrderSys.MenuTable WHERE name LIKE ? OR category LIKE ?";

//     const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

//     db.query(q, values, (err, data) =>{
//         if(err) return res.json(err)
//         return res.json(data)
//     });
// });

// app.post("/api/users", (req, res) => {
//     const q = "INSERT INTO FoodOrderSys.LoginDetails (`username`, `password`, `phone`, `email`) VALUES (?)";

//     const values = [
//         req.body.uname,
//         req.body.password,
//         req.body.phone,
//         req.body.email
//     ];

//     db.query(q, [values], (err, data) =>{
//         if(err) return res.json(err);
//         return res.json("User has been registered successfully");
//     })
// })

app.listen(PORT, () => {
    console.log("Connected to backend! PORT:", PORT)
});