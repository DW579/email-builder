require("dotenv").config();

const sql = require("mssql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require("http");

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

                request
                    .query("SELECT * FROM client")
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
                request
                    .query(
                        "SELECT id FROM client WHERE name='" + client_name + "'"
                    )
                    .then(function (data) {
                        const client_id = data.recordset[0].id;

                        // Query for all mod names under client_id
                        request
                            .query(
                                "SELECT name FROM mod WHERE clientId=" +
                                    client_id
                            )
                            .then(function (data) {
                                res.json(data.recordset);

                                // Close DB connection after both queries are successful
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

// Post to download html file with selected mods
app.post("/api/download", (req, res) => {
    const client_name = req.body.clientName;
    // These mods are in the order the user wants them
    const selected_mods = req.body.selectedMods;

    function download() {
        // Open connection to DB
        const conn = new sql.ConnectionPool(dbConfig);

        // In DB connection, query for clientId, then query for html data
        conn.connect()
            .then(function () {
                const request = new sql.Request(conn);

                // Query DB for client id
                request
                    .query(
                        "SELECT id FROM client WHERE name='" + client_name + "'"
                    )
                    .then(function (data) {
                        const client_id = data.recordset[0].id;
                        let query = "SELECT name, html FROM mod WHERE clientId=" + client_id.toString() + " AND ";
                        let result_data = {
                            success: true,
                            html: ""
                        }

                        // Loop to create query string for selected mod's html
                        for (let i = 0; i < selected_mods.length; i++) {
                            query += "name='" + selected_mods[i] + "'";

                            if (i < selected_mods.length - 1) {
                                query += " OR ";
                            }
                        }

                        // Query DB for html of selected mods
                        request.query(query).then(function (data) {
                            let dict = {};

                            // Loop through recordset to create new dict with key:value = name:html
                            for (let i = 0; i < data.recordset.length; i++) {
                                dict[data.recordset[i].name] =
                                    data.recordset[i].html;
                            }

                            // Append mod htmls to result_data.html
                            for (let i = 0; i < selected_mods.length; i++) {
                                result_data.html += dict[selected_mods[i]];
                            }

                            // Send success true and html to client, to download html on client side
                            res.json(result_data)

                            conn.close();
                        });
                    })
                    .catch(function (err) {
                        // Send success false to client
                        res.json({ success: false })

                        console.log(err);
                        conn.close();
                    });
            })
            .catch(function (err) {
                // Send success false to client
                res.json({ success: false })
                
                console.log(err);
                conn.close();
            });

        // Then write html data into html file

        // Then download file
    }

    // Call function
    download();
});

// Get all sections from DB
app.get("/api/getAllSections", (req, res) => {
    function getAllSections() {
        const conn = new sql.ConnectionPool(dbConfig);

        conn.connect()
            .then(function () {
                const request = new sql.Request(conn);

                request
                    .query("SELECT * FROM section")
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
