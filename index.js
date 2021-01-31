require("dotenv").config();

const sql = require("mssql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Create a configuration object for our Azure SQL connection parameters
const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
    },
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Sent list of items");

    // This function connects to a SQL server, executes a SELECT statement,
    // and displays the results in the console.
    function getCustomers() {
        // Create connection instance
        const conn = new sql.ConnectionPool(dbConfig);

        conn.connect()
            // Successfull connection
            .then(function () {
                // Create request instance, passing in connection instance
                const req = new sql.Request(conn);

                // Call mssql's query method passing in params
                req.query("SELECT * FROM image")
                    .then(function (recordset) {
                        console.log(recordset);
                        conn.close();
                    })
                    // Handle sql statement execution errors
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    });
            })
            // Handle connection errors
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    }

    getCustomers();
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
