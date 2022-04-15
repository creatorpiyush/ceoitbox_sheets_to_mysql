const route = require("express").Router();
const db = require("../models");

// select data via table name
route.get("/:table_name", (req, res) => {
  let condition = req.body.condition;
  if (condition == "equal") {
    var clause = req.body.key + " = " + `'${req.body.value}'`;
    var sql = `select * from ${req.params.table_name} where ${clause};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  } else if (condition == "greater") {
    var clause = req.body.key + " > " + `'${req.body.value}'`;
    var sql = `select * from ${req.params.table_name} where ${clause};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  } else if (condition == "less") {
    var clause = req.body.key + " < " + `'${req.body.value}'`;
    var sql = `select * from ${req.params.table_name} where ${clause};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  } else if (condition == "like") {
    var clause = req.body.key + " like " + `'%${req.body.value}%'`;
    var sql = `select * from ${req.params.table_name} where ${clause};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  } else if (condition == "between") {
    var clause =
      req.body.key +
      " between " +
      `'${req.body.valueGreater}'` +
      " and " +
      `'${req.body.valueLess}'`;
    var sql = `select * from ${req.params.table_name} where ${clause};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  } else {
    var sql = `select * from ${req.params.table_name};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      // return res.status(200).send(result);
      return res.status(200).send("Successfully");
    });
  }
});

module.exports = route;
