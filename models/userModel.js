const {
  Pool
} = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


async function userLogin(email) {
  let {
    rows
  } = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND status = 'verified'",
    [email]
  );
  if (rows.length === 1) return rows[0];
}

async function addUser(email, password, apikey, uniqueString, date) {
  try {
    let isExistsEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (isExistsEmail.rows.length >= 1) return;
    let query = await pool.query(
      "INSERT INTO users (email, password, apikey, status) VALUES ($1, $2, $3, $4)",
      [email, password, apikey, uniqueString]
    );
    pool.query(
      "INSERT INTO apilogs (apikey, date) VALUES ($1, $2)",
      [apikey, date]
    );
    if (query) return true;
  } catch(e) {
    console.log(e);
  }
}

async function verifyUser(uniqueString) {
  let query = await pool.query(
    "SELECT * FROM users WHERE status = $1",
    [uniqueString]
  );
  if (query.rows.length === 1) {
    let verify = pool.query(
      "UPDATE users SET status = 'verified' WHERE status = $1",
      [uniqueString]
    );
    if (verify) return query.rows[0];
  }
}

async function updateStatus(email, uniqueString) {
  let isExistsEmail = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (isExistsEmail.rows.length < 1) return;
  let query = await pool.query(
    "UPDATE users SET status = $1 WHERE email = $2",
    [uniqueString, email]
  );
  if (query) return true;
}

async function updatePassword(oldPassword, newPassword) {
  let query = await pool.query(
    "UPDATE users SET password = $1 WHERE password = $2",
    [newPassword, oldPassword]
  );
  if (query) return true;
}

module.exports = {
  userLogin,
  addUser,
  verifyUser,
  updateStatus,
  updatePassword
};