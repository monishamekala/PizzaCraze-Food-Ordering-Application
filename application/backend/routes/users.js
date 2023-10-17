const { Router } = require('express');
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Users route');
    next();
});

router.get('/GetUsers', async (request, response) => {
    // const q = "SELECT * FROM FoodOrderSys.LoginDetails"
    // db.query(q, (err, data) =>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.LoginDetails');
    response.status(200).send(results[0]);
});

router.post("/PostUsers", async (request, response) => {
    const username = request.body.uname;
    const password = request.body.password;
    const phone = request.body.phone;
    const email = request.body.email;
    const q = `INSERT INTO FoodOrderSys.LoginDetails (username, password, phone, email) VALUES ('${username}', '${password}', '${phone}', '${email}')`;

    const insertUser = await db.promise().query(q);
    response.status(200).send(insertUser[0]);

    // db.query(q, [values], (err, data) =>{
    //     if(err) return res.json(err);
    //     return res.json("User has been registered successfully");
    // })
})

module.exports = router;