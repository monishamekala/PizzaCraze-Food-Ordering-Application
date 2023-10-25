const { Router, response } = require('express');
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Users route');
    next();
});

router.get('/GetUsers', async (request, response) => {
    // const q = "SELECT * FROM FoodOrderSys.LoginDetails";
    // db.query(q, (err, data) =>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.LoginDetails');
    response.status(200).send(results[0]);
});

module.exports = router;