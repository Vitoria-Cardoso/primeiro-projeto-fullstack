import { useContext, useState } from "react";
import { CountryContext } from "./contexts/CountryContext";
import { Search } from "./components/Search";
import { CountryList } from "./components/CountryList";
import { Loading } from "./components/Loading";
import { LoginForm } from "./components/LoginForm";
import { InsertForm } from "./components/InsertForm";
import { getToken, getUser, clearAuth } from "./utils/auth";
import "./App.css";

function App() {
	const { state } = useContext(CountryContext);
	const { countries, loading, error } = state;

	const [authUser, setAuthUser] = useState(getUser());
	const isLogged = !!getToken();

	const handleLogout = () => {
		clearAuth();
		setAuthUser(null);
		window.location.reload();
	};

	// Se não tiver token, mostra só login
	if (!isLogged) {
		return (
			<div className="container">
				<h1>🔐 Login</h1>
				<p className="subtitle">Entre para acessar Busca e Inserção</p>
				<LoginForm onLogin={(user) => setAuthUser(user)} />
			</div>
		);
	}

	// Se tiver token, mostra app normal + inserção + logout
	return (
		<div className="container">
			<div
				style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
				<div>
					<h1>🌍 Busca de Países</h1>
					<p className="subtitle">
						Usuário logado: <strong>{authUser?.name || "Usuário"}</strong>
					</p>
				</div>
				<button onClick={handleLogout}>Sair</button>
			</div>

			<InsertForm />

			<hr style={{ margin: "20px 0" }} />

			<Search />

			{error && <div className="error-box">❌ {error}</div>}

			{loading && <Loading />}

			{!loading && countries.length > 0 && (
				<>
					<p className="success-message">
						📍 {countries.length} país(es) encontrado(s)
					</p>
					<CountryList countries={countries} />
				</>
			)}

			{!loading && countries.length === 0 && !error && (
				<div className="initial-message">
					<p>🔍 Digite o nome de um país para começar...</p>
					<p className="example-text">Ex: Brasil, Itália, Japão</p>
				</div>
			)}
		</div>
	);
}

export default App;
