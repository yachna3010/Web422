import { getToken } from "./authenticate";

const fetchWithAuth = async (url, method = "GET", body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  return res.ok ? await res.json() : [];
};

export const addToFavourites = (id) =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "PUT");

export const removeFromFavourites = (id) =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "DELETE");

export const getFavourites = () =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites`);

export const addToHistory = (query) =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history`, "PUT", query);

export const removeFromHistory = (id) =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, "DELETE");

export const getHistory = () =>
  fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history`);
