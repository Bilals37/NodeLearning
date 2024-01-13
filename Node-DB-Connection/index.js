const { timeStamp } = require('console');
const mongoose = require('mongoose');


mongoose.connect("mongodb://0.0.0.0:27017/api-connect")

    .then(() => {
        console.log("Connection Sucessfull");
    })

    .catch((err) => {
        console.log(err);
    })

// Schema

const useSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        max: [100, 'Max value should be less than equal to 100'],
        min: [10, 'Min value should be grater then equal to 10']
    },

    role: {
        type: String,
        enum: ["admin", "manager", "Seller"]
    }
}, { timestamps: true })

// Model

const userModel = mongoose.model("user", useSchema);

//  Inserting Data


// let users = {
//     name: "Abrar",
//     age: 41,
//     role: "admin"
// }

// userModel.create(users)
//     .then((data) => {
//         console.log(data);
//         console.log("Data inserted");
//     })
//     .catch((err) => {
//         console.log(err);
//     })



// Fetching data

// Find
// userModel.find({ name: "Abrar" })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// FindOne

// userModel.findOne({ name: "Bilal" })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// Sort Data

// userModel.find().sort({ age: -1 })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// Limit

// userModel.find().limit(1)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// DeleteOne

// userModel.deleteOne({ age: 11 })
//     .then((info) => {
//         console.log(info);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// Deletemany

// userModel.deleteMany({ name: 'Abrar' })
//     .then((info) => {
//         console.log(info);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


// update One

// userModel.updateOne({ name: 'Abrar' }, { age: 30 })
//     .then((info) => {
//         console.log(info);
//     })
//     .catch((err) => {
//         console.log(err);
//     })  