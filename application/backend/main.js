const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

const usersRoute = require('./routes/users');
const menuRoute = require('./routes/menu');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({
        origin: ["http://localhost:3000", "http://18.224.38.219/"],
        credentials: true,
        methods: ["POST", "GET"]
    }
));

app.use('/api/UsersController', usersRoute);
app.use('/api/MenuController', menuRoute);

app.listen(PORT, () => {
    console.log("Connected to backend! PORT:", PORT)
});