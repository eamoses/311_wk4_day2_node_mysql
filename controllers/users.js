const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  let sql = "SELECT ??, ?? FROM ?? WHERE ?? = ?";
  const replacements = ["id", "first_name", "users", "id", req.params.id];
  sql = mysql.format(sql, replacements);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
  const replacements = ["users", "first_name", "last_name", "Shmemily", "Shmoses"]
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  const replacements = 
    ["users", 
    "first_name", "ChangedFirstName", 
    "last_name", "ChangedLastName", 
    "id", req.params.id]
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  console.log(req.params)
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  const replacements = ["users", "first_name", req.params.first_name]
  sql = mysql.format(sql, replacements)
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}