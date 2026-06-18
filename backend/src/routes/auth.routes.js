const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { findByEmail } = require("../models/UserModel");

const router = express.Router();

// Máximo de 5 tentativas de login por IP a cada 15 minutos
const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 5,
	message: {
		error: "RATE_LIMIT",
		message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
	},
	standardHeaders: true, // Retorna info do limite nos headers (RateLimit-*)
	legacyHeaders: false,
	handler: (req, res, next, options) => {
		console.warn(
			`[RATE LIMIT] IP bloqueado: ${req.ip} — tentativas excessivas de login`,
		);
		res.status(429).json(options.message);
	},
});

router.post(
	"/login",
	loginLimiter,
	[
		body("email").isEmail().withMessage("Email inválido"),
		body("password").notEmpty().withMessage("Senha é obrigatória"),
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

		const { email, password } = req.body;

		try {
			const user = await findByEmail(email);
			if (!user) {
				console.warn(
					`[AUTH FAIL] Email não encontrado: ${email} — IP: ${req.ip}`,
				);
				return res.status(401).json({ error: "Credenciais inválidas" });
			}

			const ok = await bcrypt.compare(password, user.password_hash);
			if (!ok) {
				// Log de tentativa de login com senha errada
				console.warn(
					`[AUTH FAIL] Senha incorreta para: ${email} — IP: ${req.ip}`,
				);
				return res.status(401).json({ error: "Credenciais inválidas" });
			}

			const token = jwt.sign(
				{ id: user.id, email: user.email, name: user.name },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
			);

			console.log(`[AUTH OK] Login bem-sucedido: ${email} — IP: ${req.ip}`);
			return res.status(200).json({
				token,
				user: { id: user.id, name: user.name, email: user.email },
			});
		} catch (err) {
			console.error("Erro no login:", err);
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},
);

module.exports = router;
