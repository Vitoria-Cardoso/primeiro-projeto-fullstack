const pool = require("../config/db");

async function findByEmail(email) {
	const result = await pool.query(
		"SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1",
		[email],
	);
	return result.rows[0] || null;
}

module.exports = { findByEmail };
