import { useState } from "react";
import { loginRequest } from "../services/authService";
import { saveAuth } from "../utils/auth";

export const LoginForm = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const data = await loginRequest(email, password);
			saveAuth(data.token, data.user);
			onLogin?.(data.user);
		} catch (err) {
			setError(err?.response?.data?.error || "Email ou senha incorretos");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-wrapper">
			<h1>🌍 Busca de Países</h1>
			<p className="subtitle">Faça login para continuar</p>
			<div className="login-box">
				<h2 className="login-title">🔐 Login</h2>
				<div className="login-form">
					<div className="login-field">
						<label>Email</label>
						<input
							className="login-input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="seu@email.com"
							required
						/>
					</div>
					<div className="login-field">
						<label>Senha</label>
						<input
							className="login-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••"
							required
						/>
					</div>
					{error && <div className="login-error">⚠️ {error}</div>}
					<button
						className="login-btn"
						onClick={handleSubmit}
						disabled={loading}>
						{loading ? "Entrando..." : "Entrar"}
					</button>
				</div>
			</div>
		</div>
	);
};
