import apiClient from "./apiClient";

export const getItems = async (q = "") => {
	const { data } = await apiClient.get(
		`/items${q ? `?q=${encodeURIComponent(q)}` : ""}`,
	);
	return data;
};

export const createItem = async (payload) => {
	const { data } = await apiClient.post("/items", payload);
	return data;
};
