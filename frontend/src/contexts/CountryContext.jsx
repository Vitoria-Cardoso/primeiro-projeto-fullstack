import { createContext, useReducer } from "react";
import { countryReducer, ACTIONS } from "./countryReducer";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
	// Estado inicial
	const initialState = {
		countries: [],
		loading: false,
		error: null,
	};

	// useReducer: baseado em ações, muda o estado
	const [state, dispatch] = useReducer(countryReducer, initialState);

	return (
		<CountryContext.Provider value={{ state, dispatch }}>
			{children}
		</CountryContext.Provider>
	);
};
