const pool = require("../config/db");

async function addToBlacklist(token, expiresAt) {
	await pool.query(
		`INSERT INTO token_blacklist (token, expires_at) VALUES ($1, $2)`,
		[token, expiresAt],
	);
}

async function isBlacklisted(token) {
	const result = await pool.query(
		`SELECT id FROM token_blacklist WHERE token = $1 AND expires_at > NOW()`,
		[token],
	);
	return result.rows.length > 0;
}

module.exports = { addToBlacklist, isBlacklisted };
