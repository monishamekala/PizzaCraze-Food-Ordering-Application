const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

const usersRoute = require('./routes/users');
const menuRoute = require('./routes/menu');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/UserController', usersRoute);
app.use('/api/MenuController', menuRoute);

app.listen(PORT, () => {
    console.log("Connected to backend! PORT:", PORT)
});