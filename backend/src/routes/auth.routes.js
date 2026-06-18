const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { findByEmail } = require("../models/UserModel");

const router = express.Router();

router.post(
	"/login",
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
				return res.status(401).json({ error: "Credenciais inválidas" });
			}

			const ok = await bcrypt.compare(password, user.password_hash);
			if (!ok) {
				return res.status(401).json({ error: "Credenciais inválidas" });
			}

			const token = jwt.sign(
				{ id: user.id, email: user.email, name: user.name },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
			);

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
