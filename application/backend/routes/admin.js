const { Router, response } = require('express');
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Admin route');
    next();
});

router.get('/GetUsers', async (request, response) => {
    const q = "SELECT * FROM FoodOrderSys.LoginDetails";
    const results = await db.promise().query(q);
    response.status(200).send(results[0]);
});

router.post('/login',async (request, response) => {
    
    const email = request.body.email.toLowerCase(); 
    const password = request.body.password;

    //query to return the row with correct email and pass from db
    const query = `SELECT *, COUNT(*) as count FROM FoodOrderSys.adminDetails WHERE email = '${email}' AND password = '${password}'`;

        try
        {    
            const validation = await db.promise().query(query);
            const emailExists = validation[0][0].count;

            if(emailExists > 0) 
            {
                // query to update the login status of a user 

                return response.status(200).json({message: "Login successful"});
            }
            else
            {
                return response.status(200).json({Failmessage: "Either Email or Password is invalid"});
            }

        }
        catch (error)
        {
            console.log(error);
            response.status(500).json({ error: "Internal Server Error" });
        }            

    });
module.exports = router;