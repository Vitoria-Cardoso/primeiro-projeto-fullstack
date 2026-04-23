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
			<Search />

			{/* Mostra erro se houver */}
			{error && (
				<div style={{ color: "red", marginBottom: "20px", fontSize: "18px" }}>
					❌ {error}
				</div>
			)}

			{/* Mostra loading enquanto busca */}
			{loading && <Loading />}

			{/* Mostra os países */}
			{!loading && countries.length > 0 && (
				<CountryList countries={countries} />
			)}

			{/* Mensagem inicial */}
			{!loading && countries.length === 0 && !error && (
				<p style={{ textAlign: "center", color: "#999" }}>
					Digite um país para começar...
				</p>
			)}
		</div>
	);
}

export default App;
