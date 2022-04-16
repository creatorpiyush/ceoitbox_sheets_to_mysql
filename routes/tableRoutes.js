const route = require("express").Router();
const db = require("../models");

// get all data from table
route.get("/:tableName", (req, res) => {
  var sql = `select * from ${req.params.tableName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
    // return res.status(200).send("Successfully");
  });
});

// post data to table
route.post("/:tableName", (req, res) => {
  var post = req.body;
  var sql = `insert into ${req.params.tableName} set ?`;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// get column names from table
route.get("/column-name/:tableName", (req, res) => {
  var sql = `show columns from ${req.params.tableName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

// delete data from table
route.delete("/delete-row/:tableName", (req, res) => {
  var sql = `delete from ${req.params.tableName} where ${req.body.columnName} = '${req.body.columnValue}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
    // return res.status(200).send("Successfully");
  });
});

// update data in table
route.put("/update/:tableName", (req, res) => {
  var sql = `update ${req.params.tableName} set ? where ${req.body.columnName} = '${req.body.columnValue}`;
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

module.exports = route;
