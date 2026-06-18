import { useState } from "react";
import { createItem } from "../services/itemService";

export const InsertForm = ({ onCreated }) => {
	const [form, setForm] = useState({
		name: "",
		capital: "",
		population: "",
		region: "",
		flag_url: "",
	});
	const [msg, setMsg] = useState("");

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setMsg("");
		try {
			await createItem({ ...form, population: Number(form.population || 0) });
			setMsg("Item criado com sucesso!");
			setForm({
				name: "",
				capital: "",
				population: "",
				region: "",
				flag_url: "",
			});
			onCreated?.();
		} catch (err) {
			setMsg(
				err?.response?.data?.message ||
					err?.response?.data?.error ||
					"Erro ao inserir",
			);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<h2>Inserir País</h2>
			<input
				name="name"
				value={form.name}
				onChange={onChange}
				placeholder="Nome"
			/>
			<input
				name="capital"
				value={form.capital}
				onChange={onChange}
				placeholder="Capital"
			/>
			<input
				name="population"
				value={form.population}
				onChange={onChange}
				placeholder="População"
			/>
			<input
				name="region"
				value={form.region}
				onChange={onChange}
				placeholder="Região"
			/>
			<input
				name="flag_url"
				value={form.flag_url}
				onChange={onChange}
				placeholder="URL da bandeira"
			/>
			<button type="submit">Inserir</button>
			{msg && <p>{msg}</p>}
		</form>
	);
};
