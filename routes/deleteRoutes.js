const route = require("express").Router();
const db = require("../models");

// drop table
route.delete("/:tableName", (req, res) => {
  var sql = `drop table ${req.params.tableName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

module.exports = route;
