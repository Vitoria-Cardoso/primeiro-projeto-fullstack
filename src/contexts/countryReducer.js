// Define as ações que podem acontecer na aplicação
export const ACTIONS = {
	SEARCH_START: "SEARCH_START", // Começa a buscar
	SEARCH_SUCCESS: "SEARCH_SUCCESS", // Busca funcionou
	SEARCH_ERROR: "SEARCH_ERROR", // Erro na busca
	CLEAR_RESULTS: "CLEAR_RESULTS", // Limpa os resultados
};

// Esta função recebe o estado atual e uma ação, e retorna o novo estado
export const countryReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SEARCH_START:
			// Quando começa a buscar: loading = true, erro = null
			return {
				...state,
				loading: true,
				error: null,
				countries: [],
			};

		case ACTIONS.SEARCH_SUCCESS:
			// Quando a busca funciona: loading = false, países = dados
			return {
				...state,
				loading: false,
				countries: action.payload,
				error: null,
			};

		case ACTIONS.SEARCH_ERROR:
			// Quando dá erro: loading = false, error = mensagem
			return {
				...state,
				loading: false,
				error: action.payload,
				countries: [],
			};

		case ACTIONS.CLEAR_RESULTS:
			// Limpa tudo
			return {
				countries: [],
				loading: false,
				error: null,
			};

		default:
			return state;
	}
};
