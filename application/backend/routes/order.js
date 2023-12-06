const { Router } = require('express');
const db = require('../database');
const flash = require('express-flash');
const { TwitterApi } = require('twitter-api-v2');

const router = Router();
router.use(flash());

router.use((request, response, next) => {
    console.log('Request made to /Order route');
    next();
});

router.get('/get-address/:query', async (request, response) => {
    const userID = request.params.query;
    const address = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.AddressBook WHERE address_userID = '${userID}' GROUP BY addressID`;

    try{
        const addressResult = await db.promise().query(address);
        if (addressResult[0][0].count === 0){
            return response.status(200).json({Message: "No Address Added"});
        }else{
            return response.status(200).json(addressResult[0]);
        }
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
});

router.post("/add-address", async (request, response) => {
    const address = request.body.Postaddress;
    const userID = request.body.userID;
    
    // Adding address to the table
    const addAddress = `INSERT INTO FoodOrderSys.AddressBook (address_userID, line1, line2, apt, zipcode) VALUES ('${userID}', '${address.line1}', '${address.line2}', '${address.apt}', '${address.zipcode}')`;
    
    try {
        await db.promise().query(addAddress);
        return response.status(200).json({Message: "Added successfully"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/confirm-order", async (request, response) => {
    const addressID = request.body.orderdetails.address;
    const paymethod = request.body.orderdetails.paymentmethod;
    const userID = request.body.userID;
    
    // get the cartID to add to the orderTable
    const getCartID = `SELECT cartID FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

    //update cart_status to "Ordered" once order is confirmed
    const cartStatusToOrdered = `UPDATE FoodOrderSys.cartTable SET cart_status = 'Ordered' WHERE cart_userID = '${userID}'`;
    
    try {
        const Q_cartID = await db.promise().query(getCartID);

        //Insert the order details to orderTable
        const InsertOrderDetails = `INSERT INTO FoodOrderSys.OrderTable (order_userID, order_addressID, paymethod, cartID_order) VALUES ('${userID}', '${addressID}', '${paymethod}', '${Q_cartID[0][0].cartID}')`;

        await db.promise().query(InsertOrderDetails);
        await db.promise().query(cartStatusToOrdered);

        return response.status(200).json({Message: "Added successfully"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get-orders/:userID', async (request, response) => {
    const userID = request.params.userID;

    const getOrdersQuery = `
        SELECT * 
        FROM FoodOrderSys.OrderTable 
        WHERE order_userID = '${userID}'
        ORDER BY order_date DESC;
    `;

    try {
        const orders = await db.promise().query(getOrdersQuery);
        return response.status(200).json(orders[0]);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/tweet-order", async (request, response) => {

    const client = new TwitterApi({
        appKey: "ABhMRzAcyrNSVzeefOtxOcmwa",
        appSecret: "dpfCohIMk8cC2jr2oz7BREIkj8W2ekO7eHqxxWhatPe9G5Glr5",
        accessToken: "1729735088072757248-PpcAKarhBmj1vx0NBjBpJGRga148hC",
        accessSecret: "AEE45u6OygnhwzxRnwHJokDj0Oc3n0vPlJ3IvJqgkylyM",
    });
    
    const rwClient = client.readWrite; 

    try { 
  
        // Use .tweet() method and pass the 
        // text you want to post 
        await rwClient.v2.tweet("This tweet has been created using nodejs"); 
        console.log("success"); 

        // const mediaId = await client.v1.uploadMedia( 
  
        //     // Put path of image you wish to post 
        //     "https://i.imgur.com/BZBHsauh.jpg"
        // ); 
  
        // Use tweet() method and pass object with text  
        // in text feild and media items in media feild 
        await rwClient.v2.tweet({ 
            text:  "Twitter is a fantastic social network. Look at this:", 
            media: { media_ids: [mediaId] }, 
        }); 
        console.log("success"); 

    } catch (error) { 
        console.log(error); 
    } 
});

module.exports = router;