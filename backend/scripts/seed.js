require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

async function run() {
	const hash = await bcrypt.hash("123456", 10);

	await pool.query(
		`INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
		["Vitoria", "vitoria@email.com", hash],
	);

	console.log("Seed concluído.");
	await pool.end();
}

run().catch(async (e) => {
	console.error(e);
	await pool.end();
});
