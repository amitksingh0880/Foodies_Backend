const express = require('express')
const Displayrouter = express.Router()

Displayrouter.post('/foodData', (req,res)=>{
    try {
        res.send([global.food_items, global.food_Category])
    } catch (error) {
        console.error(error.message);
        res.send("server Error")
    }
})

module.exports =  { Displayrouter}