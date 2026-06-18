const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../models/TokenBlacklistModel");

async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: "Token não informado" });
	}

	const [type, token] = authHeader.split(" ");
	if (type !== "Bearer" || !token) {
		return res.status(401).json({ error: "Token inválido" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Verifica se o token foi invalidado via logout
		const blacklisted = await isBlacklisted(token);
		if (blacklisted) {
			return res
				.status(401)
				.json({ error: "Token inválido (sessão encerrada)" });
		}

		req.user = decoded;
		return next();
	} catch {
		return res.status(401).json({ error: "Token expirado ou inválido" });
	}
}

module.exports = authMiddleware;
