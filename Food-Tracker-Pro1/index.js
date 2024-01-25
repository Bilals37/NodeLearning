const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importing Model
const userModel = require('./models/userModel');
const foodModel = require('./models/foodModel');
const trackingModel = require('./models/trackModel');
// Importing Token
const varifyToken = require('./varifyToken');

// Database Connection
mongoose.connect("mongodb://0.0.0.0:27017/helthyfy-pro")
    .then(() => {
        console.log("Datatbase Connection Sucessfull");
    })
    .catch((err) => {
        console.log(err);
    })
const app = express();
app.use(express.json())


// End Point For Registration
app.post("/register", (req, res) => {
    let user = req.body
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hpass) => {
                if (!err) {
                    user.password = hpass;
                    try {

                        let doc = await userModel.create(user)
                        res.status(201).send({ message: "User Registerd" })
                    }
                    catch (err) {
                        console.log(err);
                        res.status(500).send({ message: "Something Went Wrong" })
                    }
                }
            })
        }
    })
})


// End Point For Login
app.post("/login", async (req, res) => {
    let userCred = req.body
    try {
        const user = await userModel.findOne({ username: userCred.username })
        if (user !== null) {
            bcrypt.compare(userCred.password, user.password, (err, sucess) => {
                if (sucess == true) {
                    jwt.sign({ username: userCred.username }, "healthify", (err, token) => {
                        if (!err) {
                            res.send({ message: "Login Sucess", token: token })
                        }
                    })
                }
                else {
                    res.status(403).send({ message: "Incorrect password" })
                }
            })
        }
        else {
            res.status(404).send({ message: "User Not Found" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something Went Wrong" })
    }
})


// End Point For Fetchaing Data
app.get("/foods", varifyToken, async (req, res) => {
    try {
        let foods = await foodModel.find();
        res.send(foods)
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Some Thing went Wrong" })
    }
})


// End Point For Searching Food by name
app.get("/foods/:name", varifyToken, async (req, res) => {
    try {
        let searchFood = await foodModel.find({ name: { $regex: req.params.name, $options: "i" } })
        if (searchFood.length !== 0) {
            res.send(searchFood)
        }
        else {
            res.status(404).send({ message: "Food iteam not Found" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something Went Wrong" })
    }
})


// End Point To Insert Track Food
app.post("/track", varifyToken, async (req, res) => {
    let trackdata = req.body;

    try {
        let data = await trackingModel.create(trackdata)
        res.status(201).send({ message: "Food Added" })
    } catch (err) {
        res.status(500).send({ message: "Something went Wrong" })
    }
})


// End Point To Fetch Single Person Added Food
app.get("/track/:userID/:date", async (req, res) => {

    let userid = req.params.userID;
    let date = new Date(req.params.date);
    let strdate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    try {
        let userFood = await trackingModel.find({ userID: userid, eatenDate: strdate }).populate('userID').populate('foodID')
        res.send(userFood);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something Went Wrong" })
    }

})



app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});