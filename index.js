const express = require('express');
const cors = require('cors');
const { DataBase } = require('./DataBase');
const { UserRouter } = require('./Routes/User.routes');
const { Displayrouter } = require('./Routes/Display.routes');
const { OrderRouter } = require('./Routes/Order.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.options('*', cors());

app.use(express.json());

// Routes
app.use("/user", UserRouter);
app.use("/display", Displayrouter);
app.use("/orders" , OrderRouter);
app.get("/" , (req,res) =>{
    res.send({
        message: "api is working"
    })
 })

// Start the server and connect to the database
DataBase(); // Connect to the database

// Start the Express server
app.listen(port, async() => {
    try {
        await DataBase; // Connect to the database
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
    console.log(`Server is running on port ${port}`);
});

// Call the function to start the server

