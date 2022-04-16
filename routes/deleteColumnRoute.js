const route = require("express").Router();
const db = require("../models");

// delete column from table
route.delete("/:tableName", (req, res) => {
  var sql = `alter table ${req.params.tableName} drop column "${req.body.columnName}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

module.exports = route;
