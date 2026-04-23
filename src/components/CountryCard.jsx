export const CountryCard = ({ country }) => {
	return (
		<div
			style={{
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "15px",
				textAlign: "center",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				backgroundColor: "#fff",
			}}>
			{/* Bandeira */}
			<img
				src={country.flag}
				alt={country.name}
				style={{ width: "100px", height: "60px", marginBottom: "10px" }}
			/>

			{/* Informações */}
			<h3 style={{ margin: "10px 0" }}>{country.name}</h3>
			<p>
				<strong>Capital:</strong> {country.capital}
			</p>
			<p>
				<strong>População:</strong> {country.population}
			</p>
		</div>
	);
};
