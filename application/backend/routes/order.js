const { Router } = require('express');
const db = require('../database');
const flash = require('express-flash');
const { Console } = require('console');

const router = Router();
router.use(flash());

router.use((request, response, next) => {
    console.log('Request made to /Order route');
    next();
});

router.get('/get-address/:query', async (request, response) => {
    const userID = request.params.query;
    const address = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.AddressBook WHERE address_userID = '${userID}'`;

    try{
        const addressResult = await db.promise().query(address);
        if (addressResult[0][0].count === 0){
            return response.status(200).json({Message: "No Address Added"});
        }else{
            console.log(addressResult[0][0]);
            return response.status(200).json({data:addressResult[0][0]});
        }
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
});

module.exports = router;