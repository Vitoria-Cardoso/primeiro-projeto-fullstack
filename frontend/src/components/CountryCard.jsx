export const CountryCard = ({ country }) => {
	return (
		<div className="country-card">
			{country.flag_url && (
				<img
					src={country.flag_url}
					alt={country.name}
					className="country-flag"
				/>
			)}

			<div className="card-content">
				<h3 className="country-name">{country.name}</h3>

				<div className="card-info">
					<span className="card-info-icon">🏛️</span>
					<strong>Capital:</strong>
					<span>{country.capital}</span>
				</div>

				<div className="card-info">
					<span className="card-info-icon">👥</span>
					<strong>População:</strong>
					<span>{country.population?.toLocaleString("pt-BR")}</span>
				</div>

				{country.region && (
					<div className="card-info">
						<span className="card-info-icon">🌍</span>
						<strong>Região:</strong>
						<span>{country.region}</span>
					</div>
				)}
			</div>
		</div>
	);
};
