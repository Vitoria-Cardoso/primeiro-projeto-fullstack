import axios from "axios";

// Cria uma instância do axios com a URL base
const api = axios.create({
	baseURL: "https://restcountries.com/v3.1",
});

// Função que busca países por nome
export const searchCountries = async (name) => {
	// Valida se o nome está vazio
	if (!name || name.trim() === "") {
		throw new Error("Digite um nome de país");
	}

	try {
		// Faz a requisição GET
		const response = await api.get(`/name/${name}`);

		// Retorna apenas os dados que precisamos
		return response.data.map((country) => ({
			name: country.name.common,
			capital: country.capital ? country.capital[0] : "N/A",
			population: country.population.toLocaleString("pt-BR"),
			flag: country.flags.svg,
		}));
	} catch (error) {
		// Se o país não existir, a API retorna 404
		if (error.response?.status === 404) {
			throw new Error("País não encontrado");
		}
		throw new Error("Erro ao buscar dados. Tente novamente.");
	}
};
