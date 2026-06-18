import axios from "axios";

const api = axios.create({
	baseURL: "https://restcountries.com/v3.1",
});

export const searchCountries = async (name) => {
	if (!name || name.trim() === "") {
		throw new Error("Digite um nome de país");
	}

	try {
		const response = await api.get(`/name/${name}`);

		if (!response.data || response.data.length === 0) {
			throw new Error("Nenhum país encontrado com esse nome");
		}

		return response.data.map((country) => ({
			name: country.name.common,
			capital: country.capital ? country.capital[0] : "N/A",
			population: country.population.toLocaleString("pt-BR"),
			region: country.region || "N/A",
			flag: country.flags.svg,
		}));
	} catch (error) {
		if (error.response?.status === 404) {
			throw new Error("🌍 País não encontrado. Tente outro nome!");
		}
		if (
			error.message.includes("não encontrado") ||
			error.message.includes("Digite um")
		) {
			throw error;
		}
		throw new Error(
			"⚠️ Erro na conexão com a API. Tente novamente em alguns segundos.",
		);
	}
};
