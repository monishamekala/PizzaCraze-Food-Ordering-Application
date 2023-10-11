import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"csc648-848-team07.clcqreadezd8.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CSCTeam07",
    database: "FoodOrderSys"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is backend")
})


app.get("/users", (req, res) => {
    const q = "SELECT * FROM FoodOrderSys.LoginDetails"
    db.query(q, (err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/menu", (req, res) => {
    const q = "SELECT * FROM FoodOrderSys.MenuTable"
    db.query(q, (err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/searchBar/:query", (req, res) => {
    const searchTerm = req.params.query;
    const q = "SELECT * FROM FoodOrderSys.MenuTable WHERE name LIKE ? OR category LIKE ?";

    const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

    db.query(q, values, (err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/users", (req, res) => {
    const q = "INSERT INTO FoodOrderSys.LoginDetails (`username`, `password`, `phone`, `email`) VALUES (?)";

    const values = [
        req.body.uname,
        req.body.password,
        req.body.phone,
        req.body.email
    ];

    db.query(q, [values], (err, data) =>{
        if(err) return res.json(err);
        return res.json("User has been registered successfully");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})