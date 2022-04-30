const express = require("express");
const app = express();

const cors = require("cors");

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(cors());

const db = require("./models");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// get
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all tables
app.get("/show-all-tables", (req, res) => {
  var sql = "show tables";
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
    // return res.status(200).send("Successfully");
  });
});

// create a new table
app.post("/create-table", (req, res) => {
  var sql = `CREATE TABLE ${req.body.tableName} (id INT AUTO_INCREMENT PRIMARY KEY)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// drop a table
app.use("/delete-table", require("./routes/deleteRoutes"));

// alter a table for adding a column
app.use("/alter-table", require("./routes/alterRoute"));

// delete-column route
app.use("/delete-column", require("./routes/deleteColumnRoute"));

// table routes
app.use("/table", require("./routes/tableRoutes"));

// select routes
app.use("/select", require("./routes/selectRoutes"));

// user routes for authentication
app.use("/user", require("./routes/userRoute"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
