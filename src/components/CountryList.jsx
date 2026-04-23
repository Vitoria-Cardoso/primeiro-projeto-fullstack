import { CountryCard } from "./CountryCard";

export const CountryList = ({ countries }) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
				gap: "20px",
			}}>
			{countries.map((country, index) => (
				<CountryCard key={index} country={country} />
			))}
		</div>
	);
};
