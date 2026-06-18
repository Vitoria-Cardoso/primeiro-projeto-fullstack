const pool = require("../config/db");

async function searchCountries({ q, region, limit = 20, offset = 0 }) {
	let sql = `
    SELECT id, name, capital, population, region, flag_url, created_by, created_at
    FROM countries
    WHERE 1=1
  `;
	const params = [];
	let idx = 1;

	if (q) {
		sql += ` AND name ILIKE $${idx++}`;
		params.push(`%${q}%`);
	}
	if (region) {
		sql += ` AND region ILIKE $${idx++}`;
		params.push(`%${region}%`);
	}

	sql += ` ORDER BY name ASC LIMIT $${idx++} OFFSET $${idx++}`;
	params.push(limit, offset);

	const result = await pool.query(sql, params);
	return result.rows;
}

async function insertCountry({
	name,
	capital,
	population,
	region,
	flag_url,
	userId,
}) {
	const result = await pool.query(
		`INSERT INTO countries (name, capital, population, region, flag_url, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, capital, population, region, flag_url, created_by, created_at`,
		[name, capital, population, region, flag_url, userId],
	);
	return result.rows[0];
}

module.exports = { searchCountries, insertCountry };
