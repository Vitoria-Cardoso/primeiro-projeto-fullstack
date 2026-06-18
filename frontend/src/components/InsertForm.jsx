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
	const [msg, setMsg] = useState({ text: "", type: "" });
	const [loading, setLoading] = useState(false);

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setMsg({ text: "", type: "" });
		setLoading(true);
		try {
			await createItem({ ...form, population: Number(form.population || 0) });
			setMsg({ text: "✅ País inserido com sucesso!", type: "success" });
			setForm({
				name: "",
				capital: "",
				population: "",
				region: "",
				flag_url: "",
			});
			onCreated?.();
		} catch (err) {
			setMsg({
				text:
					err?.response?.data?.message ||
					err?.response?.data?.error ||
					"Erro ao inserir",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="insert-box">
			<h2 className="insert-title">➕ Inserir Novo País</h2>
			<form className="insert-form" onSubmit={onSubmit}>
				<div className="insert-grid">
					<div className="insert-field">
						<label>Nome *</label>
						<input
							className="insert-input"
							name="name"
							value={form.name}
							onChange={onChange}
							placeholder="Ex: Brasil"
							required
						/>
					</div>
					<div className="insert-field">
						<label>Capital</label>
						<input
							className="insert-input"
							name="capital"
							value={form.capital}
							onChange={onChange}
							placeholder="Ex: Brasília"
						/>
					</div>
					<div className="insert-field">
						<label>População</label>
						<input
							className="insert-input"
							name="population"
							type="number"
							value={form.population}
							onChange={onChange}
							placeholder="Ex: 215000000"
							min="0"
						/>
					</div>
					<div className="insert-field">
						<label>Região</label>
						<input
							className="insert-input"
							name="region"
							value={form.region}
							onChange={onChange}
							placeholder="Ex: Americas"
						/>
					</div>
				</div>
				<div className="insert-field insert-field-full">
					<label>URL da Bandeira</label>
					<input
						className="insert-input"
						name="flag_url"
						value={form.flag_url}
						onChange={onChange}
						placeholder="https://flagcdn.com/w320/br.png"
					/>
				</div>

				{msg.text && (
					<div
						className={
							msg.type === "success" ? "insert-success" : "insert-error"
						}>
						{msg.text}
					</div>
				)}

				<button className="insert-btn" type="submit" disabled={loading}>
					{loading ? "Inserindo..." : "Inserir País"}
				</button>
			</form>
		</div>
	);
};
