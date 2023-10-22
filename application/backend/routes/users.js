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

router.post('/login',async (request, response) => {
    
    const email = request.body.email.toLowerCase(); //uname will be email
    const password = request.body.password;
    console.log(email);
    //query to return the row with correct email and pass from db
    const query = `SELECT COUNT(*) as count FROM FoodOrderSys.LoginDetails WHERE email = '${email}' AND password = '${password}'`
    const update = `UPDATE FoodOrderSys.LoginDetails SET loggedIn = 1 WHERE email = '${email}'`

        try
        {    
            const validation = await db.promise().query(query)
            const emailExists = validation[0][0].count
            console.log(emailExists);
            if(emailExists > 0) //change to validation
            {
                // query to update the login status of a user 
                await db.promise().query(update);
                console.log("logged in successfull");
                return response.status(200).json({message: "Login successful"});
                response.redirect('/menu');
            }
            else
            {
                return response.status(200).json({message: "Either Email or Password is invalid"});
            }

        }
        catch (error)
        {
            response.status(500).json({ error: "Internal Server Error" });
        }            

    
});  
/*
logout:

router.post('/logout')
*/


module.exports = router;