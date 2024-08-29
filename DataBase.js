const mongoose = require("mongoose");

require("dotenv").config();

const DB = process.env.MURL;

const DataBase = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
        });

        const fetch_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetch_data;
        console.log(global.food_items);
        const fetch_Category = await mongoose.connection.db.collection("food_Category").find({}).toArray();
        global.food_Category = fetch_Category;
        console.log(global.food_Category);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = { DataBase };
