const express = require("express");
const { query, body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const { searchCountries, insertCountry } = require("../models/CountryModel");
const cache = require("../config/cache");

const router = express.Router();

router.get(
	"/",
	authMiddleware,
	[
		query("q").optional().isString(),
		query("region").optional().isString(),
		query("limit").optional().isInt({ min: 1, max: 100 }),
		query("offset").optional().isInt({ min: 0 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: "VALIDATION_ERROR",
				message: "Parâmetros inválidos",
				details: errors.array(),
			});
		}

		const { q = "", region = "", limit = 20, offset = 0 } = req.query;

		const cacheKey = `items:${q}:${region}:${limit}:${offset}`;

		const cached = cache.get(cacheKey);
		if (cached) {
			console.log(`[CACHE HIT] ${cacheKey}`);
			return res.status(200).json({ data: cached, fromCache: true });
		}

		try {
			const data = await searchCountries({
				q,
				region,
				limit: Number(limit),
				offset: Number(offset),
			});

			// Salva no cache para próximas requisições
			cache.set(cacheKey, data);
			console.log(`[CACHE SET] ${cacheKey}`);

			return res.status(200).json({ data });
		} catch (err) {
			console.error("Erro na busca:", err);
			return res.status(500).json({ error: "Erro ao buscar países" });
		}
	},
);

router.post(
	"/",
	authMiddleware,
	[
		body("name").notEmpty().withMessage("name é obrigatório"),
		body("capital").optional().isString(),
		body("population").optional().isInt({ min: 0 }),
		body("region").optional().isString(),
		body("flag_url").optional().isURL().withMessage("flag_url inválida"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: "VALIDATION_ERROR",
				message: "Campos inválidos",
				details: errors.array(),
			});
		}

		try {
			const created = await insertCountry({
				...req.body,
				userId: req.user.id,
			});

			cache.flushAll();
			console.log("[CACHE FLUSH] novo país inserido, cache limpo");

			return res.status(201).json(created);
		} catch (err) {
			console.error("Erro na inserção:", err);
			return res.status(500).json({ error: "Erro ao inserir país" });
		}
	},
);

module.exports = router;
