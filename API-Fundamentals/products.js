const http = require('http');
const fs = require('fs');
const url = require('url');


// HTTP server is created

http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);

    // JSON file is readed Sync and inserted in variable
    let productDet = fs.readFileSync("./products.json", "utf-8");


    // Authontication to fetch the data from other origen for ex.(HTML documnent)
    res.setHeader("Access-Control-Allow-Origin", "*") // * means from any origin

    // Authontication to Update the date from other origin for ex.(HTML document) 
    res.setHeader("Access-Control-Allow-Headers", "*") // * means from any origin


    // end point to fetch all the data
    if (parseUrl.pathname === "/products" && req.method === "GET" && parseUrl.query.id === undefined) {
        res.end(productDet);
    }

    // end point to fetch single product throw ID
    else if (parseUrl.pathname === "/products" && req.method === "GET" && parseUrl.query.id !== undefined) {
        let productArray = JSON.parse(productDet);
        let products = productArray.find((product) => product.id == parseUrl.query.id);
        if (products !== undefined) {
            res.end(JSON.stringify(products));
        } else {
            res.end(JSON.stringify({ "message": "Product Not Found" }));
        }
    }

    // end point to add data in JSON file
    else if (req.method === "POST" && parseUrl.pathname === "/products") {
        let nProduct = "";
        req.on("data", (chunk) => {
            nProduct += chunk;
        });
        req.on("end", () => {
            let productArray = JSON.parse(productDet);
            let newProduct = JSON.parse(nProduct);
            productArray.push(newProduct);
            fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
                if (err === null) {
                    res.end(JSON.stringify({ "message": "New Product is Added" }));
                }
            });
        });
    }

    // end point to update the JSON file
    else if (req.method === "PUT" && parseUrl.pathname === "/products") {
        let nProduct = "";
        req.on("data", (chunk) => {
            nProduct += chunk;
        });
        req.on("end", () => {
            let productArray = JSON.parse(productDet);
            let updProduct = JSON.parse(nProduct);
            let index = productArray.findIndex((product) => product.id == parseUrl.query.id);
            if (index !== -1) {
                productArray[index] = updProduct;
                fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
                    if (err === null) {
                        res.end(JSON.stringify({ "message": "Product is Updated" }));
                    } else {
                        res.end(JSON.stringify({ "message": "Something went wrong" }));
                    }
                });
            } else {
                res.end(JSON.stringify({ "message": "Product Not Found" }));
            }
        });
    }

    //   end point to delete the data
    else if (req.method === "DELETE" && parseUrl.pathname === "/products") {
        let productArray = JSON.parse(productDet);
        let index = productArray.findIndex((product) => product.id == parseUrl.query.id);
        if (index !== -1) {
            productArray.splice(index, 1);
            fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
                if (err === null) {
                    res.end(JSON.stringify({ "message": "Product Successfully Deleted" }));
                } else {
                    res.end(JSON.stringify({ "message": "Something went wrong" }));
                }
            });
        } else {
            res.end(JSON.stringify({ "message": "Product Not Found" }));
        }
    }

}).listen(3000); // On this PORT no server will listen => 127.0.0.1:3000
