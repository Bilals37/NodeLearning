const http = require('http');





http.createServer((req, res) => {
    console.log(req.url);
    // console.log(req.method);
    // res.end("How are you?")
    if (req.url == "/about" && req.method == "UPDATE") {
        res.end("I am About")
    }
    if (req.url == "/about" && req.method == "DELETE") {
        res.end("I am About")
    }
    else if (req.url == "/service" && req.method == "GET") {
        res.end("I am Service")
    }
    else if (req.url == "/service" && req.method == "POST") {
        res.end("I am Service")
    }
}).listen(8000)
