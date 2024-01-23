const express = require('express'); // Express is a easy and handy node package which  helps to create http methods very Easyle

const mongoose = require('mongoose'); //Mongoose is use to Create connection between Server and DataBase and to store data 

const bcrypt = require('bcryptjs'); //Bcrypt is use to convert plan password into hash key in DataBase

const jwt = require('jsonwebtoken');  //JSON Web Token it is use to make Connection between user and server when user is sucessfully login 


// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/authontication')
    .then(() => {
        console.log("Connection Sucessfull");
    })
    .catch((err) => {
        console.log(err);
    })


// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamp: true })



// Model For User
const userModel = mongoose.model("users", userSchema)

const app = express()
app.use(express.json())


// Registration End Point
app.post("/register", (req, res) => {
    let user = req.body

    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, (err, hpass) => {
                if (!err) {
                    user.password = hpass
                    userModel.create(user)
                        .then((doc) => {
                            res.status(201).send({ message: "User Created Sucessfully" })
                        })
                        .catch((err) => {
                            res.status(500).send({ message: "Unable to create User" })
                        })
                }
            })
        }
    })

})


// Login End Point
app.post("/login", (req, res) => {
    let userCred = req.body;

    userModel.findOne({ username: userCred.username })
        .then((user) => {
            if (user !== null) {

                // Compare the password store in database and provided by user while login
                bcrypt.compare(userCred.password, user.password, (err, result) => {
                    if (err) {
                        res.send({ message: "Internal Server Error" });
                        return;
                    }

                    if (result === true) {

                        // generate a token and send it back 
                        jwt.sign({ username: userCred.username }, 'bilalskey', (err, token) => {
                            if (!err) {
                                res.send({ token: token })
                            }
                            else {
                                res.send({ message: "Some Problem while creating Token" })
                            }

                        })

                    } else {
                        res.status(401).send({ message: "Incorrect Password" });
                    }
                });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        })
        .catch((err) => {
            res.send({ message: "Internal Server Error" });
        });
});


// Dummy End point to Check Token varification
app.get('/post', varifyToken, (req, res) => {
    res.send({ message: "Hello! Welcome you have verified Token" })
})



function varifyToken(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "bilalskey", (err, data) => {
        if (!err) {
            console.log(data);
            next()
        }
        else {
            res.status(401).send({ message: "Token is not valid" })
        }
    })


}



app.listen(8000, () => {
    console.log("Server is Running");

})