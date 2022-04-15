const express = require("express");
const app = express();

const db = require("./models");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// get all tables
app.get("/show-all-tables", (req, res) => {
  var sql = "show tables";
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// create a new table
app.post("/create-table", (req, res) => {
  var sql = `CREATE TABLE ${req.body.tableName} (id INT AUTO_INCREMENT PRIMARY KEY)`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// delete a table
app.delete("/delete-table/:tableName", (req, res) => {
  var sql = `DROP TABLE ${req.params.tableName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// alter a table
app.post("/alter-table/:tableName", (req, res) => {
  var sql = `ALTER TABLE ${req.params.tableName} ADD ${req.body.columnName} ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// delete a column from a table
app.delete("/delete-column/:tableName", (req, res) => {
  var sql = `ALTER TABLE ${req.params.tableName} DROP COLUMN ${req.body.columnName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// get data via table name
app.get("/:table_name", (req, res) => {
  var sql = `select * from ${req.params.table_name}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// post data via table name
app.post("/:table_name", (req, res) => {
  var post = req.body;
  var sql = `insert into ${req.params.table_name} set ?`;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// delete data from table name
app.delete("/:table_name/:id", (req, res) => {
  var sql = `delete from ${req.params.table_name} where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// select data via table name
app.get("/select/:table_name", (req, res) => {
  var clause = req.body.key + " = " + `'${req.body.value}'`;
  var sql = `select * from ${req.params.table_name} where ${clause};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
