const express = require('express');

const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/express-DB")
    .then(() => {
        console.log("Database Connection Sucessfull");
    })
    .catch((err) => {
        console.log(err);
    })



// Schema to Create Users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory"],
    },
    age: {
        type: Number,
        required: [true, "Age is mandatory"],
        min: [18, "Age must be more then 17 years"]
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Student", "Businessman", "Corp.Employe", "Gov.Employe"]
    }


}, { timestamps: true })


// Model Creation
const userModel = mongoose.model("users", userSchema)
const app = express();




// This is express inbuild middleware use to convert data into JSON's Parse and stringify property.
app.use(express.json());


// End point To fetch all user data once
app.get("/user", (req, res) => {

    userModel.find()
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            console.log(err);
            res.send("Can't Load the data")
        })


    // console.log('Get Request');
    // res.send({ message: 'Get Request for fetch all data' })
})


// End point To fetch single data throw query params
app.get("/user/:username", (req, res) => {

    userModel.findOne({ username: req.params.username })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err);
            res.send("User Not found")
        })

    // console.log(req.params.username);
    // res.send({ message: 'Get Request for fetch single data' })
})



// End point To Add data 
app.post("/user", (req, res) => {
    let user = req.body;

    userModel.create(user)
        .then((document) => {
            res.send({ data: document, message: "User Added" });
        })
        .catch((err) => {
            console.log(err);
            res.send({ message: "Some Issue While creating User. Try again" });
        });

    // Remove or move this line
    // res.send({ message: 'Request to Add data' });
});



// End point To datete data 
app.delete("/user/:username", (req, res) => {

    userModel.deleteOne({ username: req.params.username })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
    // console.log(req.params.username);
    // res.send({ message: "User deleted" })
})


// End point To Update data
app.put("/user/:username", (req, res) => {

    userModel.updateOne({ username: req.params.username })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })

    // console.log(req.params.username);
    // console.log(req.body);

    // res.send({ message: "User Updated" })

})


app.listen(8000, () => {
    console.log('Server is listening on port 8000');
})
