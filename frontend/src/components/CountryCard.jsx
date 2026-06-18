export const CountryCard = ({ country }) => {
	return (
		<div className="country-card">
			<img src={country.flag} alt={country.name} className="country-flag" />

			{/* Conteúdo */}
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
					<span>{country.population}</span>
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
