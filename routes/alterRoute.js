const route = require("express").Router();
const db = require("../models");

// alter table to add column
route.put("/:tableName", (req, res) => {
  var sql = `alter table ${req.params.tableName} add ${req.body.columnName} ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

module.exports = route;
