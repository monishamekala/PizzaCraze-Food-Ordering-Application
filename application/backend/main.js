import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"csc648-848-team07.clcqreadezd8.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CSCTeam07",
    database: "FoodOrderSys"
})

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

app.listen(8800, () => {
    console.log("Connected to backend!")
})