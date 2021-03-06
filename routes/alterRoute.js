const route = require("express").Router();
const db = require("../models");

// alter table to add column
route.put("/:tableName", (req, res) => {
  var sql = `alter table ${req.params.tableName} add "${req.body.columnName}" ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// alter column type
route.put("/alter-column-type/:tableName", (req, res) => {
  var sql = `alter table ${req.params.tableName} modify "${req.body.columnName}" ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// rename column name
route.put("/rename-column/:tableName", (req, res) => {
  var sql = `alter table ${req.params.tableName} change "${req.body.oldColumnName}" "${req.body.newColumnName}" ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

module.exports = route;
