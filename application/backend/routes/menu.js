const { Router, response } = require('express');
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Menu route');
    next();
});

router.get('/GetMenu', async (request, response) => {
    // const q = "SELECT * FROM FoodOrderSys.MenuTable";
    // db.query(q, (err, data) =>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.MenuTable');
    response.status(200).send(results[0]);
});

router.get("/searchBar/:query", async (req, response) => {
    //const searchTerm = req.params.query;
    //const q = "SELECT * FROM FoodOrderSys.MenuTable WHERE name LIKE ? OR category LIKE ?";
    //const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
    // db.query(q, values, (err, data) =>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // });
    const searchTerm = req.params.query;
    const q = `SELECT * FROM FoodOrderSys.MenuTable WHERE name LIKE '%${searchTerm}%' OR category LIKE '%${searchTerm}%'`
    //const q = "SELECT * FROM FoodOrderSys.MenuTable WHERE name LIKE ? OR category LIKE ?";
    //const values = [`%${searchTerm}%`, `%${searchTerm}%`];
    const results = await db.promise().query(q);
    response.status(200).send(results[0]);
});

module.exports = router;