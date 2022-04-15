const express = require("express");
const app = express();

const db = require("./models");

app.use(express.urlencoded({ extended: false }));
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
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
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

// delete a table
app.delete("/delete-table/:tableName", (req, res) => {
  var sql = `DROP TABLE ${req.params.tableName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// alter a table
app.post("/alter-table/:tableName", (req, res) => {
  var sql = `ALTER TABLE ${req.params.tableName} ADD ${req.body.columnName} ${req.body.columnType}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// delete a column from a table
app.delete("/delete-column/:tableName", (req, res) => {
  var sql = `ALTER TABLE ${req.params.tableName} DROP COLUMN ${req.body.columnName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// get data via table name
app.get("/table/:table_name", (req, res) => {
  var sql = `select * from ${req.params.table_name}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// post data via table name
app.post("/table/:table_name", (req, res) => {
  var post = req.body;
  var sql = `insert into ${req.params.table_name} set ?`;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// delete data from table-name
app.delete("/table/delete/:table_name", (req, res) => {
  var sql = `delete from ${req.params.table_name} where ${req.body.toDeleteKey} = ${req.body.toDeleteValue}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

// select data via table name
app.get("/select/:table_name", (req, res) => {
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
      `'${req.body.value1}'` +
      " and " +
      `'${req.body.value2}'`;
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

// update data via table name
app.put("/table/update/:table_name", (req, res) => {
  var sql = `update ${req.params.table_name} set ? where id = ${req.body.id}`;
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    return res.status(200).send("Successfully");
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
