require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

const COUNTRIES = [
	{
		name: "Brasil",
		capital: "Brasília",
		population: 215313498,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/br.png",
	},
	{
		name: "Argentina",
		capital: "Buenos Aires",
		population: 45195777,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/ar.png",
	},
	{
		name: "Estados Unidos",
		capital: "Washington D.C.",
		population: 331893745,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/us.png",
	},
	{
		name: "Portugal",
		capital: "Lisboa",
		population: 10305564,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/pt.png",
	},
	{
		name: "França",
		capital: "Paris",
		population: 67391582,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/fr.png",
	},
	{
		name: "Alemanha",
		capital: "Berlim",
		population: 83240525,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/de.png",
	},
	{
		name: "Itália",
		capital: "Roma",
		population: 60317116,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/it.png",
	},
	{
		name: "Espanha",
		capital: "Madrid",
		population: 47351567,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/es.png",
	},
	{
		name: "Japão",
		capital: "Tóquio",
		population: 125681593,
		region: "Asia",
		flag_url: "https://flagcdn.com/w320/jp.png",
	},
	{
		name: "China",
		capital: "Pequim",
		population: 1402112000,
		region: "Asia",
		flag_url: "https://flagcdn.com/w320/cn.png",
	},
	{
		name: "Índia",
		capital: "Nova Délhi",
		population: 1380004385,
		region: "Asia",
		flag_url: "https://flagcdn.com/w320/in.png",
	},
	{
		name: "Coreia do Sul",
		capital: "Seul",
		population: 51744876,
		region: "Asia",
		flag_url: "https://flagcdn.com/w320/kr.png",
	},
	{
		name: "México",
		capital: "Cidade do México",
		population: 128932753,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/mx.png",
	},
	{
		name: "Canadá",
		capital: "Ottawa",
		population: 38005238,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/ca.png",
	},
	{
		name: "Austrália",
		capital: "Camberra",
		population: 25687041,
		region: "Oceania",
		flag_url: "https://flagcdn.com/w320/au.png",
	},
	{
		name: "África do Sul",
		capital: "Pretória",
		population: 59308690,
		region: "Africa",
		flag_url: "https://flagcdn.com/w320/za.png",
	},
	{
		name: "Egito",
		capital: "Cairo",
		population: 102334403,
		region: "Africa",
		flag_url: "https://flagcdn.com/w320/eg.png",
	},
	{
		name: "Nigéria",
		capital: "Abuja",
		population: 206139587,
		region: "Africa",
		flag_url: "https://flagcdn.com/w320/ng.png",
	},
	{
		name: "Rússia",
		capital: "Moscou",
		population: 144104080,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/ru.png",
	},
	{
		name: "Chile",
		capital: "Santiago",
		population: 19116209,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/cl.png",
	},
	{
		name: "Colômbia",
		capital: "Bogotá",
		population: 50882884,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/co.png",
	},
	{
		name: "Peru",
		capital: "Lima",
		population: 32971846,
		region: "Americas",
		flag_url: "https://flagcdn.com/w320/pe.png",
	},
	{
		name: "Turquia",
		capital: "Ancara",
		population: 84339067,
		region: "Asia",
		flag_url: "https://flagcdn.com/w320/tr.png",
	},
	{
		name: "Suécia",
		capital: "Estocolmo",
		population: 10353442,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/se.png",
	},
	{
		name: "Noruega",
		capital: "Oslo",
		population: 5379475,
		region: "Europe",
		flag_url: "https://flagcdn.com/w320/no.png",
	},
];

async function run() {
	// 1. Seed do usuário de teste
	const hash = await bcrypt.hash("123456", 10);
	const userResult = await pool.query(
		`INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
		["Vitoria", "vitoria@email.com", hash],
	);
	const userId = userResult.rows[0].id;
	console.log(`✅ Usuário seed criado/atualizado (id=${userId})`);

	// 2. Inserir países
	console.log(`🌍 Inserindo ${COUNTRIES.length} países no banco...`);
	let inserted = 0;

	for (const c of COUNTRIES) {
		await pool.query(
			`INSERT INTO countries (name, capital, population, region, flag_url, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
			[c.name, c.capital, c.population, c.region, c.flag_url, userId],
		);
		inserted++;
	}

	console.log(`✅ Seed concluído: ${inserted} países inseridos.`);
	await pool.end();
}

run().catch(async (e) => {
	console.error("❌ Erro no seed:", e);
	await pool.end();
	process.exit(1);
});
