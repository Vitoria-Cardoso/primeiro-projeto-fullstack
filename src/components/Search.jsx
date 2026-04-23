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
	} = useForm();

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
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "15px",
				marginBottom: "30px",
			}}>
			<div
				style={{
					display: "flex",
					gap: "10px",
					justifyContent: "center",
					width: "100%",
					flexWrap: "wrap",
				}}>
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
					style={{
						padding: "10px",
						width: "300px",
						fontSize: "16px",
						borderRadius: "4px",
						border: errors.searchTerm ? "2px solid red" : "1px solid #ccc",
					}}
				/>
				<button
					type="submit"
					style={{
						padding: "10px 20px",
						cursor: "pointer",
						backgroundColor: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						fontSize: "16px",
						fontWeight: "bold",
					}}>
					🔍 Buscar
				</button>
			</div>

			{/* Mostra erro de validação */}
			{errors.searchTerm && (
				<p
					style={{
						color: "red",
						marginTop: "5px",
						fontSize: "14px",
						textAlign: "center",
					}}>
					⚠️ {errors.searchTerm.message}
				</p>
			)}
		</form>
	);
};
