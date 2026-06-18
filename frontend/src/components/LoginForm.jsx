import { useState } from "react";
import { loginRequest } from "../services/authService";
import { saveAuth } from "../utils/auth";

export const LoginForm = ({ onLogin }) => {
	const [email, setEmail] = useState("vitoria@email.com");
	const [password, setPassword] = useState("123456");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const data = await loginRequest(email, password);
			saveAuth(data.token, data.user);
			onLogin?.(data.user);
		} catch (err) {
			setError(err?.response?.data?.error || "Falha no login");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="email"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="senha"
			/>
			<button type="submit">Entrar</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};
