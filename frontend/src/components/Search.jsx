import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CountryContext } from "../contexts/CountryContext";
import { ACTIONS } from "../contexts/countryReducer";
import { searchCountries } from "../services/api";

export const Search = () => {
	const { dispatch } = useContext(CountryContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			searchTerm: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			dispatch({ type: ACTIONS.SEARCH_START });
			const countries = await searchCountries(data.searchTerm);
			dispatch({
				type: ACTIONS.SEARCH_SUCCESS,
				payload: countries,
			});
			reset();
		} catch (error) {
			dispatch({
				type: ACTIONS.SEARCH_ERROR,
				payload: error.message,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<div>
					<input
						type="text"
						placeholder="Digite o nome de um país..."
						{...register("searchTerm", {
							required: "Campo obrigatório!",
							minLength: {
								value: 2,
								message: "Mínimo 2 caracteres",
							},
						})}
					/>
					<button type="submit">Buscar</button>
				</div>

				{/* Mensagem de erro validação */}
				{errors.searchTerm && (
					<div className="error-message">⚠️ {errors.searchTerm.message}</div>
				)}
			</div>
		</form>
	);
};
