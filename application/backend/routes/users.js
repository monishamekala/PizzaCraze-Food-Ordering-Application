const { Router } = require('express');
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Users route');
    next();
});

router.get('/GetUsers', async (request, response) => {
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.LoginDetails');
    response.status(200).send(results[0]);
});

router.post("/PostUsers", async (request, response) => {
    const password = request.body.password;
    const phone = request.body.phone;
    const email = request.body.email.toLowerCase();
    const checkEmail = `SELECT COUNT(*) AS count FROM FoodOrderSys.LoginDetails WHERE email = '${email}'`;
    const q = `INSERT INTO FoodOrderSys.LoginDetails (password, phone, email) VALUES ('${password}', '${phone}', '${email}')`;

    try {

        const countOfEmail = await db.promise().query(checkEmail);
        const countNum = countOfEmail[0][0].count;

        //if the email given by the user does not exist in the database then insert
        if (countNum === 0){

            const insertUser = await db.promise().query(q);
            response.status(200).json({ message: "You have registered successfully" });

        }
        //if email is already there in the database then say so to the user
        else{
            response.status(200).json({ message: "Email is already used." });
            return;
        }

    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;