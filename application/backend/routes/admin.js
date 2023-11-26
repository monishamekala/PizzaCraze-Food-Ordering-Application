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

router.get('/GetMenu', async (request, response) => {
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.MenuTable');
    response.status(200).send(results[0]);
});

router.get('/get-orders', async (request, response) => {
    const getOrders = `SELECT * FROM FoodOrderSys.OrderTable`;

    const orders = await db.promise().query(getOrders);
    return response.status(200).json(orders[0]);
})

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
                return response.status(200).json({id: validation[0][0].id, message: "Login successful"});
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

router.post('/update-order-status',async (request, response) => {
    const orderID = request.body.orderID; 
    const newStatus = request.body.selectedStatus;

    console.log(orderID);
    console.log(newStatus);

    //query to update the order status with order ID = orderID from request
    const UpdateStatus = `UPDATE FoodOrderSys.OrderTable SET order_status = '${newStatus}' WHERE orderID = '${orderID}'`;
        try
        {    
            await db.promise().query(UpdateStatus);
            return response.status(200).json({message: "Success"});
        }
        catch (error)
        {
            return response.status(500).json({ error: "Internal Server Error" });
        }            

});

router.get('/get-status/:orderID', async (request, response) => {
    const orderID = request.params.orderID;
    const getOrderStatus = `SELECT OrderTable.order_status FROM FoodOrderSys.OrderTable WHERE OrderTable.orderID = ${orderID}`;
    try{
        const orderStatus = await db.promise().query(getOrderStatus);
        return response.status(200).json(orderStatus[0][0].order_status);
    }catch(err){
        response.status(500).json({ error: "Internal Server Error" });
    }
    
})

router.get('/get-order-details/:orderID', async (request, response) => {
    const orderID = request.params.orderID;
    const getOrderDetails = `SELECT 
                                LoginDetails.username as UserName,
                                AddressBook.*,
                                cartItemsTable.*, 
                                MenuTable.name AS Item, MenuTable.price AS Price
                            FROM 
                                FoodOrderSys.OrderTable
                            JOIN
                                FoodOrderSys.LoginDetails ON LoginDetails.userID = OrderTable.order_userID
                            JOIN 
                                FoodOrderSys.AddressBook ON AddressBook.addressID = OrderTable.order_addressID
                            JOIN
                                FoodOrderSys.cartItemsTable ON cartItemsTable.cartID = OrderTable.cartID_order
                            JOIN
                                FoodOrderSys.MenuTable ON cartItemsTable.cart_menuID = MenuTable.menu_ID
                            WHERE 
                                OrderTable.orderID = ${orderID}`;

    const orderDetails = await db.promise().query(getOrderDetails);
    return response.status(200).json(orderDetails[0]);
})


module.exports = router;