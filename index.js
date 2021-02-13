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
        enableArithAbort: true,
    },
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Allow app to use bodyParser on json
app.use(bodyParser.json());

// Get all clients from DB
app.get("/api/getAllClients", (req, res) => {
    function getAllClients() {
        const conn = new sql.ConnectionPool(dbConfig);

        conn.connect()
            .then(function () {
                const request = new sql.Request(conn);

                request.query("SELECT * FROM client")
                    .then(function (data) {
                        res.json(data.recordset);
                        conn.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    }

    getAllClients();
});

// Get all mods associated with selected client
app.post("/api/getAllMods", (req, res) => {
    const client_name = req.body.clientName;

    function getAllMods() {
        const conn = new sql.ConnectionPool(dbConfig);

        conn.connect()
            .then(function () {
                const request = new sql.Request(conn);

                // Query for client id
                request.query("SELECT id FROM client WHERE name='" + client_name + "'")
                    .then(function (data) {
                        const client_id = data.recordset[0].id;

                        // Query for all mod names under client_id
                        request.query("SELECT name FROM mod WHERE clientId=" + client_id)
                            .then(function (data) {
                                res.json(data.recordset);

                                conn.close();
                            })
                            .catch(function (err) {
                                console.log(err);
                                conn.close();
                            });

                        // conn.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    }

    // Run function
    getAllMods();
});

// Get all sections from DB
app.get("/api/getAllSections", (req, res) => {
    function getAllSections() {
        const conn = new sql.ConnectionPool(dbConfig);

        conn.connect()
            .then(function () {
                const request = new sql.Request(conn);

                request.query("SELECT * FROM section")
                    .then(function (data) {
                        res.json(data.recordset);
                        conn.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    }

    getAllSections();
});

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
