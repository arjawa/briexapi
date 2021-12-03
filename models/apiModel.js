const {
  Pool
} = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


async function checkApikey(apikey, date) {
  let {
    rows
  } = await pool.query(
    "SELECT * FROM apilogs INNER JOIN users ON (users.apikey = apilogs.apikey) WHERE apilogs.apikey = $1",
    [apikey]
  );
  let data = rows[0];
  if (!data) return "Your apikey is invalid!";
  if (data.status !== 'verified') return "Please verify your account before using our service";
  if (rows.length === 1) {
    if (date > data.date) {
      await pool.query(
        "UPDATE apilogs SET total_request = 0, date = $1 WHERE apikey = $2",
        [date, apikey]
      );
      data.total_request = 0;
    }
    if (data.total_request >= data.limit) return "Your apikey has reached its maximum limit";
    let total_request = data.total_request + 1;
    let limitAdd = await pool.query(
      "UPDATE apilogs SET total_request = $1 WHERE apikey = $2",
      [total_request, apikey]
    );
    return limitAdd ? true: "Oops... something has broke when trying to process your request";
  }
}

module.exports = {
  checkApikey
};