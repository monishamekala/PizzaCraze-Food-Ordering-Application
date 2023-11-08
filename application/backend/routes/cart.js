const { Router } = require('express');
const db = require('../database');
const flash = require('express-flash');
const { Console } = require('console');

const router = Router();
router.use(flash());

router.use((request, response, next) => {
    console.log('Request made to /Cart route');
    next();
});

router.post("/add-to-cart", async (request, response) => {
    const item = request.body.item;
    const userID = request.body.user;
    
    // to check if the userid exists and status of cart is "In Cart"
    const checkCartExists = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

    //if no cart exists for user
    const InsertCart = `INSERT INTO FoodOrderSys.cartTable (cart_userID, cart_status) VALUES ('${userID}', "In Cart")`;
    
    try {

        const ResultcheckCart = await db.promise().query(checkCartExists);
        const ifexists = ResultcheckCart[0][0].count;

        //if the email given by the user does not exist in the database then insert
        if (ifexists === 0){
            await db.promise().query(InsertCart);

            const getCartID = `SELECT * FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

            const ResultCartID = await db.promise().query(getCartID);
            const cartID = ResultCartID[0][0].cartID;

            //to insert items into cartItemsTable
            const InsertItems = `INSERT INTO FoodOrderSys.cartItemsTable (cartID, cart_menuID, cheese_level, sauce_level, meat_level, spice_level) VALUES ('${cartID}', '${item.itemID}', '${item.cheese}', '${item.sauce}', '${item.meat}', '${item.spice}')`;

            await db.promise().query(InsertItems);
            request.flash("success", "Added to cart");
            return response.status(200).json({ message: "Inserted new cart" });

        }
        //if email is already there in the database then say so to the user
        else{
            const ExistingcartID = ResultcheckCart[0][0].cartID;

            const InsertItemsToOldCart = `INSERT INTO FoodOrderSys.cartItemsTable (cartID, cart_menuID, cheese_level, sauce_level, meat_level, spice_level) VALUES ('${ExistingcartID}', '${item.itemID}', '${item.cheese}', '${item.sauce}', '${item.meat}', '${item.spice}')`;

            await db.promise().query(InsertItemsToOldCart);
            // response.flash("success", "Added to cart");
            return response.status(200).json({ message: "Inserted to existing cart" });
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get-cart-items/:query', async (request, response) => {
    const userID = request.params.query;
    const query_cartID = `SELECT COUNT(*) AS count, cartID FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

    try{
        const cartID = await db.promise().query(query_cartID);
        if (cartID[0][0].count === 0){
            return response.status(200).json({Message: "Your cart is empty"});
        }
        else{
            const getItemsQuery = `SELECT C.*, M.* FROM cartItemsTable C, MenuTable M WHERE C.cartID = '${cartID[0][0].cartID}' and C.cart_menuID = M.menu_id`;
            const getItems = await db.promise().query(getItemsQuery);
            response.status(200).send(getItems[0]);
        }
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
    // response.status(200).send(results[0]);
});

router.post("/remove-from-cart", async (request, response) => {
    const itemID = request.body.itemID;
    const itemName = request.body.name;
    
    // removing item from cart using the cart_itemID
    const removeItem = `DELETE FROM FoodOrderSys.cartItemsTable WHERE cart_itemID = '${itemID}'`;
    
    try {
        await db.promise().query(removeItem);
        return response.status(200).json({ message: `Removed '${itemName}' from your cart`, success: "Yes"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
