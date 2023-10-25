const { Router } = require('express');
const db = require('../database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Users route');
    next();
});

router.use(cookieParser());

const verifyUser = (request, response, next) => {
    const token = request.cookies.token;
    if(!token){
        return response.status(200).json({message: 'Token needed!'});
    }else{
        jwt.verify(token, "OurPizzaCrazeApplicationTeam07Section04CSC848648", (err, decoded) => {
            if(err){
                return response.json({message: "Authentication Error!"});
            }else{
                request.username = decoded.username;
                request.userID = decoded.userID;
                next();
            }
        })
    }
}

router.get('/CurrentUser', verifyUser, async (request, response) => {
    return response.status(200).json({Status: "Success", userID: request.userID, username: request.username});
});

router.get('/GetUsers', async (request, response) => {
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.LoginDetails');
    response.status(200).send(results[0]);
});

router.post("/PostUsers", async (request, response) => {
    const password = request.body.password;
    const phone = request.body.phone;
    const username = request.body.username;
    const email = request.body.email.toLowerCase();

    //to check if the email exists
    const checkEmail = `SELECT COUNT(*) AS count FROM FoodOrderSys.LoginDetails WHERE email = '${email}'`;
    //if new user, then insert the users data
    const q = `INSERT INTO FoodOrderSys.LoginDetails (password, phone, email, username) VALUES ('${password}', '${phone}', '${email}', '${username}')`;
    
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
});

router.post('/login',async (request, response) => {
    
    const email = request.body.email.toLowerCase(); 
    const password = request.body.password;

    //query to return the row with correct email and pass from db
    const query = `SELECT *, COUNT(*) as count FROM FoodOrderSys.LoginDetails WHERE email = '${email}' AND password = '${password}'`;
    //query to update the loggenIN row for the loggedIn user
    const update = `UPDATE FoodOrderSys.LoginDetails SET loggedIn = 1 WHERE email = '${email}'`;

        try
        {    
            const validation = await db.promise().query(query);
            const emailExists = validation[0][0].count;

            if(emailExists > 0) 
            {
                // query to update the login status of a user 
                await db.promise().query(update);

                //cookie-token
                const username = validation[0][0].username;
                const userID = validation[0][0].userID;
                const token = jwt.sign({userID, username}, "OurPizzaCrazeApplicationTeam07Section04CSC848648", {expiresIn : '1d'});
                response.cookie('token', token);

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