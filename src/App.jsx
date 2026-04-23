import { useContext } from "react";
import { CountryContext } from "./contexts/CountryContext";
import { Search } from "./components/Search";
import { CountryList } from "./components/CountryList";
import { Loading } from "./components/Loading";
import "./App.css";

function App() {
	const { state } = useContext(CountryContext);
	const { countries, loading, error } = state;

	return (
		<div className="container">
			<h1>🌍 Busca de Países</h1>
			<p className="subtitle">Encontre informações sobre países do mundo</p>

			<Search />

			{error && <div className="error-box">❌ {error}</div>}

			{loading && <Loading />}

			{/* Mostrar países */}
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
