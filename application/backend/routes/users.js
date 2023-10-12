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

router.post("/api/users", (req, res) => {
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

module.exports = router;