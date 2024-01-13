const express = require('express');


const app = express();

// This is express inbuild middleware use to convert data into JSON's Parse and stringify property.
app.use(express.json());


// To fetch all user data once
app.get("/user", (req, res) => {
    console.log('Get Request');
    res.send({ message: 'Get Request for fetch all data' })
})


// To fetch single data throw query params
app.get("/user/:username", (req, res) => {
    console.log(req.params.username);
    res.send({ message: 'Get Request for fetch single data' })
})


// To Add data 
app.post("/user", (req, res) => {

    console.log(req.body);

    res.send({ message: 'Request to Add data' })


    // We use the below process in HTTP method to Insert data to avoid all this process
    // we will use inbuild middle ware of express which is import at the starting
    // app.use(express.json());

    // let user = "";
    // req.on("data", (chunk) => {
    //     user += chunk
    // })
    // req.on("end", () => {
    //     console.log(JSON.parse(user));
    // })
})


// To datete data 
app.delete("/user/:username", (req, res) => {

    console.log(req.params.username);
    res.send({ message: "User deleted" })
})


// To Update data
app.put("/user/:username", (req, res) => {

    console.log(req.params.username);
    console.log(req.body);

    res.send({ message: "User Updated" })

})



// MiddelWare

// app.get("/test/:id", middleware, (req, res) => {
//     res.send({ message: "Username is found" })
// })

// function middleware(req, res, next) {
//     if (req.params.id < 1) {
//         res.send("user not found")
//     }
//     else {
//         next()
//     }
// }




app.listen(8000, () => {
    console.log('Server is listening on port 8000');
})
