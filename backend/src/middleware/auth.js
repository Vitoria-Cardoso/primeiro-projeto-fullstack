const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
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
		req.user = decoded; // { id, email, name }
		return next();
	} catch {
		return res.status(401).json({ error: "Token expirado ou inválido" });
	}
}

module.exports = authMiddleware;
